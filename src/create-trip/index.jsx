import { chatSession } from "@/AiService/AiModel";
import { Button } from "@/components/ui/button";
import { PROMPT, selectBudget, selectTravelers } from "@/constants/options";
import { VscLoading } from "react-icons/vsc";
import { useState, useEffect } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "sonner";
import { AiOutlineLoading } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/AiService/firedatabaseConfig";
import { useNavigate } from "react-router-dom";
import { MAX_DAYS } from "@/constants/variables";
import { motion, useAnimation } from "framer-motion";
import { useUser, useClerk } from "@clerk/clerk-react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

function CreateTrip() {
  // State variables for form data and UI control
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [loadingDialog, setLoadingDialog] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  // User authentication hooks
  const { isSignedIn, user } = useUser();
  const { openSignIn } = useClerk();
  const navigate = useNavigate();

  const [isWaitingForSignIn, setIsWaitingForSignIn] = useState(false);
  const arrowControls = useAnimation();

  // Handle input changes for form fields
  const inputChange = (value, name) => {
    if (name === "budget") {
      const selectedBudget = selectBudget.find((budget) => budget.id === value);
      const selectedImg = selectedBudget.img;

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

  // Effect for logging form data and controlling arrow animation
  useEffect(() => {
    if (formData.people) {
      arrowControls.stop();
    } else {
      arrowControls.start({
        y: [0, 10, 0],
        transition: { duration: 1, repeat: Infinity },
      });
    }
  }, [formData.people, arrowControls]);

  // Effect for handling sign-in state
  useEffect(() => {
    if (isWaitingForSignIn && isSignedIn) {
      setIsWaitingForSignIn(false);
      createTripAfterSignIn();
    }
  }, [isSignedIn, isWaitingForSignIn]);

  // Handle date range changes
  const handleDateChange = (ranges) => {
    setDateRange([ranges.selection]);
    const start = ranges.selection.startDate;
    const end = ranges.selection.endDate;
    const days = Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;
    setFormData((prevData) => ({
      ...prevData,
      days: days,
      startDate: start.toISOString(),
      endDate: end.toISOString(),
    }));
  };

  // Main function to create a trip
  const createTrip = async () => {
    // Validate form data
    if (!formData?.location) {
      toast.error("Please enter a location.");
      return;
    }

    if (!formData?.days) {
      toast.error("Please select travel dates.");
      return;
    }

    if (formData?.days < 1 || formData?.days > MAX_DAYS) {
      toast.error("Trip duration must be between 1 and 7 days.");
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

    // Check if user is signed in
    if (!isSignedIn) {
      setIsWaitingForSignIn(true);
      openSignIn();
      return;
    }

    createTripAfterSignIn();
  };

  // Function to create trip after sign-in
  const createTripAfterSignIn = async () => {
    setLoading(true);
    setLoadingDialog(true);

    const AI_PROMPT = PROMPT.replace("{location}", formData?.location.label)
      .replace("{days}", formData?.days)
      .replace("{budget}", formData?.budget)
      .replace("{people}", formData?.people);

    const result = await chatSession.sendMessage(AI_PROMPT);
    setLoading(false);
    saveTrip(result?.response?.text());
  };

  const saveTrip = async (tripInfo) => {
    setLoading(true);
    const documentId = Date.now().toString();

    await setDoc(doc(db, "trips", documentId), {
      userChoices: formData,
      tripInfo: JSON.parse(tripInfo),
      userEmail: user?.primaryEmailAddress?.emailAddress,
      id: documentId,
    });
    setLoading(false);
    setLoadingDialog(false);
    navigate("/view-trip/" + documentId);
  };

  // JSX for the create trip form
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-200 via-light-secondary to-light-primary/40 dark:from-dark-background dark:via-dark-primary/30 dark:to-dark-primary/20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-l from-red-500 to-blue-400 dark:to-light-primary text-transparent bg-clip-text">
              Share your travel preferences{" "}
            </span>
            <span className="text-light-foreground dark:text-dark-foreground">
              ️️🛩️🌴
            </span>
          </h2>
          <p className="text-lg text-black dark:text-green-500 tracking-normal font-semibold">
            Provide a few details and our AI will craft a personalized itinerary
            just for you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column */}
          <div className="space-y-12">
            {/* Location Selection */}
            <div className="bg-white dark:bg-dark-background/50 rounded-2xl p-8 shadow-lg">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex flex-col text-light-foreground dark:text-black max-w-[600px]">
                <h2 className="text-2xl font-bold mb-4 text-light-foreground dark:text-dark-foreground">
                  <span className="text-blue-500 dark:text-dark-primary">
                    Where
                  </span>{" "}
                  are you going?{" "}
                  <span className="text-sm text-blue-600 dark:text-dark-primary block mt-2 underline underline-offset-4 decoration-black dark:decoration-white">
                    (pick popular locations for better results)
                  </span>
                </h2>
                <GooglePlacesAutocomplete
                  apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                  selectProps={{
                    place,
                    onChange: (v) => {
                      setPlace(v);
                      inputChange(v, "location");
                    },
                  }}
                />
              </motion.div>
            </div>

            {/* Date Selection */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white dark:bg-dark-background/50 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-light-foreground dark:text-dark-foreground">
                <span className="text-blue-500 dark:text-dark-primary">
                  When
                </span>{" "}
                are you traveling?{" "}
                <span className="text-sm text-blue-600 dark:text-dark-primary block mt-2 underline underline-offset-4 decoration-black dark:decoration-white">
                  (1-7 days)
                </span>
              </h2>
              <DateRange
                editableDateInputs={true}
                onChange={handleDateChange}
                moveRangeOnFirstSelection={false}
                ranges={dateRange}
                minDate={new Date()}
                maxDate={new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)}
                className="rounded-lg overflow-hidden"
              />
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-12">
            {/* Budget Selection */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white dark:bg-dark-background/50 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-light-foreground dark:text-dark-foreground">
                What's your{" "}
                <span className="text-blue-500 dark:text-dark-primary">
                  budget
                </span>
                ?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectBudget.map((budget, index) => (
                  <div
                    className="hover:scale-105 transition-all ease-in border-black border rounded-xl"
                    key={index}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.05 * index }}
                      onClick={() => inputChange(budget.id, "budget")}
                      className={`p-4 rounded-xl cursor-pointer transition-all hover:shadow-md hover:shadow-blue-200 dark:hover:shadow-dark-primary ${
                        formData?.budget === budget.title
                          ? "bg-gradient-to-br from-orange-200 to-blue-300 dark:from-dark-primary dark:to-black/70 shadow-lg"
                          : "bg-white dark:bg-white"
                      }`}>
                      <div className="text-3xl mb-2">{budget.img}</div>
                      <h3 className="text-xl font-bold mb-2 text-light-foreground dark:text-black">
                        {budget.title}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-800">
                        {budget.description}
                      </p>
                    </motion.div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Travelers Selection */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-white dark:bg-dark-background/50 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-light-foreground dark:text-dark-foreground">
                How many{" "}
                <span className="text-blue-500 dark:text-dark-primary">
                  people
                </span>
                ?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectTravelers.map((people, index) => (
                  <div
                    className="hover:scale-105 transition-all ease-in border-black border rounded-xl"
                    key={index}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.05 * index }}
                      onClick={() => inputChange(people.id, "people")}
                      className={`p-4 rounded-xl cursor-pointer transition-all hover:shadow-md hover:shadow-blue-200 dark:hover:shadow-dark-primary ${
                        formData?.people === people.title
                          ? "bg-gradient-to-tl from-orange-200 to-blue-300 dark:from-black/70 dark:to-dark-primary shadow-lg"
                          : "bg-white dark:bg-white"
                      }`}>
                      <div className="text-3xl mb-2">{people.img}</div>
                      <h3 className="text-xl font-bold mb-2 text-light-foreground dark:text-black">
                        {people.title}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-800 min-h-[40px]">
                        {people.description}
                      </p>
                      <p className="text-gray-700 dark:text-black text-sm mt-2">
                        ({people.amount})
                      </p>
                    </motion.div>
                  </div>
                ))}
                {/* Create Trip Button */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-fit flex justify-center mt-6 sm:mt-16">
                  <div className="relative z-10 flex cursor-pointer items-center overflow-hidden rounded-xl p-[1.5px] hover:scale-105">
                    <div className="animate-rotate absolute -inset-1 h-full w-full rounded-full bg-[conic-gradient(#4bcbeb_40deg,transparent_120deg)] dark:bg-[conic-gradient(#0ee9a4_40deg,transparent_120deg)]"></div>
                    <Button
                      onClick={createTrip}
                      className="relative z-20 bg-light-foreground dark:bg-black rounded-xl font-bold text-light-background dark:text-white hover:text-light-background dark:hover:text-white hover:bg-gradient-to-br from-orange-300 to-blue-600 dark:from-dark-background/20 dark:to-dark-primary/80 px-8 py-4 text-xl"
                      disabled={loading}>
                      {loading ? (
                        <AiOutlineLoading className="size-7 animate-spin" />
                      ) : (
                        "Create Trip"
                      )}
                    </Button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Loading dialog */}
      <Dialog open={loadingDialog}>
        <DialogContent className="bg-light-background dark:bg-dark-background">
          <DialogDescription>
            <div className="flex flex-col items-center mx-10 select-none">
              <h2 className="text-xl text-light-foreground dark:text-dark-foreground">
                Trip Loading
              </h2>
              <VscLoading className="size-12 animate-spin mt-5 text-blue-400 dark:text-dark-primary" />
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
