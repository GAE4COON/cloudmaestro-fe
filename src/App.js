import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/App.css";
import Home from "./pages/Home";
import Draw from "./pages/Draw";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Signup from "./pages/SignUp";
import Signin from "./pages/SignIn";
import { AuthProvider } from "./utils/auth/authContext";
import Introduce from "./pages/Introduce";
import Example from "./pages/Example";
import MyDesign from "./pages/MyDesign";

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

              <Route exact path="/home" element={<Home />} />

              <Route path="/ec2" element={<Back/>}/>


              <Route path="/about" element={<Introduce />} />
              <Route path="/about/example" element={<Example />} />

              <Route path="/draw" element={<Draw />} />

              <Route path="/sign-up" element={<Signup />} />
              <Route path="/sign-in" element={<Signin />} />

              <Route path="/home/autodraw" element={<InputNet />} />
              <Route path="/input/aws" element={<InputAWS />} />

              <Route path="/mypage/design" element={<MyDesign />} />

            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
