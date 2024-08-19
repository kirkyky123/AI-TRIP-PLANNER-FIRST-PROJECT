import React, { useEffect, useState } from "react";
import { IoTrashBinSharp } from "react-icons/io5";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/AiService/firedatabaseConfig";
import { toast } from "sonner";
import { placeDetails, REFERENCE_PHOTO_URL } from "@/AiService/API";

function MyTripsCard({ trip, onDelete }) {
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

  const deleteTripById = async (collectionName, tripId) => {
    try {
      const docRef = doc(db, collectionName, tripId);
      await deleteDoc(docRef);
      console.log("Document successfully deleted!");
      onDelete(tripId);
      toast("Trip deleted successfully!");
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <div
      className="border-gray-500 border rounded-t-xl bg-orange-100/[.1] 
                hover:shadow-xl hover:shadow-gray-500 hover:border-black hover:scale-105 
                transition-all flex flex-col w-full mb-10 relative">
      <a href={"/view-trip/" + trip?.id}>
        <img
          src={photoUrl ? photoUrl : "/banner2.jpg"}
          className="object-cover h-[200px] w-full rounded-t-xl relative"
        />
      </a>
      <div className="flex justify-end mt-1 mr-1">
        <AlertDialog className="flex flex-col">
          <AlertDialogTrigger asChild>
            <IoTrashBinSharp className="size-5 mr-1 mt-1 hover:text-red-500 hover:cursor-pointer hover:scale-125" />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="mb-5 font-medium">
                Are you sure you want to{" "}
                <span className="underline underline-offset-2 font-bold text-red-800">
                  PERMANENTLY
                </span>{" "}
                delete this trip:
              </AlertDialogTitle>
              <AlertDialogDescription className="text-sm font-semibold">
                <ul className="grid grid-cols-1 gap-5 text-base">
                  <li className="font-bold text-black">
                    {trip?.userChoices?.location?.label.split(",")[0]}
                  </li>
                  <li>📆 {trip?.userChoices?.days} day trip</li>
                  <li>
                    {trip?.userChoices?.budgetImg} {trip?.userChoices?.budget}{" "}
                    budget
                  </li>
                  <li>
                    {trip?.userChoices?.peopleImg} {trip?.userChoices?.people}{" "}
                    {trip?.userChoices?.amount}
                  </li>
                </ul>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-5">
              <AlertDialogCancel className="font-bold bg-green-500 hover:bg-green-600 text-white hover:text-white">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deleteTripById("trips", trip?.id)}
                className="bg-red-500 hover:bg-red-600 font-bold">
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <h2 className="font-bold text-xl text-center my-5 cursor-default relative">
        {trip?.userChoices?.location?.label.split(",")[0]}
      </h2>
      <div className="flex justify-center gap-5 text-gray-700 font-extrabold text-[12px] sm:text-sm md:text-xs lg:text-xs xl:text-base text-center mx-5 mb-5 items-center">
        <h2 className="p-2 px-4 bg-gray-200/90 rounded-full">
          <span className="text-sm"> 📆 </span> {trip?.userChoices?.days} Day
          Trip
        </h2>
        <h2 className="p-2 px-4 bg-gray-200/90 rounded-full">
          <span className="text-sm">{trip?.userChoices?.budgetImg}</span>{" "}
          {trip?.userChoices?.budget}
        </h2>
        <h2 className="p-2 px-4 bg-gray-200/90 rounded-full">
          <span className="text-sm">{trip?.userChoices?.peopleImg}</span>{" "}
          {trip?.userChoices?.people}
        </h2>
      </div>
    </div>
  );
}

export default MyTripsCard;
