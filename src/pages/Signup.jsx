import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Signup = () => {
  const { register } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const socialIcons = ["in", "f", "@", "X", "G+"];
  const inputClasses =
    "w-full px-4 py-3 rounded-lg text-gray-100 placeholder-gray-200 border-b border-white bg-white/5 focus:outline-none focus:border-red-600 focus:bg-white/10 hover:bg-white/10 transition-all duration-300";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await register({ name, email, password });
      navigate("/events");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen w-screen flex overflow-y-hidden mainscreen text-gray-200">
      {/* LEFT SIDE */}
      <div className="w-1/2 p-16 flex flex-col justify-between">
        {/* Logo */}
        <div className="opacity-0 animate-slide-down [animation-delay:0.2s] [animation-fill-mode:forwards]">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 border-2 border-red-800 rotate-45" />
            <span className="badscript text-3xl font-bold tracking-wider text-white">
              SquadUp
            </span>
          </div>
        </div>

        {/* CTA Section */}
        <div className="opacity-0 animate-slide-up [animation-delay:0.6s] [animation-fill-mode:forwards]">
          <h2 className="text-5xl font-bold mb-6 leading-tight text-gray-200">
            Already have an <br /> account?
          </h2>

          <p className="text-gray-400 text-lg mb-10 leading-relaxed badscript">
            Log in and join the squad to connect with players near you.
          </p>

          <div className="flex space-x-4">
            {socialIcons.map((icon, i) => (
              <button
                key={icon}
                className="w-10 h-10 rounded border border-white/10 backdrop-blur-md bg-white/5 flex items-center justify-center text-sm font-semibold text-gray-200 hover:bg-red-800 hover:text-white hover:scale-110 transition-all duration-300 opacity-0 animate-fade-in"
                style={{
                  animationDelay: `${0.6 + i * 0.1}s`,
                  animationFillMode: "forwards",
                }}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - Signup Form */}
      <div className="flex items-center justify-center p-16 w-1/2">
        <div className="w-[900px] max-h-[650px] overflow-y-auto rounded-3xl p-10 backdrop-blur-sm bg-black/10 border border-white/30 shadow-2xl opacity-0 animate-scale-in [animation-delay:0.5s] [animation-fill-mode:forwards]">
          <h2 className="text-4xl font-bold text-gray-100 mb-8">Sign Up</h2>

          {/* Error Message */}
          {error && (
            <div className="bg-red-900/40 border border-red-600 text-red-300 p-3 rounded-lg mb-6 text-sm animate-fade-in transition-all duration-300">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="opacity-0 animate-slide-right [animation-delay:0.6s] [animation-fill-mode:forwards]">
              <label className="block text-gray-100 text-sm mb-2 font-medium">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClasses}
                required
              />
            </div>

            {/* Email Field */}
            <div className="opacity-0 animate-slide-right [animation-delay:0.7s] [animation-fill-mode:forwards]">
              <label className="block text-gray-100 text-sm mb-2 font-medium">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClasses}
                required
              />
            </div>

            {/* Password Field */}
            <div className="opacity-0 animate-slide-right [animation-delay:0.9s] [animation-fill-mode:forwards]">
              <label className="block text-gray-100 text-sm mb-2 font-medium">
                Password
              </label>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClasses}
                required
              />
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start opacity-0 animate-fade-in [animation-delay:0.9s] [animation-fill-mode:forwards]">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 mr-3 w-4 h-4 accent-red-600 cursor-pointer"
                required
              />
              <label
                htmlFor="terms"
                className="text-gray-400 text-sm leading-relaxed"
              >
                I agree to the{" "}
                <a className="text-red-800 underline hover:text-red-400 transition-colors duration-300">
                  Terms of Service
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex items-center space-x-4 pt-4 opacity-0 animate-slide-up [animation-delay:1s] [animation-fill-mode:forwards]">
              <button
                type="submit"
                className="px-8 py-3 rounded-lg text-white font-semibold bg-transparent border border-red-800 hover:bg-red-800 hover:scale-105 transition-all duration-300"
              >
                Create Account
              </button>
              <Link
                to="/login"
                className="text-gray-400 hover:text-red-500 font-medium transition-colors duration-300"
              >
                Already have an account?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
