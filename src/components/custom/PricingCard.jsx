import React from "react";
import { Button } from "../ui/button";

function PricingCard({ title, price, features, customPrice = false }) {
  const outline =
    title === "Business"
      ? "bg-[conic-gradient(#fb7272_225deg,transparent_360deg)]"
      : title === "Pro"
      ? "bg-[conic-gradient(#34f0ac_225deg,transparent_360deg)]"
      : "bg-[conic-gradient(#f9e42b_225deg,transparent_360deg)]";

  return (
    <div className="relative z-10 items-center overflow-hidden rounded-xl p-[2.5px] hover:scale-110 h-full transform transition duration-300">
      <div
        className={`animate-rotateprice absolute -inset-1 h-full w-full rounded-full ${outline}`}></div>
      <div className="relative z-20 flex rounded-[0.60rem] bg-black p-[4px] h-full">
        <div className=" rounded-[0.55rem] p-[2px] flex-grow">
          <div
            className={`rounded-lg p-6 shadow-lg border-4 border-transparent flex flex-col justify-between h-full relative`}>
            {title === "Pro" && (
              <div className="absolute top-0 right-0 bg-[#37e08b] text-gray-800 font-bold py-1 px-3 rounded-bl-lg rounded-tr-lg transform rotate-0 translate-x-2 -translate-y-2 text-sm">
                On Sale!
              </div>
            )}
            <div className="text-white">
              <h3 className="text-2xl font-semibold mb-2 underline underline-offset-4">
                {title}
              </h3>
              <p className="text-3xl font-bold mb-4">
                {title === "Pro" ? <span className="text-lg text-gray-400 line-through mr-2">$19.99</span> : ""}
                {price === "$9.99/month" ? <span className="bg-gradient-to-l to-[#38da97] via-red-600 from-blue-400
            text-transparent bg-clip-text">{price}</span> : price}{" "}
                {customPrice && (
                  <span className="text-gray-400 text-sm font-normal">
                    (contact for pricing)
                  </span>
                )}
              </p>
              <ul className="text-white min-h-32">
                {features.map((feature, index) => (
                  <li key={index} className="mb-2">
                    ✓ {feature}
                  </li>
                ))}
              </ul>
            </div>
            <Button
              className={`w-full mt-6 bg-black border-2 border-white font-bold hover:bg-white hover:text-black`}>
              {title === "Business" ? "Contact Us" : "Get Started"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PricingCard;
