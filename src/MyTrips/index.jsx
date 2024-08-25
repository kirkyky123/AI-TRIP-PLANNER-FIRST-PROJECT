import React, { useEffect, useState } from "react";
import { useNavigation } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import MyTripsCard from "./MyTripsCard";
import { Button } from "@/components/ui/button";
import { db } from "@/AiService/firedatabaseConfig";

function MyTrips() {
  const navigation = useNavigation();
  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    getUserTrips();
  }, []);

  const getUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigation("/");
      return;
    }

    const q = query(
      collection(db, "trips"),
      where("userEmail", "==", user?.email)
    );
    const querySnapshot = await getDocs(q);
    setUserTrips([]);
    querySnapshot.forEach((doc) => {
      setUserTrips((prevTrips) => [...prevTrips, { id: doc.id, ...doc.data() }]);
    });
  };

  const removeTrip = (tripId) => {
    setUserTrips((prevTrips) => prevTrips.filter((trip) => trip.id !== tripId));
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-46 xl:px-10 mt-10 px-5">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold inline-block mr-10">My Trips</h2>

      <h2 className="mt-0 text-gray-500 text-sm">(Click images)</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 mt-10 select-none">
        {userTrips?.length > 0
          ? userTrips.map((trip, index) => (
              <MyTripsCard trip={trip} key={index} onDelete={removeTrip} />
            ))
          : [1, 2, 3, 4, 5, 6].map((item, index) => (
              <div
                key={index}
                className="h-[400px] w-[400px] bg-slate-200 animate-pulse rounded-t-3xl"></div>
            ))}
      </div>
    </div>
  );
}

export default MyTrips;
