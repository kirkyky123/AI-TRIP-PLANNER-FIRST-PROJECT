import { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaGithub,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import BoxReveal from "../magicui/box-reveal";
import { useTheme } from "next-themes";

function ContactForm() {
  const { theme } = useTheme();
  const socialMediaStyles =
    "text-2xl text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-[#38d996] transition-all duration-300 cursor-pointer transform hover:scale-125 hover:-translate-y-1";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      setFormData({ name: "", email: "", message: "" });
      toast.success("Email sent successfully!");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-4 flex flex-col">
      <form onSubmit={handleSubmit} className="space-y-6 mx-10 sm:mx-20">
        <div>
          <BoxReveal
            boxColor={theme === "light" ? "#3b82f6" : "#abe3cb"}
            duration={0.1}
            delay={0.1}>
            <label
              htmlFor="name"
              className="block text-lg font-bold text-blue-500 dark:text-[#abe3cb] ">
              Name
            </label>
          </BoxReveal>
          <BoxReveal
            boxColor={theme === "light" ? "#FFFFFF" : "#000000"}
            duration={0.2}
            width="100%"
            delay={0.2}>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`mt-1  block w-full rounded-md border font-semibold ${
                errors.name ? "border-red-500" : "border-gray-600"
              } bg-white dark:bg-black text-black dark:text-white px-3 py-2 focus:border-orange-300 dark:focus:border-[#2db87e] focus:outline-none focus:ring-1 focus:ring-orange-300 dark:focus:ring-[#2db87e]`}
            />
          </BoxReveal>
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>
        <div>
          <BoxReveal
            boxColor={theme === "light" ? "#3b82f6" : "#abe3cb"}
            duration={0.3}
            delay={0.3}>
            <label
              htmlFor="email"
              className="block text-lg font-bold text-blue-500 dark:text-[#abe3cb]">
              Email
            </label>
          </BoxReveal>
          <BoxReveal
            boxColor={theme === "light" ? "#FFFFFF" : "#000000"}
            duration={0.4}
            width="100%"
            delay={0.4}>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border font-semibold ${
                errors.email ? "border-red-500" : "border-gray-600"
              } bg-white dark:bg-black text-black dark:text-white px-3 py-2 focus:border-orange-300 dark:focus:border-[#2db87e] focus:outline-none focus:ring-1 focus:ring-orange-300 dark:focus:ring-[#2db87e]`}
            />
          </BoxReveal>
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>
        <div>
          <BoxReveal
            boxColor={theme === "light" ? "#3b82f6" : "#abe3cb"}
            duration={0.5}
            delay={0.5}>
            <label
              htmlFor="message"
              className="block text-lg font-bold text-blue-500 dark:text-[#abe3cb]">
              Message
            </label>
          </BoxReveal>
          <BoxReveal
            boxColor={theme === "light" ? "#FFFFFF" : "#000000"}
            duration={0.6}
            width="100%"
            delay={0.6}>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className={`mt-1 block w-full rounded-md border ${
                errors.message ? "border-red-500" : "border-gray-600"
              } bg-white dark:bg-black text-black dark:text-white px-3 py-2 focus:border-orange-300 dark:focus:border-[#2db87e] focus:outline-none focus:ring-1 focus:ring-orange-300 dark:focus:ring-[#2db87e] resize-none`}></textarea>
          </BoxReveal>

          {errors.message && (
            <p className="mt-1 text-sm text-red-500">{errors.message}</p>
          )}
        </div>
        <div className="flex justify-center">
          <BoxReveal
            boxColor={theme === "light" ? "#FFFFFF" : "#abe3cb"}
            duration={0.7}
            delay={0.6}
            width="100%">
            <div className="flex justify-center my-1">
              <Button
                type="submit"
                className="w-fit items-center text-lg rounded-xl border-2 border-gray-700 bg-white dark:bg-black text-black dark:text-white font-semibold px-4
            hover:bg-gradient-to-tr from-orange-200 to-blue-300 dark:hover:bg-gradient-to-tr dark:from-green-600 dark:to-black 
            hover:scale-105 transition-transform duration-300">
                Send Message
              </Button>
            </div>
          </BoxReveal>
        </div>
      </form>
      <div className="mt-8 flex justify-center space-x-6">
        <FaGithub className={socialMediaStyles} />
        <FaLinkedinIn className={socialMediaStyles} />
        <FaXTwitter className={socialMediaStyles} />
        <FaInstagram className={socialMediaStyles} />
        <FaTiktok className={socialMediaStyles} />
        <FaFacebookF className={socialMediaStyles} />
      </div>
    </div>
  );
}

export default ContactForm;
