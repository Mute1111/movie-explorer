import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

async function fetchSearchResults(query) {
  if (!query.trim()) return [];

  const { data } = await axios.get(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}`
  );

  return data.results || [];
}

function Search() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  /* Debounce input */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  /* Lock background scroll ONLY when results are visible */
  useEffect(() => {
    const shouldLock = debouncedQuery.length >= 2;

    document.body.style.overflow = shouldLock ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [debouncedQuery]);

  const {
    data: results = [],
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["search", debouncedQuery],
    queryFn: () => fetchSearchResults(debouncedQuery),
    enabled: debouncedQuery.length >= 2,
    staleTime: 3 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const handleClear = () => setQuery("");

  return (
    <div className="relative w-full text-text">
      {/* Search bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-3 pr-10 rounded-xl bg-bg border border-gray-700 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />

        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xl"
          >
            ×
          </button>
        )}
      </div>

      {/* Floating Results Panel */}
      {debouncedQuery.length >= 2 && (
        <div className="absolute left-0 right-0 mt-3 z-50">
          <div className="bg-bg rounded-2xl shadow-2xl p-4 max-h-[70vh] overflow-y-auto">
            
            {isFetching && (
              <div className="flex justify-center py-10">
                <div className="animate-spin h-10 w-10 border-t-4 border-blue-500 rounded-full"></div>
              </div>
            )}

            {isError && (
              <p className="text-red-400 text-center">
                Something went wrong.
              </p>
            )}

            {!isFetching && results.length === 0 && (
              <p className="text-center text-gray-400">
                No results for "{debouncedQuery}"
              </p>
            )}

            {results.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {results.map((movie) => (
                  <Link
                    to={`/movie/${movie.id}`}
                    key={movie.id}
                    className="block group"
                    onClick={() => setQuery("")}
                  >
                    <div className="aspect-[2/3] rounded-lg overflow-hidden">
                      <img
                        src={
                          movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                            : "https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=500"
                        }
                        alt={movie.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition"
                      />
                    </div>

                    <p className="mt-2 text-sm line-clamp-2 group-hover:text-blue-400">
                      {movie.title}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;