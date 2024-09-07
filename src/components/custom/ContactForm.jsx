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

function ContactForm() {

  const socialMediaStyles = "text-[#abe3cb] text-2xl hover:text-[#2db87e] transition-all duration-300 cursor-pointer transform hover:scale-125 hover:-translate-y-1";

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
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
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
    <div className="w-full max-w-2xl mx-auto mt-10 ">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-lg font-bold text-[#abe3cb]">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border font-semibold ${
              errors.name ? 'border-red-500' : 'border-gray-600'
            } bg-black text-white px-3 py-2 focus:border-[#2db87e] focus:outline-none focus:ring-1 focus:ring-[#2db87e]`}
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-lg font-bold text-[#abe3cb]">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border font-semibold ${
              errors.email ? 'border-red-500' : 'border-gray-600'
            } bg-black text-white px-3 py-2 focus:border-[#2db87e] focus:outline-none focus:ring-1 focus:ring-[#2db87e]`}
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-lg font-bold text-[#abe3cb]">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className={`mt-1 block w-full rounded-md border ${
              errors.message ? 'border-red-500' : 'border-gray-600'
            } bg-black text-white px-3 py-2 focus:border-[#2db87e] focus:outline-none focus:ring-1 focus:ring-[#2db87e] resize-none`}
          ></textarea>
          {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
        </div>
        <div>
          <Button
            type="submit"
            className="w-full border-2 border-[#2db87e] bg-black text-white font-bold py-2 px-4 rounded-md hover:bg-[#26ae75] transition duration-300">
            Send Message
          </Button>
        </div>
      </form>
      <div className="mt-8 flex justify-center space-x-6">
        <FaGithub className={socialMediaStyles}/>
        <FaLinkedinIn className={socialMediaStyles}/>
        <FaXTwitter className={socialMediaStyles}/>
        <FaInstagram className={socialMediaStyles}/>
        <FaTiktok className={socialMediaStyles}/>
        <FaFacebookF className={socialMediaStyles}/>
      </div>
    </div>
  );
}

export default ContactForm;
