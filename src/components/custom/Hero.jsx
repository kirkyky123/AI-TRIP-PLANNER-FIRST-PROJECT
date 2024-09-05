import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import FeatureCard from "./FeatureCard";
import PricingCard from "./PricingCard";
import LandingFooter from "./LandingFooter";
import Testimonials from "./Testimonials";
import { motion } from "framer-motion";
import { SignInButton, SignedIn, SignedOut } from "@clerk/clerk-react";
import BoxReveal from "../magicui/box-reveal";
import ShineBorder from "../magicui/shine-border";
import HyperText from "../magicui/hyper-text";

function Hero() {
  return (
    <div className="bg-gradient-to-br from-light-background via-light-secondary/80 to-light-secondary/60 dark:from-dark-background dark:via-dark-primary/20 dark:to-dark-primary/10">
      <div className="flex flex-col items-center mx-20 sm:mx-10 md:mx-30 lg:mx-20 gap-14">
        <div className="text-[50px] text-center font-extrabold mt-40 sm:mx-10 md:mx-20 lg:mx-32 xl:mx-40 tracking-normal">
          <h2 className="text-green-700 dark:text-dark-primary hover:bg-gradient-to-tr from-light-background to-light-secondary dark:from-dark-background dark:to-dark-primary/30 rounded-xl py-2">
            <BoxReveal boxColor={"#2db87e"} duration={0.5}>
              <span className="underline underline-offset-[14px] decoration-[#dc4a4a] dark:decoration-[#e0e3e6] inline bg-gradient-to-l to-green-800 from-orange-500 dark:to-red-500 dark:from-[#38da97] text-transparent bg-clip-text">
                Effortlessly
              </span>{" "}
              design&nbsp;your perfect getaway using&nbsp;
              <span className="underline underline-offset-[8px] decoration-[#dc4a4a] dark:decoration-[#e0e3e6] inline bg-gradient-to-r to-green-800 from-orange-500 dark:to-red-500 dark:from-[#38da97] text-transparent bg-clip-text">
                AI
              </span>
              .
            </BoxReveal>
          </h2>
          <div className="flex justify-center">
            <BoxReveal boxColor={"#ffffff"} duration={0.6}>
              <h2 className="mt-10 text-black dark:text-gray-200 text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                <HyperText
                  text="Start your adventure now!"
                  duration={50}
                />
              </h2>
            </BoxReveal>
          </div>
        </div>
        <div className="text-green-900 dark:text-[#38da97] text-center text-xl lg:mx-20 sm:mx-0">
          <BoxReveal boxColor={"#abe3cb"} duration={0.8}>
            Personalized itineraries, curated experiences, and seamless
            bookings. All powered by AI. Your perfect trip awaits!
          </BoxReveal>
        </div>
        <motion.div
          initial={{ opacity: 0, rotateX: 90 }}
          whileInView={{ opacity: 1, rotateX: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mx-auto flex w-full max-w-lg items-center justify-center">
          <BoxReveal boxColor={"#26ae75"} duration={0.8}>
            <div className="relative z-10 flex cursor-pointer items-center overflow-hidden rounded-xl border border-black p-[1.5px] hover:scale-105">
              <div className="animate-rotate absolute -inset-1 h-full w-full rounded-full bg-[conic-gradient(#2deff2_40deg,transparent_120deg)] dark:bg-[conic-gradient(#0ee9a4_40deg,transparent_120deg)]"></div>
              <div className="relative z-20 flex rounded-[0.60rem] bg-black">
                <SignedOut>
                  <SignInButton mode="modal">
                    <Button
                      className="bg-black rounded-xl font-bold text-xl text-white hover:text-white
                         hover:bg-gradient-to-br from-black/20 to-[#26ae75]/80 border border-gray-600/70 ease-in">
                      Create a trip, It&apos;s free!
                    </Button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <Link to="/create-trip">
                    <Button
                      className="bg-black rounded-xl font-bold text-xl text-white hover:text-white
                         hover:bg-gradient-to-br from-black/20 to-[#26ae75]/80 border border-gray-600/70 ease-in">
                      Create a trip, It&apos;s free!
                    </Button>
                  </Link>
                </SignedIn>
              </div>
            </div>
          </BoxReveal>
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
            <div className="flex justify-center">
              <BoxReveal
                boxColor={"linear-gradient(to right, #e44d4d, #38da97)"}
                duration={0.5}>
                <h2 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-green-800 via-orange-500 to-black dark:from-red-500 dark:to-[#38da97] text-transparent bg-clip-text mx-auto max-w-52">
                  Features
                </h2>
              </BoxReveal>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <BoxReveal boxColor={"#ffffff"} duration={0.6}>
                <FeatureCard
                  icon="🤖"
                  title="AI-Powered Itineraries"
                  description="Personalized travel plans tailored to your preferences and budget."
                />
              </BoxReveal>
              <BoxReveal boxColor={"#ffffff"} duration={0.7}>
                <FeatureCard
                  icon="🌍"
                  title="Global Destinations"
                  description="Explore curated experiences in cities around the world."
                />
              </BoxReveal>
              <BoxReveal boxColor={"#ffffff"} duration={0.8}>
                <FeatureCard
                  icon="💼"
                  title="Seamless Bookings"
                  description="Effortlessly book hotels, activities, and transportation."
                />
              </BoxReveal>
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
            <div className="flex justify-center">
              <BoxReveal
                boxColor={"linear-gradient(to left, #e44d4d, #38da97)"}
                duration={0.8}>
                <h2 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r to-green-800 via-orange-500 from-black dark:to-red-500 dark:from-[#38da97] text-transparent bg-clip-text min-h-12 max-w-52 mx-auto">
                  Pricing
                </h2>
              </BoxReveal>
            </div>
            <div className="flex justify-center">
              <BoxReveal boxColor={"#38da97"} duration={1}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex">
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
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex">
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
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex">
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
              </BoxReveal>
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
            <div className="flex justify-center">
              <BoxReveal
                boxColor={
                  "linear-gradient(to right, #e44d4d, #38da97, #4d8de4)"
                }
                duration={0.8}>
                <h2 className="text-4xl font-bold text-center bg-black rounded-xl py-5 px-10 w-fit bg-gradient-to-r from-red-600 via-[#38da97] to-blue-600 text-transparent bg-clip-text">
                  Testimonials
                </h2>
              </BoxReveal>
            </div>
            <div className="max-w-6xl w-full">
              <div className="flex justify-center">
                <BoxReveal boxColor={"#ffffff"} duration={1.2}>
                  <Testimonials />
                </BoxReveal>
              </div>
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
            <div className="flex justify-center transition-all duration-300 hover:scale-105 hover:shadow-lg md:shadow-xl">
              <BoxReveal
                boxColor={
                  "linear-gradient(to right, #000000, #000000, #A07CFE, #FE8FB5, #FFBE7B)"
                }
                duration={1}>
                <Link to="/contact">
                  <ShineBorder
                    className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-full border bg-black text-white"
                    color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                    borderRadius={999999}
                    borderWidth={2}>
                    <span className="pointer-events-none whitespace-pre-wrap text-center text-4xl font-semibold leading-none">
                      Contact Us
                    </span>
                  </ShineBorder>
                </Link>
              </BoxReveal>
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="w-screen">
          <BoxReveal
            boxColor={"linear-gradient(to right, #000000, #000000, #38da97)"}
            duration={1.5}>
            <LandingFooter />
          </BoxReveal>
        </motion.footer>
      </div>
    </div>
  );
}

export default Hero;
