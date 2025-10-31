import React from "react";
import { useNavigate } from "react-router-dom"; // Import navigation hook

// Navigation items
const NAV_ITEMS = [
  { name: "HOME", href: "#home" },
  { name: "GAMES", href: "#games" },
  { name: "PLAYERS", href: "#players" },
];

export default function Navbar() {
  const navigate = useNavigate(); // Hook for page navigation

  // Navigate to signup page on click
  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-xl border-b border-neutral-800/50">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
        
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-5 h-5 border-2 border-red-700 rotate-45"></div>
          <span className="text-2xl font-bold tracking-wider text-white font-sans">
            SquadUp
          </span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-10">
          {NAV_ITEMS.map(({ name, href }) => (
            <a
              key={name}
              href={href}
              className="relative text-gray-400 text-sm font-semibold tracking-wide group hover:text-white transition-colors duration-300"
            >
              {name}
              <span className="absolute left-0 -bottom-1.5 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Sign Up Button */}
        <button
          onClick={handleSignUp}
          className="bg-red-700 hover:bg-red-800 text-white text-sm font-bold px-8 py-2.5 rounded-full shadow-lg hover:shadow-red-900/50 transition-all duration-300 hover:scale-105"
        >
          SIGN UP
        </button>
      </div>
    </nav>
  );
}
