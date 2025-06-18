import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import SearchInput from "./SearchInput";

const FilterButtons = ({ items, activeItem, onClick, activeClass, defaultClass }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4 overflow-x-auto">
      {items.map((item) => (
        <button
          key={item}
          onClick={() => onClick(item)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition whitespace-nowrap ${
            activeItem === item ? activeClass : defaultClass
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

const PageHeader = ({
  title = "Page Title",
  filters = [],
  categories = [],
  onFilterChange = () => {},
  showSearch = true,
  showFilterIcon = false,
  renderActions = null,
}) => {
  const [activeFilter, setActiveFilter] = useState(filters[0] || "");
  const [activeCategory, setActiveCategory] = useState(categories[0] || "");

  const handleFilterSelect = (filter) => {
    setActiveFilter(filter);
    onFilterChange(filter);
  };

  const handleCategorySelect = (category) => {
    setActiveCategory(category);
    onFilterChange(category);
  };

  return (
    <div className="w-full">
      {/* Header Top */}
      <div className="flex p-4 flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 w-full">
        <h2 className="text-2xl font-bold text-gray-800 truncate">{title}</h2>

        <div className="flex flex-col sm:flex-row flex-wrap items-stretch gap-2 w-full sm:w-auto">
          {showSearch && (
            <div className="w-full sm:w-auto flex-1 min-w-[150px]">
              <SearchInput />
            </div>
          )}
          {showFilterIcon && (
            <button
              className="p-2 rounded-md bg-white border text-gray-600 hover:bg-gray-50 transition shrink-0"
              title="Toggle filters"
            >
              <FaFilter />
            </button>
          )}
          {renderActions && renderActions()}
        </div>
      </div>

      {/* Filter Buttons */}
      {filters.length > 0 && (
        <FilterButtons
          items={filters}
          activeItem={activeFilter}
          onClick={handleFilterSelect}
          activeClass="bg-blue-600 text-white"
          defaultClass="bg-gray-100 text-gray-700 hover:bg-gray-200"
        />
      )}

      {/* Category Buttons */}
      {categories.length > 0 && (
        <FilterButtons
          items={categories}
          activeItem={activeCategory}
          onClick={handleCategorySelect}
          activeClass="bg-green-600 text-white"
          defaultClass="bg-gray-100 text-gray-700 hover:bg-gray-200"
        />
      )}
    </div>
  );
};

export default PageHeader;
