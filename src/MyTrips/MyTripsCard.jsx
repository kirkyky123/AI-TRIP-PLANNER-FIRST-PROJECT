import { placeDetails, REFERENCE_PHOTO_URL } from "@/AiService/API";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MyTripsCard({ trip }) {
  const [photoUrl, setPhotoUrl] = useState("");

  // useEffect(() => {
  //   if (trip) {
  //     getPhoto();
  //   }
  // }, [trip]);
  // const getPhoto = async () => {
  //   const data = {
  //     textQuery: trip?.userChoices?.location?.label
  //   };

  //   const res = await placeDetails(data).then((response) => {
  //     console.log(response.data.places[0].photos[3].name);
  //     const updatedPhotoURL = REFERENCE_PHOTO_URL.replace("{NAME}", response.data.places[0].photos[5].name);
  //     console.log(updatedPhotoURL);
  //     setPhotoUrl(updatedPhotoURL);
  //   })
  // };

  return (
    <div className="border-gray-500 border rounded-t-xl bg-orange-100/[.1] 
                hover:shadow-xl hover:shadow-gray-500 cursor-pointer hover:border-black hover:scale-105 
                transition-all flex flex-col w-full mb-10">
      <Link to={"/view-trip/" + trip?.id}>
        <img
          src={photoUrl ? photoUrl : "/banner2.jpg"}
          className="
              object-cover
              h-[200px]
              w-full
              rounded-t-xl"
        />
        <h2 className="font-bold text-xl text-center my-5">
          {trip?.userChoices?.location?.label.split(",")[0]}
        </h2>
        <div className="flex justify-center gap-5 text-gray-700 font-extrabold text-[12px] sm:text-sm md:text-xs lg:text-xs xl:text-base text-center mx-5 mb-5 items-center">
          <h2 className="p-2 px-4 bg-gray-200/90 rounded-full">
            <span className="text-sm"> 📆 </span> {trip?.userChoices?.days} Day
            Trip
          </h2>
          <h2 className="p-2 px-4 bg-gray-200/90 rounded-full">
            <span className="text-sm">{trip?.userChoices?.budgetImg}</span>{" "}
            {trip?.userChoices?.budget} Budget
          </h2>
          <h2 className="p-2 px-4 bg-gray-200/90 rounded-full">
            <span className="text-sm">{trip?.userChoices?.peopleImg}</span>{" "}
            {trip?.userChoices?.people}
          </h2>
        </div>
      </Link>
    </div>
  );
}

export default MyTripsCard;
