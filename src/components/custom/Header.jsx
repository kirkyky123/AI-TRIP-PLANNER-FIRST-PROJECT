import { useState } from "react";
import { Button } from "../ui/button";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { ThemeToggle } from "./ThemeToggle";
import { useTheme } from "next-themes";

function Header() {
  const { theme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isSignedIn } = useUser();

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const yOffset = -200;
      const y =
        section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const goToContact = () => {
    console.log("contact");
    navigate("/contact");
  };

  return (
    <div className="sticky top-0 z-50 bg-gradient-to-tr from-light-background via-light-background/85 to-light-secondary dark:from-dark-background  dark:to-dark-primary/50 shadow-lg border-b border-light-border dark:border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center cursor-pointer">
              {theme === "light" ? (
                <img
                  src="/logo.svg"
                  className="h-10 w-10 hover:scale-[1.03] transition-transform"
                  alt="Logo"
                />
              ) : (
                <img
                  src="/darklogo.svg"
                  className="h-10 w-10 hover:scale-[1.03] transition-transform"
                  alt="Logo"
                />
              )}
              <span className="text-2xl md:text-xl lg:text-2xl font-bold text-light-foreground dark:text-dark-foreground ml-2">
                TripPlanner
              </span>
            </Link>
          </div>

          {isHomePage && (
            <nav className="hidden lg:flex space-x-6">
              {["Features", "Pricing", "Testimonials", "Contact"].map(
                (item) => (
                  <button
                    key={item}
                    onClick={
                      item !== "Contact"
                        ? () => scrollToSection(item.toLowerCase())
                        : () => goToContact()
                    }
                    className="text-black dark:text-white font-semibold dark:hover:text-[#38da97] transition-all duration-300 px-3 py-2 rounded-lg hover:bg-black hover:text-white dark:hover:bg-white/10 transform hover:scale-105">
                    {item}
                  </button>
                )
              )}
            </nav>
          )}

          <SignedIn>
            <button
              className={`${
                isHomePage ? "lg:hidden" : "md:hidden"
              } text-black dark:text-white`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu size={24} />
            </button>
          </SignedIn>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <SignedIn>
              <Link
                to="/create-trip"
                className={`hidden ${isHomePage ? "lg:block" : "md:block"}`}>
                <Button
                  className="font-bold bg-gradient-to-tr from-blue-400 via-orange-200 to-blue-400 dark:from-dark-primary dark:via-black dark:to-dark-primary text-black dark:text-white
                  border-2 border-light-border dark:border-dark-border transition-all rounded-xl shadow-md hover:shadow-lg transform hover:scale-105">
                  Create new trip
                </Button>
              </Link>
              <div className="flex items-center space-x-4">
                <Link
                  to="/my-trips"
                  className={`hidden ${isHomePage ? "lg:block" : "md:block"}`}>
                  <Button className="bg-black text-white font-bold hover:bg-gray-800 transition-all rounded-xl shadow-md hover:shadow-lg transform hover:scale-105">
                    View Trips
                  </Button>
                </Link>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox:
                        "h-10 w-10 rounded-full border-2 border-blue-500 dark:border-[#38da97] hover:scale-110 transition-transform shadow-md hover:shadow-lg",
                    },
                  }}
                />
              </div>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal" forceRedirectUrl="/create-trip">
                <Button
                  variant="outline"
                  className="bg-black text-white font-bold hover:bg-light-secondary/80 dark:hover:bg-dark-primary/80 hover:text-white transition-all duration-300 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105">
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </div>
      {isMenuOpen && isSignedIn && (
        <div
          className={`${
            isHomePage ? "lg:hidden" : "md:hidden"
          } bg-light-background dark:bg-dark-background py-4 flex flex-col`}>
          {isHomePage &&
            ["Features", "Pricing", "Testimonials", "Contact"].map((item) => (
              <button
                key={item}
                onClick={
                  item !== "Contact"
                    ? () => scrollToSection(item.toLowerCase())
                    : () => goToContact()
                }
                className="block w-full text-left text-light-foreground dark:text-white font-semibold hover:text-white dark:hover:text-[#38da97] transition-all duration-300 px-6 py-2
                dark:hover:bg-white/10 hover:bg-black">
                {item}
              </button>
            ))}
          <div className="flex flex-col items-center w-full">
            <Link to="/create-trip" className="w-64 px-6 py-2">
              <Button
                className="w-full font-bold bg-gradient-to-tr from-light-primary via-light-primary/50 to-light-secondary dark:from-black dark:via-black/50 dark:to-dark-primary text-white border-2 border-light-border dark:border-dark-border
                hover:text-white transition-all duration-300 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105">
                Create new trip
              </Button>
            </Link>
            <Link to="/my-trips" className="w-64 px-6 py-2">
              <Button className="w-full bg-black text-white font-bold border-2 border-gray-300 hover:bg-gray-800 transition-all duration-300 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105">
                View Trips
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
