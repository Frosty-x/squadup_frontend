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
    gradient: "from-red-800/20 to-red-700/20"
  },
  {
    icon: Star,
    title: "Rate Players",
    text: "Build your reputation with ratings from teammates. See who's reliable and skilled.",
    gradient: "from-red-700/20 to-red-600/20"
  },
  {
    icon: TrendingUp,
    title: "Track Progress",
    text: "Monitor your games played, ratings, and skill improvements across multiple sports.",
    gradient: "from-red-600/20 to-red-800/20"
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
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-red-950/20 text-white overflow-x-hidden overflow-y-auto w-full max-w-full">
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex flex-col lg:flex-row items-center justify-center pt-20 sm:pt-24 pb-16 px-4 sm:px-8 overflow-hidden">

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
        </div>

        {/* Blood Red Glow Overlays */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-red-700/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-red-800/30 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        {/* Content */}
        <div className="max-w-7xl w-full items-center relative z-10">

          {/* Left Text */}
          <div className="space-y-6 animate-slideInLeft text-center lg:text-left max-w-2xl mx-auto lg:mx-0">

            <div className="inline-block px-4 py-2 bg-red-900/30 border border-red-700/40 rounded-full mb-4">
              <span className="text-red-400 text-xs sm:text-sm font-bold">
                ⚡ LEVEL UP YOUR GAME
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight tracking-tight">
              <span className="block text-white mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text">
                FIND YOUR
              </span>
              <span className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 bg-clip-text text-transparent">
                PERFECT TEAMMATE!
              </span>
            </h1>

            <div className="space-y-3 text-base sm:text-lg text-gray-300 pl-1">
              <p className="font-medium flex items-center justify-center badscript lg:justify-start gap-2">
                Connect with athletes instantly.
              </p>
              <p className="flex items-center justify-center badscript lg:justify-start gap-2">
                Match skills, grow stats, and dominate the field.
              </p>
            </div>

            <button
              onClick={handleGetStarted}
              className="group relative bg-gradient-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900 text-white font-bold text-sm sm:text-base px-8 sm:px-10 py-3.5 sm:py-4 rounded-full transition-all duration-300 flex items-center justify-center lg:justify-start gap-3 hover:scale-105 shadow-2xl shadow-red-950/70 hover:shadow-red-900/80 mt-8 overflow-hidden mx-auto lg:mx-0"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="relative">GET STARTED</span>
              <ChevronRight
                className="relative group-hover:translate-x-1 transition-transform duration-300"
                size={20}
              />
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 bg-neutral-900/60 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(153,27,27,0.12),transparent_50%)]" />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h2 className="text-4xl lg:text-6xl font-black text-white mb-4">
            WHY <span className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">SQUADUP?</span>
          </h2>
          <p className="text-gray-400 text-xl badscript mb-20 max-w-2xl mx-auto">
            Everything you need to find the perfect training partner
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURES.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group bg-gradient-to-br from-zinc-900 to-neutral-950 border border-zinc-800 rounded-3xl p-8 hover:border-red-700/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-red-950/40 relative overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  <div className="relative z-10 flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-red-900/40 to-red-950/40 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-red-800/30">
                      <Icon className="text-red-500" size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-red-500 transition-colors">
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
      <section className="py-24 px-6 text-center relative bg-gradient-to-b from-neutral-950 to-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl lg:text-6xl font-black text-white mb-4">
            HOW IT <span className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">WORKS</span>
          </h2>
          <p className="text-gray-400 text-xl badscript mb-20 max-w-2xl mx-auto">
            Get started in three simple steps
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {STEPS.map((step, index) => (
              <div key={index} className="relative">
                <div className="relative inline-block mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-red-700 to-red-800 rounded-full flex items-center justify-center text-4xl font-black shadow-xl shadow-red-950/70 hover:scale-110 transition-transform duration-300">
                    {index + 1}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-red-600 to-red-700 rounded-full animate-pulse" />
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-red-800 rounded-full animate-pulse delay-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 hover:text-red-500 transition-colors">
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
      <section className="py-24 px-6 bg-gradient-to-b from-black via-red-950/20 to-zinc-950 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(153,27,27,0.15),transparent_70%)]" />

        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            READY TO <span className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 bg-clip-text text-transparent">SQUAD UP?</span>
          </h2>
          <p className="text-gray-300 text-xl mb-12 badscript">
            Join thousands of athletes finding their perfect teammates
          </p>

          <button
            onClick={handleGetStarted}
            className="group relative bg-gradient-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900 text-white font-bold text-lg px-14 py-5 rounded-full transition-all duration-300 hover:scale-110 shadow-2xl shadow-red-950/70 hover:shadow-red-900/80 inline-flex items-center gap-3 overflow-hidden"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <span className="relative">
              {user ? "GO TO DASHBOARD" : "JOIN NOW - IT'S FREE"}
            </span>
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