import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="bg-bg text-gray-400 mt-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
        
        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold text-text mb-3">
            Movie Explorer
          </h2>
          <p className="text-sm">
            Discover trending movies, explore details, and find your next favorite film.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-text font-semibold mb-3">Navigation</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/" className="hover:text-white">Trending</Link></li>
          </ul>
        </div>

        {/* Credits */}
        <div>
          <h3 className="text-text font-semibold mb-3">Data Source</h3>
          <p className="text-sm">
            Powered by TMDB API.
          </p>
        </div>

      </div>

      <div className="text-center text-xs py-4 border-t border-gray-800">
        © {new Date().getFullYear()} Movie Explorer. All rights reserved.
      </div>
    </footer>
  )
}