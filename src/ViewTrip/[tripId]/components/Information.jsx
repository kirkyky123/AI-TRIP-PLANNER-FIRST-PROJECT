import { placeDetails, REFERENCE_PHOTO_URL } from "@/AiService/API";
import { Button } from "@/components/ui/button";
import { selectBudget } from "@/constants/options";
import React, { useEffect, useState } from "react";
import { FaShare } from "react-icons/fa";

function InformationSection({ trip }) {

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
    <div>
      <img
         src={photoUrl?photoUrl:"/banner2.jpg"}
        alt="trip-banner"
        className="w-full h-48 object-cover rounded-xl"
      />
      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-5 ">
          <h2 className="font-bold text-lg sm:text-xl md:text-2xl xl:text-3xl">
            {trip?.userChoices?.location?.label}
          </h2>
          <div className="flex gap-5">
            <h2 className="p-2 px-4 bg-gray-200/90 rounded-full text-gray-700 font-extrabold text-[12px] sm:text-sm md:text-md lg:text-lg text-center">
              <span className="text-lg"> 📆 </span> {trip?.userChoices?.days}{" "}
              Day Trip
            </h2>
            <h2 className="p-2 px-4 bg-gray-200/90 rounded-full text-gray-700 font-extrabold text-[12px] sm:text-sm md:text-md lg:text-lg text-center">
              <span className="text-xl">{trip?.userChoices?.budgetImg}</span>{" "}
              {trip?.userChoices?.budget} Budget
            </h2>
            <h2 className="p-2 px-4 bg-gray-200/90 rounded-full text-gray-700 font-extrabold text-[12px] sm:text-sm md:text-md lg:text-lg text-center">
              <span className="text-xl">{trip?.userChoices?.peopleImg}</span>{" "}
              {trip?.userChoices?.people}
            </h2>
          </div>
        </div>
        <Button
          className="bg-white border border-transparent hover:border-black hover:border
        hover:bg-slate-100 hover:bg-gradient-to-tr from-orange-200 to-green-300 hover:shadow-black hover:shadow-sm
          hover:scale-105">
          <FaShare className="text-black text-xl" />
        </Button>
      </div>
    </div>
  );
}

export default InformationSection;
