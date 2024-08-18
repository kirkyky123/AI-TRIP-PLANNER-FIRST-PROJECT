import { db } from "@/AiService/firedatabaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigation } from "react-router-dom";
import MyTripsCard from "./MyTripsCard";
import { Button } from "@/components/ui/button";

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
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      setUserTrips((p) => [...p, doc.data()]);
    });
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-46 xl:px-10 mt-10 px-5">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold inline-block mr-10">My Trips</h2>
        <a href="/create-trip">
          <Button
            variant="outline"
            className="inline rounded-full bg-black text-white hover:bg-gradient-to-tr from-orange-200 to-[#26ae75]
            hover:shadow-gray-600 hover:shadow-sm hover:border-gray-800 hover:scale-105 mt-5">
            Create new trip
          </Button>
        </a>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 mt-10">
        {userTrips?.length > 0
          ? userTrips.map((trip, index) => (
              <MyTripsCard trip={trip} key={index} />
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
