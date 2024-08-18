import { db } from "@/AiService/firedatabaseConfig";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import InformationSection from "./components/Information";
import Hotels from "./components/Hotels";
import Itinerary from "./components/Itinerary";
import Summary from "./components/Summary";

function ViewTrip() {
  const [trip, setTrip] = useState([]);
  const { tripId } = useParams();

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

  return (
    <div className="py-10 px-10 sm:px-12 md:px-18 lg:px-30 xl:px-42">
      <InformationSection trip={trip} />
      <div className="mx-2">
        <Hotels trip={trip} />
      </div>
      <Itinerary trip={trip}/>
      <Summary trip={trip}/>
      

    </div>
  );
}

export default ViewTrip;
