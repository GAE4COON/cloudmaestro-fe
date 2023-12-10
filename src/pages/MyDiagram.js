import SideBar from "../components/MyPageSideBar";
import React, { useState, useEffect } from "react";
import { Popconfirm, message } from "antd";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import "../styles/App.css";
import { Space, Dropdown, Button } from "antd";
import { Menu } from "antd";
import { useAuth } from "../utils/auth/authContext";
import jwtDecode from "jwt-decode";
import { CloseOutlined } from "@ant-design/icons";
import { Avatar, Card, Tooltip } from "antd";


import styled from "styled-components";
import { getDiagramData, myNetworkDB, deleteDiagramData } from "../apis/myPage";

message.config({
  top: 50,
  duration: 1,
});

const MyArchitecture = () => {
  const { Meta } = Card;

  const [cloudInstances, setCloudInstances] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  const navigate = useNavigate();

  const { user, setUser } = useAuth();
  const ACCESS_TOKEN = localStorage.getItem("accessToken");

  useEffect(() => {
    if (ACCESS_TOKEN) {
      try {
        const decodedToken = jwtDecode(ACCESS_TOKEN);
        console.log(decodedToken);
        setUser(decodedToken);
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
      console.log(myNetwork.data);
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
    console.log("response.data", response.data);
    navigate(`${path}`, { state: { info: response.data, save: true } });
  };

  const confirm = async (key, e) => {
    const response = await deleteDiagramData(key);
    console.log("response.data", response.data);
    setCloudInstances(
      cloudInstances.filter((instance) => instance.key !== key)
    );

    message.success("도식화가 삭제되었습니다.");
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
                            onClick={() =>
                              handleCloudInstance(
                                instance.key,
                                "/mypage/diagram/security"
                              )
                            }
                          >
                            Security
                          </button>
                        ),
                      },
                      {
                        key: "2",
                        label: (
                          <button
                            onClick={() =>
                              handleCloudInstance(
                                instance.key,
                                "/mypage/diagram/resource"
                              )
                            }
                          >
                            Resource
                          </button>
                        ),
                      },
                    ];
                    return (
                      <CloudInstance key={instance.key}>
                        <Popconfirm
                          title="도식화 삭제"
                          description={`${instance.title} 도식화를 삭제하시겠습니까?`}
                          onConfirm={() => confirm(instance.key)}
                          cancelText="No"
                          okText="Yes"
                          placement="right"
                        >
                          {/* <CloseOutlined
                            style={{
                              position: "absolute",
                              top: "10px",
                              right: "10px",
                            }}
                          />{" "} */}

                          <Button style={{
                            position: "absolute",
                            top: "5px",
                            right: "5px",
                          }}
                            type="text"
                            shape="circle" icon={<CloseOutlined />} />
                        </Popconfirm>

                        <CloudInstanceImg
                          onClick={() =>
                            handleCloudInstance(instance.key, "/draw")
                          }
                          alt="diagram_img"
                          src={`https://cm-user-file.s3.ap-northeast-2.amazonaws.com/${instance.title}_${user.sub}.png`}

                        />
                        <CloudInstanceETC>
                          <StyledInstanceTitle>
                          {instance.title}
                        </StyledInstanceTitle>

                        <ButtonContainer>
                          <StyledButton
                            style={{ backgroundColor: "#5280DD" }}
                            onClick={() =>
                              handleCloudInstance(
                                instance.key,
                                "/mypage/diagram/summary"
                              )
                            }
                          >
                            Total Cost
                          </StyledButton>

                          <Dropdown
                            overlay={<Menu items={dropdownItems} />}
                            placement="bottomLeft"
                          >
                            <StyledButton
                              style={{ backgroundColor: "#FD754A" }}
                            >
                              Guide
                              <DownOutlined style={{ marginTop: "5px" }} />
                            </StyledButton>
                          </Dropdown>
                        </ButtonContainer>
                        </CloudInstanceETC>

                      </CloudInstance>
                    );
                  })}
                </CloudInstanceRow>
              ))
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <p>도식화 히스토리가 없습니다.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyArchitecture;
const CloudInstanceETC = styled.div`
  display: flex;
  flex-direction: row; // 가로 방향으로 요소를 배열
  /* align-items: center; // 세로 축 중앙 정렬 */
  justify-content: space-between; // 요소 사이의 공간을 균등하게 배분
  /* width: 100%; // 전체 너비를 사용 */
  flex-wrap: wrap; // 필요한 경우 요소를 다음 줄로 넘김
  padding: 20px;
`;

const CloudInstanceImg = styled.img`
  /* margin-top: 30px; */
  width: 100%;
  height: 60%;
  object-fit: contain;
  cursor: "pointer";
  border-radius: 5px 5px 0px 0px;
  border: 1px solid #e8e8e8;
`

const CloudInstance = styled.div`
  width: 30%; // Adjust the width to fit 3 instances per row
  height: 280px;
  /* border: 1px solid gray; */
  border-radius: 5px;
  flex-direction: column; // 화면이 작을 때 세로 방향으로 쌓음
  @media (min-width: 600px) {
    flex-direction: row; // 화면이 600px 이상일 때 가로 방향으로 배치
  }
  box-shadow: 1px 1px 1px 1px rgb(235, 235, 235);
  position: relative;
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 20px;
`;

const CloudInstanceRow = styled.div`
  margin-left: 20px; // Keep left margin
  margin-right: 20px; // Keep right margin
  display: flex;
  justify-content: flex-start; // Align items to the start of the row
  flex-wrap: wrap; // Wrap items to the next line if they overflow
  width: 100%;
  gap: 10px; // You can use gap property to maintain consistent spacing
`;

const StyledButton = styled(Button)`
  min-width: 100px;
  margin-bottom: 5px;
  color: white;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  border-radius: 20px;
  font-family: "Noto Sans KR", sans-serif !important;
  /* text-align: left; */
`;

const ButtonContainer = styled.div`

  /* align-items: end; */
  display: flex;
  flex-direction: column;
  align-items: flex-end; // 오른쪽 정렬
  flex-grow: 0;
  flex:0;
`;

const StyledSideMenuTitle = styled.div`
  font-family: "Noto Sans KR", sans-serif !important;
  font-weight: 500;
  font-size: 20px;
  margin-top: 30px;

`;

const StyledInstanceTitle = styled.div`
  font-family: "Noto Sans KR", sans-serif !important;
  text-align: left;
  flex-grow: 1; 
  flex: 1;
  white-space: nowrap; 
  overflow: hidden; 
  text-overflow: ellipsis;
`;
