import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function HotelCard({ hotel, location }) {
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    hotel.HotelName + " " + location
  )}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}>
      <Link
        to={mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block">
        <div
          className="bg-gradient-to-b to-light-background from-blue-300 dark:from-gray-700 dark:to-gray-900
         overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-t-2xl">
          <div className="relative">
            <img
              src="/banner2.jpg"
              alt={hotel.HotelName}
              className="w-full h-64 object-cover"
            />
            <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              ⭐ {hotel.Rating}
            </div>
          </div>
          <div className="p-6">
            <h2 className="text-xl font-semibold text-black dark:text-white mb-3 line-clamp-2">
              {hotel.HotelName}
            </h2>
            <p className="text-md text-gray-700 dark:text-gray-300 mb-4 flex items-center">
              <span className="text-xl mr-2">📍</span>
              <span className="text-sm underline underline-offset-2 line-clamp-2">
                {hotel.HotelAddress}
              </span>
            </p>
            <div className="flex justify-between items-center">
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
