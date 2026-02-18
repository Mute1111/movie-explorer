import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = "https://api.themoviedb.org/3"


async function fetchMovieDetails(id) {
  const { data } = await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`)
  return data
}

function MovieDetails() {
    
const navigate = useNavigate()
  const { id } = useParams()
  const { data: movie, isLoading, isError } = useQuery(["movie", id], () => fetchMovieDetails(id))

  if (isLoading) return <div className="text-center mt-10 text-white">Loading...</div>
  if (isError) return <div className="text-center mt-10 text-red-500">Failed to load movie details</div>

  return (
    <div className="max-w-5xl mx-auto mt-10 text-white">
        <button
  className="mb-4 px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
  onClick={() => navigate(-1)}
>
  ← Back
</button>
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full md:w-1/3 rounded-xl shadow-lg"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          <p className="text-gray-300 mb-2">{movie.release_date} • ⭐ {movie.vote_average}</p>
          <p className="mb-4">{movie.overview}</p>
          <p className="text-gray-300"><strong>Genres:</strong> {movie.genres.map(g => g.name).join(", ")}</p>
          <p className="text-gray-300"><strong>Runtime:</strong> {movie.runtime} minutes</p>
          <p className="text-gray-300"><strong>Language:</strong> {movie.original_language.toUpperCase()}</p>
        </div>
      </div>
    </div>
  )
}

export default MovieDetails
