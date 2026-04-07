import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";

function Searchbar({ onSearch }) {
  const [keyword, setKeyword] = useState("");
  const [debounceKeyword, setDebounceKeyword] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceKeyword(keyword);
    }, 1000);
    return () => {
      clearTimeout(handler);
    };
  }, [keyword]);

  useEffect(() => {
    onSearch(debounceKeyword.trim());
  }, [debounceKeyword]);

  return (
    <div className="w-full p-5 flex items-center justify-between">
      <input
        type="search"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch(debounceKeyword.trim())}
        placeholder="Search"
        className="w-full px-4 py-2 border border-gray-300 rounded-tl-md rounded-bl-md focus:outline-none focus:border-indigo-600"
      />
      <button
        onClick={() => onSearch(keyword.trim())}
        className=" p-2 bg-indigo-600 text-white border border-indigo-600 rounded-tr-md rounded-br-md items-center flex gap-2 cursor-pointer"
      >
        Search <Search size={20} />
      </button>
    </div>
  );
}

export default Searchbar;
