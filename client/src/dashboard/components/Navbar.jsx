import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import SearchInput from "./SearchInput";

export default function Navbar() {
  const locationName = useLocation().pathname;
  const pageTitle = locationName
    .split("/")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <header className="border-b border-gray-300 px-4 py-3 shadow-sm flex items-center justify-between">
      {/* Title Section */}
      <h1 className="text-base md:text-2xl font-bold text-black capitalize">
        {pageTitle || "Dashboard"}
      </h1>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Search bar (hidden on very small screens) */}
        <div className="relative hidden sm:block">
          <SearchInput className="w-full sm:w-64 px-3 py-1.5 rounded-md border border-gray-300 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>
        <div className="rounded-full p-1">
          <FaUserCircle className="text-3xl text-gray-600" />
        </div>
      </div>
    </header>
  );
}
