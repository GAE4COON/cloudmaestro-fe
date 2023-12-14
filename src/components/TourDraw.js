import React, { useEffect, useRef, useState } from 'react';
import { Tour } from 'antd';
import { useData } from "./DataContext.js";

const TourDraw = (props) => {
  const {setIsPopup} = props;
  const {alertMessage, diagram, clickedTab, isOpen } = props;
  const {open, setOpen, showAlertMessages, setAlertMessage, setDiagram, resetAlertMessage, setClickedTab, setIsOpen } = props;
  const {refPalette, refDiagram, refButton, refAlert, refPopup, refCost, setShowToggle, refLS, refSummary, refOptimize, refNetworkPalette, refCloudPalette, refSidebar, setShowSelectToggle } = props;

  useEffect(() => {},[open, alertMessage, diagram, clickedTab, isOpen]);

  const steps = [
    //0
    {
      id: "initDiagram",
      title: 'Upload File',
      description: 'Put your files here.',
      target: () => refDiagram.current,
    },

    //1
    {
      id: "alert",
      title: 'Upload File',
      description: 'Put your files here.',
      target: () => refAlert.current,
    },
    {
      id: "beforeSidebar",
      title: 'rehost',
      description: 'Click to see other actions.',
      // target: () => refSidebar.current,
    },
    {
      id: "sidebar",
      title: 'rehost',
      description: 'Click to see other actions.',
      target: () => refSidebar.current,
    },
    //2
    {
      id: "alertList",
      title: 'Upload File',
      description: 'Put your files here.',
      // target: () => refDiagram.current,
    },
    //4
    {
      id: "button",
      title: 'Upload File',
      description: 'Put your files here.',
      target: () => refButton.current,
    },
    //5
    {
      id: "LS",
      title: 'Upload File',
      description: 'Put your files here.',
      target: () => refLS.current,
    },
    //6
    {
      id: "summary",
      title: 'Upload File',
      description: 'Put your files here.',
      target: () => refSummary.current,
    },
    //7
    {
      id: "optimize",
      title: 'Upload File',
      description: 'Put your files here.',
      target: () => refOptimize.current,
    },
    //8
    {
      id: "popup",
      title: 'Upload File',
      description: 'Put your files here.',
      target: () => refPopup.current,
    },
    //9
    {
      id:"palette",
      title: 'Upload File',
      description: 'Put your files here.',
      target: () => refPalette.current,
    },
    //10
    {
      id: "networkPalette",
      title: 'Upload File',
      description: 'Put your files here.',
      target: () => refNetworkPalette.current,
    },
    //11
    {
      id: "networkDiagram",
      title: 'Network Diagram',
      description: 'Put your files here.',
      target: () => refDiagram.current,
    },
    //12
    {
      id: "cloudPalette",
      title: 'network',
      description: 'Save your changes.',

      target: () => refCloudPalette.current,
    },
    //13
    {
      id: "cloudDiagram",
      title: 'rehost',
      description: 'Click to see other actions.',
      target: () => refDiagram.current,
    },

    //14
    {
      id: "costDiagram",
      title: 'Other Actions',
      description: 'Click to see other actions.',
      target: () => refDiagram.current,
    },
    {
      id: "costToggle",
      title: 'Other Actions',
      description: 'Click to see other actions.',
      target: () => refCost.current,
    },
  ];

  const [sidebarShouldOpen, setSidebarShouldOpen] = useState(false);

  useEffect(() => {
    if (sidebarShouldOpen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        setSidebarShouldOpen(false);
      }, 300); // Delay to match the sidebar animation duration

      return () => clearTimeout(timer);
    }
  }, [sidebarShouldOpen, setIsOpen]);
  const handleStepChange = async (s) => {
    const step = steps[s];
  
      switch (step.id) {   
        case "initDiagram":
          break;
      case "beforeSidebar":
        setIsOpen(true);
        break;
      case "alert":
        addAlertMessage();
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
        setDiagram("/assets/json/network.json");
        break;
      case "cloudDiagram":
        setDiagram("/assets/json/rehost.json");
        setClickedTab(["Network_icon", "Compute"]);
        break;
      case "costDiagram":
        setDiagram("/assets/json/cost.json");
        break;
      case "costToggle":
        ec2Cost();
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