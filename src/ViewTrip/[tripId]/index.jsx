import { db } from "@/AiService/firedatabaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { createContext, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import InformationSection from "./components/Information";
import Hotels from "./components/Hotels";
import Itinerary from "./components/Itinerary";
import Summary from "./components/Summary";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";

// Create contexts for managing photo enablement and dialog states
export const EnablePhotosContext = createContext();
export const OpenDialogContext = createContext();
export const DisablePhotoDialogContext = createContext();

function ViewTrip() {
  // Set up theme and state variables
  const { theme } = useTheme();
  const backgroundColor =
    theme === "light" ? "bg-light-background" : "bg-green-950";
  const [trip, setTrip] = useState([]);
  const { tripId } = useParams();
  const [enabledPhotos, setEnabledPhotos] = useState(false);
  const passwordInputRef = useRef(null);
  const [openDialog, setOpenDialog] = useState(true);
  const [disablePhotoDialog, setDisablePhotoDialog] = useState(false);

  // Fetch trip data when component mounts or tripId changes
  useEffect(() => {
    if (tripId) {
      getTripData();
    }
  }, [tripId]);

  // Function to fetch trip data from Firestore
  const getTripData = async () => {
    const documentReference = doc(db, "trips", tripId);
    const documentSnapshot = await getDoc(documentReference);

    if (documentSnapshot.exists) {
      setTrip(documentSnapshot.data());
    } else {
      toast.warning("No trip found");
    }
  };

  // Function to enable photos with password verification
  const enablePhotos = () => {
    const password = passwordInputRef.current.value;
    if (password === import.meta.env.VITE_PASSWORD_KEY) {
      setEnabledPhotos(true);
      setOpenDialog(false);
      // toast.error(
      //   "Images currently disabled. Please contact me if you require them."
      // );
    } else {
      toast.error("Incorrect password.");
    }
  };

  // Function to disable photos
  const disablePhotos = () => {
    setEnabledPhotos(false);
    setDisablePhotoDialog(false);
  };

  return (
    <>
      <AlertDialog open={openDialog}>
        <AlertDialogContent backgroundColor={backgroundColor}>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-bold">
              Interested in hiring me?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-700">
              <p className="mb-4 text-black dark:text-white">
                If so, please enter your
                <span className="text-green-500 font-bold"> password </span>
                to enable images for a much better experience.
              </p>
              <div className="flex flex-row gap-4 items-center">
                <Label
                  htmlFor="password"
                  className="text-right text-black dark:text-white">
                  Password
                </Label>
                <Input
                  id="password"
                  ref={passwordInputRef}
                  defaultValue=""
                  className="text-black dark:text-white border-gray-500 w-20 h-8"
                />
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex justify-center">
            <AlertDialogCancel
              className="bg-red-400 hover:bg-red-500 text-white rounded-xl hover:scale-105 transition-transform duration-300 border border-black dark:hover:border-white"
              onClick={() => setOpenDialog(false)}>
              Not a recruiter
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={enablePhotos}
              className="bg-green-500 hover:bg-green-600 text-gray-800 mr-2 rounded-xl hover:scale-105 transition-transform duration-300 border border-black dark:hover:border-white">
              Submit
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={disablePhotoDialog}>
        <AlertDialogContent backgroundColor={backgroundColor}>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-bold justify-center items-center flex">
              Disable Photos
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex justify-center items-center mx-auto">
            <AlertDialogCancel
              className="bg-green-500 hover:bg-green-600 text-gray-800 mr-2 rounded-xl hover:scale-105 transition-transform duration-300 border border-black dark:hover:border-white"
              onClick={() => setDisablePhotoDialog(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={disablePhotos}
              className="bg-red-400 hover:bg-red-500 text-white rounded-xl hover:scale-105 transition-transform duration-300 border border-black dark:hover:border-white">
              Disable Photos
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div
        className="py-10 px-10 sm:px-12 md:px-18 lg:px-30 xl:px-42 bg-gradient-to-br from-light-background via-light-secondary to-light-primary/40 
    dark:from-dark-background/20 dark:via-dark-primary/30 dark:to-dark-secondary/20">
        <OpenDialogContext.Provider value={[setOpenDialog]}>
          <EnablePhotosContext.Provider value={enabledPhotos}>
            <DisablePhotoDialogContext.Provider value={[setDisablePhotoDialog]}>
              <InformationSection trip={trip} />
              <div className="mx-2">
                <Hotels trip={trip} />
              </div>
              <Itinerary trip={trip} />
              <Summary trip={trip} />
            </DisablePhotoDialogContext.Provider>
          </EnablePhotosContext.Provider>
        </OpenDialogContext.Provider>
      </div>
    </>
  );
}

export default ViewTrip;
