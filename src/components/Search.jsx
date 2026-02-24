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

  // Debounce input changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  const { data: results = [], isFetching, isError } = useQuery({
    queryKey: ["search", debouncedQuery],
    queryFn: () => fetchSearchResults(debouncedQuery),
    enabled: debouncedQuery.length >= 1,
    staleTime: 3 * 60 * 1000,    // 3 minutes
    gcTime: 10 * 60 * 1000,
  });

  const handleClear = () => setQuery("");

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4 text-text">
      {/* Search bar */}
      <div className="relative max-w-2xl mx-auto mb-10">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search movies, series..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full p-4 pr-12 rounded-xl bg-bg border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            />
            {query && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text hover:text-white text-2xl leading-none"
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Feedback / status messages */}
      <div className="text-center my-8 min-h-[3rem]">
        {debouncedQuery.length === 0 && (
          <p className="text-text text-lg">Start typing to find movies ✨</p>
        )}

        {debouncedQuery.length > 0 && debouncedQuery.length < 2 && (
          <p className="text-text">Keep typing... at least 2 characters</p>
        )}

        {isFetching && (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-blue-500 border-opacity-70"></div>
          </div>
        )}

        {!isFetching && debouncedQuery.length >= 2 && results.length === 0 && (
          <p className="text-gray-300 text-xl">
            No results found for{" "}
            <span className="font-medium text-white">"{debouncedQuery}"</span> 😔
          </p>
        )}

        {isError && (
          <p className="text-red-400 text-lg">
            Oops... something went wrong. Try again?
          </p>
        )}
      </div>

      {/* Results grid */}
      {results.length > 0 && !isFetching && (
        <div className="bg-bg/50 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 md:gap-6">
            {results.map((movie) => (
              <Link
                to={`/movie/${movie.id}`}
                key={movie.id}
                className="group block rounded-xl overflow-hidden bg-bg shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative aspect-[2/3] bg-bg">
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=500&auto=format&fit=crop&q=60"
                    }
                    alt={movie.title || "Movie poster"}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-text text-6xl opacity-70 drop-shadow-lg">▶</span>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-base md:text-lg line-clamp-2 group-hover:text-blue-400 transition-colors">
                    {movie.title}
                  </h3>
                  <div className="mt-1.5 text-sm text-text flex items-center justify-between">
                    <span>⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : "—"}</span>
                    <span>{movie.release_date?.slice(0, 4) || "—"}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
export default Search