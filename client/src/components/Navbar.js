import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const linkStyles = "px-4 py-2 rounded-md text-sm font-medium transition-colors";
  const activeLinkStyles = "bg-white/10 text-white";
  const inactiveLinkStyles = "text-gray-300 hover:bg-white/5 hover:text-white";

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-purple-900/50 backdrop-blur-lg border-b border-white/10 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <NavLink to="/" className="text-white font-bold text-2xl tracking-wider flex items-center">
              <svg 
                className="w-8 h-8 mr-2 text-purple-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M12 6.25278C12 6.25278 15.0212 2 19.5 2C23.9788 2 27.5 6.02122 27.5 10.5C27.5 14.9788 23.9788 19 19.5 19C15.0212 19 12 14.7472 12 14.7472"
                  transform="translate(-4 -1)"
                />
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M12 6.25278C12 6.25278 8.97878 2 4.5 2C0.021219 2 -3.5 6.02122 -3.5 10.5C-3.5 14.9788 0.021219 19 4.5 19C8.97878 19 12 14.7472 12 14.7472"
                  transform="translate(4 -1)"
                />
              </svg>
              CourseWeaver
            </NavLink>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink to="/course-builder" className={({ isActive }) => `${linkStyles} ${isActive ? activeLinkStyles : inactiveLinkStyles}`}>Course Builder</NavLink>
              <NavLink to="/evaluator" className={({ isActive }) => `${linkStyles} ${isActive ? activeLinkStyles : inactiveLinkStyles}`}>Evaluator</NavLink>
              <NavLink to="/book-recommender" className={({ isActive }) => `${linkStyles} ${isActive ? activeLinkStyles : inactiveLinkStyles}`}>Book Recommender</NavLink>
              <NavLink to="/outcome-checker" className={({ isActive }) => `${linkStyles} ${isActive ? activeLinkStyles : inactiveLinkStyles}`}>Outcome Checker</NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 