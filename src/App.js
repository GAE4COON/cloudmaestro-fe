import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/about";
import Draw from "./pages/draw";
import Learn from "./pages/learn";
import Navbar from "./components/Navbar";
import Signup from "./pages/signup";
import Signin from "./pages/signin";

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
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/sign-in" element={<Signin />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
