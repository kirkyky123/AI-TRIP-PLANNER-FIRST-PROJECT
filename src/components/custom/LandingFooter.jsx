import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaGithub,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";

function LandingFooter() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const socialMediaStyles =
    "text-[#abe3cb] text-2xl hover:text-[#2db87e] transition-all duration-300 cursor-pointer transform hover:scale-125 hover:-translate-y-1";
  const linkStyles = "text-gray-300 hover:text-[#26ae75] hover:underline";

  const scrollToSection = (sectionId) => {
    if (isHomePage) {
      const section = document.getElementById(sectionId);
      if (section) {
        const yOffset = -200;
        const y = section.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    } else {
      window.location.href = `/#${sectionId}`;
    }
  };

  return (
    <footer className="w-full bg-black text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <a href="#" className={linkStyles}>
              Mission
            </a>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul>
              <li>
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={linkStyles}>
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("features")} className={linkStyles}>
                  Features
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("pricing")} className={linkStyles}>
                  Pricing
                </button>
              </li>
              <li>
                <Link to="/contact" className={linkStyles}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Legal</h3>
            <ul>
              <li>
                <a href="#" className={linkStyles}>
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className={linkStyles}>
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-bold">Connect</h3>
            <div className="mt-8 grid grid-cols-2 xl:grid-cols-6 gap-8 xl:gap-6">
              <FaGithub className={socialMediaStyles} />
              <FaLinkedinIn className={socialMediaStyles} />
              <FaXTwitter className={socialMediaStyles} />
              <FaInstagram className={socialMediaStyles} />
              <FaTiktok className={socialMediaStyles} />
              <FaFacebookF className={socialMediaStyles} />
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2024 AI Trip Planner. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default LandingFooter;