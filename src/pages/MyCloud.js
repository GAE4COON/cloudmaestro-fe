import SideBar from "../components/MyPageSideBar";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Space, Dropdown, Button } from "antd";
import "../styles/MyPage.css";
import styled from "styled-components";

const items = [
    {
        key: '1',
        label: (
            <Link to="/mypage/cloud/security">
                Security
            </Link>
        ),
    },
    {
        key: '2',
        label: (
            <Link to="/mypage/cloud/resource">
                Resource
            </Link>
        ),
    },
]

const MyCloud = () => {
    return (
        <div className="container">
            <div className="flex-container">
                <div className="menu-container">
                    <SideBar />
                </div>
                <div className="main-container">
                    <div className="cloud_instance">
                        <img className="img_test_01" alt="test_01" src="/assets/img/Cloud-architecture.png" />
                        <div className="button_container">

                            <Button>Total Cost</Button>

                            <Dropdown
                                menu={{
                                    items,
                                }}
                                placement="bottomLeft"
                            >
                                <Button>Guide</Button>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyCloud;