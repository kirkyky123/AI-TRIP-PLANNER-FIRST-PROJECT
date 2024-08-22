/* eslint-disable react/prop-types */
import { placeDetails, REFERENCE_PHOTO_URL } from "@/AiService/API";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function PlaceCard({ place, index }) {
  const [photoUrl, setPhotoUrl] = useState("");

  // useEffect(() => {
  //   if (place) {
  //     getPhoto();
  //   }
  // }, [place]);

  // const getPhoto = async () => {
  //   const data = {
  //     textQuery: place?.PlaceName,
  //   };

  //   const res = await placeDetails(data).then((response) => {
  //     const updatedPhotoURL = REFERENCE_PHOTO_URL.replace(
  //       "{NAME}",
  //       response.data.places[0].photos[1].name
  //     );
  //     setPhotoUrl(updatedPhotoURL);
  //   });
  // };

  return (
    <div className="">
      <h2 className="text-red-500 my-3 pl-2 text-lg">
        ⏱️ <span className="underline">{place.BestTimeToVisit}</span>
      </h2>
      <Link
        to={
          "https://www.google.com/maps/search/?api=1&query=" +
          place.PlaceNameSearch +
          " " +
          place.PlaceAddress
        }
        target="_blank">
        <div>
          <div
            className="border-gray-500 border rounded-l-xl bg-orange-100/[.1] 
                        hover:shadow-xl hover:shadow-gray-500 cursor-pointer hover:border-black hover:scale-105 
                        transition-all flex flex-col sm:flex-row xl:flex-col min-w-80 relative text-xs sm:text-sm 
                        lg:text-base items-center sm:items-start xl:items-center">
            <img
              src={photoUrl ? photoUrl : "/banner2.jpg"}
              className="
              justify-center items-center
              rounded-xl
              w-[160px] h-[160px]
              sm:w-[180px] sm:h-[180px]
              md:w-[200px] md:h-[200px]
              lg:w-[250px] lg:h-[250px]
              xl:w-[275px] xl:h-[275px]
              object-cover
              m-5"
            />
            <div className="flex flex-col gap-3 lg:gap-4 md:gap-4 w-full ">
                <h2 className="absolute bottom-1 right-3 text-end mr-1 text-sm text-gray-500 font-bold">
                  {index + 1}
                </h2>
                <h2
                  className="mr-4 ml-4 mt-4 text-center font-bold flex justify-center 
              text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl
              ">
                  {place.PlaceName}
                </h2>
                <h2 className="text-gray-700 px-4 tracking-tight mx-0">
                  {place.PlaceDetails}
                </h2>
                <h2 className="px-4 text-gray-500/80">
                <span className="text-lg sm:text-xl">📍 </span>
                  <span
                    className="underline underline-offset-2 
                text-xs
                sm:text-xs
                md:text-sm
                lg:text-sm
                xl:text-sm
                2xl:text-base">
                    {place.PlaceAddress}
                  </span>
                </h2>
                <h2 className="px-4">
                <span className="text-lg sm:text-xl">💲 </span>
                  <span className="text-gray-700">
                    {place.TicketPricing != "N/A"
                      ? place.TicketPricing
                      : "Free"}
                  </span>
                </h2>
                <h2 className="px-4 pb-2">
                  <span className="text-lg sm:text-xl">🚕 </span><span className="text-gray-700">{index != 0 ? place.TravelTime : "(Depends on hotel location)"}</span>
                </h2>
              </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default PlaceCard;
