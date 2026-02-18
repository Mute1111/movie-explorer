import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = "https://api.themoviedb.org/3"

async function fetchTrendingMovies() {
  const { data } = await axios.get(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`)
  return data.results
}

function TrendingMovies() {
   const navigate = useNavigate()
    const { data: movies, isLoading, isError } = useQuery(["trendingMovies"], fetchTrendingMovies)


  if (isLoading) return <div className="text-center mt-10 text-white">Loading...</div>
  if (isError) return <div className="text-center mt-10 text-red-500">Failed to load movies</div>

  return (
    <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {movies.map(movie => (
        <div
          key={movie.id}
          className="relative rounded-xl overflow-hidden shadow-xl hover:scale-105 hover:shadow-2xl transition transform duration-300 bg-gray-800 cursor-pointer"
          onClick={() => navigate(`/movie/${movie.id}`)}
        >
          {/* Movie Poster */}
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={'/public/000000H1.jpg'}
            className="w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] object-cover"
          />

          {/* Bottom overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent p-4">
            <h2 className="text-white font-semibold text-md sm:text-lg md:text-xl">{movie.title}</h2>
            <div className="flex justify-between text-gray-300 mt-1 text-sm sm:text-base">
              <span>⭐ {movie.vote_average}</span>
              <span>{movie.release_date?.slice(0, 4)}</span>
            </div>
          </div>

          {/* Optional: Hover Play Icon */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
            <button className="bg-white bg-opacity-30 hover:bg-opacity-50 rounded-full p-3 text-xl"
              onClick={() => navigate(`/movie/${movie.id}`)}>
              ▶
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TrendingMovies
