import React from "react";
import HotelCard from "./HotelCard";
import { motion } from "framer-motion";

function Hotels({ trip }) {
  const location = trip?.userChoices?.location?.label;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-light-foreground dark:text-dark-foreground mb-2">
        Hotels
      </h1>
      <p className="text-lg text-light-foreground/70 dark:text-dark-foreground/70 mb-8">
        Click on the hotel cards for location details
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {trip?.tripInfo?.HotelOptions?.map((hotel, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}>
            <HotelCard hotel={hotel} location={location} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default Hotels;
