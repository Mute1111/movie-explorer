import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";


// Import Swiper React components + styles
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Core swiper styles + modules
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// Optional: "swiper/css/autoplay"; (already included in core)

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";



async function fetchTrendingMovies() {
  const { data } = await axios.get(
    `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=en-US`
  );
  return data.results || [];
}

export default function TrendingMovies() {
  const { data: movies = [], isLoading, isError } = useQuery({
    queryKey: ["trendingMovies"],
    queryFn: fetchTrendingMovies,
    staleTime: 10 * 60 * 1000, // 10 min cache
  });

  if (isLoading) {
    return <div className="text-center mt-10 text-white text-xl">Loading trending movies...</div>;
  }

  if (isError) {
    return (
      <div className="text-center mt-10 text-red-500 text-xl">
        Failed to load trending movies
      </div>
    );
  }

  if (movies.length === 0) {
    return <div className="text-center mt-10 text-gray-400">No trending movies found</div>;
  }

  return (
    <div className="mt-10 px-4 md:px-8">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Trending This Week</h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={16}
        slidesPerView={2}              // mobile → 2
        breakpoints={{
          640: { slidesPerView: 3, spaceBetween: 20 },
          768: { slidesPerView: 4, spaceBetween: 24 },
          1024: { slidesPerView: 5, spaceBetween: 28 },
          1280: { slidesPerView: 6, spaceBetween: 32 },
        }}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="!pb-12" // padding for pagination dots
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <Link
              to={`/movie/${movie.id}`}
              className="block group relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=500&auto=format&fit=crop&q=60"
                }
                alt={movie.title}
                className="w-full aspect-[2/3] object-cover"
                loading="lazy"
              />

              {/* Overlay gradient + info */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/60">
                <h3 className="text-white font-semibold text-base md:text-lg line-clamp-2 group-hover:text-blue-300 transition-colors">
                  {movie.title}
                </h3>
                <div className="mt-1 flex justify-between text-sm text-gray-300">
                  <span>⭐ {movie.vote_average?.toFixed(1) || "—"}</span>
                  <span>{movie.release_date?.slice(0, 4) || "—"}</span>
                </div>
              </div>

              {/* Play icon on hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-white/30 hover:bg-white/50 rounded-full p-4 text-3xl text-white shadow-lg">
                  ▶
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}