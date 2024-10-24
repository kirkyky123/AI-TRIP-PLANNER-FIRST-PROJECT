/* eslint-disable react/prop-types */
import { placeDetails, REFERENCE_PHOTO_URL } from "@/AiService/API";
import { Button } from "@/components/ui/button";
import { useContext, useEffect, useState } from "react";
import { FaShare, FaRegCopy } from "react-icons/fa";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { motion } from "framer-motion";
import InfoTag from "./InfoTag";
import { EnablePhotosContext } from "..";
import { OpenDialogContext } from "../index";
import { DisablePhotoDialogContext } from "../index";

function InformationSection({ trip }) {
  // State and context management
  const [photoUrl, setPhotoUrl] = useState("");
  const enabledPhotos = useContext(EnablePhotosContext);
  const [setOpenDialog] = useContext(OpenDialogContext);
  const [setDisablePhotoDialog] = useContext(DisablePhotoDialogContext);

  // Effect to fetch photo when trip data changes or photos are enabled
  useEffect(() => {
    if (trip && enabledPhotos) {
      getPhoto();
    }
    if (!enabledPhotos) {
      setPhotoUrl("/banner2.jpg");
    }
  }, [trip, enabledPhotos]);

  // Function to fetch photo from API
  const getPhoto = async () => {
    if (!enabledPhotos) return;

    const data = {
      textQuery: trip?.userChoices?.location?.label,
    };

    const res = await placeDetails(data).then((response) => {
      console.log(response.data.places[0].photos[0].name);
      const updatedPhotoURL = REFERENCE_PHOTO_URL.replace(
        "{NAME}",
        response.data.places[0].photos[0].name
      );
      console.log(updatedPhotoURL);
      setPhotoUrl(updatedPhotoURL);
    });
  };

  // Function to copy trip link to clipboard
  const copyTripLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Copied link!");
  };

  // Function to format date range for display
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

  // Helper function to get ordinal suffix for dates
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Banner image with location name */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="relative">
        <img
          src={photoUrl ? photoUrl : "/banner2.jpg"}
          alt="trip-banner"
          className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-xl shadow-lg"
        />
        <div className="absolute inset-0 bg-black opacity-40 rounded-xl"></div>
        <div className="absolute inset-0 flex items-center justify-between p-6">
          <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl xl:text-5xl text-white drop-shadow-lg">
            {trip?.userChoices?.location?.label}
          </h2>
        </div>
      </motion.div>

      {/* Trip information tags */}
      <div className="mt-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap gap-4 justify-center">
          {/* Date range tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="w-full sm:w-auto">
            <InfoTag
              icon="📆"
              text={`${trip?.userChoices?.days} Day (${formatDateRange(
                trip?.userChoices?.startDate,
                trip?.userChoices?.endDate
              )})`}
            />
          </motion.div>
          {/* Budget tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="w-full sm:w-auto">
            <InfoTag
              icon={trip?.userChoices?.budgetImg}
              text={`${trip?.userChoices?.budget} Budget`}
            />
          </motion.div>
          {/* Number of people tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="w-full sm:w-auto">
            <InfoTag
              icon={trip?.userChoices?.peopleImg}
              text={trip?.userChoices?.people}
            />
          </motion.div>
          {/* Share button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}>
            <Dialog>
              <DialogTrigger asChild>
                <div className="relative z-10 flex justify-center cursor-pointer items-center overflow-hidden rounded-xl p-[2px] transition-transform hover:scale-105">
                  <div
                    className="animate-rotate absolute inset-0 h-full w-full rounded-xl bg-[conic-gradient(#ffffff_40deg,transparent_120deg)]
                              dark:bg-[conic-gradient(#0ee9a4_40deg,transparent_120deg)]"></div>
                  <div className="relative z-20 flex rounded-xl bg-gradient-to-br from-blue-400 via-gray-200 to-blue-400 dark:from-[#26ae75] dark:via-black dark:to-[#26ae75] p-1 border-2 border-light-border dark:border-black w-24 sm:w-full">
                    <Button className="bg-transparent h-full w-full sm:w-16 text-black dark:text-white">
                      <FaShare className="text-sm sm:mr-0" />
                    </Button>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-light-background dark:bg-dark-background">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-mono text-center">
                    Share this trip
                  </DialogTitle>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                  <input
                    className="flex-1 px-3 py-2 text-sm border rounded-md"
                    value={window.location.href}
                    readOnly
                  />
                  <DialogClose asChild>
                    <Button
                      onClick={copyTripLink}
                      className="flex items-center space-x-2">
                      <FaRegCopy />
                      <span>Copy</span>
                    </Button>
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>
          {/* Enable/Disable Photos button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.7 }}>
            {!enabledPhotos &&
            <Button
            className="bg-light-secondary dark:bg-gray-200 hover:bg-light-secondary/80 dark:hover:bg-gray-300 
            text-light-foreground px-4 py-2 rounded-xl shadow-md font-bold border-2 border-light-border dark:border-black
            hover:scale-105 transition-all duration-100"
            onClick={() => setOpenDialog(true)}>
              <span className="inline-block">Enable Photos</span>
            </Button>}
            {enabledPhotos &&
            <Button
            className="bg-light-secondary dark:bg-gray-200 hover:bg-light-secondary/80 dark:hover:bg-gray-300 
            text-light-foreground px-4 py-2 rounded-xl shadow-md font-bold border-2 border-light-border dark:border-black
            hover:scale-105 transition-all duration-100"
            onClick={() => setDisablePhotoDialog(true)}>
              <span className="inline-block">Disable Photos</span>
            </Button>}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default InformationSection;
