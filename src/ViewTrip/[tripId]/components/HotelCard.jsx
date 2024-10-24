/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { placeDetails, REFERENCE_PHOTO_URL } from "@/AiService/API";
import { EnablePhotosContext } from "..";

function HotelCard({ hotel }) {
  const [photoUrl, setPhotoUrl] = useState("");
  const enabledPhotos = useContext(EnablePhotosContext);

  // Effect to fetch hotel photo when component mounts or when enabledPhotos changes
  useEffect(() => {
    if (hotel && enabledPhotos) {
      getPhoto();
    }
    if (!enabledPhotos) {
      setPhotoUrl("/banner2.jpg");
    }
  }, [hotel, enabledPhotos]);

  // Function to fetch hotel photo from API
  const getPhoto = async () => {
    if (!enabledPhotos) return;
    const data = {
      textQuery: hotel?.HotelName,
    };

    const res = await placeDetails(data).then((response) => {
      console.log(response.data.places[0].photos[3].name);
      const updatedPhotoURL = REFERENCE_PHOTO_URL.replace(
        "{NAME}",
        response.data.places[0].photos[0].name
      );
      console.log(updatedPhotoURL);
      setPhotoUrl(updatedPhotoURL);
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}>
      <Link
        to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          hotel.HotelName + " " + hotel.HotelAddress
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block">
        <div
          className="bg-gradient-to-b to-light-background from-blue-300 dark:from-gray-700 dark:to-gray-900
         overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-t-2xl">
          <div className="relative">
            {/* Hotel image */}
            <img
              src={photoUrl ? photoUrl : "/banner2.jpg"}
              alt={hotel.HotelName}
              className="w-full h-64 object-cover"
            />
            {/* Hotel rating */}
            <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              ⭐ {hotel.Rating}
            </div>
          </div>
          <div className="p-6">
            {/* Hotel name */}
            <h2 className="text-xl font-semibold text-black dark:text-white mb-3 line-clamp-2">
              {hotel.HotelName}
            </h2>
            {/* Hotel address */}
            <p className="text-md text-gray-500 dark:text-gray-300 mb-4 flex items-center">
              <span className="text-xl mr-2">📍</span>
              <span className="text-sm underline underline-offset-2 line-clamp-2">
                {hotel.HotelAddress}
              </span>
            </p>
            <div className="flex justify-between items-center">
              {/* Hotel price */}
              <span className="text-md font-medium text-green-700 dark:text-green-400 tracking-wide">
                💵 {hotel.Price}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default HotelCard;
