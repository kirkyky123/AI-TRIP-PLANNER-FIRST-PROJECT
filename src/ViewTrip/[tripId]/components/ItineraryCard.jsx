/* eslint-disable react/prop-types */
import { placeDetails, REFERENCE_PHOTO_URL } from "@/AiService/API";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function PlaceCard({ place, index }) {
  const [photoUrl, setPhotoUrl] = useState("");

  // useEffect(() => {
  //   if (place) {
  //     getPhoto();
  //   }
  // }, [place]);

  // const getPhoto = async () => {
  //   const data = {
  //     textQuery: place?.PlaceName,
  //   };

  //   const res = await placeDetails(data).then((response) => {
  //     const updatedPhotoURL = REFERENCE_PHOTO_URL.replace(
  //       "{NAME}",
  //       response.data.places[0].photos[0].name
  //     );
  //     setPhotoUrl(updatedPhotoURL);
  //   });
  // };

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        place.PlaceNameSearch + " " + place.PlaceAddress
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block group">
      <div className="bg-gray-900 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform group-hover:scale-105 group-hover:-translate-y-2">
        <div className="relative">
          <img
            src={photoUrl ? photoUrl : "/banner2.jpg"}
            alt={place.PlaceName}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-sm font-semibold rounded">
            ⏱️ {place.BestTimeToVisit}
          </div>
          <div className="absolute bottom-2 right-2 bg-gray-800 text-white w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold">
            {index + 1}
          </div>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold text-white mb-2 line-clamp-2 group-hover:text-green-400 transition-colors duration-300">
            {place.PlaceName}
          </h2>
          <p className="text-sm text-gray-200 mb-4 line-clamp-3">
            {place.PlaceDetails}
          </p>
          <div className="space-y-2 text-sm">
            <p className="flex items-center text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
              <span className="text-lg mr-2">📍</span>
              <span className="underline underline-offset-2 line-clamp-1">
                {place.PlaceAddress}
              </span>
            </p>
            <p className="flex items-center text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
              <span className="text-lg mr-2">💲</span>
              <span>
                {place.TicketPricing !== "N/A" ? place.TicketPricing : "Free"}
              </span>
            </p>
            <p className="flex items-center text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
              <span className="text-lg mr-2">🚕</span>
              <span>
                {index !== 0 ? place.TravelTime : "(Depends on hotel location)"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCard;
