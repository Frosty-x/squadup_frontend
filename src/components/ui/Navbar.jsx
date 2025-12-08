import { useNavigate, useLocation } from "react-router-dom";
import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { LogOut } from "lucide-react";

// NavLink component defined outside to prevent recreation on each render
const NavLink = ({ name, href, onClick, isActive }) => {
  return (
    <button
      onClick={onClick}
      className={`relative text-sm font-semibold tracking-wide group transition-colors duration-300 ${
        isActive ? "text-white" : "text-gray-400 hover:text-white"
      }`}
    >
      {name}
      <span
        className={`absolute left-0 -bottom-1.5 h-0.5 bg-red-600 transition-all duration-300 ${
          isActive ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
    </button>
  );
};

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, loading } = useContext(AuthContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  const NAV_ITEMS = [
    { name: "HOME", href: "/" },
    { name: "GAMES", href: "/BrowseGame" },
    { name: "PLAYERS", href: "/FindPlayer" },
    { name: "ABOUT", href: "/about" },
  ];

  const handleNavigate = (path) => {
    navigate(path);
    setMenuOpen(false);
    setProfileOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setMenuOpen(false);
    setProfileOpen(false);
  };

  // Close dropdown when clicked outside
  useEffect(() => {
    const closeDropdown = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    
    if (profileOpen) {
      document.addEventListener("mousedown", closeDropdown);
      return () => document.removeEventListener("mousedown", closeDropdown);
    }
  }, [profileOpen]);

  if (loading) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-3xl border-b border-neutral-800/50 bg-black/80">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4 sm:px-6">

        {/* Logo */}
        <button
          onClick={() => handleNavigate("/")}
          className="flex items-center space-x-2 sm:space-x-3 hover:opacity-80 transition-opacity"
        >
          <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-red-700 rotate-45" />
          <span className="text-xl sm:text-2xl tracking-wider text-white font-sans">
            SquadUp
          </span>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          {NAV_ITEMS.map((item) => (
            <NavLink 
              key={item.name} 
              name={item.name}
              href={item.href}
              onClick={() => handleNavigate(item.href)}
              isActive={location.pathname === item.href}
            />
          ))}
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-3 relative" ref={dropdownRef}>
          {user ? (
            <>
              {/* Profile Button → Opens Dropdown */}
              <button
                onClick={() => setProfileOpen((prev) => !prev)}
                className="rounded-full border border-amber-50 transition-all duration-300 hover:scale-105"
              >
                <img
                  src={user.profilePic}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover border-2"
                />
              </button>

              {/* Dropdown */}
              {profileOpen && (
                <div className="absolute top-16 right-0 bg-neutral-900 border border-neutral-700 rounded-xl shadow-xl w-44 py-2">
                  <button
                    onClick={() => handleNavigate("/dashboard")}
                    className="w-full px-4 py-2 text-left text-gray-300 hover:bg-neutral-800 hover:text-white transition"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 flex items-center gap-2 text-left text-red-500 hover:bg-neutral-800 hover:text-red-400 transition"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <button
              onClick={() => handleNavigate("/signin")}
              className="bg-red-700 hover:bg-red-800 text-white text-sm font-bold px-6 lg:px-8 py-2.5 rounded-full shadow-lg hover:shadow-red-900/50 transition-all duration-300 hover:scale-105"
            >
              Sign In
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
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
                className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold tracking-wide ${
                  location.pathname === item.href
                    ? "text-white bg-red-700/20 border-l-2 border-red-600"
                    : "text-gray-400 hover:text-white hover:bg-neutral-800/50"
                }`}
              >
                {item.name}
              </button>
            ))}

            {user ? (
              <>
                <button
                  onClick={() => handleNavigate("/dashboard")}
                  className="w-full bg-red-700 hover:bg-red-800 text-white text-sm font-bold px-4 py-2.5 rounded-full mt-2"
                >
                  Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 bg-neutral-800 hover:bg-red-700 text-white text-sm font-bold px-4 py-2.5 rounded-full"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => handleNavigate("/signin")}
                className="w-full bg-red-700 hover:bg-red-800 text-white text-sm font-bold px-4 py-2.5 rounded-full mt-2"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}