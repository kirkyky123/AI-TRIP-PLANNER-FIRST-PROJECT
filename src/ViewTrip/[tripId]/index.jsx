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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";

export const EnablePhotosContext = createContext();
export const OpenDialogContext = createContext();
export const DisablePhotoDialogContext = createContext();
function ViewTrip() {
  const { theme } = useTheme();
  const backgroundColor =
    theme === "light" ? "bg-light-background" : "bg-green-950";
  const [trip, setTrip] = useState([]);
  const { tripId } = useParams();
  const [enabledPhotos, setEnabledPhotos] = useState(false);
  const passwordInputRef = useRef(null);
  const [openDialog, setOpenDialog] = useState(true);
  const [disablePhotoDialog, setDisablePhotoDialog] = useState(false);

  useEffect(() => {
    if (tripId) {
      getTripData();
    }
  }, [tripId]);

  const getTripData = async () => {
    const documentReference = doc(db, "trips", tripId);
    const documentSnapshot = await getDoc(documentReference);

    if (documentSnapshot.exists) {
      console.log("Document: ", documentSnapshot.data());
      setTrip(documentSnapshot.data());
    } else {
      console.log("No such document");
      toast.warning("No trip found");
    }
  };

  const enablePhotos = () => {
    const password = passwordInputRef.current.value;
    if (password === "0831") {
      console.log("Enabled photos before enabling: ", enabledPhotos);
      setEnabledPhotos(true);
      console.log("Enabled photos after enabling: ", enabledPhotos);
      setOpenDialog(false);
    } else {
      toast.error("Incorrect password");
    }
  };

  const disablePhotos = () => {
    console.log("Disabling photos. Current state:", enabledPhotos);
    setEnabledPhotos(false);
    setDisablePhotoDialog(false);
    console.log("Photos disabled. New state:", false);
  };

  useEffect(() => {
    console.log("enabledPhotos state updated:", enabledPhotos);
  }, [enabledPhotos]);

  return (
    <>
      <AlertDialog open={openDialog}>
        <AlertDialogContent backgroundColor={backgroundColor}>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-bold">
              Are you a recruiter?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-700">
              <p className="mb-4 text-black dark:text-white">
                If so, please enter your
                <span className="text-green-500 font-bold"> password </span>
                to enable photos.
              </p>
              <div className="flex flex-row gap-4 items-center">
                <Label htmlFor="password" className="text-right text-white">
                  Password
                </Label>
                <Input
                  id="password"
                  ref={passwordInputRef}
                  defaultValue=""
                  className="text-white border-gray-500 w-20 h-8"
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
        <OpenDialogContext.Provider value={[openDialog, setOpenDialog]}>
          <EnablePhotosContext.Provider value={enabledPhotos}>
            <DisablePhotoDialogContext.Provider
              value={[disablePhotoDialog, setDisablePhotoDialog]}>
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
