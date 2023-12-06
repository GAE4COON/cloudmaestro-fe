import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Select, Modal } from "antd";
import { TreeSelect, Checkbox } from "antd";
import Draggable from 'react-draggable';

import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { sendRequirement } from "../apis/requirementAPI";
import * as go from "gojs";
import ZoneComponent from "./ZoneComponent";
import WebSvrComponent from "./WebSvrComponent";

import {
  backupOptions,
  industrial,
  zoneFrame,
  globalRequest,
  industrial_BP_fin,
  industrial_BP_media,
  industrial_BP_game,
  industrial_BP_same,
} from "../db/Requirement";

const { SHOW_PARENT } = TreeSelect;

const industrialBPMapping = {
  금융: industrial_BP_fin,
  게임: industrial_BP_game,
  미디어: industrial_BP_media,
  공통: industrial_BP_same,
};

// 주어진 산업에 해당하는 비즈니스 프로세스 옵션 반환
function getBPIndustry(industryValue) {
  return industrialBPMapping[industryValue] || [];
}

const RequirementPopup = (props) => {
  let diagram = props.diagram;
  let fileName = props.fileName;

  const [industrialValue, setIndustrialValue] = useState(null);
  const [globalReqValue, setGlobalReqValue] = useState([]);
  const [savediagram, setSaveDiagram] = useState();
  const [zones, setZones] = useState([]);
  const [selectBackup, setSelectBackup] = useState([]);
  const [zoneCount, setZoneCount] = useState(1);
  const [isOptimizeEnabled, setIsOptimizeEnabled] = useState(false);
  const [industrial_BP, setIndustrial_BP] = useState([]); //요구사항 선택
  const [zoneFrameValue, setZoneFrameValue] = useState(null);
  const [showWebSvrComponent, setShowWebSvrComponent] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const draggleRef = useRef(null);

  useEffect(() => {
    const isZoneSelected =
      industrialValue !== null ||
      globalReqValue.length > 0 ||
      selectBackup.length > 0;

    const isZoneValid =
      zones.length > 0 &&
      zones.every(
        (zone) =>
          zone.zoneName &&
          (zone.zoneFunc ||
            zone.availableNode.length > 0 ||
            zone.serverNode.length > 0 ||
            zone.zoneReqValue.length > 0)
      );

    setIsOptimizeEnabled(isZoneSelected || isZoneValid);

    console.log(
      "Updated require: \n",
      "industrialValue: ",
      industrialValue,
      "\t\nglobalReqValue: ",
      globalReqValue,
      "\t\nBackup: ",
      selectBackup,

      "\t\nzoneFrameValue: ",
      zoneFrameValue,

      "\t\nzones: ",
      zones
    );

    let industrialList = [];
    if (industrial) {
      industrialList = getBPIndustry(industrialValue).concat(
        getBPIndustry("공통")
      );
    } else {
      industrialList = getBPIndustry("공통");
    }

    setIndustrial_BP(industrialList);
  }, [zones, industrialValue, globalReqValue, selectBackup, zoneFrameValue]);

  useEffect(() => {
    const diagramDataStr = props.diagram.model.toJson();
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
      setZoneCount(resultList.length);
      setSaveDiagram(props.diagram);
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

  // Handler to add a new zone
  const addZone = () => {
    setZones([
      ...zones,
      {
        id: Date.now(),
        zoneName: null,
        zoneFunc: null,
        availableNode: [],
        serverNode: [],
        zoneReqValue: [],
      },
    ]);
    setIsOptimizeEnabled(false);
  };
  const addWebZone = () => {
    // Check if a webzone already exists
    const webZoneExists = zones.some(zone => zone.id === "webzone");

    if (!webZoneExists) {
      setZones([
        ...zones,
        {
          id: "webzone",
          zoneName: null,
          zoneFunc: null,
          availableNode: [],
          serverNode: [],
          zoneReqValue: [],
        },
      ]);
      setIsOptimizeEnabled(false);
    }
  };


  // Zone 선택을 업데이트하는 함수

  const handleOptimize = async () => {
    const requestData = {
      requirementData: {
        industrial: industrialValue,
        globalRequirements: globalReqValue,
        zoneFrame: zoneFrameValue,
        backup: selectBackup,

        zones: zones.map((zone) => (
          console.log("zones", zone),
          {
            // console.log("zones",zone);
            name: zone.zoneName,
            function: zone.zoneFunc,
            availableNode: zone.availableNode,
            serverNode: zone.serverNode,
            zoneRequirements: zone.zoneReqValue,
          })),
      },
      diagramData: diagram.model.toJson(), // 다이어그램 데이터를 추가
      fileName: fileName // 파일 이름을 추가
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

  const onChange = (checkedValues) => {
    console.log("checked = ", checkedValues);
    setSelectBackup(checkedValues);
  };

  const handleZoneFrame = (value) => {
    setZoneFrameValue(value);
    // 선택이 해제되면 (`value`가 `null` 또는 빈 문자열이면) `WebSvrComponent`를 숨깁니다.
    setShowWebSvrComponent(value == "웹 서버 존재" ? true : false);
    if (showWebSvrComponent) {
      removeZone("webzone");
    }
  };

  const onStart = (_event, uiData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };



  const handleDataChange = (zoneId, updatedData) => {
    const formattedUpdatedData = {
      zoneName: updatedData.SelectZone,
      zoneFunc: updatedData.zoneFunc, // 예: updatedData에 zoneFunc가 있다고 가정
      availableNode: updatedData.availableNode,
      serverNode: updatedData.serverNode,
      zoneReqValue: updatedData.zoneReqValue, // 예: updatedData에 zoneReqValue가 있다고 가정
    };

    console.log("toss test: ", zoneId, formattedUpdatedData);

    setZones(
      zones.map((zone) =>
        zone.id === zoneId ? { ...zone, ...formattedUpdatedData } : zone
      )
    );
  };

  const removeZone = (zoneId) => {
    setZones(zones.filter(zone => zone.id !== zoneId));
  };


  return (
    <>
      <Modal
        width={1000}
        title={
          <div
            style={{
              width: '100%',
              cursor: 'move',
            }}
            onMouseOver={() => {
              if (disabled) {
                setDisabled(false);
              }
            }}
            onMouseOut={() => {
              setDisabled(true);
            }}
            onFocus={() => { }}
            onBlur={() => { }}

          >
            Optimization input
          </div>
        }
        open={true}
        onCancel={props.handlePopup}
        modalRender={(modal) => (
          <Draggable
            disabled={disabled}
            bounds={bounds}
            nodeRef={draggleRef}
            onStart={(event, uiData) => onStart(event, uiData)}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}

        footer={[
          <Button key="back"
          onClick={addZone}
          disabled={zones.length >= zoneCount}>
            망 추가하기
          </Button>,
              <Button
              type="primary"
              shape="round"
              size={"medium"}
              onClick={handleOptimize}
              disabled={!isOptimizeEnabled}
              style={{ marginBottom: "20px" }}
            >
              Optimize
            </Button>
        ]}
      >
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

          <SelectContainer>
            <SelectTitle>백업</SelectTitle>
            <BackupContainer>
              <Checkbox.Group options={backupOptions} onChange={onChange} />
            </BackupContainer>
          </SelectContainer>

          <SelectContainer>
            <SelectTitle>망 구조</SelectTitle>
            <BackupContainer>
              <Checkbox.Group options={zoneFrame} onClick={addWebZone} onChange={handleZoneFrame} />
            </BackupContainer>
          </SelectContainer>

          <div className="망 모음">
            {zones.map((zone) =>
              (showWebSvrComponent && zone.id == "webzone") && (
                <WebSvrComponent
                  key={"webzone"}
                  diagram={savediagram}
                  industrial_BP={industrial_BP}
                  zone={zone}
                  onDataChange={handleDataChange}
                  onRemoveZone={removeZone}
                />

              ))}
            {zones.map((zone) =>
              (zone.id != "webzone") && (
                <ZoneComponent
                  key={zone.id}
                  diagram={savediagram}
                  industrial_BP={industrial_BP}
                  zone={zone}
                  onDataChange={handleDataChange}
                  onRemoveZone={removeZone}
                />

              ))}

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center", // 버튼들을 중앙 정렬
                gap: "10px", // 버튼 사이의 간격
              }}
            >

            </div>
          </div>
        </ScrollableContent>
      </Modal>
    </>
  );
};


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

const BackupContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-left: 25px;
`;

export default RequirementPopup;
