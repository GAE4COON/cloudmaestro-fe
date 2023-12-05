import SideBar from "../components/MyPageSideBar";
import React, { useState, useEffect } from "react";
import { Popconfirm, message } from 'antd';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import "../styles/App.css";
import { Space, Dropdown, Button } from "antd";
import { Menu } from "antd";
import { CloseButton } from "react-bootstrap";
import { useAuth } from "../utils/auth/authContext";
import jwtDecode from "jwt-decode";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';

import styled from "styled-components";
import { getDiagramData, myNetworkDB, deleteDiagramData } from "../apis/myPage";

message.config({
  top: 50,
  duration: 1
});
const { Meta } = Card;

const MyArchitecture = () => {

  const [cloudInstances, setCloudInstances] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  const navigate = useNavigate();

  const { user, setUser } = useAuth();
  const ACCESS_TOKEN = localStorage.getItem("accessToken");

  useEffect(() => {
    if (ACCESS_TOKEN) {
      try {
        const decodedToken = jwtDecode(ACCESS_TOKEN);
        console.log(decodedToken.sub);
        setUser(decodedToken.sub);
      } catch (error) {
        console.log("Invalid token");
      }
    } else {
      setUser(null);
    }
  }, [ACCESS_TOKEN]);

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
    console.log("response.data", response.data)
    navigate(`${path}`, { state: { info: response.data, save: true } });
  }

  const confirm = async (key, e) => {
    const response = await deleteDiagramData(key);
    console.log("response.data", response.data);
    setCloudInstances(cloudInstances.filter(instance => instance.key !== key));

    message.success('도식화가 삭제되었습니다.');

  };

  return (
    <div className="main-content">
      <div className="mypage-container">
        <div className="flex-container">
          <div className="menu-container">
            <SideBar />
          </div>

          <div className="main-container">
            <StyledSideMenuTitle>도식화 히스토리</StyledSideMenuTitle>
            {cloudInstances.length > 0 ? (

              getRows(cloudInstances).map((row, idx) => (
                <CloudInstanceRow key={idx}>
                  {row.map((instance) => {
                    const dropdownItems = [
                      {
                        key: "1",
                        label: (
                          <button
                            onClick={() => handleCloudInstance(instance.key, "/mypage/diagram/security")}>
                            Security
                          </button>
                        ),
                      },
                      {
                        key: "2",
                        label: (
                          <button
                            onClick={() => handleCloudInstance(instance.key, "/mypage/diagram/resource")}>
                            Resource
                          </button>
                        ),
                      },
                    ];
                    return (
                      <>

                        <CloudInstance
                          cover={
                            <img
                              alt="example"
                              onClick={() => handleCloudInstance(instance.key, "/draw")}
                              src={`https://cm-user-file.s3.ap-northeast-2.amazonaws.com/${instance.title}_${user}.png`}
                              style={{
                                marginTop: "20px",
                                // width: "100%",
                                height: "150px",
                                objectFit: "contain",
                                // borderRadius: "5px",
                                // boxShadow: "1px 1px 1px 1px rgb(235, 235, 235)",

                              }}
                            />
                          }
                          actions={[
                            <div
                              style={{
                                color: "black",
                                fontFamily: "Noto Sans KR",
                              }}
                              onClick={() => handleCloudInstance(instance.key, "/mypage/diagram/summary")}>
                              Total Cost
                            </div>,
                            <Dropdown
                              overlay={(
                                <Menu>
                                  <Menu.Item key="1">
                                    <a onClick={() => handleCloudInstance(instance.key, "/mypage/diagram/resource")}>Resource</a>
                                  </Menu.Item>
                                  <Menu.Item key="2">
                                    <a onClick={() => handleCloudInstance(instance.key, "/mypage/diagram/security")}>Security</a>
                                  </Menu.Item>
                                </Menu>
                              )} placement="bottomLeft" trigger={['hover']}>
                              <a
                                style={{
                                  color: "black",
                                  fontFamily: "Noto Sans KR",
                                }}
                                className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                Guide
                              </a>
                            </Dropdown>,

                          ]}
                        >
                          <Popconfirm
                            title="도식화 삭제"
                            description={`${instance.title} 도식화를 삭제하시겠습니까?`}
                            onConfirm={() => confirm(instance.key)}
                            cancelText="No"
                            okText="Yes"
                            placement="right"
                          >
                            <DeleteInstanceButton >X</DeleteInstanceButton>
                          </Popconfirm>
                          <Meta
                            style={{
                              fontFamily: "Noto Sans KR",
                              textAlign: "left",
                              marginLeft: "0px",
                            }}
                            title={instance.title}
                          />
                        </CloudInstance>
                      </>

                    );
                  })}
                </CloudInstanceRow>
              ))) : (
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                <p>도식화 히스토리가 없습니다.</p>

              </div>
            )
            }
          </div>
        </div>
      </div>
    </div>

  );
};

export default MyArchitecture;

const CloudInstance = styled(Card)`
  width: 30%;
  height: auto;
  /* border: 1px solid gray; */
  /* margin-left: 10px; */
  margin: 10px;
  /* border-radius: 5px; */
  /* box-shadow: 1px 1px 1px 1px rgb(235, 235, 235); */
  position: relative; /* 상대적 위치 지정 */
`

const DeleteInstanceButton = styled.button`
  font-size: 10px;
  font-weight: 500;
  position: absolute; /* 절대적 위치 지정 */
  top: 0px; /* 상단에서의 위치 */
  right: 3px;
  background-color:transparent;
`

const CloudInstanceRow = styled.div`
    display: flex;
    width: 100%;
`


const StyledButton = styled(Button)`
  /* min-width: 100px;
  margin: 5px;
  color: white;
  font-weight: 500;
  display: flex; */

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

const StyledInstanceTitle = styled(Meta)`
  font-family: "Noto Sans KR", sans-serif !important;
  /* font-weight: 500; */
  font-size: 13px;
  text-align: left;
  /* margin: 20px; */
`;
