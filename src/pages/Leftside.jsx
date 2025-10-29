import React from "react";

const Leftside = () => {
  return (
    <div className="leftside w-1/2 p-16 flex flex-col justify-between  text-gray-200 relative animate-fade-in">
      <div
        className="relative z-10 opacity-0 animate-slide-down"
        style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
      >
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 border-2 border-red-800 rotate-45"></div>
          <span className="badscript text-3xl font-bold tracking-wider text-white ">
            SquadUp
          </span>
        </div>
      </div>
      <div
        className="relative z-10 opacity-0 animate-slide-up"
        style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
      >
        <h2 className="text-5xl font-bold mb-6 leading-tight text-gray-200 ">
          Don’t have an <br /> account ?
        </h2>

        <p className="text-gray-400 text-lg mb-10 leading-relaxed badscript ">
          Create your account and start finding players to match your energy.
        </p>

        {/* Social Buttons */}
        <div className="flex space-x-4">
          {["in", "f", "@", "t", "G+"].map((icon, i) => (
            <button
              key={i}
              className="w-10 h-10 rounded border border-white/10 backdrop-blur-md bg-white/5 
                         flex items-center justify-center text-sm font-semibold text-gray-200
                         hover:bg-red-800 hover:text-white hover:scale-110
                         transition-all duration-300 opacity-0 animate-fade-in"
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
  );
};

export default Leftside;
