import React, { useState, useEffect } from "react";
import ItineraryCard from "./ItineraryCard";
import { Separator } from "@/components/ui/separator";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function Itinerary({ trip }) {
  const [expandedDays, setExpandedDays] = useState({});

  useEffect(() => {
    if (trip?.tripInfo?.ItineraryDetails) {
      const initialExpandedState = {};
      trip.tripInfo.ItineraryDetails.forEach((itinerary) => {
        initialExpandedState[itinerary.Day] = true;
      });
      setExpandedDays(initialExpandedState);
    }
  }, [trip]);

  const toggleDay = (day) => {
    setExpandedDays((prev) => ({ ...prev, [day]: !prev[day] }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-light-foreground dark:text-dark-foreground mb-2">
        Your Trip Itinerary
      </h1>
      <p className="text-lg text-light-foreground/70 dark:text-dark-foreground/70 mb-8">
        Click on each location for more details
      </p>
      <div className="space-y-8">
        {trip?.tripInfo?.ItineraryDetails?.map((itinerary, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gradient-to-b from-light-background to-light-secondary dark:from-gray-500 dark:to-dark-background border border-black dark:border-white rounded-lg overflow-hidden shadow-lg">
            <button
              onClick={() => toggleDay(itinerary.Day)}
              className="w-full flex items-center justify-between p-6 text-left focus:outline-none hover:bg-orange-100 dark:hover:bg-gray-700 transition-colors duration-300">
              <h2 className="text-2xl font-semibold text-black dark:text-white">
                {itinerary.Day}
              </h2>
              <ChevronDown
                className={`w-6 h-6 text-white transition-transform duration-300 ${
                  expandedDays[itinerary.Day] ? "rotate-180" : ""
                }`}
              />
            </button>
            {expandedDays[itinerary.Day] && (
              <div>
                <Separator className="bg-gradient-to-b from-gray-700 to-gray-900" />
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {itinerary.PlacesToVisit.map((place, placeIndex) => (
                      <motion.div
                        key={placeIndex}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 0.5, delay: placeIndex * 0.1 }}>
                        <ItineraryCard
                          place={place}
                          index={placeIndex}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
