import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Select } from "antd";
import { TreeSelect } from "antd";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { sendRequirement } from "../apis/requirementAPI";
import * as go from "gojs";
import ZoneComponent from "./ZoneComponent";

import { industrial, globalRequest, zoneRequest } from "../db/Requirement";

const { SHOW_PARENT } = TreeSelect;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black backdrop */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupBox = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 800px; /* Adjust as needed */
  z-index: 1000; /* Ensure this is less than PopupBoxHeader and CloseButton */
  position: relative;
`;

const PopupBoxHeader = styled.div`
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  line-height: 40px;
  text-align: left;
  padding-left: 10px;
  background: linear-gradient(105deg, #3064d6 0%, #ffffff 200%);
  color: white;
  height: 40px;
  position: absolute; /* Changed to absolute */
  width: 790px;
  z-index: 1001; /* Higher than PopupBox */
`;

const CloseButton = styled.span`
  cursor: pointer;
  position: absolute; /* Changed to absolute */
  z-index: 1002; /* Highest in the context */
  top: 5px;
  right: 10px;
  font-size: 20px;
  color: white;
`;

const SelectContainer = styled.div`
  display: flex;
  padding: 20px;
  margin-left: 50px;
  align-items: center;
`;

const SelectTitle = styled.div`
  width: 20%;
  text-align: left;
`;

const StyledSelect = styled(Select)`
  width: 80%;
  text-align: left;
`;
const StyledTreeSelect = styled(TreeSelect)`
  width: 80%;
  text-align: left;
  //
`;

const ScrollableContent = styled.div`
  margin-top: 40px; // Same height as the header
  overflow-y: auto;
  height: 100%; // Adjust as needed
  max-height: 400px; /* Adjust this value as needed */
  overflow-y: auto; /* Enables vertical scrolling if content overflows */
`;

const RequirementPopup = (props) => {
  let diagram = props.diagram;
  const [industrialValue, setIndustrialValue] = useState();
  const [globalReqValue, setGlobalReqValue] = useState([]);
  const [savediagram, setSaveDiagram] = useState();
  const [zones, setZones] = useState([]);
  const [ZoneData, setZoneData] = useState("");

  useEffect(() => {
    setSaveDiagram(diagram);
  }, []);

  const onGlobalChange = (newValue) => {
    console.log("onChange ", newValue);
    setGlobalReqValue(newValue);
  };

  const globalProps = {
    treeData: globalRequest,
    value: globalReqValue,
    onChange: onGlobalChange,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: "Please select",
  };

  // Handler to add a new zone
  const addZone = () => {
    setZones([
      ...zones,
      {
        id: Date.now(),
        zoneName: null,
        zoneFunc: null,
        availableNode: null,
        backup: null,
        zoneReqValue: [],
      },
    ]);
  };

  // Zone 선택을 업데이트하는 함수

  const handleOptimize = async () => {
    const requestData = {
      requirementData: {
        industrial: industrialValue,
        globalRequirements: globalReqValue,
        zones: zones.map((zone) => ({
          name: zone.zoneName,
          function: zone.zoneFunc,
          availableNode: zone.availableNode,
          backup: zone.Backup,
          zoneRequirements: zone.zoneReqValue,
        })),
      },
      diagramData: diagram.model.toJson(), // 다이어그램 데이터를 추가
    };

    console.log("requestData", requestData); // 로그 출력
    console.log(typeof diagram.model.toJson());

    const response = await sendRequirement(requestData); // 하나의 함수를 사용하여 전체 데이터 전송
    console.log("response", response.data.result);
    const diagramData = response.data.result;
    diagram.model = go.Model.fromJson(diagramData);

    props.handlePopup();

    console.log("response", response); // For now, just log the data
  };

  const handleIndustrialChange = (value) => {
    setIndustrialValue(value);
  };

  const handleDataChange = (zoneId, updatedData) => {
    const formattedUpdatedData = {
      zoneName: updatedData.SelectZone,
      zoneFunc: updatedData.zoneFunc, // 예: updatedData에 zoneFunc가 있다고 가정
      availableNode: updatedData.availableNode,
      backup: updatedData.selectBackup,
      zoneReqValue: updatedData.zoneReqValue, // 예: updatedData에 zoneReqValue가 있다고 가정
    };

    console.log("toss test: ", zoneId, formattedUpdatedData);

    setZones(
      zones.map((zone) =>
        zone.id === zoneId ? { ...zone, ...formattedUpdatedData } : zone
      )
    );

    console.log(zones);
  };

  return (
    <Backdrop>
      <PopupBox>
        <PopupBoxHeader>Optimization input</PopupBoxHeader>
        <CloseButton onClick={() => props.handlePopup()}>✖</CloseButton>
        {/* <Title>Requirement</Title> */}
        <ScrollableContent>
          <SelectContainer>
            <SelectTitle>산업군</SelectTitle>
            <StyledSelect
              showSearch
              onChange={handleIndustrialChange}
              placeholder="Select industrial"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={industrial}
            />
          </SelectContainer>

          <SelectContainer>
            <SelectTitle>요구사항</SelectTitle>
            <StyledTreeSelect {...globalProps} />
          </SelectContainer>

          <div className="망 모음">
            {zones.map((zone) => (
              <ZoneComponent
                diagram={savediagram}
                zone={zone}
                onDataChange={handleDataChange}
              ></ZoneComponent>
            ))}

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center", // 버튼들을 중앙 정렬
                gap: "10px", // 버튼 사이의 간격
              }}
            >
              <Button
                type="primary"
                shape="circle"
                icon={<PlusOutlined />}
                size={"medium"}
                onClick={addZone}
              />
              <Button
                type="primary"
                shape="round"
                size={"medium"}
                onClick={handleOptimize}
              >
                Optimize
              </Button>
            </div>
          </div>
        </ScrollableContent>
      </PopupBox>
    </Backdrop>
  );
};

export default RequirementPopup;
