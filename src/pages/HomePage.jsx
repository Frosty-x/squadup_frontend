import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Users, Star, TrendingUp } from "lucide-react";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";
import { AuthContext } from "../context/AuthContext";

const FEATURES = [
  {
    icon: Users,
    title: "Find Partners",
    text: "Connect with athletes in your city based on sport type and skill level. Never play alone again.",
    gradient: "from-blue-600/20 to-cyan-600/20"
  },
  {
    icon: Star,
    title: "Rate Players",
    text: "Build your reputation with ratings from teammates. See who's reliable and skilled.",
    gradient: "from-cyan-600/20 to-blue-600/20"
  },
  {
    icon: TrendingUp,
    title: "Track Progress",
    text: "Monitor your games played, ratings, and skill improvements across multiple sports.",
    gradient: "from-blue-600/20 to-purple-600/20"
  }
];

const STEPS = [
  {
    title: "Create Profile",
    description: "Sign up and add your sports, skill levels, and location preferences."
  },
  {
    title: "Find Matches",
    description: "Browse athletes nearby who match your sport and skill level."
  },
  {
    title: "Play & Rate",
    description: "Connect, play together, and rate each other to build trust."
  }
];

export default function HomePage() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleGetStarted = () => {
    navigate(user ? "/dashboard" : "/signup");
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden overflow-y-auto  w-full max-w-full">
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex flex-col lg:flex-row items-center justify-center pt-20 sm:pt-24 pb-16 px-4 sm:px-8  overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-100"
          >
            <source src="/mv5.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0" />
        </div>
        
        {/* Animated Background Overlays */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-48 sm:w-64 h-48 sm:h-64 bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-64 sm:w-80 h-64 sm:h-80 bg-cyan-700/5 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        {/* Content Wrapper */}
        <div className="max-w-7xl w-full  items-center relative z-10">
          
          {/* Left Content */}
          <div className="space-y-6 animate-slideInLeft text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
            <div className="inline-block px-4 py-2 bg-blue-600/20 border border-blue-600/30 rounded-full mb-4">
              <span className="text-cyan-400 text-xs sm:text-sm font-bold">
                🔥 JOIN THE MOVEMENT
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight tracking-tight">
              <span className="block text-white mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text">
                FIND YOUR
              </span>
              <span className=" bg-gradient-to-r  from-blue-500 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                PERFECT TEAMMATE!
              </span>
            </h1>

            <div className="space-y-3 text-base sm:text-lg text-gray-300 pl-1">
              <p className="font-medium flex items-center justify-center badscript lg:justify-start gap-2">
                               Connect with athletes in your area.
              </p>
              <p className="flex items-center justify-center badscript lg:justify-start gap-2">
               
                Match skills, rate players, and level up your game.
              </p>
            </div>

            <button
              onClick={handleGetStarted}
              className="group relative bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold text-sm sm:text-base px-8 sm:px-10 py-3.5 sm:py-4 rounded-full transition-all duration-300 flex items-center justify-center lg:justify-start gap-3 hover:scale-105 shadow-2xl shadow-blue-900/50 hover:shadow-cyan-600/60 mt-8 overflow-hidden mx-auto lg:mx-0"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="relative">GET STARTED</span>
              <ChevronRight
                className="relative group-hover:translate-x-1 transition-transform duration-300"
                size={20}
              />
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-neutral-900/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.05),transparent_50%)]" />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h2 className="text-4xl lg:text-6xl font-black text-white mb-4">
            WHY <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">SQUADUP?</span>
          </h2>
          <p className="text-gray-400 text-xl badscript mb-20 max-w-2xl mx-auto">
            Everything you need to find the perfect sports partner
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURES.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group bg-gradient-to-br from-neutral-900 to-black border border-neutral-800 rounded-3xl p-8 hover:border-blue-600/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-900/30 relative overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  <div className="relative z-10 flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-700/30 to-cyan-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-blue-600/20">
                      <Icon className="text-cyan-400" size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 badscript leading-relaxed">{feature.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* How It Works */}
      <section className="py-24 px-6 text-center relative bg-gradient-to-b from-black to-neutral-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl lg:text-6xl font-black text-white mb-4">
            HOW IT <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">WORKS</span>
          </h2>
          <p className="text-gray-400 text-xl badscript mb-20 max-w-2xl mx-auto">
            Get started in three simple steps
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {STEPS.map((step, index) => (
              <div key={index} className="relative">
                <div className="relative inline-block mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center text-4xl font-black shadow-xl shadow-blue-900/50 hover:scale-110 transition-transform duration-300">
                    {index + 1}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full animate-pulse" />
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-blue-600 rounded-full animate-pulse delay-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 hover:text-cyan-400 transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-400 badscript leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 bg-gradient-to-b from-neutral-900 via-blue-950/10 to-black text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent_70%)]" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            READY TO <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-400 bg-clip-text text-transparent">SQUAD UP?</span>
          </h2>
          <p className="text-gray-300 text-xl mb-12 badscript">
            Join thousands of athletes finding their perfect teammates
          </p>
          <button
            onClick={handleGetStarted}
            className="group relative bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold text-lg px-14 py-5 rounded-full transition-all duration-300 hover:scale-110 shadow-2xl shadow-blue-900/50 hover:shadow-cyan-600/70 inline-flex items-center gap-3 overflow-hidden"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <span className="relative">{user ? "GO TO DASHBOARD" : "JOIN NOW - IT'S FREE"}</span>
            <ChevronRight
              className="relative group-hover:translate-x-1 transition-transform duration-300"
              size={24}
            />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}