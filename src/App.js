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

import AutoDraw from "./pages/AutoDraw";
import InputAWS from "./pages/InputAWS";
import Summary from "./pages/Summary";
import SidebarController from "./components/SidebarController";
import MyPage from "./pages/Mypage";
import MyCloud from "./pages/MyCloud";
import MyNetwork from "./pages/MyNetwork";
import MyResource from "./pages/MyResource";
import { DataProvider } from "./components/DataContext";
import MySecurity from "./pages/Guideline";
import useTokenExpirationChecker from "./hooks/useTokenExpirationChecker";
import PrivateRoute from "./components/privateRoute";
// import { PublicRoute } from "./components/publicRoute";

function App() {
  useTokenExpirationChecker();
  return (
    <div className="App">
      <AuthProvider>
        <DataProvider>
          <BrowserRouter>
            <SidebarController />
            <Navbar />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/home" element={<Home />} />
              <Route path="/about" element={<Introduce />} />
              <Route path="/about/example" element={<Example />} />
              <Route
                path="/draw"
                element={
                  <PrivateRoute>
                    <Draw />
                  </PrivateRoute>
                }
              />
              <Route path="/sign-up" element={<Signup />} />
              <Route path="/sign-in" element={<Signin />} />
              <Route
                path="/home/auto"
                element={
                  <PrivateRoute>
                    <AutoDraw />
                  </PrivateRoute>
                }
              />
              <Route
                path="/input/aws"
                element={
                  <PrivateRoute>
                    <InputAWS />
                  </PrivateRoute>
                }
              />
              <Route
                path="/mypage"
                element={
                  <PrivateRoute>
                    <MyPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/mypage/cloud"
                element={
                  <PrivateRoute>
                    <MyCloud />
                  </PrivateRoute>
                }
              />
              <Route
                path="/mypage/cloud/resource"
                element={
                  <PrivateRoute>
                    <MyResource />
                  </PrivateRoute>
                }
              />
              <Route
                path="/mypage/cloud/security"
                element={
                  <PrivateRoute>
                    <MySecurity />
                  </PrivateRoute>
                }
              />
              <Route
                path="/mypage/network"
                element={
                  <PrivateRoute>
                    <MyNetwork />
                  </PrivateRoute>
                }
              />
              <Route
                path="/mypage/design"
                element={
                  <PrivateRoute>
                    <MyDesign />
                  </PrivateRoute>
                }
              />
              <Route
                path="/summary"
                element={
                  <PrivateRoute>
                    <Summary />
                  </PrivateRoute>
                }
              />
            </Routes>
            <Footer />
          </BrowserRouter>
        </DataProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
