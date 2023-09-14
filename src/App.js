import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Introduce from "./pages/introduce";
import Learn from "./pages/draw";
import Draw from "./pages/learn";
import Nav from "./components/Nav";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <div className="main-content">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/introduce" element={<Introduce />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/draw" element={<Draw />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
