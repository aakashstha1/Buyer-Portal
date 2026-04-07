import React, { useCallback } from "react";
import PropertyCard from "./ui/PropertyCard";
import { useState, useEffect } from "react";
import {
  getProperties,
  getSearchedProperties,
} from "../services/propertyService";
import Loader from "./Loader";
import {
  addToFavourites,
  getFavouriteIds,
  removeFromFavourites,
} from "../services/favouritesService";
import { toast } from "react-toastify";
import Searchbar from "./Searchbar";

function PropertiesList() {
  const [properties, setProperties] = useState([]);
  const [favouriteIds, setFavouriteIds] = useState(new Set());
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 5;
  const [searchKeyword, setSearchKeyword] = useState("");
  const [loading, setLoading] = useState(false);

  // fetch all favourite property ids once
  useEffect(() => {
    const fetchFavouriteIds = async () => {
      try {
        const ids = await getFavouriteIds();
        setFavouriteIds(new Set(ids));
      } catch (err) {
        if (err.response?.status !== 401) {
          console.error(err); // only log non-auth errors
        }
      }
    };
    fetchFavouriteIds();
  }, []);

  // fetch properties on page or search change
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const res = searchKeyword
          ? await getSearchedProperties(searchKeyword, page, perPage)
          : await getProperties(page, perPage);
        setProperties(res.data);
        setTotalPages(res.pagination?.totalPages ?? 1);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, [page, searchKeyword]);

  const handleSearch = useCallback((value) => {
    setSearchKeyword(value);
    setPage(1); // reset to page 1 on new search
  }, []);

  const handleLike = async (propertyId, liked) => {
    try {
      if (liked) {
        await addToFavourites(propertyId);
        setFavouriteIds((prev) => new Set([...prev, propertyId]));
      } else {
        await removeFromFavourites(propertyId);
        setFavouriteIds((prev) => {
          const next = new Set(prev);
          next.delete(propertyId);
          return next;
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update favourites");
    }
  };

  return (
    <div className="w-full bg-white p-2  rounded-xl shadow-md">
      <div className="flex items-center p-3 gap-3">
        <span className="w-1 h-7 bg-amber-500 rounded-sm"></span>
        <h1 className="text-2xl font-bold text-gray-800">Properties List</h1>
      </div>

      <Searchbar onSearch={handleSearch} />

      {loading ? (
        <Loader />
      ) : properties.length === 0 ? (
        <p className="text-gray-400 text-sm text-center mt-10">
          No properties to show.
        </p>
      ) : (
        <div className="flex flex-col gap-4 p-4">
          {properties.map((property) => (
            <PropertyCard
              key={property._id}
              {...property}
              isLiked={favouriteIds.has(property._id)} // ← pass liked state
              onLike={(liked) => handleLike(property._id, liked)}
            />
          ))}
        </div>
      )}

      {!loading && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
            className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`px-3 py-1.5 text-sm rounded-lg border ${page === p ? "bg-indigo-600 text-white border-indigo-600" : "border-gray-200 hover:bg-gray-50"}`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages}
            className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default PropertiesList;
