import React, { useEffect, useRef, useState } from 'react';
import { EllipsisOutlined } from '@ant-design/icons';
import { Button, Divider, Space, Tour } from 'antd';
import { wait } from '@testing-library/user-event/dist/utils';
const TourDraw = (props) => {
  const {setIsPopup} = props;
  const { open, setOpen, showAlertMessages, setAlertMessage, setDiagram, resetAlertMessage, setClickedTab,  refLS, refSummary, refOptimize, refNetworkPalette, refCloudPalette } = props;
  const {refPalette, refDiagram, refButton, refAlert, refPopup} = props;
  
useEffect(() => {
  console.log("TourDraw.js useEffect");
  console.log(props);
})

  const steps = [
    {
      title: 'Upload File',
      description: 'Put your files here.',
      target: () => refPopup.current,
    },
    {
      title: 'network',
      description: 'Save your changes.',

      target: () => refPopup.current,
    },
    {
      title: 'reghost',
      description: 'Click to see other actions.',
      target: () => refPopup.current,
    },
    {
      title: 'Other Actions',
      description: 'Click to see other actions.',
      target: () => refCloudPalette.current,
    },
  ];

  const addAlertMessage = () => {

    setTimeout(() => {
      setAlertMessage({
        key: Date.now(),
        message: "S3가 암호화되지 않을 시, 무단 접근 및 변조 등을 통한 보험 위험이 존재할 수 있습니다.",
        tag: "Info",
      });
    }, 30)
    setTimeout(() => {

    setAlertMessage({
      key: Date.now()+1,
      message: "비정상적인 동작을 모니터랑하고, 보안 사고 식별, 위협 인텔리전스 형성을 위한 로깅 서비스가 필요합니다. CloudWatch, CloudTrail 사용을 권장합니다.",
      tag: "Warn",
    });
  })

    setAlertMessage({
      key: Date.now()+2,
      message: "VPC당 API GateWay는 한 개를 초과할 수 없습니다.",
      tag: "Error",
    });

  };

  const handleStepChange = async (currentStep) => {
    if(currentStep === 0){

    }
    if(currentStep === 1){

    }
    if(currentStep === 2){
      

    }
    // if (currentStep === 1) {  // 예를 들어, 두 번째 스텝에서 함수를 실행
    //   // 여기에 원하는 함수 또는 로직을 추가
    //   addAlertMessage();
    // }
    // if(currentStep === 2){
    //   showAlertMessages();
    // }
    // if(currentStep === 3){
    //   resetAlertMessage();
    // }
          // setClickedTab(["Network_icon", "Compute"]);
      // 전에 선언
      // await setDiagram("/assets/json/rehost.json");
    //  await setDiagram("/assets/json/network.json");
    //      setIsPopup(true);


  };

  const handleSetOpen = () => {
    setOpen(!open);
  };
  return (
    <>

      <Tour open={open} onClose={() => handleSetOpen()} steps={steps} onChange={handleStepChange} />
    </>
  );
};
export default TourDraw;