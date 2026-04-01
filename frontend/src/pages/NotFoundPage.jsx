import React from "react";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-8xl font-bold text-red-500 mb-4">404</h1>
        <p className="text-2xl text-gray-700 mb-6">
          Oops! The page you are looking for does not exist.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default NotFoundPage;
