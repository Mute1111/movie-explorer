import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Footer from "../components/Footer";
import SimilarMovies from "../components/SimilarMovies";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

async function fetchMovieDetails(id) {
  const { data } = await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=videos,images`);
  return data;
}

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: movie, isLoading, isError, error } = useQuery(["movie", id], () => fetchMovieDetails(id));

  if (isLoading) {
    return (
      <div className="text-center mt-16 text-xl text-gray-300">
        Loading movie details...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-5xl mx-auto mt-10 text-white bg-gray-800 p-8 rounded-xl text-center">
        <h2 className="text-3xl font-bold mb-4 text-red-400">Error</h2>
        <p className="text-xl mb-6">{error?.message || "Something went wrong."}</p>

        <div className="flex justify-center gap-4">
          <button
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg"
            onClick={() => navigate(-1)}
          >
            ← Go Back
          </button>
          <button
            className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const trailer = movie.videos?.results?.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );

  return (
   <div className="max-w-5xl mx-auto mt-10 text-white bg-gray-800 p-6 rounded-xl shadow-xl">
  <button
    className="mb-6 px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
    onClick={() => navigate(-1)}
  >
    ← Back
  </button>

  {/* Poster + Info */}
  <div className="flex flex-col md:flex-row gap-6">
    {/* Poster */}
    <div className="relative w-full md:w-1/3">
      <img
        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/000000H1.jpg"}
        alt={movie.title}
        className="w-full rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-yellow-300 px-2 py-1 rounded text-sm md:text-base">
        ⭐ {movie.vote_average.toFixed(1)}
      </div>
    </div>

    {/* Info */}
    <div className="flex-1 flex flex-col">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">{movie.title}</h1>
      <p className="text-gray-300 mb-2">{movie.release_date}</p>
      <p className="mb-4">{movie.overview}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {movie.genres.map((g) => (
          <span key={g.id} className="px-3 py-1 bg-gray-700 rounded-full text-sm">{g.name}</span>
        ))}
      </div>

      <p className="text-gray-400 mb-1"><strong>Runtime:</strong> {movie.runtime} min</p>
      <p className="text-gray-400 mb-1"><strong>Language:</strong> {movie.original_language.toUpperCase()}</p>
    </div>
  </div>

  {/* Trailer - MOVE OUTSIDE FLEX */}
  {trailer && (
    <div className="mt-8 flex justify-center">
      <div className="w-full max-w-3xl">
        <h3 className="text-lg font-semibold mb-3">Trailer</h3>
        <div className="relative w-full aspect-video overflow-hidden rounded-lg">
          <iframe
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title="Movie Trailer"
            className="absolute inset-0 w-full h-full"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )}

  {/* Backdrops Carousel */}
  {movie.images?.backdrops?.length > 0 && (
    <div className="mt-6">
      <Swiper
        modules={[EffectFade, Autoplay]}
        effect="fade"
        autoplay={{ delay: 3000 }}
        loop
        className="h-70"
      >
        {movie.images.backdrops.slice(0, 5).map((img) => (
          <SwiperSlide key={img.file_path}>
            <img
              src={`https://image.tmdb.org/t/p/original${img.file_path}`}
              alt="Backdrop"
              className="w-full h-full object-cover rounded-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )}

  <SimilarMovies movieId={id} />
  <Footer />
</div>
  );
}

export default MovieDetails;