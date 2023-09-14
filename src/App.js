import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/introduce";
import Learn from "./pages/draw";
import Draw from "./pages/learn";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/draw" element={<Draw />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
