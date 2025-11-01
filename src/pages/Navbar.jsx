import React from "react";
import { useNavigate, useLocation, href } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import Blank from "../components/Blank";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); 
  const {user, loading} = useContext(AuthContext)

  // Navigate to signup page on click
  const handleSignUp = () => {
    navigate("/signup");
  };

  // Handle navigation
  const handleNavClick = (href) => {
    navigate(href);
  };

  if(loading) return null

  const NAV_ITEMS = user
   ? [
      {name:"HOME", href:"/"},
      {name:"GAMES", href:"/games"},
      {name:"PLAYERS", href:"/players"}
   ]
   : [{name:"HOME", href:"/"}]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50  backdrop-blur-xl border-b border-neutral-800/50">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
        
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-5 h-5 border-2 border-red-700 rotate-45"></div>
          <span className="text-2xl badscript tracking-wider text-white font-sans">
            SquadUp
          </span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-10">
          {NAV_ITEMS.map(({ name, href }) => {
            const isActive = location.pathname === href;
            
            return (
              <button
                key={name}
                onClick={() => handleNavClick(href)}
                className={`relative text-sm font-semibold tracking-wide group transition-colors duration-300 ${
                  isActive 
                    ? "text-white" 
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {name}
                <span 
                  className={`absolute left-0 -bottom-1.5 h-0.5 bg-red-600 transition-all duration-300 ${
                    isActive 
                      ? "w-full" 
                      : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </button>
            );
          })}
        </div>

        {/* Sign Up Button */}
        <button
          onClick={handleSignUp}
          className="bg-red-700 hover:bg-red-800 text-white text-sm font-bold px-8 py-2.5 rounded-full shadow-lg hover:shadow-red-900/50 transition-all duration-300 hover:scale-105"
        >
          {user ? "Sign Up" : "Login"}
        </button>
      </div>
    </nav>
  );
}