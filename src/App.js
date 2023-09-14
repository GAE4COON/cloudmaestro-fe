import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Introduce from "./pages/Introduce"
import Search from "./pages/Search";
import MyPage from "./pages/MyPage";
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
            <Route path="/search" element={<Search />} />
            <Route path="/mypage" element={<MyPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
