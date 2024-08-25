import React from "react";
import { Link } from "react-router-dom";
import PlaceCard from "./PlaceCard";
import { Separator } from "@/components/ui/separator";

function Itinerary({ trip }) {
  return (
    <div className="my-20">
      {/*map Itinerary things here*/}
      <h1 className="my-10 text-xl font-bold">
        Itinerary 📋
        <span className="text-base font-normal text-gray-500">
          <br />
          (Click on each card for location)
        </span>
      </h1>
      <div className="">
        {trip?.tripInfo?.ItineraryDetails?.map((itinerary, index) => (
          <div key={index}>
            <h2 className="text-3xl text-gray-600 mt-10">{itinerary.Day}</h2>
            <Separator className="my-5 bg-black" />
            <h2>
              <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-7 xl:gap-10">
                {itinerary.PlacesToVisit.map((place, index) => (
                  <PlaceCard place={place} index={index} key={index}/>
                ))}
              </div>
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Itinerary;
