import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { menu } from '../components/MyPageSideBar'; // Assuming MyPageSideBar is in the components folder

import MyPageSideBar from "../components/MyPageSideBar";



function Security(){

    return (
        <div>
            <MyPageSideBar/>
        </div>
    )

}
export default Security;