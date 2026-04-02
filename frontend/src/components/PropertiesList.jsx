import React from "react";
// import { propertyData } from "../assets/data/staticData";
import PropertyCard from "./ui/PropertyCard";

import { useState } from "react";
import { useEffect } from "react";
import { getProperties } from "../services/propertyService";
import Loader from "./Loader";

function PropertiesList() {
  const [properties, setProperties] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 5;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch properties when page changes
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await getProperties(page, perPage);

        setProperties(res.data); // your backend returns { data: [], pagination: {} }
        setTotalPages(res.pagination.totalPages);
      } catch (err) {
        setError("Failed to fetch properties");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [page]);

  return (
    <div>
      <div className="flex items-center p-3 gap-3">
        <span className="w-1 h-7 bg-amber-500 rounded-sm"></span>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-[#F5F5F5]">
          Properties List
        </h1>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <p className="p-4 text-center text-red-500">{error}</p>
      ) : (
        <div className="flex flex-col gap-4 p-4">
          {properties.map((property) => (
            <PropertyCard key={property._id} {...property} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {loading ? null : (
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

export default PropertiesList;
