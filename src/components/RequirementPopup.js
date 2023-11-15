import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Select } from "antd";
import { TreeSelect } from "antd";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  sendRequirement,
  sendRequirementDiagram,
} from "../apis/requirementAPI";

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
`;

const ZoneContainer = styled.div`
  border-radius: 20px;
  border: 1px solid gray;
  margin: 20px;
  position: relative;
  padding-top: 20px;
`;

const ZoneCloseButton = styled.span`
  cursor: pointer;
  position: absolute; /* Changed to absolute */
  font-size: 15px;
  right: 10px;
  top: 10px;
`;

const BackupContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BackupSelectTitle = styled.div`
  width: 10%;
  text-align: left;
`;

const StyledBackupSelect = styled(Select)`
  width: 200px;
  text-align: left;
  margin-right: 20px;
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
  const [ZoneData, setZoneData] = useState([]); //Zone select에서 쓰기 위한 데이터
  const [zoneValue, setZoneValue] = useState([]); //Zone에 대한 private, public subnet 정보 list
  const [zoneNode, setZoneNode] = useState([]); //Zone에 대한 private, public subnet node 정보 list
  const [SelectZone, setSelectZone] = useState([]); //망 선택
  useEffect(() => {
    const diagramDataStr = diagram.model.toJson();
    const diagramData = JSON.parse(diagramDataStr);
    const GroupData = [];
    try {
      for (let i = 0; i < diagramData.nodeDataArray.length; i++) {
        let nodeData = diagramData.nodeDataArray[i];
        if (nodeData.isGroup === true) {
          GroupData.push(nodeData);
        }
      }
      console.log(GroupData);
      const result = new Set();
      const zonelist = [];
      GroupData.forEach((item) => {
        if (typeof item.key === "string") {
          const match = item.key.match(
            /^(.*?)\s*(Private subnet|Public subnet)/
          );
          if (match && match[1]) {
            result.add(match[1].trim());
            zonelist.push(item.key);
          }
        }
      });

      const resultList = Array.from(result); // Set을 배열로 변환
      for (let i = 0; i < resultList.length; i++) {
        resultList[i] = {
          value: resultList[i],
          label: resultList[i],
        };
      }
      setZoneData(resultList);
      setZoneValue(zonelist);
      console.log("Zone", resultList);
      console.log("Zone subnet", zonelist);

      const backupNode = [];
      const backupgroupNode = [];

      for (let idx = 0; idx < resultList.length; idx++) {
        console.log(resultList[idx]);
        backupgroupNode[resultList[idx].label] = [];
        backupNode[resultList[idx].label] = [];

        for (let i = 0; i < zonelist.length; i++) {
          if (zonelist[i].includes(resultList[idx].label)) {
            backupgroupNode[resultList[idx].label].push(zonelist[i]);
          }
        }

        console.log("test group", backupgroupNode);

        //security 그룹 추출
        for (let i = 0; i < GroupData.length; i++) {
          if (typeof GroupData[i].group === "string") {
            if (GroupData[i].group.includes(resultList[idx].label)) {
              backupgroupNode[resultList[idx].label].push(GroupData[i].key);
            }
          }
        }
        console.log("backupgroupNode: ", backupgroupNode);

        for (let i = 0; i < diagramData.nodeDataArray.length; i++) {
          let nodeData = diagramData.nodeDataArray[i];
          if (typeof nodeData.group === "string" && nodeData.isGroup === null) {
            if (
              backupgroupNode[resultList[idx].label].includes(nodeData.group)
            ) {
              backupNode[resultList[idx].label].push(nodeData.key);
            }
          }
        }
        console.log("backupNode: ", backupNode);

        for (let i = 0; i < backupNode[resultList[idx].label].length; i++) {
          backupNode[resultList[idx].label][i] = {
            value: backupNode[resultList[idx].label][i],
            label: backupNode[resultList[idx].label][i],
          };
        }

        setZoneNode(backupNode);
      }
    } catch (error) {
      console.log(error);
    }
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

  const [zones, setZones] = useState([]);

  // Handler to add a new zone
  const addZone = () => {
    setZones([
      ...zones,
      {
        id: Date.now(),
        zoneName: null,
        zoneFunc: null,
        staticBackup: null,
        dynamicBackup: null,
        zoneReqValue: [],
      },
    ]);
  };

  // Zone 선택을 업데이트하는 함수
  const updateZone = (zoneId, key, value) => {
    setZones(
      zones.map((zone) =>
        zone.id === zoneId ? { ...zone, [key]: value } : zone
      )
    );
  };

  const removeZone = (zoneId) => {
    setZones(zones.filter((zone) => zone.id !== zoneId));
  };

  const handleOptimize = async () => {
    const requestData = {
      industrial: industrialValue,
      globalRequirements: globalReqValue,
      zones: zones.map((zone) => ({
        // Assuming you have state to track each zone's selections
        name: zone.zoneName,
        function: zone.zoneFunc,
        staticBackup: zone.staticBackup,
        dynamicBackup: zone.dynamicBackup,
        zoneRequirements: zone.zoneReqValue,
      })),
    };

    console.log("Optimize Data:", requestData); // For now, just log the data
    const requirementResponse = await sendRequirement(requestData);
    const diagramResponse = await sendRequirementDiagram(
      diagram.model.toJson()
    );

    console.log("Optimize response:", requirementResponse); // For now, just log the data
    console.log("Optimize response:", diagramResponse); // For now, just log the data
  };

  const handleIndustrialChange = (value) => {
    setIndustrialValue(value);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
    // const regex = /^([a-zA-Z]+)(\d+)$/;
    // const matches = value.match(regex);

    // if (matches) {
    //   const textPart = matches[1];
    //   const numberPart = parseInt(matches[2], 10);
    //setSelectZone([textPart, numberPart]);
    //console.log(`Text Part: ${textPart}, Number Part: ${numberPart}`);
    setSelectZone(value);
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
              <ZoneContainer key={zone.id}>
                <ZoneCloseButton onClick={() => removeZone(zone.id)}>
                  ✖
                </ZoneCloseButton>

                <SelectContainer>
                  <SelectTitle>망 이름</SelectTitle>
                  <StyledSelect
                    showSearch
                    // onChange={handleZoneNameChange}
                    onChange={handleChange}
                    placeholder="Select Zone"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? "").includes(input)
                    }
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    options={ZoneData}
                  />
                </SelectContainer>

                <SelectContainer>
                  <SelectTitle>망 기능</SelectTitle>
                  <StyledSelect
                    showSearch
                    onChange={(value) => updateZone(zone.id, "zoneFunc", value)}
                    placeholder="Select Zone Function"
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
                  <SelectTitle>백업</SelectTitle>
                  <BackupContainer>
                    <BackupSelectTitle>중앙관리</BackupSelectTitle>
                    <StyledBackupSelect
                      mode="tags"
                      showSearch
                      onChange={(value) =>
                        updateZone(zone.id, "staticBackup", value)
                      }
                      placeholder="Static Backup"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? "").includes(input)
                      }
                      filterSort={(optionA, optionB) =>
                        (optionA?.label ?? "")
                          .toLowerCase()
                          .localeCompare((optionB?.label ?? "").toLowerCase())
                      }
                      options={zoneNode[SelectZone]}
                    />
                    <BackupSelectTitle>일반</BackupSelectTitle>
                    <StyledBackupSelect
                      showSearch
                      onChange={(value) =>
                        updateZone(zone.id, "dynamicBackup", value)
                      }
                      mode="tags"
                      placeholder="Dynamic Backup"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? "").includes(input)
                      }
                      filterSort={(optionA, optionB) =>
                        (optionA?.label ?? "")
                          .toLowerCase()
                          .localeCompare((optionB?.label ?? "").toLowerCase())
                      }
                      options={zoneNode[SelectZone]}
                    />
                  </BackupContainer>
                </SelectContainer>
                <SelectContainer>
                  <SelectTitle>요구사항</SelectTitle>
                  <StyledTreeSelect
                    treeData={zoneRequest}
                    value={zone.zoneReqValue}
                    onChange={(value) =>
                      updateZone(zone.id, "zoneReqValue", value)
                    }
                    treeCheckable={true}
                    showCheckedStrategy={SHOW_PARENT}
                    placeholder="Please select"
                  />
                </SelectContainer>
              </ZoneContainer>
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
