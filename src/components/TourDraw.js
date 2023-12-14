import React, { useEffect, useRef, useState } from 'react';
import { Tour } from 'antd';
import { useData } from "./DataContext.js";

const TourDraw = (props) => {
  const {setIsPopup} = props;
  const {alertMessage, diagram, clickedTab, isOpen } = props;
  const {open, setOpen, showAlertMessages, setAlertMessage, setDiagram, resetAlertMessage, setClickedTab, setIsOpen, setShowSelectToggle } = props;
  const {refPalette, refDiagram, refButton, refAlert, refPopup, refCost, setShowToggle, refLS, refSummary, refOptimize, refNetworkPalette, refCloudPalette, refSidebar, refSaveButton } = props;

  useEffect(() => {},[open, alertMessage, diagram, clickedTab, isOpen]);

  const steps = [
    {
      id: "initDiagram",
      title: 'Upload File',
      description: 'Put your files here.',
      target: () => refDiagram.current,
    },
    {
      id:"palette",
      placement: "right",
      title: 'Upload File',
      description: 'Put your files here.',
      target: () => refPalette.current,
    },
    {
      id: "button",
      placement: "right",
      title: 'Upload File',
      description: 'Put your files here.',
      target: () => refButton.current,
    },
    {
      id: "networkPalette",
      placement: "right",
      title: 'Upload File',
      description: 'Put your files here.',
      target: () => refNetworkPalette.current,
    },
    
    {
      id: "networkDiagram",
      placement: "top",

      title: 'Network Diagram',
      description: 'Put your files here.',
      target: () => refDiagram.current,
    },
    {
      id: "LS",
      placement: "right",

      title: 'Upload File',
      description: 'Put your files here.',
      target: () => refLS.current,
    },

    {
      id: "cloudDiagram",
      title: 'rehost',
      description: 'Click to see other actions.',
      target: () => refDiagram.current,
    },
    {
      id: "cloudPalette",
      placement: "right",

      title: 'palette를 통해 수정 가능',
      description: 'Save your changes.',

      target: () => refCloudPalette.current,
    },
    {
      id: "beforeSidebar",
      title: 'rehost',
      description: 'Click to see other actions.',
      // target: () => refSidebar.current,
    },
    {
      id: "sidebar",
      placement: "left",

      title: 'rehost',
      description: 'Click to see other actions.',
      target: () => refSidebar.current,
    },
    {
      id: "alert",
      title: 'Upload File',
      description: 'Put your files here.',
      target: () => refAlert.current,
    },
    {
      id: "alertList",
      title: 'Upload File',
      description: 'Put your files here.',
      // target: () => refDiagram.current,
    },
    {
      id: "optimize",
      placement: "right",

      title: 'Upload File',
      description: 'Put your files here.',
      target: () => refOptimize.current,
    },
    //8
    {
      id: "popup",
      title: 'Optimize popup',
      description: 'Put your files here.',
      target: () => refPopup.current,
    },
    {
      id: "optimizeDiagram",
      title: 'Upload File',
      description: 'Put your files here.',
      target: () => refDiagram.current,
    },
    {
      id: "costDiagram",
      title: '비용 산정은 이 4개의 리소스를 지원합니다.',
      description: 'Click to see other actions.',
      target: () => refDiagram.current,
    },
    {
      id: "costToggle",
      title: 'Other Actions',
      description: 'Click to see other actions.',
      target: () => refCost.current,
    },
    {
      id: "summary",      
      placement: "right",

      title: '이 버튼으로 확인 가능',
      description: 'Put your files here.',
      target: () => refSummary.current,
    },
    {
      id: "saveButton",
      placement: "left",

      title: '저장 후 Mypage에서 가이드 확인 가능',
      description: 'Put your files here.',
      target: () => refSaveButton.current,
    },
  ];

  const handleStepChange = async (s) => {
    const step = steps[s];
  
      switch (step.id) {   

      case "beforeSidebar":
        setClickedTab(["Network_icon", "Compute"]);
        setIsOpen(true);
        break;
        case "popup":
          setIsPopup(true);
          break;
      case "alert":
        addAlertMessage();
        setIsOpen(false);
        break;
      case "alertList":
        showAlertMessages();
        break;
      case "button":
        resetAlertMessage();
        break;
      case "palette":
        setClickedTab(["Network_icon", "Compute"]);
        break;
      case "networkDiagram":
        setDiagram("/assets/json/network_diagram.json");
        break;
      case "cloudDiagram":
        setDiagram("/assets/json/cloud_diagram.json");
        break;
      case "cloudPalette":
        break;
      case "optimize":
        resetAlertMessage();
        break;
      case "optimizeDiagram":
        setIsPopup(false);
        setDiagram("/assets/json/optimize.json");
        break;
      case "costDiagram":
        setDiagram("/assets/json/cost.json");
        break;
      case "costToggle":
        ec2Cost();
        break;  
        case "saveButton":
          setDiagram("null");
          setShowToggle(false);
          break;
    }
  };
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