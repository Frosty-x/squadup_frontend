import { useNavigate, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  if (loading) return null;

  const NAV_ITEMS = [
    { name: "HOME", href: "/" },
    { name: "GAMES", href: "/BrowseGame" },
    { name: "PLAYERS", href: "/FindPlayer" },
    { name: "ABOUT", href: "/about" },
  ];

  const handleNavigate = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  const NavLink = ({ name, href }) => {
    const active = location.pathname === href;
    return (
      <button
        onClick={() => handleNavigate(href)}
        className={`relative text-sm font-semibold tracking-wide group transition-colors duration-300 ${
          active ? "text-white" : "text-gray-400 hover:text-white"
        }`}
      >
        {name}
        <span
          className={`absolute left-0 -bottom-1.5 h-0.5 bg-red-600 transition-all duration-300 ${
            active ? "w-full" : "w-0 group-hover:w-full"
          }`}
        />
      </button>
    );
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-3xl border-b border-neutral-800/50 bg-black/80">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4 sm:px-6">
        {/* Logo */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center space-x-2 sm:space-x-3 hover:opacity-80 transition-opacity"
        >
          <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-red-700 rotate-45" />
          <span className="text-xl sm:text-2xl badscript tracking-wider text-white font-sans">
            SquadUp
          </span>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.name} {...item} />
          ))}
        </div>

        {/* Desktop Auth Button */}
        <button
          onClick={() => handleNavigate(user ? "/dashboard" : "/signin")}
          className="hidden md:block bg-red-700 hover:bg-red-800 text-white text-sm font-bold px-6 lg:px-8 py-2.5 rounded-full shadow-lg hover:shadow-red-900/50 transition-all duration-300 hover:scale-105"
        >
          {user ? "Dashboard" : "Sign In"}
        </button>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-neutral-800/50 bg-black/95 backdrop-blur-xl">
          <div className="px-4 py-4 space-y-3">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigate(item.href)}
                className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold tracking-wide transition-colors duration-200 ${
                  location.pathname === item.href
                    ? "text-white bg-red-700/20 border-l-2 border-red-600"
                    : "text-gray-400 hover:text-white hover:bg-neutral-800/50"
                }`}
              >
                {item.name}
              </button>
            ))}

            <button
              onClick={() => handleNavigate(user ? "/dashboard" : "/signin")}
              className="w-full bg-red-700 hover:bg-red-800 text-white text-sm font-bold px-4 py-2.5 rounded-full shadow-lg transition-all duration-300 mt-2"
            >
              {user ? "Dashboard" : "Sign In"}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
