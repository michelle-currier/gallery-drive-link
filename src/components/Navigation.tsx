import React from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

function NavList({ isVisible }: { isVisible: boolean }) {
  return (
    <ul
      className={`my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 transition-opacity delay-150
    ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <li className="p-1 font-medium">
        <a
          href="/about"
          className="flex items-center text-teal-600 hover:text-blue-500 transition-colors"
        >
          about
        </a>
      </li>
      <li className="p-1 font-medium">
        <a
          href="/gallery"
          className="flex items-center text-teal-600 hover:text-blue-500 transition-colors"
        >
          gallery
        </a>
      </li>
      <li className="p-1 font-medium">
        <a
          href="/contact"
          className="flex items-center text-teal-600 hover:text-blue-500 transition-colors"
        >
          contact
        </a>
      </li>
    </ul>
  );
}
export function NavbarSimple() {
  const [openNav, setOpenNav] = React.useState(false);

  const handleWindowResize = () => {
    if (window.innerWidth >= 960) {
      setOpenNav(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  return (
    <nav className="mx-auto max-w-screen-xl px-6 py-3 bg-white shadow-sm border-b">
      <div className="flex items-center justify-between logo">
        <a
          href="/"
          className="mr-4 cursor-pointer py-1.5 font-bold text-2xl text-gray-900"
        >
          Your name here
        </a>
        {/* Desktop Navigation */}
        <div className="hidden lg:block">
          <NavList isVisible={true} />
        </div>
        {/* Mobile Menu Toggle */}
        <button
          className="ml-auto h-6 w-6 text-gray-900 hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-100 lg:hidden p-1 rounded"
          onClick={() => setOpenNav((prev) => !prev)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </button>
      </div>
      {/* Mobile Navigation */}
      <div className={`transition-all duration-300 lg:hidden ${openNav ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <NavList isVisible={openNav} />
      </div>
    </nav>
  );
}
