import React from "react";

const PriceFilter = ({ priceRange, onChange }) => {
  return (
    <div>
      <h3 className="font-semibold mb-2">Price Range</h3>
      <div className="flex justify-between text-sm text-white/70">
        <span>৳{priceRange[0]}</span>
        <span>৳{priceRange[1]}</span>
      </div>
      <input
        type="range"
        min="0"
        max="10000"
        step="100"
        value={priceRange[1]}
        onChange={(e) => onChange([priceRange[0], parseInt(e.target.value)])}
        className="w-full accent-red-500"
      />
    </div>
  );
};

export default PriceFilter;
