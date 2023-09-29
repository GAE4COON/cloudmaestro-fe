import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/App.css";
import Home from "./pages/Home";
import Draw from "./pages/Draw";
import Footer from "./components/Footer";
//import Diagram from "./pages/MyDiagram";
import Navbar from "./components/Navbar";
import Signup from "./pages/SignUp";
import Signin from "./pages/SignIn";
import { AuthProvider } from "./utils/auth/authContext";
import Introduce from "./pages/Introduce";
import LearnMore from "./pages/LearnMore";
import InputNet from "./pages/InputNet";
import InputAWS from "./pages/InputAWS";
import NetDraw from "./pages/NetDraw";
import LearnDraw from "./pages/LearnDraw";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <div className="main-content">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/learn-draw" element={<LearnDraw />} />
              <Route path="/about" element={<Introduce />} />
              <Route path="/learn" element={<LearnMore />} />
              <Route path="/draw/aws" element={<Draw />} />
              <Route path="/draw/network" element={<Draw />} />
              <Route path="/sign-up" element={<Signup />} />
              <Route path="/sign-in" element={<Signin />} />
              <Route path="/inputnet" element={<InputNet />} />
              <Route path="/inputaws" element={<InputAWS />} />
              <Route path="/draw/network" element={<NetDraw />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
