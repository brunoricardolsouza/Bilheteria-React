import { Link } from "react-router-dom";
import { useState } from "react";
import Logo from "./Logo";

const NAV_LINKS = [
  { label: "Movies", to: "/" },
  { label: "Cinemas", to: "/" },
  { label: "Promotions", to: "/" },
];

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950 border-b border-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Logo />
          <div className="hidden md:flex items-center gap-8 ml-10">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          {searchOpen ? (
            <input
              autoFocus
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onBlur={() => setSearchOpen(false)}
              placeholder="Search movies..."
              className="bg-gray-900 border border-gray-700 rounded-md px-3 py-1.5 text-sm w-40 sm:w-56 focus:outline-none focus:border-red-500"
            />
          ) : (
            <button onClick={() => setSearchOpen(true)} aria-label="Search">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
          )}
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="hidden sm:block text-sm text-gray-300 hover:text-white transition-colors ml-4"
            >
              Sign In
            </Link>
            <button className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-5 py-2.5 rounded-md transition-colors">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
