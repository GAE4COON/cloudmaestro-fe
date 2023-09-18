import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Draw from "./pages/draw";
//import Diagram from "./pages/MyDiagram";
import Navbar from "./components/Navbar";
import Signup from "./pages/signup";
import Signin from "./pages/signin";
import { AuthProvider } from "./utils/auth/authContext";
import Introduce from "./pages/Introduce"
import LearnMore from "./pages/LearnMore";
//import MyPage from "./pages/MyPage";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <div className="main-content">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/about" element={<Introduce />} />
              <Route path="/learn" element={<LearnMore />} />
              <Route path="/draw" element={<Draw />} />
              <Route path="/sign-up" element={<Signup />} />
              <Route path="/sign-in" element={<Signin />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
