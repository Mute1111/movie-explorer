import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import Search from "../components/Search";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  /* Stable nav links (prevents recreation every render) */
  const navLinks = useMemo(
    () => [
      { path: "/", label: "Home" },
      { path: "/movies", label: "Movies" },
      { path: "/about", label: "About" },
    ],
    []
  );

  /* Scroll detection (optimized) */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Lock background when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);


  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300
        ${
          isScrolled
            ? "bg-bg/80 backdrop-blur-md shadow-lg"
            : "bg-accent/80 backdrop-blur-sm"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link
          to="/"
          className="font-bold text-text text-lg tracking-wide"
        >
          SHIDFLEX
        </Link>

        {/* Desktop Navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden md:flex items-center gap-4 relative"
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`transition-colors hover:text-accent ${
                location.pathname === link.path
                  ? "text-Text font-medium"
                  : "text-text"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="relative w-64">
            <Search />
          </div>

          <ThemeToggle />
        </nav>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center gap-3 relative">
          <div className="relative w-40">
            <Search />
          </div>

          <button
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="w-8 h-8 flex items-center justify-center"
          >
            <svg
              className="w-6 h-6 transition-transform duration-300"
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
        <div className="md:hidden bg-bg/95 backdrop-blur-md border-t border-gray-800">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block transition-colors ${
                  location.pathname === link.path
                    ? "text-text font-medium"
                    : "text-text"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  );
}