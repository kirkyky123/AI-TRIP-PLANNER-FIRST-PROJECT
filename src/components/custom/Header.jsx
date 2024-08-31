import { useState } from "react";
import { Button } from "../ui/button";
import { useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";

function Header() {
  const location = useLocation();
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

  return (
    <div className="sticky top-0 z-50 bg-gradient-to-tr from-black to-[#26ae75]/90 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <a href="/" className="flex items-center space-x-2 cursor-pointer hover:scale-110 transition-transform">
            <img
              src="/logo.svg"
              className="h-10 w-10"
              alt="Logo"
            />
            <span className="text-2xl font-bold text-white">TripPlanner</span>
          </a>

          {isHomePage && (
            <>
              <nav className="hidden lg:flex space-x-6">
                {["Features", "Pricing", "Testimonials", "Contact"].map(
                  (item) => (
                    <button
                      key={item}
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className="text-white font-semibold hover:text-[#38da97] transition-all duration-300 px-3 py-2 rounded-lg hover:bg-white/10 transform hover:scale-105">
                      {item}
                    </button>
                  )
                )}
              </nav>
              <button
                className="lg:hidden text-white"
                onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <Menu size={24} />
              </button>
            </>
          )}

          <div className="flex items-center space-x-4">
            <SignedIn>
              <a href="/create-trip" className="hidden sm:block">
                <Button
                  className="font-bold bg-gradient-to-br from-blue-600/80 via-[#19915f] to-red-600/80 text-white border-2 border-black
                  hover:text-white transition-all duration-300 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105">
                  Create new trip
                </Button>
              </a>
              <div className="flex items-center space-x-4">
                <a href="/my-trips" className="hidden sm:block">
                  <Button className="bg-black text-white font-bold hover:bg-gray-800 transition-all duration-300 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105">
                    View Trips
                  </Button>
                </a>
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "h-10 w-10 rounded-full border-2 border-[#38da97] hover:scale-110 transition-transform shadow-md hover:shadow-lg"
                    }
                  }}
                />
              </div>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <Button
                  variant="outline"
                  className="bg-black text-white font-bold hover:bg-gray-800 hover:text-white transition-all duration-300 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105">
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </div>
      {isMenuOpen && isHomePage && (
        <div className="lg:hidden bg-black/90 py-4 flex flex-col sm:flex-row">
          {["Features", "Pricing", "Testimonials", "Contact"].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="block w-full text-left text-white font-semibold hover:text-[#38da97] transition-all duration-300 px-6 py-2 sm:text-center
              hover:bg-white/10">
              {item}
            </button>
          ))}
          <a href="/create-trip" className="block w-64 px-6 py-2 sm:hidden">
            <Button
              className="w-full font-bold bg-gradient-to-br from-blue-600/80 via-[#19915f] to-red-600/80 text-white border-2 border-gray-300
              hover:text-white transition-all duration-300 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105">
              Create new trip
            </Button>
          </a>
          {isSignedIn ? (
            <a href="/my-trips" className="block w-64 px-6 py-2 mt-2 sm:hidden">
              <Button className="w-full bg-black text-white font-bold border-2 border-gray-300 hover:bg-gray-800 transition-all duration-300 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105">
                View Trips
              </Button>
            </a>
          ) : (
            <SignInButton mode="modal">
              <div className="block w-64 px-6 py-2 mt-2 sm:hidden">
                <Button
                  variant="outline"
                  className="w-full bg-black text-white font-bold hover:bg-gray-800 hover:text-white transition-all duration-300 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105">
                  Sign In
                </Button>
              </div>
            </SignInButton>
          )}
        </div>
      )}
    </div>
  );
}

export default Header;
