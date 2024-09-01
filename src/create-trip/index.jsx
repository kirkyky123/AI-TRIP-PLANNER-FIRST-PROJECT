import { chatSession } from "@/AiService/AiModel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PROMPT, selectBudget, selectTravelers } from "@/constants/options";
import { VscLoading } from "react-icons/vsc";
import React, { useState, useEffect } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "sonner";
import { AiOutlineLoading } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/AiService/firedatabaseConfig";
import { useNavigate } from "react-router-dom";
import { MAX_DAYS } from "@/constants/variables";
import { motion } from "framer-motion";
import { useUser, useClerk } from "@clerk/clerk-react";

function CreateTrip() {
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState([]);
  const [loadingDialog, setLoadingDialog] = useState(false);

  const { isSignedIn, user } = useUser();
  const { openSignIn } = useClerk();
  const navigate = useNavigate();

  const [isWaitingForSignIn, setIsWaitingForSignIn] = useState(false);

  const inputChange = (value, name) => {
    if (name === "budget") {
      const selectedBudget = selectBudget.find((budget) => budget.id === value);
      const selectedImg = selectedBudget.img;
      console.log(selectedImg);

      setFormData((prevData) => ({
        ...prevData,
        [name]:
          prevData[name] === selectedBudget.title ? null : selectedBudget.title,
        ["budgetImg"]:
          prevData["budgetImg"] === selectedImg ? null : selectedImg,
      }));
      return;
    } else if (name === "people") {
      const selectedPeople = selectTravelers.find(
        (people) => people.id === value
      );
      const selectedImg = selectedPeople.img;
      console.log(selectedImg);

      setFormData((prevData) => ({
        ...prevData,
        [name]:
          prevData[name] === selectedPeople.title ? null : selectedPeople.title,
        ["peopleImg"]:
          prevData["peopleImg"] === selectedImg ? null : selectedImg,
      }));
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: prevData[name] === value ? null : value,
    }));
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  useEffect(() => {
    if (isWaitingForSignIn && isSignedIn) {
      setIsWaitingForSignIn(false);
      createTripAfterSignIn();
    }
  }, [isSignedIn, isWaitingForSignIn]);

  const createTrip = async () => {
    if (!formData?.location) {
      toast.error("Please enter a location.");
      return;
    }

    if (!formData?.days) {
      if (isNaN(parseInt(formData?.days))) {
        toast.error("Please enter a number for days.");
        return;
      }
      toast.error("Please enter amount of days.");
      return;
    }

    if (parseInt(formData?.days) === 0) {
      toast.error("Days can't be 0.");
      return;
    }

    if (parseInt(formData?.days) > MAX_DAYS) {
      toast.error(`Can't exceed ${MAX_DAYS} days.`);
      return;
    }

    if (!formData?.budget) {
      toast.error("Please select budget.");
      return;
    }

    if (!formData?.people) {
      toast.error("Please select amount of travelers.");
      return;
    }

    if (!isSignedIn) {
      setIsWaitingForSignIn(true);
      openSignIn();
      return;
    }

    createTripAfterSignIn();
  };

  const createTripAfterSignIn = async () => {
    setLoading(true);
    setLoadingDialog(true);

    const AI_PROMPT = PROMPT.replace("{location}", formData?.location.label)
      .replace("{days}", formData?.days)
      .replace("{budget}", formData?.budget)
      .replace("{people}", formData?.people);

    console.log(AI_PROMPT);

    const result = await chatSession.sendMessage(AI_PROMPT);
    console.log(result?.response?.text());
    setLoading(false);
    saveTrip(result?.response?.text());
  };

  const formatTripInfo = (tripInfo) => {
    tripInfo = tripInfo.trim();
    if (tripInfo.startsWith("```json")) {
      tripInfo = tripInfo.slice(7);
    } else if (tripInfo.startsWith("```")) {
      tripInfo = tripInfo.slice(3);
    }
    if (tripInfo.endsWith("```")) {
      tripInfo = tripInfo.slice(0, -3);
    }

    let fixedJson = escapeInnerQuotes(tripInfo);
    console.log("fixed json: " + fixedJson);
    return fixedJson;
  };

  function escapeInnerQuotes(jsonString) {
    return jsonString.replace(/(?<=: ?")(.+?)(?="[,}])/g, function (match) {
      return match.replace(/"/g, '\\"');
    });
  }

  const saveTrip = async (tripInfo) => {
    const updatedTripInfo = formatTripInfo(tripInfo);
    setLoading(true);
    const documentId = Date.now().toString();

    await setDoc(doc(db, "trips", documentId), {
      userChoices: formData,
      tripInfo: JSON.parse(updatedTripInfo),
      userEmail: user?.primaryEmailAddress?.emailAddress,
      id: documentId,
    });
    setLoading(false);
    setLoadingDialog(false);
    navigate("/view-trip/" + documentId);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-black via-green-800/10 to-green-300/40 py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:px-10 md:px-32 lg:px-46 xl:px-10 mt-10 px-5 text-white">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1 }}>
          <h2 className="text-4xl font-bold">
            <span className="bg-gradient-to-l from-red-500 to-[#38da97] text-transparent bg-clip-text">
              Share your travel preferences{" "}
            </span>
            <span className="font-NotoColorEmoji text-white">️️🛩️🌴</span>
          </h2>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-gray-400 mt-4 tracking-normal font-semibold">
          Provide a few details and our AI will craft a personalized itinerary
          just for you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col gap-8 mt-6 text-black max-w-[600px]">
          <div>
            <h2 className="my-4 text-xl text-white">
              Where are you going?{" "}
              <span className="text-sm text-[#26ae75] font-bold">
                (pick popular locations for better results)
              </span>
            </h2>
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
              selectProps={{
                place,
                onChange: (v) => {
                  setPlace(v);
                  {
                    inputChange(v, "location");
                  }
                },
              }}
            />
          </div>

          <div>
            <h2 className="mb-4 text-xl text-white">
              For how many days?{" "}
              <span className="text-sm text-[#26ae75] font-bold">{`(1-${MAX_DAYS})`}</span>
            </h2>
            <Input
              placeholder={`Ex.3`}
              type="number"
              onChange={(e) => inputChange(e.target.value, "days")}
              className="text-black"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12">
          <h2 className="mt-3 text-xl">What&apos;s your <span className="text-green-300 font-semibold">budget</span>?</h2>

          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 md:gap-8 lg:gap-14 text-black">
            {selectBudget.map((budget, index) => (
              <div
                className="hover:scale-105 sm:hover:scale-110 transition-all ease-in"
                key={index}>
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.3, delay: 0.05 * index }}
                  onClick={() => inputChange(budget.id, "budget")}
                  className={`my-3 sm:my-5 p-2 sm:p-4 border hover:shadow-lg cursor-pointer rounded-xl select-none 
                hover:shadow-[#457d66] transition-all bg-white
                ${
                  formData?.budget === budget.title &&
                  "shadow-lg border-black border bg-gradient-to-br from-black/20 to-[#26ae75]"
                }`}>
                  <h2 className="text-2xl sm:text-3xl">{budget.img}</h2>
                  <h2 className="text-lg sm:text-xl lg:text-2xl py-1 sm:py-2 font-bold">
                    {budget.title}
                  </h2>
                  <h2 className="text-gray-700 text-sm sm:text-base lg:text-lg font-semibold sm:font-medium">
                    {budget.description}
                  </h2>
                </motion.div>
              </div>
            ))}
          </div>
          <h2 className="text-xl text-white text-center mt-4 -mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-6 sm:mt-8">
          <h2 className="my-3 sm:my-5 text-xl">How many <span className="text-green-300 font-semibold">people</span>?</h2>
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 md:gap-8 lg:gap-14 text-black">
            {selectTravelers.map((people, index) => (
              <div
                className="hover:scale-105 sm:hover:scale-110 transition-all ease-in"
                key={index}>
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.3, delay: 0.05 * index }}
                  onClick={() => inputChange(people.id, "people")}
                  className={`my-3 sm:my-5 p-2 sm:p-4 border cursor-pointer rounded-xl select-none hover:shadow-lg
                hover:shadow-[#457d66] transition-all bg-white
                ${
                  formData?.people === people.title &&
                  "shadow-lg border-black border bg-gradient-to-tr to-black/20 from-[#26ae75]"
                }`}>
                  <h2 className="text-2xl sm:text-3xl">{people.img}</h2>
                  <h2 className="text-lg sm:text-xl lg:text-2xl py-1 sm:py-2 font-bold">
                    {people.title}
                  </h2>
                  <h2 className="text-gray-700 text-sm sm:text-base lg:text-lg font-semibold sm:font-medium min-h-[40px] sm:min-h-[50px]">
                    {people.description}
                  </h2>
                  <h2 className="text-gray-800 font-extralight text-xs sm:text-sm lg:text-base mt-1 sm:mt-2">
                    ({people.amount})
                  </h2>
                </motion.div>
              </div>
            ))}

            <motion.div
              initial={{ opacity: 0, rotateX: 90 }}
              whileInView={{ opacity: 1, rotateX: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center">
              <div className="relative z-10 flex cursor-pointer items-center overflow-hidden rounded-xl border border-black p-[2.5px] hover:scale-105">
                <div className="animate-rotate absolute -inset-1 h-full w-full rounded-full bg-[conic-gradient(#0ee9a4_40deg,transparent_120deg)]"></div>
                <div className="relative z-20 flex rounded-[0.60rem] bg-black">
                  <Button
                    onClick={createTrip}
                    className="bg-black rounded-xl font-bold text-white hover:text-white
                       hover:bg-gradient-to-br from-black/20 to-[#26ae75]/80 border border-gray-400/80 ease-in
                         w-24 text-sm sm:text-lg sm:w-32 lg:text-xl lg:w-48"
                    disabled={loading}>
                    {loading ? (
                      <AiOutlineLoading className="size-7 animate-spin" />
                    ) : (
                      "Create Trip"
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      <Dialog open={loadingDialog}>
        <DialogContent>
          <DialogDescription>
            <div className="flex flex-col items-center mx-10 select-none">
              <h2 className="text-xl text-black">Trip Loading</h2>
              <VscLoading className="size-12 animate-spin mt-5 text-green-500" />
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
