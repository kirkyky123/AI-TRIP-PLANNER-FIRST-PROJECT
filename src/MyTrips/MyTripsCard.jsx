import React, { useEffect, useState } from "react";
import { IoTrashBinSharp } from "react-icons/io5";
import { FaCalendarAlt, FaMoneyBillWave, FaUsers } from "react-icons/fa";
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
import { motion } from "framer-motion";
import { placeDetails, REFERENCE_PHOTO_URL } from "@/AiService/API";
import { Link } from "react-router-dom";

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
  //     const updatedPhotoURL = REFERENCE_PHOTO_URL.replace("{NAME}", response.data.places[0].photos[0].name);
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
      toast("Trip deleted successfully.");
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const formatDateRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const options = { month: "short", day: "numeric", year: "2-digit" };

    if (
      start.getMonth() === end.getMonth() &&
      start.getFullYear() === end.getFullYear()
    ) {
      return `${start.toLocaleDateString("en-US", {
        month: "short",
      })} ${start.getDate()}${getOrdinalSuffix(
        start.getDate()
      )} - ${end.getDate()}${getOrdinalSuffix(end.getDate())}, ${start
        .getFullYear()
        .toString()
        .slice(-2)}`;
    } else {
      return `${start.toLocaleDateString(
        "en-US",
        options
      )} - ${end.toLocaleDateString("en-US", options)}`;
    }
  };

  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-gradient-to-b from-light-background to-light-secondary dark:from-gray-700 dark:to-gray-900 overflow-hidden hover:shadow-white dark:hover:shadow-gray-400 hover:shadow-lg 
      border-black dark:border-white border transition-all duration-300 transform group-hover:scale-105 group-hover:-translate-y-2 rounded-t-2xl">
      <div className="relative">
        <img
          src={photoUrl ? photoUrl : "/banner2.jpg"}
          alt={trip?.userChoices?.location?.label}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-150"
        />
        <div className="absolute top-2 right-2 flex space-x-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="p-2 bg-red-500 rounded-full text-white hover:bg-red-600 hover:scale-110 transition duration-300">
                <IoTrashBinSharp size={18}/>
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="text-2xl font-bold text-red-600">
                  Delete Trip
                </AlertDialogTitle>
                <AlertDialogDescription className="text-gray-700">
                  <p className="mb-4 text-black dark:text-white">
                    Are you sure you want to delete this trip? This action is{" "}
                    <span className="font-bold text-red-600">permanent</span>{" "}
                    and cannot be undone.
                  </p>
                  <div className="bg-gray-100 border border-gray-400 rounded-md p-4">
                    <ul className="space-y-2 font-semibold">
                      <li className="flex items-center">
                        <span className="text-xl font-bold">
                          {trip?.userChoices?.location?.label?.split(",")[0]}
                        </span>
                      </li>
                      <li className="flex items-center">
                        <FaCalendarAlt className="mr-2 text-blue-500 text-lg" />
                        <span>
                          {trip?.userChoices?.days} day trip{" "}
                          <span className="text-blue-600 dark:text-orange-700 underline">
                            (
                            {formatDateRange(
                              trip?.userChoices?.startDate,
                              trip?.userChoices?.endDate
                            )}
                            )
                          </span>
                        </span>
                      </li>
                      <li className="flex items-center">
                        <h2 className="text-lg -ml-1 mr-1">
                          {trip?.userChoices?.budgetImg}
                        </h2>
                        <span>{trip?.userChoices?.budget} budget</span>
                      </li>
                      <li className="flex items-center">
                        <h2 className="text-lg -ml-1 mr-1">
                          {trip?.userChoices?.peopleImg}
                        </h2>
                        <span>{trip?.userChoices?.people}</span>
                      </li>
                    </ul>
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex justify-center">
                <AlertDialogCancel className="bg-green-400 hover:bg-green-500 text-gray-800 mr-2 rounded-xl">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => deleteTripById("trips", trip?.id)}
                  className="bg-red-600 hover:bg-red-700 text-white rounded-xl">
                  Delete Permanently
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white group-hover:text-green-400 transition-colors duration-300">
          {trip?.userChoices?.location?.label?.split(",")[0]}
        </h2>
        <div className="space-y-2 font-semibold text-gray-800 dark:text-gray-300">
          <div className="flex items-center">
            <FaCalendarAlt className="mr-2 text-blue-500" />
            <span>
              {trip?.userChoices?.days} day trip{" "}
              <span className="text-blue-600 dark:text-orange-700 underline">
                (
                {formatDateRange(
                  trip?.userChoices?.startDate,
                  trip?.userChoices?.endDate
                )}
                )
              </span>
            </span>
          </div>
          <div className="flex items-center">
            <h2 className="text-lg -ml-1 mr-1">
              {trip?.userChoices?.budgetImg}
            </h2>
            <span>{trip?.userChoices?.budget} budget</span>
          </div>
          <div className="flex items-center">
            <h2 className="text-lg -ml-1 mr-1">
              {trip?.userChoices?.peopleImg}
            </h2>
            <span>{trip?.userChoices?.people}</span>
          </div>
        </div>
      </div>
      <div className="px-4 py-3">
        <Link
          to={`/view-trip/${trip?.id}`}
          className="block w-full text-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300">
          View Trip Details
        </Link>
      </div>
    </motion.div>
  );
}

export default MyTripsCard;
