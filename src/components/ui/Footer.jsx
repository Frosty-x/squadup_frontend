import React from 'react'
import { ChevronRight, Users, Star, TrendingUp, Instagram, Twitter, Facebook, Mail } from "lucide-react";

const Footer = () => {
  return (
    <div>
      <footer className="relative py-16 px-6 border-t border-neutral-800 bg-linear-to-b from-black to-neutral-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="space-y-4">
              <h3 className="text-3xl font-black">
                <span className="bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent">SQUAD</span>
                <span className="bg-linear-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">UP</span>
              </h3>
              <p className="text-gray-400 text-sm badscript leading-relaxed">
                Find your perfect teammate and level up your game. Join the community today.
              </p>
              <div className="flex gap-3 pt-4">
                <a href="#" className="w-10 h-10 bg-neutral-900 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-neutral-800 hover:border-red-600">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 bg-neutral-900 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-neutral-800 hover:border-red-600">
                  <Twitter size={18} />
                </a>
                <a href="#" className="w-10 h-10 bg-neutral-900 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-neutral-800 hover:border-red-600">
                  <Facebook size={18} />
                </a>
                <a href="#" className="w-10 h-10 bg-neutral-900 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-neutral-800 hover:border-red-600">
                  <Mail size={18} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-white font-bold text-sm mb-6 tracking-wider">QUICK LINKS</h4>
              <div className="space-y-3">
                <a href="#" className="block text-gray-400 hover:text-red-500 transition-colors text-sm badscript hover:translate-x-1 transform duration-200  items-center gap-2 group">
                  <span className="w-0 h-0.5 bg-red-500 group-hover:w-4 transition-all duration-200"></span>
                  About Us
                </a>
                <a href="#" className="block text-gray-400 hover:text-red-500 transition-colors text-sm badscript hover:translate-x-1 transform duration-200  items-center gap-2 group">
                  <span className="w-0 h-0.5 bg-red-500 group-hover:w-4 transition-all duration-200"></span>
                  How It Works
                </a>
                <a href="#" className="block text-gray-400 hover:text-red-500 transition-colors text-sm badscript hover:translate-x-1 transform duration-200  items-center gap-2 group">
                  <span className="w-0 h-0.5 bg-red-500 group-hover:w-4 transition-all duration-200"></span>
                  Features
                </a>
                <a href="#" className="block text-gray-400 hover:text-red-500 transition-colors text-sm badscript hover:translate-x-1 transform duration-200  items-center gap-2 group">
                  <span className="w-0 h-0.5 bg-red-500 group-hover:w-4 transition-all duration-200"></span>
                  Sports Available
                </a>
              </div>
            </div>

            {/* Support */}
            <div className="space-y-4">
              <h4 className="text-white font-bold text-sm mb-6 tracking-wider">SUPPORT</h4>
              <div className="space-y-3">
                <a href="#" className="block text-gray-400 hover:text-red-500 transition-colors text-sm badscript hover:translate-x-1 transform duration-200  items-center gap-2 group">
                  <span className="w-0 h-0.5 bg-red-500 group-hover:w-4 transition-all duration-200"></span>
                  Help Center
                </a>
                <a href="#" className="block text-gray-400 hover:text-red-500 transition-colors text-sm badscript hover:translate-x-1 transform duration-200 ms-center gap-2 group">
                  <span className="w-0 h-0.5 bg-red-500 group-hover:w-4 transition-all duration-200"></span>
                  Contact Us
                </a>
                <a href="#" className="block text-gray-400 hover:text-red-500 transition-colors text-sm badscript hover:translate-x-1 transform duration-200 ms-center gap-2 group">
                  <span className="w-0 h-0.5 bg-red-500 group-hover:w-4 transition-all duration-200"></span>
                  Privacy Policy
                </a>
                <a href="#" className="block text-gray-400 hover:text-red-500 transition-colors text-sm badscript hover:translate-x-1 transform duration-200 ms-center gap-2 group">
                  <span className="w-0 h-0.5 bg-red-500 group-hover:w-4 transition-all duration-200"></span>
                  Terms of Service
                </a>
              </div>
            </div>

            {/* Community */}
            <div className="space-y-4">
              <h4 className="text-white font-bold text-sm mb-6 tracking-wider">COMMUNITY</h4>
              <div className="space-y-3">
                <a href="#" className="block text-gray-400 hover:text-red-500 transition-colors text-sm badscript hover:translate-x-1 transform duration-200 ms-center gap-2 group">
                  <span className="w-0 h-0.5 bg-red-500 group-hover:w-4 transition-all duration-200"></span>
                  Blog
                </a>
                <a href="#" className="block text-gray-400 hover:text-red-500 transition-colors text-sm badscript hover:translate-x-1 transform duration-200 ms-center gap-2 group">
                  <span className="w-0 h-0.5 bg-red-500 group-hover:w-4 transition-all duration-200"></span>
                  Success Stories
                </a>
                <a href="#" className="block text-gray-400 hover:text-red-500 transition-colors text-sm badscript hover:translate-x-1 transform duration-200 ms-center gap-2 group">
                  <span className="w-0 h-0.5 bg-red-500 group-hover:w-4 transition-all duration-200"></span>
                  Events
                </a>
                <a href="#" className="block text-gray-400 hover:text-red-500 transition-colors text-sm badscript hover:translate-x-1 transform duration-200 ms-center gap-2 group">
                  <span className="w-0 h-0.5 bg-red-500 group-hover:w-4 transition-all duration-200"></span>
                  Partner With Us
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-neutral-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm badscript">
              © 2024 SquadUp. All rights reserved. Made with ❤️ for athletes.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-500 hover:text-red-500 transition-colors text-sm badscript">
                Terms
              </a>
              <a href="#" className="text-gray-500 hover:text-red-500 transition-colors text-sm badscript">
                Privacy
              </a>
              <a href="#" className="text-gray-500 hover:text-red-500 transition-colors text-sm badscript">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
