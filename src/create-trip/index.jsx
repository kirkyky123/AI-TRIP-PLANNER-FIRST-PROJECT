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
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

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
      key: 'selection'
    }
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

  // Effect for logging form data and controlling arrow animation
  useEffect(() => {
    console.log(formData);
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
    setFormData(prevData => ({
      ...prevData, 
      days: days,
      startDate: start.toISOString(),
      endDate: end.toISOString()
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

    try {
      // Generate trip data using AI model
      const tripData = await chatSession(
        PROMPT(
          formData.location.label,
          formData.days,
          formData.budget,
          formData.people
        )
      );

      // Save trip data to Firestore
      const tripId = crypto.randomUUID();
      await setDoc(doc(db, "trips", tripId), {
        id: tripId,
        userChoices: formData,
        tripData: tripData,
        userId: user.id,
      });

      setLoading(false);
      setLoadingDialog(false);
      navigate(`/view-trip/${tripId}`);
    } catch (error) {
      console.error("Error creating trip:", error);
      toast.error("Failed to create trip. Please try again.");
      setLoading(false);
      setLoadingDialog(false);
    }
  };

  // JSX for the create trip form
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-200 via-light-secondary to-light-primary/40 dark:from-dark-background dark:via-dark-primary/30 dark:to-dark-primary/20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:px-10 md:px-32 lg:px-46 xl:px-10 mt-10 px-5 text-light-foreground dark:text-dark-foreground">
        {/* Header section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, delay: 0.1 }}>
          <h2 className="text-4xl font-bold">
            <span className="bg-gradient-to-l from-red-500 to-blue-400 dark:to-light-primary text-transparent bg-clip-text">
              Share your travel preferences{" "}
            </span>
            <span className="text-light-foreground dark:text-dark-foreground">
              ️️🛩️🌴
            </span>
          </h2>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-black dark:text-green-500 mt-4 tracking-normal font-semibold">
          Provide a few details and our AI will craft a personalized itinerary
          just for you.
        </motion.p>

        {/* Location and Date selection */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col gap-8 mt-6 text-light-foreground dark:text-black max-w-[600px]">
          <div>
            <h2 className="my-4 text-xl text-light-foreground dark:text-dark-foreground font-semibold">
              Where are you going?{" "}
              <span className="text-sm text-blue-500 dark:text-dark-primary font-semibold">
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
            <h2 className="mb-4 text-xl text-light-foreground dark:text-dark-foreground font-semibold">
              When are you traveling?{" "}
              <span className="text-sm text-blue-500 dark:text-dark-primary font-bold">(1-7 days)</span>
            </h2>
            <DateRange
              editableDateInputs={true}
              onChange={handleDateChange}
              moveRangeOnFirstSelection={false}
              ranges={dateRange}
              minDate={new Date()}
              maxDate={new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)}
            />
          </div>
        </motion.div>

        {/* Budget selection */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12">
          <h2 className="mt-3 text-xl font-semibold">
            What&apos;s your{" "}
            <span className="text-blue-500 dark:text-dark-primary font-semibold">
              budget
            </span>
            ?
          </h2>

          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 md:gap-8 lg:gap-14 text-light-foreground dark:text-black">
            {selectBudget.map((budget, index) => (
              <div
                className="hover:scale-105 sm:hover:scale-110 transition-all ease-in"
                key={index}>
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.3, delay: 0.05 * index }}
                  onClick={() => inputChange(budget.id, "budget")}
                  className={`my-3 sm:my-5 p-2 sm:p-4 border hover:shadow-md cursor-pointer rounded-xl select-none 
                hover:shadow-blue-200 dark:hover:shadow-dark-primary transition-all bg-white dark:bg-white
                ${
                  formData?.budget === budget.title &&
                  "shadow-lg border-light-foreground dark:border-dark-foreground border bg-gradient-to-br from-orange-200 to-blue-300 dark:to-black/70 dark:from-dark-primary"
                }`}>
                  <h2 className="text-2xl sm:text-3xl">{budget.img}</h2>
                  <h2 className="text-lg sm:text-xl lg:text-2xl py-1 sm:py-2 font-bold">
                    {budget.title}
                  </h2>
                  <h2 className="text-gray-700 dark:text-gray-800 text-sm sm:text-base lg:text-lg font-semibold sm:font-medium">
                    {budget.description}
                  </h2>
                </motion.div>
              </div>
            ))}
          </div>
          <motion.h2
            animate={arrowControls}
            className="text-sm sm:text-xl text-light-foreground dark:text-dark-foreground text-center mt-4 -mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.h2>
        </motion.div>

        {/* Number of travelers selection */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-6 sm:mt-8">
          <h2 className="my-3 sm:my-5 text-xl font-semibold">
            How many{" "}
            <span className="text-blue-500 dark:text-dark-primary font-semibold">
              people
            </span>
            ?
          </h2>
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 md:gap-8 lg:gap-14 text-light-foreground dark:text-black">
            {selectTravelers.map((people, index) => (
              <div
                className="hover:scale-105 sm:hover:scale-110 transition-all ease-in"
                key={index}>
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.3, delay: 0.05 * index }}
                  onClick={() => inputChange(people.id, "people")}
                  className={`my-3 sm:my-5 p-2 sm:p-4 border cursor-pointer rounded-xl select-none hover:shadow-md
                hover:shadow-blue-200 dark:hover:shadow-dark-primary transition-all bg-white dark:bg-white
                ${
                  formData?.people === people.title &&
                  "shadow-lg border-light-foreground dark:border-dark-foreground border bg-gradient-to-tl  from-orange-200 to-blue-300 dark:to-dark-primary dark:from-black/70"
                }`}>
                  <h2 className="text-2xl sm:text-3xl">{people.img}</h2>
                  <h2 className="text-lg sm:text-xl lg:text-2xl py-1 sm:py-2 font-bold">
                    {people.title}
                  </h2>
                  <h2 className="text-gray-700 dark:text-gray-800 text-sm sm:text-base lg:text-lg font-semibold sm:font-medium min-h-[40px] sm:min-h-[50px]">
                    {people.description}
                  </h2>
                  <h2 className="text-gray-700 dark:text-black font-extralight text-xs sm:text-sm lg:text-base mt-1 sm:mt-2">
                    ({people.amount})
                  </h2>
                </motion.div>
              </div>
            ))}

            {/* Create Trip button */}
            <motion.div
              initial={{ opacity: 0, rotateX: 90 }}
              whileInView={{ opacity: 1, rotateX: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center">
              <div className="relative z-10 flex cursor-pointer items-center overflow-hidden rounded-xl p-[1.5px] hover:scale-105">
                <div
                  className="animate-rotate absolute -inset-1 h-full w-full rounded-full bg-[conic-gradient(#4bcbeb_40deg,transparent_120deg)]
              dark:bg-[conic-gradient(#0ee9a4_40deg,transparent_120deg)]"></div>
                <div className="relative z-20 flex rounded-[0.60rem] bg-light-foreground dark:bg-black hover:bg-gradient-to-br from-orange-200 to-blue-500
                 dark:from-dark-background/20 dark:to-dark-primary/80 ease-in">
                  <Button
                    onClick={createTrip}
                    className="bg-light-foreground dark:bg-black rounded-xl font-bold text-light-background dark:text-white hover:text-light-background dark:hover:text-white
                       hover:bg-gradient-to-br from-orange-300 to-blue-600 dark:from-dark-background/20 dark:to-dark-primary/80 ease-in
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
