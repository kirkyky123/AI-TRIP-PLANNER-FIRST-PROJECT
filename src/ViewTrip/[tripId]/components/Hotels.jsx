import React from "react";
import HotelCard from "./HotelCard";
import { motion } from "framer-motion";

function Hotels({ trip }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
    >
      <h1 className="text-3xl font-bold text-white mb-2">Hotel Recommendations</h1>
      <p className="text-lg text-gray-400 mb-8">Click on the hotel card for location details</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {trip?.tripInfo?.HotelOptions?.map((hotel, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <HotelCard hotel={hotel} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default Hotels;