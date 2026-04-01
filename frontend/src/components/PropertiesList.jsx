import React from "react";
import { propertyData } from "../assets/data/staticData";
import PropertyCard from "./ui/PropertyCard";

import { useState } from "react";

function PropertiesList() {
  const [page, setPage] = useState(1);
  const perPage = 6;

  const total = propertyData.length;
  const totalPages = Math.ceil(total / perPage);
  const paginated = propertyData.slice((page - 1) * perPage, page * perPage);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {paginated.map((property) => (
          <PropertyCard key={property.id} {...property} />
        ))}
      </div>

      {/* Pagination */}
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
    </div>
  );
}

export default PropertiesList;
