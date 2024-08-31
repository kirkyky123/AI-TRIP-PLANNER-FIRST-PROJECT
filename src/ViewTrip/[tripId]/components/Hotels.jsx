import React from "react";
import HotelCard from "./HotelCard";

function Hotels({ trip }) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-white mb-2">Hotel Recommendations</h1>
      <p className="text-lg text-gray-400 mb-8">Click on the hotel card for location details</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trip?.tripInfo?.HotelOptions?.map((hotel, index) => (
          <div key={index}>
              <HotelCard hotel={hotel} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hotels;