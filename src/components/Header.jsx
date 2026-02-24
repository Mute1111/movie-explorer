// src/components/Header.tsx
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Search from "../components/Search";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/movies", label: "Movies" },
    { path: "/about", label: "About" },
  ];

  return (
    <header
      className={`sticky w-full top-0 z-50 shadow-md transition-all duration-300
        ${isScrolled ? "bg-accent px-3" : "bg-bg px-3"}`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className={`font-bold text-text transition-all duration-300 ${
            isScrolled ? "text-lg" : "text-xl"
          }`}
        >
          SHIDFLEX
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-3 leading-none">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`hover:text-text ${
                location.pathname === link.path ? "text-text" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Search />
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center space-x-2 leading-none">
          <Search />
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-bg p-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block hover:text-text ${
                location.pathname === link.path ? "text-text" : ""
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}