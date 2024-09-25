import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useUser } from "@clerk/clerk-react";
import MyTripsCard from "./MyTripsCard";
import { db } from "@/AiService/firedatabaseConfig";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";
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
import { toast } from "sonner";
import { useTheme } from "next-themes";

function MyTrips() {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);
  const { isLoaded, isSignedIn, user } = useUser();
  const {theme} = useTheme();
  const backgroundColor = theme === "light" ? "bg-light-background" : "bg-green-950";

  useEffect(() => {
    if (isLoaded) {
      if (isSignedIn) {
        getUserTrips();
      } else {
        navigate("/");
      }
    }
  }, [isLoaded, isSignedIn, user]);

  const getUserTrips = async () => {
    if (!user) return;

    const userEmail = user.primaryEmailAddress.emailAddress;
    const q = query(
      collection(db, "trips"),
      where("userEmail", "==", userEmail)
    );

    try {
      const querySnapshot = await getDocs(q);
      const trips = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserTrips(trips);
    } catch (error) {
      console.error("Error fetching user trips:", error);
    }
  };

  const removeTrip = (tripId) => {
    setUserTrips((prevTrips) => prevTrips.filter((trip) => trip.id !== tripId));
  };

  const deleteAllTrips = async () => {
    try {
      for (const trip of userTrips) {
        await deleteDoc(doc(db, "trips", trip.id));
      }
      setUserTrips([]);
      toast.success("All trips deleted successfully.");
    } catch (error) {
      console.error("Error deleting all trips:", error);
      toast.error("Failed to delete all trips. Please try again.");
    }
  };

  if (!isLoaded || !isSignedIn) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-light-background via-light-secondary to-light-primary/40 dark:from-dark-background dark:via-dark-primary/30 dark:to-dark-primary/20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-light-foreground dark:text-dark-foreground">
            My Trips
          </h1>
          {userTrips.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="p-2 bg-red-500 rounded-xl border-gray-700 border-2 text-white hover:bg-red-600 hover:scale-105 transition-transform duration-300">
                  Delete <span className="font-bold underline">All</span> Trips
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent backgroundColor={backgroundColor}>
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-2xl font-bold text-red-600">
                    Delete All Trips
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-gray-700">
                    <p className="mb-4 text-black dark:text-white">
                      Are you sure you want to delete all{" "}
                      <span className="font-bold text-blue-700 dark:text-blue-500">
                        ({userTrips.length})
                      </span>{" "}
                      of your trips? This action is{" "}
                      <span className="font-bold text-red-600 underline underline-offset-4">permanent</span>{" "}
                      and cannot be undone.
                    </p>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex justify-center">
                  <AlertDialogCancel className="bg-green-400 hover:bg-green-500 text-gray-800 mr-2 rounded-xl hover:scale-105 transition-transform duration-300">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={deleteAllTrips}
                    className="bg-red-600 hover:bg-red-700 text-white rounded-xl hover:scale-105 transition-transform duration-300 border border-black dark:hover:border-white">
                    Delete All Trips
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </motion.div>

        {userTrips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {userTrips.map((trip, index) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}>
                <MyTripsCard trip={trip} onDelete={removeTrip} />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center text-white">
            <p className="text-xl mb-4">
              You haven&apos;t created any trips yet.
            </p>
            <button
              onClick={() => navigate("/create-trip")}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full inline-flex items-center transition duration-300">
              <FaPlus className="mr-2" />
              Create Your First Trip
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default MyTrips;
