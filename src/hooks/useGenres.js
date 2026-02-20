import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = "https://api.themoviedb.org/3"

async function fetchGenres() {
  const { data } = await axios.get(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`
  )
  return data.genres
}

export default function useGenres() {
  return useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,
    staleTime: Infinity, // genres never change
  })
}