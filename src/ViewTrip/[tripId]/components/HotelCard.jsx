import { placeDetails, REFERENCE_PHOTO_URL } from "@/AiService/API";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HotelCard({ hotel }) {
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    if (hotel) {
      getPhoto();
    }
  }, [hotel]);
  const getPhoto = async () => {
    const data = {
      textQuery: hotel?.HotelName
    };

    const res = await placeDetails(data).then((response) => {
      console.log(response.data.places[0].photos[3].name);
      const updatedPhotoURL = REFERENCE_PHOTO_URL.replace("{NAME}", response.data.places[0].photos[0].name);
      console.log(updatedPhotoURL);
      setPhotoUrl(updatedPhotoURL);
    })
  };

  return (
    <Link
      to={
        "https://www.google.com/maps/search/?api=1&query=" +" " + hotel.HotelName + " " + hotel.HotelAddress}
      target="_blank">
      <div
        className="border-gray-500 border rounded-t-3xl bg-orange-100/[.1]
      hover:shadow-xl hover:shadow-gray-500 cursor-pointer hover:border-black hover:scale-105
      transition-all">
        <img
          src={photoUrl ? photoUrl : "/banner2.jpg"}
          className="rounded-t-3xl h-[400px] w-full object-cover"
        />
        <div className="my-4 mx-4 flex flex-col gap-2">
          <h2 className="text-md text-center font-semibold md:min-h-12 lg:min-h-12 xl:min-h-0">
            {hotel.HotelName}
          </h2>
          <h2 className="text-xs font-extralight md:min-h-12 lg:min-h-12 xl:min-h-0">
            <span className="text-lg">📍</span>{" "}
            <span className="underline underline-offset-4">
              {hotel.HotelAddress}
            </span>
          </h2>
          <h2 className="text-s font-medium">💵 {hotel.Price}</h2>
          <h2>⭐ {hotel.Rating} stars</h2>
        </div>
      </div>
    </Link>
  );
}

export default HotelCard;
