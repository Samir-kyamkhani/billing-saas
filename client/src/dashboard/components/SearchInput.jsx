import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchInput = ({ placeholder = "Search", className = "", ...props }) => {
  return (
    <div className="relative w-full sm:w-64 ">
      <input
        type="text"
        placeholder={placeholder}
        className={`w-full pl-10 pr-4 py-2 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-200${className}`}
        {...props}
      />
      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
    </div>
  );
};

export default SearchInput;
