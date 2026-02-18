import TrendingMovies from "../components/TrendingMovies"
import Search from "../components/Search"
function Home() {
  return (
    <div className="px-4 py-6 max-w-7xl mx-auto">
      <h1 className="text-center text-4xl font-bold mb-8">Movie Explorer</h1>
    

{/*search */}
<Search/>

  <TrendingMovies />
    </div>

  )
}

export default Home
