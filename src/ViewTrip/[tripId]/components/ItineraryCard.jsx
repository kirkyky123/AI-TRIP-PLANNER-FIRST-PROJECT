/* eslint-disable react/prop-types */
import { placeDetails, REFERENCE_PHOTO_URL } from "@/AiService/API";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { EnablePhotosContext } from "..";

function PlaceCard({ place, index, location }) {
  const [photoUrl, setPhotoUrl] = useState("");
  const enabledPhotos = useContext(EnablePhotosContext);

  // useEffect(() => {
  //   if (place && enabledPhotos) {
  //     getPhoto();
  //   }
  //   if (!enabledPhotos) {
  //     setPhotoUrl("/banner2.jpg");
  //   }
  // }, [place, enabledPhotos]);

  // const getPhoto = async () => {
  //   if (!enabledPhotos) return;

  //   let data = {
  //     textQuery: place?.PlaceNameSearch,
  //   };

  //   let response = await placeDetails(data);
  //   let updatedPhotoURL = REFERENCE_PHOTO_URL.replace(
  //     "{NAME}",
  //     response.data.places[0].photos[0].name
  //   );

  //   if (!updatedPhotoURL) {
  //     data = {
  //       textQuery:
  //         place?.PlaceNameSearch + " " + place?.PlaceAddress + " " + location,
  //     };
  //     response = await placeDetails(data);
  //     updatedPhotoURL = REFERENCE_PHOTO_URL.replace(
  //       "{NAME}",
  //       response.data.places[0].photos[0].name
  //     );
  //   }

  //   if (updatedPhotoURL) {
  //     setPhotoUrl(updatedPhotoURL);
  //   } else {
  //     console.log("No photo found");
  //   }
  // };
  
  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        place.PlaceNameSearch + " " + location
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block group">
      <div
        className=" border border-black dark:border-white overflow-hidden shadow-md hover:shadow-xl
      transition-all duration-300 transform group-hover:scale-105 group-hover:-translate-y-2 rounded-2xl">
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
        <div className="p-4 bg-gradient-to-b to-light-background from-blue-300 dark:from-green-800 dark:to-black">
          <h2 className="text-xl font-semibold text-black dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-red-400 transition-colors text-center duration-300">
            {place.PlaceName}
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-200 mb-4 line-clamp-3">
            {place.PlaceDetails}
          </p>
          <div className="space-y-2 text-sm">
            <p className="flex items-center text-gray-700 dark:text-gray-200 group-hover:text-gray-800 dark:group-hover:text-gray-300 transition-colors duration-300">
              <span className="text-lg mr-2">📍</span>
              <span className="underline underline-offset-2 line-clamp-1">
                {place.PlaceAddress}
              </span>
            </p>
            <p className="flex items-center text-gray-700 dark:text-gray-200 group-hover:text-gray-800 dark:group-hover:text-gray-300 transition-colors duration-300">
              <span className="text-lg mr-2">💲</span>
              <span>{place.TicketPricing}</span>
            </p>
            <p className="flex items-center text-gray-700 dark:text-gray-200 group-hover:text-gray-800 dark:group-hover:text-gray-300 transition-colors duration-300">
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
