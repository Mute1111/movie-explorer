import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Link } from "react-router-dom"

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = "https://api.themoviedb.org/3"
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500"

async function fetchSimilarMovies(movieId) {
  const { data } = await axios.get(
    `${BASE_URL}/movie/${movieId}/similar?api_key=${API_KEY}`
  )
  return data.results
}

export default function SimilarMovies({ movieId }) {
  const { data: movies, isLoading, isError } = useQuery({
    queryKey: ["similarMovies", movieId],
    queryFn: () => fetchSimilarMovies(movieId),
    enabled: !!movieId,
  })

  if (isLoading) return <p className="mt-6">Loading similar movies...</p>
  if (isError) return null
  if (!movies?.length) return null

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-6">Similar Movies</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {movies.slice(0, 10).map(movie => (
          <Link
            key={movie.id}
            to={`/movie/${movie.id}`}
            className="group"
          >
            <div className="overflow-hidden rounded-lg">
              <img
                src={
                  movie.poster_path
                    ? `${IMAGE_BASE}${movie.poster_path}`
                    : "/no-image.png"
                }
                alt={movie.title}
                className="rounded-lg group-hover:scale-105 transition duration-300"
              />
            </div>

            <p className="text-sm mt-2 group-hover:text-white">
              {movie.title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}