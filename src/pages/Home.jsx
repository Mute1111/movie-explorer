import TrendingMovies from "../components/TrendingMovies"
import Search from "../components/Search"
import Footer from "../components/Footer"
import GenreSections from "../components/GenreSections";
import HeroSlider from "../components/HeroSlider";


function Home() {
  return (
    <div className="px-0.1 py-6 max-w-10xl mx-auto">
      <h1 className="text-center text-4xl font-bold mb-8">Movie Explorer</h1>
    


<Search/>
<HeroSlider />
<GenreSections />
<Footer />




    </div>

  )
}

export default Home
