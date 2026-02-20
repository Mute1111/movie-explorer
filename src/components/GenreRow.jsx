import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

async function fetchGenreMovies(genreId) {
  const { data } = await axios.get(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`
  );
  return data.results || [];
}

export default function GenreRow({ genreId, title }) {
  const { data: movies = [], isLoading } = useQuery({
    queryKey: ["genreMovies", genreId],
    queryFn: () => fetchGenreMovies(genreId),
  });

  if (isLoading) return null;
  if (!movies.length) return null;

  return (
    <div className="mt-12 px-4 md:px-8">
      <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>

      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
          1280: { slidesPerView: 6 },
        }}
        navigation
      >
        {movies.slice(0, 12).map((movie) => (
          <SwiperSlide key={movie.id}>
            <Link to={`/movie/${movie.id}`} className="block group">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded-xl shadow-md group-hover:scale-105 transition duration-300"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}