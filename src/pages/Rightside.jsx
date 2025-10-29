import { Eye } from "lucide-react";

const Rightside = () => {
  return (
    <div className=" flex items-center justify-center p-16">
      <div
        className="w-[900px] h-[500px] rounded-3xl p-10 backdrop-blur-sm bg-black/10 border border-white/30 shadow-2xl
                   opacity-0 animate-scale-in"
        style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
      >
        <h2 className="text-4xl font-bold text-gray-100 mb-8">Log In</h2>

        <form className="space-y-6">
          <div
            className="opacity-0 animate-slide-right"
            style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
          >
            <label className="block text-gray-100 text-sm mb-2 font-medium orbital">
              Email
            </label>
            <input
              type="email"
              placeholder="Example@gmail.com"
              className="w-full px-4 py-3 rounded-lg text-gray-100 placeholder-gray-200
                         border-b border-white bg-white/5
                         focus:outline-none focus:border-red-600 focus:bg-white/10
                         hover:bg-white/10 transition-all duration-300"
            />
          </div>
          <div
            className="opacity-0 animate-slide-right"
            style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}
          >
            <label className="block text-gray-100 text-sm mb-2 font-medium">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="••••••••••••"
                className="w-full px-4 py-3 rounded-lg text-gray-100 placeholder-gray-200
                            border-b border-white bg-white/5
                           focus:outline-none focus:border-red-600 focus:bg-white/10
                           hover:bg-white/10 transition-all duration-300 backdrop-blur-lg"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2
                           text-gray-400 hover:text-red-600 transition-all duration-300 hover:scale-110"
              >
                <Eye size={20} />
              </button>
            </div>
          </div>
          <div
            className="flex items-start opacity-0 animate-fade-in"
            style={{ animationDelay: "0.7s", animationFillMode: "forwards" }}
          >
            <input
              type="checkbox"
              id="terms"
              className="mt-1 mr-3 w-4 h-4 accent-red-600 cursor-pointer"
            />
            <label
              htmlFor="terms"
              className="text-gray-400 text-sm leading-relaxed"
            >
              I agree to the{" "}
              <a
                href="#"
                className="text-red-800 underline hover:text-red-400 transition-colors duration-300"
              >
                Terms of Service
              </a>
            </label>
          </div>
          <div
            className="flex items-center space-x-4 pt-4 opacity-0 animate-slide-up"
            style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}
          >
            <button
              type="submit"
              className="px-8 py-3 rounded-lg text-white font-semibold 
                         bg-transparent border border-red-800
                         transform hover:bg-red-800 hover:scale-105 transition-all duration-300"
            >
              Log In
            </button>
            <a
              href="#"
              className="text-gray-400 hover:text-red-500 font-medium transition-colors  duration-300"
            >
              Create an account?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Rightside;
