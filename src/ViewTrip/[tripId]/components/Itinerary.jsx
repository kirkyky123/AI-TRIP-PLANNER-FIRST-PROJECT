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
      <h1 className="text-3xl font-bold text-white mb-2">Your Trip Itinerary</h1>
      <p className="text-lg text-gray-400 mb-8">Click on each location for more details</p>
      <div className="space-y-8">
        {trip?.tripInfo?.ItineraryDetails?.map((itinerary, index) => (
          <div key={index} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"> 
            <button
              onClick={() => toggleDay(itinerary.Day)}
              className="w-full flex items-center justify-between p-6 text-left focus:outline-none hover:bg-gray-700 transition-colors duration-300"
            >
              <h2 className="text-2xl font-semibold text-white">{itinerary.Day}</h2>
              <ChevronDown
                className={`w-6 h-6 text-white transition-transform duration-300 ${
                  expandedDays[itinerary.Day] ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence>
              {expandedDays[itinerary.Day] && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <Separator className="bg-gray-700" />
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {itinerary.PlacesToVisit.map((place, placeIndex) => (
                        <ItineraryCard place={place} index={placeIndex} key={placeIndex} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}