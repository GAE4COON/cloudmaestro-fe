import SideBar from "../components/MyPageSideBar";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import "../styles/App.css";
import { Space, Dropdown, Button } from "antd";
import { Menu } from "antd"; 

import styled from "styled-components";
import { getDiagramData } from "../apis/myPage";
import { myNetworkDB } from "../apis/myPage";

const MyArchitecture = () => {
  const [cloudInstances, setCloudInstances] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyNetwork = async () => {
      const myNetwork = await myNetworkDB();
      setCloudInstances(myNetwork.data);
      console.log(myNetwork.data)
    };

    fetchMyNetwork();
  }, []);

  // This function splits the cloudInstances array into chunks of 3
  const getRows = (instances) => {
    const rows = [];
    instances.forEach((instance, idx) => {
      if (idx % 3 === 0) rows.push([]);
      rows[rows.length - 1].push(instance);
    });
    return rows;
  };

  const handleCloudInstance = async (key, path) => {
    const response = await getDiagramData(key);
    console.log("response.data",response.data)
    navigate(`${path}`, { state: { file: response.data } });
  }



  return (
    <div className="main-content">
      <div className="mypage-container">
        <div className="flex-container">
          <div className="menu-container">
            <SideBar />
          </div>

          <div className="main-container">
            <StyledSideMenuTitle>도식화 히스토리</StyledSideMenuTitle>
            {getRows(cloudInstances).map((row, idx) => (
              <CloudInstanceRow key={idx}>
                {row.map((instance) => {
                  const dropdownItems = [
                    {
                      key: "1",
                      label: (
                        <StyledButton
                          onClick={() => handleCloudInstance(instance.key, "/mypage/diagram/security")}>
                          Security
                        </StyledButton>
                      ),
                    },
                    {
                      key: "2",
                      label: (
                        <StyledButton
                          onClick={() => handleCloudInstance(instance.key, "/mypage/diagram/resource")}>
                          Resource
                        </StyledButton>
                      ),
                    },
                  ];
                  return (


                    <CloudInstance key={instance.key}>
                      <img
                       onClick={() => handleCloudInstance(instance.key, "/draw")}
                        alt="diagram_img"
                        src={instance.imgSrc}
                        style={{ width: "100%", 
                      boxShadow: "1px 1px 1px 1px rgb(235, 235, 235)"}}
                      />
                      <StyledInstanceTitle>{instance.title}</StyledInstanceTitle>

                      <ButtonContainer>
                        <StyledButton
                          style={{ backgroundColor: "#5280DD" }}
                          onClick={() => handleCloudInstance(instance.key, "/mypage/diagram/summary")}>
                          Total Cost
                        </StyledButton>

                        <Dropdown overlay = {<Menu items={dropdownItems} />}  placement="bottomLeft">
                          <StyledButton style={{ backgroundColor: "#FD754A" }}>
                            Guide
                            <DownOutlined style={{ marginTop: "5px" }} />
                          </StyledButton>
                        </Dropdown>
                      </ButtonContainer>
                    </CloudInstance>
                  );
                })}
              </CloudInstanceRow>
            ))}
          </div>
        </div>
      </div>
    </div>

  );
};

export default MyArchitecture;

const CloudInstance = styled.div`
    width:26%;
    padding:10px;
    /* margin-top: 10px; */
    border: 1px solid gray;
    margin-left: 10px;
    margin: 10px;
    border-radius: 5px;
    box-shadow: 1px 1px 1px 1px rgb(235, 235, 235);
`

const CloudInstanceRow = styled.div`
    display: flex;
    width: 100%;
`


const StyledButton = styled(Button)`
  min-width: 100px;
  margin: 5px;
  color: white;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  border-radius: 20px;

  /* text-align: left; */
`;

const ButtonContainer = styled.div`
    align-items: end;
    display: flex;
    flex-direction: column;
`;

const StyledSideMenuTitle = styled.div`
  font-family: "Noto Sans KR", sans-serif !important;
  font-weight: 500;
  font-size: 20px;
`;

const StyledInstanceTitle = styled.div`
  font-family: "Noto Sans KR", sans-serif !important;
  /* font-weight: 500; */
  /* font-size: 20px; */
  text-align: left;
  margin: 20px;
`;
