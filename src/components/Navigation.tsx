import React from "react";

export function NavbarSimple() {
  return (
    <nav className="mx-auto max-w-screen-xl px-6 py-3 bg-white/20 backdrop-blur-sm shadow-sm border-b border-white/30">
      <div className="flex items-center justify-between">
        <a
          href="/"
          className="mr-4 cursor-pointer py-1.5 font-bold text-2xl text-gray-900"
        >
          Michelle Currier's Flyer Gallery
        </a>
        <div>
          <a
            href="/contact"
            className="flex items-center text-teal-600 hover:text-blue-500 transition-colors font-medium"
          >
            contact
          </a>
        </div>
      </div>
    </nav>
  );
}
