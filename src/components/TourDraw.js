import React, { useEffect, useRef, useState } from 'react';
import { EllipsisOutlined } from '@ant-design/icons';
import { Button, Divider, Space, Tour } from 'antd';
import { wait } from '@testing-library/user-event/dist/utils';
const TourDraw = (props) => {
  const {setIsPopup} = props;
  const { open, setOpen, showAlertMessages, setAlertMessage, setDiagram, resetAlertMessage, setClickedTab } = props;
  const {refPalette, refDiagram, refButton, refAlert, refPopup, refCost, setShowToggle, refLS, refSummary, refOptimize, refNetworkPalette, refCloudPalette, setShowSelectToggle } = props;
  
useEffect(() => {
  console.log("TourDraw.js useEffect");
  console.log(props);
})

  const steps = [
    //0
    {
      title: 'Upload File',
      description: 'Put your files here.',
      target: () => refDiagram.current,
    },
    //1
    {
      title: 'Upload File',
      description: 'Put your files here.',
      target: () => refAlert.current,
    },
    //2
    {
      title: 'Upload File',
      description: 'Put your files here.',
      // target: () => refDiagram.current,
    },
    //4
    {
      title: 'Upload File',
      description: 'Put your files here.',
      target: () => refButton.current,
    },
    //5
    {
      title: 'Upload File',
      description: 'Put your files here.',
      target: () => refLS.current,
    },
    //6
    {
      title: 'Upload File',
      description: 'Put your files here.',
      target: () => refSummary.current,
    },
    //7
    {
      title: 'Upload File',
      description: 'Put your files here.',
      target: () => refOptimize.current,
    },
    //8
    {
      title: 'Upload File',
      description: 'Put your files here.',
      target: () => refPopup.current,
    },
    //9
    {
      title: 'Upload File',
      description: 'Put your files here.',
      target: () => refPalette.current,
    },
    //10
    {
      title: 'Upload File',
      description: 'Put your files here.',
      target: () => refNetworkPalette.current,
    },
    //11
    {
      title: 'Network Diagram',
      description: 'Put your files here.',
      target: () => refDiagram.current,
    },
    //12
    {
      title: 'network',
      description: 'Save your changes.',

      target: () => refCloudPalette.current,
    },
    //13
    {
      title: 'reghost',
      description: 'Click to see other actions.',
      target: () => refDiagram.current,
    },
    //14
    {
      title: 'Other Actions',
      description: 'Click to see other actions.',
      target: () => refDiagram.current,
    },
    {
      title: 'Other Actions',
      description: 'Click to see other actions.',
      target: () => refCost.current,
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

  const ec2Cost = () => {
    setShowToggle(true);
    setShowSelectToggle({value: true, key: "EC2"});
  };

  const handleStepChange = async (currentStep) => {
    if(currentStep === 0){

    }
    if(currentStep === 1){
      addAlertMessage();      
    }
    if(currentStep === 2){
      showAlertMessages();
    }
    if(currentStep === 3){
      resetAlertMessage();
    }
    if(currentStep === 7){
      setIsPopup(true);
    }
    if(currentStep === 8){
      setIsPopup(false);
      setClickedTab(["Network_icon", "Compute"]);
    }
    if(currentStep === 10){
      setDiagram("/assets/json/network.json");
    }
    if(currentStep === 12){
      setDiagram("/assets/json/rehost.json");
      setClickedTab(["Network_icon", "Compute"]);

    }
    if(currentStep === 13){
      setDiagram("/assets/json/cost.json");

    }
    if(currentStep === 14){
      ec2Cost();
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