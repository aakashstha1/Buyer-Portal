import React, { useState, useEffect } from "react";
import PropertyCard from "./ui/PropertyCard";
import {
  getFavourites,
  removeFromFavourites,
} from "../services/favouritesService";
import Loader from "./Loader";
import { toast } from "react-toastify";

function FavouritesList() {
  const [favourites, setFavourites] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 5;
  const [loading, setLoading] = useState(false);

  // Fetch favourites
  const fetchFavourites = async (pageToFetch = page) => {
    try {
      setLoading(true);
      const res = await getFavourites(pageToFetch, perPage);
      setFavourites(res.data);
      setTotalPages(res.pagination.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch favourites on initial mount and whenever page changes
  useEffect(() => {
    fetchFavourites();
  }, [page]);

  const handleRemove = async (propertyId) => {
    try {
      await removeFromFavourites(propertyId);
      toast.success("Removed from favourites");

      // If last item on page removed, go back a page
      const isLastItemOnPage = favourites.length === 1 && page > 1;
      const newPage = isLastItemOnPage ? page - 1 : page;

      // Fetch updated favourites for correct page
      fetchFavourites(newPage);
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove favourite");
    }
  };

  return (
    <div>
      <div className="flex items-center p-3 gap-3">
        <span className="w-1 h-7 bg-amber-500 rounded-sm"></span>
        <h1 className="text-2xl font-bold text-gray-800">Favourites</h1>
      </div>

      {loading ? (
        <Loader />
      ) : favourites.length === 0 ? (
        <p className="text-gray-400 text-sm text-center mt-10">
          No properties added to favourites yet.
        </p>
      ) : (
        <div className="flex flex-col gap-4 p-4">
          {favourites.map(({ _id, property }) => (
            <PropertyCard
              key={_id}
              {...property}
              variant="favourite"
              onRemove={() => handleRemove(property._id)}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
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
              className={`px-3 py-1.5 text-sm rounded-lg border ${
                page === p
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
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

export default FavouritesList;
