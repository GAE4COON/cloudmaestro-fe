import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/App.css";
import Home from "./pages/Home";
import Draw from "./pages/Draw";
import Footer from "./components/Footer"
//import Diagram from "./pages/MyDiagram";
import Navbar from "./components/Navbar";
import Signup from "./pages/SignUp";
import Signin from "./pages/SignIn";
import { AuthProvider } from "./utils/auth/authContext";
import Introduce from "./pages/Introduce"
import LearnMore from "./pages/LearnMore";
import Input from "./pages/Input";
import NetDraw from "./pages/NetDraw";

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
              <Route path="/input" element={<Input />} />
              <Route path="/netdraw" element={<NetDraw />} />

            </Routes>
          </div>
          <Footer/>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
