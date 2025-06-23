import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900/50 text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p>&copy; {new Date().getFullYear()} CourseWeaver. All rights reserved.</p>
          <p className="text-sm mt-1">
            Built with ❤️ using React, FastAPI, and Gemini
          </p>
        </div>
      </div>
    </footer>
  );
} 