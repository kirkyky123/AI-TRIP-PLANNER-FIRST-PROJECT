import React, { useState } from "react";
import { Link } from "react-router-dom";

function HotelCard({ hotel }) {
  const [photoUrl, setPhotoUrl] = useState("");

  // useEffect(() => {
  //   if (hotel) {
  //     getPhoto();
  //   }
  // }, [hotel]);
  // const getPhoto = async () => {
  //   const data = {
  //     textQuery: hotel?.HotelName
  //   };

  //   const res = await placeDetails(data).then((response) => {
  //     console.log(response.data.places[0].photos[3].name);
  //     const updatedPhotoURL = REFERENCE_PHOTO_URL.replace("{NAME}", response.data.places[0].photos[0].name);
  //     console.log(updatedPhotoURL);
  //     setPhotoUrl(updatedPhotoURL);
  //   })
  // };

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.HotelName + " " + hotel.HotelAddress)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block">
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
        <div className="relative">
          <img
            src={photoUrl ? photoUrl : "/banner2.jpg"}
            alt={hotel.HotelName}
            className="w-full h-64 object-cover"
          />
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            ⭐ {hotel.Rating}
          </div>
        </div>
        <div className="p-6">
          <h2 className="text-xl font-semibold text-white mb-3 line-clamp-2">{hotel.HotelName}</h2>
          <p className="text-md text-gray-300 mb-4 flex items-center">
            <span className="text-xl mr-2">📍</span>
            <span className="underline underline-offset-2 line-clamp-2">{hotel.HotelAddress}</span>
          </p>
          <div className="flex justify-between items-center">
            <span className="text-xl font-medium text-green-400 tracking-wide">💵 {hotel.Price}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default HotelCard;
