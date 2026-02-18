import axios from "axios"

// Get your API key from .env
const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = "https://api.themoviedb.org/3"

// Fetch trending movies (week)
export const fetchTrendingMovies = async () => {
  const res = await axios.get(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`)
  return res.data.results
}

// Fetch details of a single movie by ID
export const fetchMovieDetails = async (id) => {
  const res = await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
  return res.data
}
