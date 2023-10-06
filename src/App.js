import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/App.css";
import Home from "./pages/Home";
import DrawAWS from "./pages/DrawAWS";
import DrawNetwork from "./pages/DrawNetwork";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Signup from "./pages/SignUp";
import Signin from "./pages/SignIn";
import { AuthProvider } from "./utils/auth/authContext";
import Introduce from "./pages/Introduce";
import LearnMore from "./pages/LearnMore";

import InputNet from "./pages/InputNetwork";
import InputAWS from "./pages/InputAWS";

import Back from "./pages/Backend/BackEnd";


function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <div className="main-content">
            <Routes>
              <Route exact path="/" element={<Home />} />

              <Route path="/ec2" element={<Back/>}/>


              <Route path="/about" element={<Introduce />} />
              <Route path="/learn" element={<LearnMore />} />

              <Route path="/draw/aws" element={<DrawAWS />} />
              <Route path="/draw/network" element={<DrawNetwork />} />

              <Route path="/sign-up" element={<Signup />} />
              <Route path="/sign-in" element={<Signin />} />

              <Route path="/inputnet" element={<InputNet />} />
              <Route path="/inputaws" element={<InputAWS />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
