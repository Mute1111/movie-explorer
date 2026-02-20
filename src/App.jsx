import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Footer from "./components/Footer"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/components/Footer" elment = {<Footer />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;