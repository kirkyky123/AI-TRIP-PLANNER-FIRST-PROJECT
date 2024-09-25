/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { BoxReveal } from "../magicui/box-reveal";
import { Button } from "../ui/button";

function CreateTripButton({ theme }) {
  return (
    <motion.div
      initial={{ opacity: 0, rotateX: 90 }}
      whileInView={{ opacity: 1, rotateX: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="mx-auto flex items-center justify-center">
      <BoxReveal
        boxColor={
          theme === "light"
            ? "linear-gradient(to right, #ffffff, #fed7aa)"
            : "linear-gradient(to right, #000000, #26ae75)"
        }
        duration={0.8}>
        <div className="flex justify-center m-2">
          <div className="relative z-10 flex cursor-pointer items-center overflow-hidden rounded-xl p-[3.5px] w-full hover:scale-105">
            <div
              className="animate-rotate absolute -inset-1 h-full w-full rounded-full bg-[conic-gradient(#ff9d36_40deg,transparent_120deg)]
                              dark:bg-[conic-gradient(#0ee9a4_40deg,transparent_120deg)]"></div>
            <div className="relative z-20 flex rounded-[0.60rem] bg-light-foreground dark:bg-black hover:bg-gradient-to-br dark:from-black/20 dark:to-[#26ae75]/80">
              <Button
                className="bg-light-foreground dark:bg-black rounded-xl font-bold text-xl text-white hover:text-white
                         hover:bg-gradient-to-br from-orange-300 to-blue-600 dark:from-black/20 dark:to-[#26ae75]/80 border border-gray-600/70">
                Create a trip, It&apos;s free!
              </Button>
            </div>
          </div>
        </div>
      </BoxReveal>
    </motion.div>
  );
}

export default CreateTripButton;
