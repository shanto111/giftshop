// FiltersSidebar.jsx
import React from "react";
import { X } from "lucide-react";
import PriceFilter from "./PriceFilter";
import RatingFilter from "./RatingFilter";

const FiltersSidebar = ({
  priceRange,
  onPriceChange,
  categories,
  selectedCategory,
  onCategoryChange,
  rating,
  onRatingChange,
  selectedSort,
  onSortChange,
  onReset,
}) => {
  return (
    <div className="bg-white/5 p-4 rounded border border-white/10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Filters</h2>
        <button
          onClick={onReset}
          className="text-red-400 hover:text-red-300 flex items-center gap-1"
        >
          <X size={16} /> Reset
        </button>
      </div>

      {/* Individual Filter Components */}
      <div className="space-y-6">
        <PriceFilter
          priceRange={priceRange}
          onChange={onPriceChange}
        ></PriceFilter>

        <RatingFilter rating={rating} onChange={onRatingChange}></RatingFilter>
      </div>
    </div>
  );
};

export default FiltersSidebar;
