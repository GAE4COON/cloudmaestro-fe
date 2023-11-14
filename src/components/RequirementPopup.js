import React, { useState } from 'react';
import styled from 'styled-components';
import { Select } from 'antd';
import { TreeSelect } from 'antd';
import { Button, Divider, Flex, Radio } from 'antd';
import { PlusOutlined } from "@ant-design/icons";

import { industrial, totalRequest, zoneRequest } from '../db/Requirement';

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
    background: linear-gradient(105deg, #3064D6 0%, #ffffff 200%);
    color: white;
    height:40px;
    position: absolute; /* Changed to absolute */
    width: 790px;
    z-index: 1001; /* Higher than PopupBox */
`

const CloseButton = styled.span`

    cursor: pointer;
    position: absolute; /* Changed to absolute */
    z-index: 1002; /* Highest in the context */    top: 5px;
    right: 10px;
    font-size: 20px;
    color: white;
`;



const SelectContainer = styled.div`
    display:flex;
    padding: 20px;
    margin-left: 50px;
    align-items: center;

`

const SelectTitle = styled.div`
    width: 20%;
    text-align:left;
`

const StyledSelect = styled(Select)`
    width: 80%;
    text-align: left;
`
const StyledTreeSelect = styled(TreeSelect)`
    width: 80%;
    text-align: left;
`

const ZoneContainer = styled.div`
    border-radius: 20px;
    border: 1px solid gray;
    margin: 20px;
    position: relative;
    padding-top: 20px;

`

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
`

const BackupSelectTitle = styled.div`
    width: 10%;
    text-align:left;
`

const StyledBackupSelect = styled(Select)`
    width: 200px;
    text-align: left;
    margin-right: 20px;
`

const ScrollableContent = styled.div`
    margin-top: 40px; // Same height as the header
    overflow-y: auto;
    height: 100%; // Adjust as needed
    max-height: 400px; /* Adjust this value as needed */
    overflow-y: auto; /* Enables vertical scrolling if content overflows */
`;

const StyledButton = styled.button`

`

const RequirementPopup = (props) => {
    const [industrialValue, setIndustrialValue] = useState();
    const [totalReqValue, setTotalReqValue] = useState([]);
    const [zoneReqValue, setZoneReqValue] = useState([]);

    const[zoneName, setZoneName] = useState([]);
    const[zoneFunc, setZoneFunc] = useState([]);
    const[staticBackup, setStaticBackup] = useState([]);
    const[dynamicBackup, setDynamicBackup] = useState([]);



    const [value, setValue] = useState([null]);
    const onTotalChange = (newValue) => {
        console.log('onChange ', newValue);
        setTotalReqValue(newValue);
    };

    const totalProps = {
        treeData: totalRequest,
        value: totalReqValue,
        onChange: onTotalChange,
        treeCheckable: true,
        showCheckedStrategy: SHOW_PARENT,
        placeholder: 'Please select',
    };

    // const zoneProps = {
    //     treeData: zoneRequest,
    //     value: zoneReqValue,
    //     onChange: onZoneChange,
    //     treeCheckable: true,
    //     showCheckedStrategy: SHOW_PARENT,
    //     placeholder: 'Please select',
    // };

    const [zones, setZones] = useState([]);

    // Handler to add a new zone
    const addZone = () => {
        setZones([...zones, { 
            id: Date.now(),
            zoneName: null,
            zoneFunc: null,
            staticBackup: null,
            dynamicBackup: null,
            zoneReqValue: [],
        }]);
    };
    
    // Zone 선택을 업데이트하는 함수
    const updateZone = (zoneId, key, value) => {
        setZones(zones.map(zone => 
            zone.id === zoneId ? {...zone, [key]: value} : zone
        ));
    };
    
    const removeZone = zoneId => {
        setZones(zones.filter(zone => zone.id !== zoneId));
    };

    const handleOptimize = () => {
        const requestData = {
            industrial: industrialValue,
            totalRequirements: totalReqValue,
            zones: zones.map(zone => ({
                // Assuming you have state to track each zone's selections
                name: zone.zoneName, 
                function: zone.zoneFunc,
                staticBackup: zone.staticBackup,
                dynamicBackup: zone.dynamicBackup,
                zoneRequirements: zone.zoneReqValue
            }))
        };

        console.log("Optimize Data:", requestData); // For now, just log the data
        // You can replace the above line with a function to send data to a server
    };

    const handleIndustrialChange = (value) => {setIndustrialValue(value);};

    const handleZoneNameChange = (value) => {setZoneName(value);};
    
    const handleZoneFuncChange = (value) => {setZoneFunc(value);};

    const handleStaticBackupChange = (value) => {setStaticBackup(value);};

    const handleDynamicBackupChange = (value) => {setDynamicBackup(value);};
    

    return (
        <Backdrop>
            <PopupBox>
                <PopupBoxHeader>Optimization input</PopupBoxHeader>
                <CloseButton onClick={() => props.handlePopup()}>✖</CloseButton>
                {/* <Title>Requirement</Title> */}
                <ScrollableContent>
                    <SelectContainer>
                        <SelectTitle>
                            산업군
                        </SelectTitle>
                        <StyledSelect
                            showSearch
                            onChange={handleIndustrialChange}
                            placeholder="Select industrial"
                            optionFilterProp="children"
                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            options={industrial}
                        />
                    </SelectContainer>

                    <SelectContainer>
                        <SelectTitle>
                            요구사항
                        </SelectTitle>
                        <StyledTreeSelect {...totalProps} />
                    </SelectContainer>

                    <div className='망 모음'>
                        {zones.map(zone => (
                            <ZoneContainer key={zone.id}>
                                <ZoneCloseButton onClick={() => removeZone(zone.id)}>✖</ZoneCloseButton>

                                <SelectContainer>
                                    <SelectTitle>
                                        망 이름
                                    </SelectTitle>
                                    <StyledSelect
                                        showSearch
                                        // onChange={handleZoneNameChange}
                                        onChange={(value) => updateZone(zone.id, 'zoneName', value)}

                                        placeholder="Select Zone"
                                        optionFilterProp="children"
                                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                        filterSort={(optionA, optionB) =>
                                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                        }
                                        options={industrial}
                                    />
                                </SelectContainer>

                                <SelectContainer>
                                    <SelectTitle>
                                        망 기능
                                    </SelectTitle>
                                    <StyledSelect
                                        showSearch
                                        onChange={(value) => updateZone(zone.id, 'zoneFunc', value)}

                                        placeholder="Select Zone Function"
                                        optionFilterProp="children"
                                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                        filterSort={(optionA, optionB) =>
                                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                        }
                                        options={industrial}
                                    />
                                </SelectContainer>

                                <SelectContainer>
                                    <SelectTitle>
                                        백업
                                    </SelectTitle>
                                    <BackupContainer>
                                        <BackupSelectTitle>
                                            정적
                                        </BackupSelectTitle>
                                        <StyledBackupSelect
                                            showSearch
                                            onChange={(value) => updateZone(zone.id, 'staticBackup', value)}

                                            placeholder="Static Backup"
                                            optionFilterProp="children"
                                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                            filterSort={(optionA, optionB) =>
                                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                            }
                                            options={industrial}
                                        />
                                        <BackupSelectTitle>
                                            동적
                                        </BackupSelectTitle>
                                        <StyledBackupSelect
                                            showSearch
                                            onChange={(value) => updateZone(zone.id, 'dynamicBackup', value)}
                                            placeholder="Dynamic Backup"
                                            optionFilterProp="children"
                                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                            filterSort={(optionA, optionB) =>
                                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                            }
                                            options={industrial}
                                        />
                                    </BackupContainer>
                                </SelectContainer>
                                <SelectContainer>
                                    <SelectTitle>
                                        요구사항
                                    </SelectTitle>
                                    <StyledTreeSelect
    treeData={zoneRequest}
    value={zone.zoneReqValue}
    onChange={(value) => updateZone(zone.id, 'zoneReqValue', value)}
    treeCheckable={true}
    showCheckedStrategy={SHOW_PARENT}
    placeholder="Please select"
/>
                                </SelectContainer>

                            </ZoneContainer>
                        ))}

                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center", // 버튼들을 중앙 정렬
                            gap: "10px" // 버튼 사이의 간격
                        }}>
                            <Button type="primary" shape="circle" icon={<PlusOutlined />} size={"medium"} onClick={addZone} />
                            <Button type="primary" shape="round" size={"medium"} onClick={handleOptimize}>Optimize</Button>
                        </div>

                    </div>
                </ScrollableContent>
            </PopupBox>
        </Backdrop>
    );
}

export default RequirementPopup;
