import { chatSession } from "@/AiService/AiModel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PROMPT, selectBudget, selectTravelers } from "@/constants/options";
import { Mail } from "lucide-react";
import React, { useState, useEffect } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/AiService/firedatabaseConfig";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const [place, setPlace] = useState(null);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const router = useNavigate();

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

  const userLogin = useGoogleLogin({
    onSuccess: (response) => getUserProfile(response),
    onError: (error) => console.log(error),
  });

  const getUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        localStorage.setItem("user", JSON.stringify(response.data));
        setOpenDialog(false);
        createTrip();
      });
  };

  const createTrip = async () => {
    const user = localStorage.getItem("user");

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

    if (parseInt(formData?.days) > 7) {
      toast.error("Can't exceed 7 days.");
      return;
    }

    if (!formData?.budget) {
      toast.error("Please select budget.");
      return;
    }

    if (!formData?.people) {
      toast.error("Please select number of travelers.");
      return;
    }

    if (!user) {
      setOpenDialog(true);
      return;
    }

    setLoading(true);

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
    if (tripInfo.startsWith("```")) {
      return (tripInfo = tripInfo.slice(7, -4));
    }
  };

  const saveTrip = async (tripInfo) => {
    const updatedTripInfo = formatTripInfo(tripInfo);
    setLoading(true);
    const documentId = Date.now().toString();
    const user = JSON.parse(localStorage.getItem("user"));

    await setDoc(doc(db, "trips", documentId), {
      userChoices: formData,
      tripInfo: JSON.parse(updatedTripInfo),
      userEmail: user?.email,
      id: documentId,
    });
    setLoading(false);
    router("/view-trip/" + documentId);
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-46 xl:px-10 mt-10 px-5">
      <h2 className="text-4xl font-bold">
        Share your travel preferences{" "}
        <span className="font-NotoColorEmoji">️️🛩️🌴</span>
      </h2>
      <p className="text-lg text-gray-500 mt-4 tracking-normal font-extralight">
        Provide a few details and our AI will craft a personalized itinerary
        just for you.
      </p>

      <div className="flex flex-col gap-8 mt-6">
        <div>
          <h2 className="my-4 text-xl">Where are you going?</h2>
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
          <h2 className="mb-4 text-xl">For how many days?</h2>
          <Input
            placeholder={`Ex.2`}
            type="number"
            onChange={(e) => inputChange(e.target.value, "days")}
            className=""
          />
        </div>
      </div>

      <div className="mt-12">
        <h2 className="mt-3 text-xl">What&apos;s your budget?</h2>
        {/* <p className="text-md text-gray-400">
          <em>The AI will match the trip to your preferences</em>
        </p> */}

        <div className="mt-2 grid grid-cols-3 gap-5">
          {selectBudget.map((budget, index) => (
            <div
              key={index}
              onClick={() => inputChange(budget.id, "budget")}
              className={`my-5 mx-0 p-2 sm:mx-5 sm:p-4 border hover:shadow-xl cursor-pointer rounded-xl select-none 
                hover:shadow-gray-500 hover:scale-110 transition-all
                ${
                  formData?.budget === budget.title &&
                  "shadow-xl border-black border bg-gradient-to-tr from-orange-200/[.7] to-green-400/65"
                }`}>
              <h2 className="text-lg sm:text-xl md:text-3xl">{budget.img}</h2>
              <h2 className="text-base md:text-xl lg:text-2xl py-2 font-bold">{budget.title}</h2>
              <h2 className="text-gray-700 text-sm md:text-base lg:text-xl font-semibold md:font-medium">
                {budget.description}
              </h2>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="my-5 text-xl">How many people?</h2>
        <div className="mt-2 grid grid-cols-3 gap-5">
          {selectTravelers.map((people, index) => (
            <div
              key={index}
              onClick={() => inputChange(people.id, "people")}
              className={`my-5 mx-0 p-2 sm:mx-5 sm:p-4 border cursor-pointer rounded-xl select-none hover:shadow-lg hover:shadow-gray-500 hover:scale-110 transition-all
                ${
                  formData?.people === people.title &&
                  "shadow-xl border-black border bg-gradient-to-tr from-green-400/65 to-orange-200/[.7]"
                }`}>
              <h2 className="text-lg sm:text-xl md:text-3xl">{people.img}</h2>
              <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl py-2 font-bold">{people.title}</h2>
              <h2 className="text-gray-700 text-sm md:text-base lg:text-xl font-semibold md:font-medium">
                {people.description}
              </h2>
              <h2 className="text-gray-500 font-extralight text-sm lg:text-base mt-2">
                ({people.amount})
              </h2>
            </div>
          ))}

          <div className="flex items-center justify-center">
            <Button
              onClick={createTrip}
              className="text-lg border-gray-500 border font-semibold bg-green-600/[50]
                         hover:bg-gradient-to-tr from-orange-400 to-green-500 hover:shadow-md hover:shadow-gray-500
                         hover:scale-105 transition-all"
              disabled={loading}>
              {loading ? (
                <AiOutlineLoading className="size-7 animate-spin" />
              ) : (
                "Create Trip"
              )}
            </Button>
          </div>

          <Dialog open={openDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogDescription>
                  <div className="flex flex-col items-center mx-10 font-mono select-none">
                    <img
                      className="size-14 mt-2"
                      src="logo.svg"
                      alt="google logo"
                    />
                    <h2 className="my-5 text-2xl font-bold text-black">
                      Sign In
                    </h2>
                    <p className="text-gray-700">
                      Save your trips and access them anywhere
                    </p>
                    <Button
                      className="mt-20 p-6 w-full text-lg font-semibold flex gap-5
                        items-center justify-center bg-black"
                      onClick={userLogin}>
                      <FcGoogle className="text-2xl size-6" /> Sign In With
                      Google
                    </Button>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default CreateTrip;
