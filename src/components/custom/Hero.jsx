import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import FeatureCard from "./FeatureCard";
import PricingCard from "./PricingCard";
import LandingFooter from "./LandingFooter";
import Testimonials from "./Testimonials";
import { motion } from "framer-motion";
import { SignInButton, SignedOut } from "@clerk/clerk-react";

function Hero() {


  return (
    <div className="bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-black via-green-800/10 to-green-300/40">
      <div className="flex flex-col items-center mx-20 sm:mx-10 md:mx-30 lg:mx-20 gap-14">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-[50px] text-center font-extrabold mt-40 sm:mx-10 md:mx-20 lg:mx-32 xl:mx-40 tracking-normal">
          <h2 className="text-[#2db87e] hover:bg-gradient-to-tr from-black/10 to-green-300/30 rounded-xl py-2">
            <span className="underline underline-offset-[14px] decoration-[#e0e3e6] inline bg-gradient-to-l to-red-500 from-[#38da97] text-transparent bg-clip-text">
              Effortlessly
            </span>{" "}
            design&nbsp;your perfect getaway using&nbsp;
            <span className="underline underline-offset-[8px] decoration-[#e0e3e6] inline bg-gradient-to-r to-red-500 from-[#38da97] text-transparent bg-clip-text">
              AI
            </span>
            .
          </h2>
          <h2 className="mt-10 text-gray-200">Start your adventure now!</h2>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-[#abe3cb] text-center text-xl lg:mx-20 sm:mx-0">
          Personalized itineraries, curated experiences, and seamless bookings.
          All powered by AI. Your perfect trip awaits!
        </motion.p>
        <motion.div
          initial={{ opacity: 0, rotateX: 90 }}
          whileInView={{ opacity: 1, rotateX: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mx-auto flex w-full max-w-lg items-center justify-center">
          <div className="relative z-10 flex cursor-pointer items-center overflow-hidden rounded-xl border border-black p-[1.5px] hover:scale-105">
            <div className="animate-rotate absolute -inset-1 h-full w-full rounded-full bg-[conic-gradient(#0ee9a4_40deg,transparent_120deg)]"></div>
            <div className="relative z-20 flex rounded-[0.60rem] bg-black">
            <SignedOut>
              <SignInButton mode="modal">
              <Button
                className="bg-black rounded-xl font-bold text-xl text-white hover:text-white
                         hover:bg-gradient-to-br from-black/20 to-[#26ae75]/80 border border-gray-600/70 ease-in">
                Create a trip, It's free!
              </Button>
              </SignInButton>
            </SignedOut>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1 }}
          className="flex flex-col md:flex-row lg:flex-row xl:flex-row gap-20 
                      mt-20 sm:mt-10 justify-center sm:items-center">
          <img
            src="/laptop-landing-2.png"
            className="object-contain
                    sm:h-[400px] sm:w-[467px]
                    md:h-[320px] md:w-[373px]
                    lg:h-[400px] lg:w-[467px]
                    xl:h-[600px] xl:w-[700px]
                    md:-ml-20 xl:ml-0
                    lg:-mr-8 xl:-mr-0
                    -mt-20 lg:-mt-32"
          />
          <img
            src="/phone-landing.png"
            className="object-contain rounded-b-full
                     sm:size-[450px]
                     md:size-[300px]
                     lg:size-[400px]
                     xl:size-[600px]
                     sm:-mt-14 md:-mt-10 xl:mt-0
                     ml-10 md:-ml-14"
          />
        </motion.div>

        <div id="features" className="mt-20">
          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-6xl sm:mb-32">
            <h2 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-red-500 to-[#38da97] text-transparent bg-clip-text mx-auto max-w-52">
              Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon="🤖"
                title="AI-Powered Itineraries"
                description="Personalized travel plans tailored to your preferences and budget."
              />
              <FeatureCard
                icon="🌍"
                title="Global Destinations"
                description="Explore curated experiences in cities around the world."
              />
              <FeatureCard
                icon="💼"
                title="Seamless Bookings"
                description="Effortlessly book hotels, activities, and transportation."
              />
            </div>
          </motion.div>

          {/* Pricing Section */}
          <motion.div
            id="pricing"
            className="w-full max-w-6xl mt-20 sm:mb-10"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5 }}>
            <h2 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r to-red-500 from-[#38da97] text-transparent bg-clip-text min-h-12 max-w-52 mx-auto">
              Pricing
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.1 }}>
                <PricingCard
                  title="Basic"
                  price="Free"
                  features={[
                    "3 AI-generated trips per month",
                    "Basic destination information",
                    "Community support",
                  ]}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.2 }}>
                <PricingCard
                  title="Pro"
                  price={"$9.99/month"}
                  features={[
                    "100 AI-generated trips per month",
                    "Detailed local insights",
                    "Priority customer support",
                    "Exclusive deals on bookings",
                  ]}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.3 }}>
                <PricingCard
                  title="Business"
                  price="Custom"
                  features={[
                    "All Pro features",
                    "Unlimited AI-generated trips",
                    "API access",
                    "Dedicated account manager",
                    "Custom branding options",
                  ]}
                  customPrice={true}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Testimonials Section */}
        <motion.section
          id="testimonials"
          className="px-20 pb-20 pt-10 w-full rounded-xl flex justify-center"
          initial={{ opacity: 0, rotateY: 50 }}
          whileInView={{ opacity: 1, rotateY: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7 }}>
          <div className="container mx-auto px-4 flex flex-col items-center w-96 sm:w-full">
            <h2 className="text-4xl font-bold text-center bg-black rounded-xl py-5 px-10 w-fit bg-gradient-to-r from-red-600 via-[#38da97] to-blue-600 text-transparent bg-clip-text">
              Testimonials
            </h2>
            <div className="max-w-6xl w-full">
              <Testimonials />
            </div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          id="contact"
          className="px-20 pb-20 pt-10 w-full flex justify-center border-b-2 border-[#38da97]"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.5 }}>
          <div className="container mx-auto px-4 flex flex-col items-center w-96 sm:w-full">
            <Link to="/contact">
              <h2
                className="text-4xl font-bold text-center bg-black rounded-xl py-5 px-10 w-fit bg-gradient-to-r from-blue-400 via-[#38da97] to-red-600
            text-transparent bg-clip-text border-2 border-gray-500 hover:scale-105 transition-all duration-300 cursor-pointer transform hover:translate-y-1
            hover:border-gray-700/50 hover:shadow-lg hover:shadow-gray-700/50">
                Contact Us
              </h2>
            </Link>
          </div>
        </motion.section>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8 }}>
          <LandingFooter />
        </motion.footer>
      </div>
    </div>
  );
}

export default Hero;
