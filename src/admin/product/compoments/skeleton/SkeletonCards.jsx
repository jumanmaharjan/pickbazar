import React from "react";

function Cards({ number = 10 }) {
  return (
    <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
      {Array.from({ length: number }).map((_, idx) => (
        <div
          key={idx}
          className="border rounded p-5 bg-black animate-pulse h-64"
        >
          <div className="bg-[#333] h-32 w-full mb-4 rounded"></div>
          <div className="h-4 bg-[#333] rounded mb-2 w-3/4"></div>
          <div className="h-4 bg-[#333] rounded mb-2 w-1/2"></div>
          <div className="h-4 bg-[#333] rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
}

export default Cards;
