import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Footer from "./components/Footer"
import Header from "./components/Header"

function App() {
  return (


    <BrowserRouter>
    <Header />
    <main className = "min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />    
        <Route path="/movie/:id" element={<MovieDetails />} />
       
        
      </Routes>
      </main>
    <Footer />
    </BrowserRouter>
  );
}

export default App;