// RatingFilter.jsx
import React from "react";
import { Star } from "lucide-react";

const RatingFilter = ({ rating, onChange }) => {
  const ratings = [4, 3, 2, 1, 0]; // Rating options

  return (
    <div>
      <h3 className="font-semibold mb-2">Minimum Rating</h3>
      <div className="flex gap-2 flex-wrap">
        {ratings.map((r) => (
          <button
            key={r}
            onClick={() => onChange(r)}
            className={`px-3 py-1 rounded-full ${
              rating === r ? "bg-red-500" : "bg-white/10"
            }`}
          >
            <Star
              size={14}
              fill="currentColor"
              className={r <= rating ? "text-yellow-300" : "text-white/30"}
            />
            {r === 0 ? "Any" : `${r}+`}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RatingFilter;
