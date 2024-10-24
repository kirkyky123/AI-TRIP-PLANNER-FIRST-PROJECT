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
      console.log("Document: ", documentSnapshot.data());
      setTrip(documentSnapshot.data());
    } else {
      console.log("No such document");
      toast.warning("No trip found");
    }
  };

  // Function to enable photos with password verification
  const enablePhotos = () => {
    const password = passwordInputRef.current.value;
    if (password === import.meta.env.VITE_PASSWORD_KEY) {
      console.log("Enabled photos before enabling: ", enabledPhotos);
      setEnabledPhotos(true);
      console.log("Enabled photos after enabling: ", enabledPhotos);
      setOpenDialog(false);
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
      {/* Alert dialog for enabling photos */}
      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Enable Photos</AlertDialogTitle>
            <AlertDialogDescription>
              Enter the password to enable photos for this trip.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                className="col-span-3"
                ref={passwordInputRef}
              />
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={enablePhotos}>Enable</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Alert dialog for disabling photos */}
      <AlertDialog
        open={disablePhotoDialog}
        onOpenChange={setDisablePhotoDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Disable Photos</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to disable photos for this trip?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={disablePhotos}>Disable</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Main content */}
      <div
        className="py-10 px-10 sm:px-12 md:px-18 lg:px-30 xl:px-42 bg-gradient-to-br from-light-background via-light-secondary to-light-primary/40 
    dark:from-dark-background/20 dark:via-dark-primary/30 dark:to-dark-secondary/20">
        <OpenDialogContext.Provider value={[setOpenDialog]}>
          <EnablePhotosContext.Provider value={enabledPhotos}>
            <DisablePhotoDialogContext.Provider
              value={[setDisablePhotoDialog]}>
              {/* Render trip components */}
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
