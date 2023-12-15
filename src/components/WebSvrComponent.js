import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Select, TreeSelect, Checkbox } from "antd";

import { industrial, zoneSecurityReq, zoneRdsReq } from "../db/Requirement";

const { SHOW_PARENT } = TreeSelect;

function WebSvrComponent({
  diagram,
  zone,
  industrial_BP,
  onDataChange,
  onRemoveZone,
}) {
  const [ZoneData, setZoneData] = useState([]); //Zone select에서 쓰기 위한 데이터
  const [zoneValue, setZoneValue] = useState([]); //Zone에 대한 private, public subnet 정보 list
  const [zoneNode, setZoneNode] = useState([]); //Zone에 대한 private, public subnet node 정보 list
  const [SelectZone, setSelectZone] = useState(null); //망 선택
  const [availableNode, setAvailableNode] = useState([]); //고가용성 - 트래픽 분산 선택
  const [serverNode, setServerNode] = useState([]); //고가용성 -  선택
  const [zoneFunc, setSelectedZoneFunc] = useState(null); //망 기능 선택
  const [zoneReqValue, setSelectedZoneReqValue] = useState([]); //요구사항 선택

  const [zones, setZones] = useState([]);

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
          console.log("item.key", item.key);
          // Exclude keys containing 'Security Group', 'Private subnet', or 'Public subnet'
          const excludePattern = /(Security Group|Private subnet|Public subnet)/;
          if (!excludePattern.test(item.key)) {
            // Now, 'item.key' does not contain the excluded strings
            result.add(item.key.trim());
            zonelist.push(item.key);
          }
        }
      });

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
      console.log("result", result);
      console.log("zonelist", zonelist);


      const resultList = Array.from(result); // Set을 배열로 변환
      for (let i = 0; i < resultList.length; i++) {
        resultList[i] = {
          value: resultList[i],
          label: resultList[i],
        };
      }
      setZoneData(resultList);
      setZoneValue(zonelist);
      console.log("Zone", resultList); // 완성

      const backupNode = [];
      const backupgroupNode = [];

      function getAllNestedGroups(groupId, groupData) {
        let nestedGroups = [];
      
        groupData.forEach(groupItem => {
          if (groupItem.group === groupId) {
            nestedGroups.push(groupItem.key);
            // Recursively find nested groups
            nestedGroups = nestedGroups.concat(getAllNestedGroups(groupItem.key, groupData));
          }
        });
      
        return nestedGroups;
      }
      
      for (let idx = 0; idx < resultList.length; idx++) {
        console.log("resultList", resultList[idx]);
        console.log("resultList", resultList[idx].label);
      
        backupgroupNode[resultList[idx].label] = [];
        backupNode[resultList[idx].label] = [];
      
        // Extracting security groups, including nested ones
        for (let i = 0; i < GroupData.length; i++) {
          if (typeof GroupData[i].group === "string") {
            if (GroupData[i].group.includes(resultList[idx].label)) {
              const nestedGroups = getAllNestedGroups(GroupData[i].key, GroupData);
              backupgroupNode[resultList[idx].label].push(GroupData[i].key, ...nestedGroups);
            }
          }
        }
        console.log([resultList[idx].label], "backupgroupNode: ", backupgroupNode[resultList[idx].label]);

        for (
          let i = 0;
          i < backupgroupNode[resultList[idx].label].length;
          i++
        ) {
          backupgroupNode[resultList[idx].label][i] = {
            value: backupgroupNode[resultList[idx].label][i],
            label: backupgroupNode[resultList[idx].label][i],
          };
        }

        const nodeSet = new Set();
        for (let i = 0; i < diagramData.nodeDataArray.length; i++) {
          let nodeData = diagramData.nodeDataArray[i];
          let backupValues = backupgroupNode[resultList[idx].label].map((item) => item.value);

          if (nodeData.isGroup === null && nodeData.key.includes("EC2")) {
            // console.log("Security Group 있는 Ec2", nodeData);
            if (backupValues.includes(nodeData.group)) {
              nodeSet.add(nodeData.group);
            }
          }


          if (typeof nodeData.group === 'string' && !nodeData.group.includes("Security Group") && nodeData.key.includes("EC2")) {

            if (nodeData.group.includes(resultList[idx].value)) {
              nodeSet.add(nodeData.key);
            }

          }
        }

        const nodeSetList = Array.from(nodeSet);
        backupNode[resultList[idx].label] = nodeSetList;

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

  useEffect(() => {
    const updateTossPopup = () => {
      onDataChange(zone.id, {
        SelectZone,
        zoneFunc,
        availableNode,
        serverNode,
        zoneReqValue,
        zones,
      });
    };
    updateTossPopup();
  }, [availableNode, serverNode, zoneFunc, zoneReqValue, SelectZone, zones]);
  //여기에 상위props로 보낼 것 다 넣어주세요.

  const resetFields = () => {
    setAvailableNode([]); // Resetting High Availability
    setServerNode([]);
    setSelectedZoneFunc(null); // Resetting Selected Zone Function
    setSelectedZoneReqValue([]); // Resetting Selected Zone Requirements
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setSelectZone(value);
    resetFields();
  };

  const handleChange1 = (value) => {
    console.log(`selected ${value}`);
    setAvailableNode(value);
  };
  const handleChange2 = (value) => {
    console.log(`selected ${value}`);
    setServerNode(value);
  };

  const handleZoneFuncChange = (value) => {
    setSelectedZoneFunc(value);
    // Additional logic if needed
  };

  const handleZoneReqValueChange = (value) => {
    setSelectedZoneReqValue(value); // Corrected this line
    // Additional logic if needed
  };

  const updateZone = (zoneId, key, value) => {
    setZones(
      zones.map((zone) =>
        zone.id === zoneId ? { ...zone, [key]: value } : zone
      )
    );
  };

  const removeCurrentZone = () => {
    onRemoveZone(zone.id);
  };

  return (
    <ZoneContainer key={zone.id}>
      <ZoneCloseButton onClick={removeCurrentZone}>✖</ZoneCloseButton>

      <SelectContainer>
        <SelectTitle>웹 서버 이름</SelectTitle>
        <StyledSelect
          showSearch
          // onChange={handleZoneNameChange}
          value={SelectZone}
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
          value={zoneFunc}
          onChange={handleZoneFuncChange}
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
          options={industrial_BP}
        />
      </SelectContainer>
      <SelectContainer>
        <SelectTitle>보안</SelectTitle>
        <Checkbox.Group options={zoneSecurityReq} onChange={handleZoneReqValueChange} />
      </SelectContainer>
      <SelectContainer>
        <SelectTitle>트래픽 분산 ( ALB )</SelectTitle>
        <StyledBackupSelect
          mode="tags"
          showSearch
          value={availableNode}
          onChange={handleChange1}
          placeholder="node select..."
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
      </SelectContainer>

      <SelectContainer>
        <SelectTitle>서버 수 자동조절 (AutoScaling)</SelectTitle>
        <StyledBackupSelect
          mode="tags"
          showSearch
          value={serverNode}
          onChange={handleChange2}
          placeholder="node select..."
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
      </SelectContainer>
    </ZoneContainer>
  );
}

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

const StyledBackupSelect = styled(Select)`
  width: 80%;
  text-align: left;
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

export default WebSvrComponent;