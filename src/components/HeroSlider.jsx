import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMG = "https://image.tmdb.org/t/p/original";

async function fetchFeatured() {
  const { data } = await axios.get(
    `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
  );
  return data.results.slice(0, 20); // hero movies
}

export default function HeroSlider() {


  const { data: movies = [] } = useQuery({
    queryKey: ["heroMovies"],
    queryFn: fetchFeatured,
  });

  if (!movies.length) return null;

  return (
    <div className="relative h-[75vh] w-full overflow-hidden pt-20 p-4">
      
      {/* Background */}
      <div className="absolute inset-0">
       
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
      </div>

      {/* Slider */}
      <Swiper
  
  modules={[Navigation, Autoplay, EffectFade]}
  loop={true} 
  effect="slide"
  autoplay={{ delay: 6000 }}
  speed={800}
  navigation
  className="h-[75vh]"
>
  {movies.map(movie => (
    <SwiperSlide key={movie.id}>
      <div className="relative h-[75vh] w-full">

        {/* Background */}
        <img
          src={`${IMG}${movie.backdrop_path}`}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />

        {/* Content */}
        <div className="relative z-10 flex items-center h-full px-8 md:px-16">
          <div className="max-w-xl text-white space-y-4">
            <h1 className="text-4xl font-bold">
              {movie.title}
            </h1>

            <p className="text-gray-300 line-clamp-3">
              {movie.overview}
            </p>

            <div className="flex gap-4">
              <Link
                to={`/movie/${movie.id}`}
                className="bg-white text-black px-6 py-2 rounded-lg"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>

      </div>
    </SwiperSlide>
  ))}
</Swiper>
    </div>
  );
}