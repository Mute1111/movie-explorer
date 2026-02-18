import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Link } from "react-router-dom"

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = "https://api.themoviedb.org/3"

async function fetchSearchResults(query) {
  if (!query) return [] // no empty search
  const { data } = await axios.get(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}`
  )
  return data.results
}


function Search() {
  const [query, setQuery] = useState("")
  
  const { data: results, refetch, isFetching, isError } = useQuery(
    ["search", query], // query key
    () => fetchSearchResults(query),
    { enabled: false } // don’t fetch automatically, only when we call refetch
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    refetch() // triggers the API call
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 text-white">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 p-2 rounded text-black"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-300"
        >
          Search
        </button>
      </form>

      {/* Render search results */}
{(!results || results.length === 0) ? (
  <p className="text-gray-400 text-center mt-10">Search for a movie to see results</p>
) : (
  <div className="max-h-[700px] overflow-y-auto bg-gray-800 rounded-xl p-3 shadow-xl">
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {isFetching && <p>Loading...</p>}
      {isError && <p className="text-red-500">Failed to fetch results</p>}
      {results.map(movie => (
        <Link to={`/movie/${movie.id}`} key={movie.id}>
          <div className="relative rounded-xl overflow-hidden shadow-lg hover:scale-110 hover:shadow-3xl transition-transform duration-300">
            <img
              src={movie.poster_path 
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : '/000000H1.jpg'} // placeholder image path
              alt={movie.title}
              className="w-full h-auto object-cover rounded-xl"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent p-4">
              <h2 className="text-white font-semibold">{movie.title}</h2>
              <div className="flex justify-between text-gray-300 mt-1 text-sm sm:text-base">
                <span>⭐ {movie.vote_average}</span>
                <span>{movie.release_date?.slice(0, 4)}</span>
              </div>
            </div>
            {/* Optional hover play button */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <button className="bg-white bg-opacity-30 hover:bg-opacity-50 rounded-full p-3 text-xl">
                ▶
              </button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
  
)
}
</div>
  )
}

export default Search