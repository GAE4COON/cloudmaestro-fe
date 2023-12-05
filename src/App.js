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

import AutoDraw from "./pages/AutoDraw";
import InputAWS from "./pages/InputAWS";
import Summary from "./pages/Summary";
import SidebarController from "./components/SidebarController";

import MyArchitecture from "./pages/MyDiagram";
import MyResource from "./pages/MyResource";
import MySummary from "./pages/MySummary";

import { DataProvider } from "./components/DataContext";
import MySecurity from "./pages/MySecurity";
import useTokenExpirationChecker from "./hooks/useTokenExpirationChecker";
import PrivateRoute from "./components/privateRoute";
import NotFound from "./pages/NotFound";
// import { PublicRoute } from "./components/publicRoute";
import DataComponent from "./pages/DataComponent";

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
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<Introduce />} />
              <Route path="/about/example" element={<Example />} />
              <Route path="/sign-up" element={<Signup />} />
              <Route path="/sign-in" element={<Signin />} />
              <Route path="/data" element={<DataComponent />} />

              <Route element={<PrivateRoute />}>
                <Route path="/draw" element={<Draw />} />
                <Route path="/home/auto" element={<AutoDraw />} />
                <Route path="/input/aws" element={<InputAWS />} />
                <Route path="/summary" element={<Summary />} />

                <Route path="/mypage" element={<MyArchitecture />} />
                <Route path="/mypage/diagram" element={<MyArchitecture />} />
                <Route path="/mypage/diagram/resource" element={<MyResource />}
                />
                <Route path="/mypage/diagram/security" element={<MySecurity />}
                />
                <Route path="/mypage/diagram/summary" element={<MySummary />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </DataProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
