import TrendingMovies from "../components/TrendingMovies"

function Home() {
  return (
    <div className="px-4 py-6 max-w-7xl mx-auto">
      <h1 className="text-center text-4xl font-bold mb-8">Movie Explorer</h1>
      <TrendingMovies />
    </div>
  )
}

export default Home
