import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Introduce from "./pages/Introduce"
import LearnMore from "./pages/LearnMore";
import MyPage from "./pages/MyPage";
import Nav from "./components/Nav";
import Draw from "./pages/Draw";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <div className="main-content">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/introduce" element={<Introduce />} />
            <Route path="/learnmore" element={<LearnMore/>} />
            <Route path="/learnmore/:index" component={LearnMore} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/draw" element={<Draw />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
