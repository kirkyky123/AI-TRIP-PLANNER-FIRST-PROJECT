import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { placeDetails, REFERENCE_PHOTO_URL } from "@/AiService/API";
import { EnablePhotosContext } from "..";

function HotelCard({ hotel, location }) {
  const [photoUrl, setPhotoUrl] = useState("");
  const enabledPhotos = useContext(EnablePhotosContext);

  // Effect to fetch hotel photo when component mounts or when enabledPhotos changes
  useEffect(() => {
    if (hotel && enabledPhotos) {
      getHotelPhoto();
    }
    if (!enabledPhotos) {
      setPhotoUrl("/banner2.jpg");
    }
  }, [hotel, enabledPhotos]);

  const getHotelPhoto = async () => {
    if (!enabledPhotos) return;

    // Helper function to try a photo at a given index.
    const tryPhotoAtIndex = async (photos, index) => {
      if (index >= photos.length) {
        return null;
      }
      const photo = photos[index];
      if (!photo?.name) {
        return tryPhotoAtIndex(photos, index + 1);
      }
      try {
        const updatedPhotoURL = REFERENCE_PHOTO_URL.replace(
          "{NAME}",
          photo.name
        );
        return updatedPhotoURL;
      } catch (err) {
        console.error(`Error using hotel photo at index ${index}:`, err);
        return tryPhotoAtIndex(photos, index + 1);
      }
    };

    try {
      // First attempt using just the HotelName
      let data = { textQuery: hotel?.HotelName };
      let response = await placeDetails(data);
      let photos = response.data.places[0]?.photos || [];
      let updatedPhotoURL = await tryPhotoAtIndex(photos, 0);

      // If no valid photo was found, try again with HotelName and HotelAddress.
      if (!updatedPhotoURL) {
        data = { textQuery: `${hotel?.HotelName} ${hotel?.HotelAddress}` };
        response = await placeDetails(data);
        photos = response.data.places[0]?.photos || [];
        updatedPhotoURL = await tryPhotoAtIndex(photos, 0);
      }

      if (updatedPhotoURL) {
        setPhotoUrl(updatedPhotoURL);
      } else {
        console.log("No hotel photo found");
        setPhotoUrl("/banner2.jpg");
      }
    } catch (error) {
      console.error("Error fetching hotel photo:", error);
      setPhotoUrl("/banner2.jpg");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}>
      <Link
        to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          hotel.HotelName + " " + location
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
            <p className="text-md text-gray-700 dark:text-gray-300 mb-4 flex items-center">
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
