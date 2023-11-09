import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useState, useCallback, useEffect } from "react";
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
import SidebarController from './components/SidebarController';

import MyPage from "./components/MyPageSideBar";
import MyCloud from "./pages/MyCloud";

import MYResource from "./pages/Myresource";
import { DataProvider } from './components/DataContext';

function App() {
  return (
    <div className="App">
      
      <AuthProvider>
      <DataProvider>
        <BrowserRouter>
        <SidebarController />
          <Navbar />
          <div className="main-content">
            <Routes>
              <Route exact path="/" element={<Home />} />

              <Route exact path="/home" element={<Home />} />

              <Route path="/about" element={<Introduce />} />
              <Route path="/about/example" element={<Example />} />

              <Route path="/draw" element={<Draw />} />

              <Route path="/sign-up" element={<Signup />} />
              <Route path="/sign-in" element={<Signin />} />

              <Route path="/home/auto" element={<AutoDraw />} />
              <Route path="/input/aws" element={<InputAWS />} />

              <Route path="/mypage" element={<MyPage />} />
              <Route path="/mypage/cloud" element={<MyCloud />} />

              <Route path="/mypage/design" element={<MyDesign />} />
              <Route path="/mypage/cloud/resource" element={<MYResource />} />

              <Route path="/summary" element={<Summary />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
        </DataProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
