import { placeDetails, REFERENCE_PHOTO_URL } from "@/AiService/API";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
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
  //     const updatedPhotoURL = REFERENCE_PHOTO_URL.replace("{NAME}", response.data.places[0].photos[0].name);
  //     console.log(updatedPhotoURL);
  //     setPhotoUrl(updatedPhotoURL);
  //   })
  // };

  const copyTripLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Copied link!");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
      <div className="mt-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap gap-4 justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="w-full sm:w-auto">
            <InfoTag icon="📆" text={`${trip?.userChoices?.days} Day Trip`} />
          </motion.div>
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}>
            <Dialog>
              <DialogTrigger asChild>
                <div className="relative z-10 flex justify-center cursor-pointer items-center overflow-hidden rounded-xl p-[2px] transition-transform hover:scale-105">
                  <div className="animate-rotate absolute inset-0 h-full w-full rounded-xl bg-[conic-gradient(#ffffff_40deg,transparent_120deg)]"></div>
                  <div className="relative z-20 flex rounded-xl bg-gradient-to-r from-gray-700 via-gray-200 to-gray-700 p-1 border-2 border-gray-800 w-24 sm:w-full">  
                    <Button className="bg-black h-full w-full sm:w-16 hover:text-black">
                      <FaShare className="text-sm sm:mr-0" />
                    </Button>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
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
        </motion.div>
      </div>
    </div>
  );
}

function InfoTag({ icon, text }) {
  return (
    <div className="flex items-center space-x-2 bg-light-secondary dark:bg-gray-200 text-light-foreground px-4 py-2 rounded-full shadow-md">
      <span className="text-2xl">{icon}</span>
      <span className="font-semibold">{text}</span>
    </div>
  );
}

export default InformationSection;
