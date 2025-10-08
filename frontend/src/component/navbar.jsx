import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import logo from "../assets/logo.jpg";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleContactClick = () => {
    navigate("/", { state: { scrollToContact: true } });
    setMenuOpen(false);
  };

  const handleHomeClick = () => {
    navigate("/", { state: { scrollToTop: true } });
    setMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-orange-400/80 via-yellow-300/70 to-orange-500/80 backdrop-blur-md shadow-md">
      <div className="flex items-center justify-between h-16 w-full">

        {/* Logo */}
        <Link to="/" onClick={handleHomeClick} className="flex items-center gap-2 pl-10">
          <img
            src={logo}
            alt="Logo"
            className="h-11 w-10 rounded-full object-cover shadow-md border border-white/40"
          />
          <span className="text-lg font-bold text-white drop-shadow-md">
            Shiv Vihar Samiti
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={handleHomeClick}
            className="text-white  hover:text-black font-medium transition-colors"
          >
            Home
          </button>

          <Link
            to="/About"
            className="text-white hover:text-black font-medium transition-colors"
          >
            About
          </Link>

          <Link
            to="/events"
            className="text-white hover:text-black font-medium transition-colors"
          >
            Events
          </Link>

          <button
            onClick={handleContactClick}
            className="text-white hover:text-black font-medium transition-colors"
          >
            Contact
          </button>

          <button
            onClick={() => navigate("/Login")}
            className="ml-0 px-6 py-2 rounded-full bg-white text-black-600 hover:bg-blue-600 shadow-md transition"
          >
           Admin Login
          </button>

          {/* Citizen Login Button */}
          <button
            onClick={() => navigate("/userlogin")}
            className="ml-0 px-6 py-2 rounded-full bg-white text-black-600 hover:bg-red-600 shadow-md transition"
          >
            Citizen Login
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-white/20"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} className="text-white" /> : <Menu size={22} className="text-white" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200">
          <div className="flex flex-col p-4 gap-4">
            <button
              onClick={handleHomeClick}
              className="text-gray-800 hover:text-orange-600 font-medium"
            >
              Home
            </button>

            <Link
              to="/About"
              onClick={() => setMenuOpen(false)}
              className="text-gray-800 hover:text-orange-600 font-medium"
            >
              About
            </Link>

            <button
              onClick={handleContactClick}
              className="text-gray-800 hover:text-orange-600 font-medium"
            >
              Contact
            </button>

            <button
              onClick={() => {
                navigate("/Login");
                setMenuOpen(false);
              }}
              className="px-4 py-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 shadow-md transition" 
            >
              Admin Login
            </button>

            {/* Citizen Login Mobile */}
            <button
              onClick={() => {
                navigate("/UserLogin"); 
                setMenuOpen(false);
              }}
              className="px-4 py-2 rounded-full bg-orange-600 text-white hover:bg-orange-700 shadow-md transition"
            >
              Citizen Login
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
