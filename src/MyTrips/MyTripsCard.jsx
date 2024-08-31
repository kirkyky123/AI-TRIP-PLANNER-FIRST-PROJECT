import React from "react";
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

function MyTripsCard({ trip, onDelete, totalTrips, onDeleteAll }) {
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

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative">
        <img
          src={trip?.userChoices?.location?.photoUrl || "/banner2.jpg"}
          alt={trip?.userChoices?.location?.label}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-0 right-0 p-2 flex space-x-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition duration-300">
                <IoTrashBinSharp size={18} />
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="text-2xl font-bold text-red-600">
                  Delete Trip
                </AlertDialogTitle>
                <AlertDialogDescription className="text-gray-700">
                  <p className="mb-4">
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
                        <span>{trip?.userChoices?.days} day trip</span>
                      </li>
                      <li className="flex items-center">
                        <h2 className="text-lg -ml-1 mr-1">{trip?.userChoices?.budgetImg}</h2>
                        <span>{trip?.userChoices?.budget} budget</span>
                      </li>
                      <li className="flex items-center">
                        <h2 className="text-lg -ml-1 mr-1">{trip?.userChoices?.peopleImg}</h2>
                        <span>{trip?.userChoices?.people}</span>
                      </li>
                    </ul>
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex justify-center">
                <AlertDialogCancel className="bg-green-400 hover:bg-green-500 text-gray-800 mr-2">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => deleteTripById("trips", trip?.id)}
                  className="bg-red-600 hover:bg-red-700 text-white">
                  Delete Permanently
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">
          {trip?.userChoices?.location?.label?.split(",")[0]}
        </h2>
        <div className="space-y-2 font-semibold text-gray-700">
          <div className="flex items-center">
            <FaCalendarAlt className="mr-2 text-blue-500" />
            <span>{trip?.userChoices?.days} day trip</span>
          </div>
          <div className="flex items-center">
            <h2 className="text-lg -ml-1 mr-1">{trip?.userChoices?.budgetImg}</h2>
            <span>{trip?.userChoices?.budget} budget</span>
          </div>
          <div className="flex items-center">
            <h2 className="text-lg -ml-1 mr-1">{trip?.userChoices?.peopleImg}</h2>
            <span>{trip?.userChoices?.people}</span>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 px-4 py-3">
        <a
          href={`/view-trip/${trip?.id}`}
          className="block w-full text-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300">
          View Trip Details
        </a>
      </div>
    </motion.div>
  );
}

export default MyTripsCard;
