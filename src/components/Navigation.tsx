import React from "react";
import logo from "@/assets/logo.png";

export function NavbarSimple() {
  return (
    <nav className="mx-auto max-w-screen-xl px-6 py-3 bg-white/20 backdrop-blur-sm shadow-sm border-b border-white/30">
      <div className="flex items-center justify-between">
        <a
          href="/"
          className="mr-4 cursor-pointer py-1.5 flex items-center gap-3"
        >
          <img src={logo} alt="Michelle Currier Logo" className="h-10 w-10" />
          <span className="font-bold text-2xl text-gray-900">
            Michelle Currier's Flyer Gallery
          </span>
        </a>
        <div>
          <a
            href="/contact"
            className="flex items-center text-teal-600 hover:text-blue-500 transition-colors font-medium"
          >
            Contact me
          </a>
        </div>
      </div>
    </nav>
  );
}
