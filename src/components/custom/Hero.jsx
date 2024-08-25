import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="flex flex-col items-center mx-20 sm:mx-10 md:mx-20 lg:mx-40 xl:mx-72 gap-14">
      <div className="text-[50px] text-center font-extrabold mt-40 sm:mx-10 md:mx-20 lg:mx-32 xl:mx-50 tracking-normal">
        <h2 className="text-[#249566] hover:bg-gradient-to-tr from-black/20 to-green-300 rounded-xl py-2">
          <div className="underline underline-offset-[12px] decoration-[#2a6a50] inline">
            Effortlessly
          </div>{" "}
          design your perfect getaway using&nbsp;
          <div className="underline underline-offset-[12px] decoration-[#2a6a50] inline">
            AI
          </div>
          .
        </h2>{" "}
        <h2 className="mt-10">Start your adventure now!</h2>
      </div>
      <p className="text-gray-500 text-center text-xl xl:mx-48 lg:mx-20 sm:mx-0 mx-20">
        Personalized itineraries, curated experiences, and seamless bookings.
        All powered by AI. Your perfect trip awaits!
      </p>
        <Link to={"/create-trip"}>
          <Button className="hover:shadow-md hover:shadow-gray-500 font-bold tracking-widest">
            Jump in, It&apos;s free!
          </Button>
        </Link>
      <div className="flex flex-col xl:flex-row  gap-20 my-5">
        <img src="/laptop-landing-2.png" className="xl:h-[600px] xl:w-[700px] object-contain -mt-24"/>
        <img src="/phone-landing.png" className="xl:size-[600px] object-contain"/>
      </div>
    </div>
  );
}

export default Hero;
