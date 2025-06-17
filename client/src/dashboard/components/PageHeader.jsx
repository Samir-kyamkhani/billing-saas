import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import SearchInput from "./SearchInput";

const PageHeader = ({
  title = "Page Title",
  filters = [],
  onFilterChange = () => {},
  showSearch = true,
  showFilterIcon = false,
  renderActions = null,
}) => {
  const [activeFilter, setActiveFilter] = useState(filters[0] || "");

  const handleFilterClick = (label) => {
    setActiveFilter(label);
    onFilterChange(label);
  };

  return (
    <div>
      {/* Header Top */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 w-full">
        <h2 className="text-2xl font-bold text-gray-800 min-w-0 truncate">
          {title}
        </h2>

        <div className="flex flex-col sm:flex-row flex-wrap items-stretch gap-2 w-full sm:w-auto sm:flex-nowrap">
          {showSearch && (
            <div className="w-full sm:w-auto flex-1 min-w-[150px]">
              <SearchInput />
            </div>
          )}
          {showFilterIcon && (
            <button className="p-2 rounded-md bg-white border text-gray-600 hover:bg-gray-50 transition shrink-0">
              <FaFilter />
            </button>
          )}
          {renderActions && renderActions()}
        </div>
      </div>

      {/* Filter Buttons */}
      {filters.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4 overflow-x-auto">
          {filters.map((label) => {
            const isActive = activeFilter === label;
            return (
              <button
                key={label}
                onClick={() => handleFilterClick(label)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition whitespace-nowrap ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
