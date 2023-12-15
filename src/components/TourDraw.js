import React, { useEffect, useRef, useState } from "react";
import { Tour } from "antd";
import styled from "styled-components";
import { useData } from "./DataContext.js";
import "./../styles/TourDraw.css";

const TourDraw = (props) => {
  const { setIsPopup } = props;
  const { alertMessage, diagram, clickedTab, isOpen } = props;
  const {
    open,
    setOpen,
    showAlertMessages,
    setAlertMessage,
    setDiagram,
    resetAlertMessage,
    setClickedTab,
    setIsOpen,
    setShowSelectToggle,
  } = props;
  const {
    refDownloadBtn,
    refPalette,
    refDiagram,
    refButton,
    refAlert,
    refPopup,
    refCost,
    setShowToggle,
    refLS,
    refSummary,
    refOptimize,
    refNetworkPalette,
    refCloudPalette,
    refSidebar,
    refSaveButton,
  } = props;

  useEffect(() => {}, [open, alertMessage, diagram, clickedTab, isOpen]);

  const steps = [
    {
      id: "initDiagram",
      placement: "center",
      title: "다이어그램 공간입니다.",
      description:
        "ClouMaestro의 가장 중심이 되는 부분이고, 아키텍처가 도식화되는 공간입니다.",
      target: () => refDiagram.current,
    },
    {
      id: "palette",
      placement: "right",
      title: "아이콘이 담긴 팔레트입니다.",
      description:
        "사용자가 아키텍처를 도식화할 수 있도록 네트워크 아이콘과 AWS 리소스 아이콘을 제공합니다. 팔레트에서 다이어그램으로 아이콘을 드래그하여 아키텍처를 도식화할 수 있습니다.",
      target: () => refPalette.current,
    },
    {
      id: "button",
      placement: "right",
      title: "Cloud Maestro의 핵심 기능을 사용할 수 있는 버튼 영역입니다.",
      description:
        "팔레트, 다이어그램 지우기, 파일 업로드/다운로드, 이미지 다운로드, Lift&Shift, 요구사항 기반 최적화, 비용 요약 기능을 제공합니다.",
      target: () => refButton.current,
    },
    {
      id: "networkPalette",
      placement: "right",
      title: "네트워크 아이콘이 담긴 팔레트입니다.",
      description:
        "사용자가 네트워크 아키텍처를 구성할 수 있도록 네트워크 아이콘을 제공합니다.",
      target: () => refNetworkPalette.current,
    },

    {
      id: "networkDiagram",
      placement: "center",

      title: "네트워크 구조가 도식화된 다이어그램입니다.",
      description: "네트워크 팔레트를 통해 사용자가 수정할 수 있습니다.",
      target: () => refDiagram.current,
    },
    {
      id: "LS",
      placement: "right",

      title: '네트워크 도식화에서 클라우드 도식화로 변환할 수 있는 Lift&Shift 버튼입니다.',
      description: 'Lift&Shift 방식으로 네트워크 아키텍처를 클라우드 아키텍처로 변환할 수 있습니다.',

      target: () => refLS.current,
    },

    {
      id: "cloudDiagram",
      title: "",
      description: "Lift&Shift 방식으로 변환된 클라우드 아키텍처입니다.",
      placement: "center",

      target: () => refDiagram.current,
    },
    {
      id: "cloudPalette",
      placement: "right",
      title: "클라우드 리소스 아이콘이 담긴 팔레트입니다.",
      description:
        "CSP에서 제공하는 리소스 아이콘이 담겨 있습니다. 사용자가 클라우드 아키텍처를 구성하거나, 수정할 수 있도록 제공합니다.",
      target: () => refCloudPalette.current,
    },
    {
      id: "beforeSidebar",
      title: "",
      description:
        "현재 클라우드 아키텍처에 대한 파일과 이미지는 다음과 같은 버튼에서 다운로드 받을 수 있습니다.",
      target: () => refDownloadBtn.current,
    },
    {
      id: "sidebar",
      placement: "left",

      title: "다이어그램에 사용된 리소스를 확인할 수 있는 사이드바입니다.",
      description: "리소스 아이콘에 대한 정보를 제공합니다.",
      target: () => refSidebar.current,
    },
    {
      id: "alert",
      title: "",
      description:
        "현재 도식화된 클라우드 아키텍처 상에 존재하는 보안 및 권고 사항을 볼 수 있는 버튼입니다.",
      target: () => refAlert.current,
    },
    {
      id: "alertList",
      title:
        "클라우드 아키텍처상에 존재하는 보안 결함 및 권고 사항에 대해 알려줍니다.",
      description:
        "info/warning/error로 구분되어 있으며, ISO/IEC 27001, 27017, 27018과 AWS Well-Architected Framework를 기반으로 정보를 제공합니다.",
      // target: () => refDiagram.current,
    },
    {
      id: "optimize",
      placement: "right",
      title: "",
      description:
        "다이어그램의 클라우드 아키텍처를 고도화할 수 있게 해주는 최적화 버튼입니다.",
      target: () => refOptimize.current,
    },
    //8
    {
      id: "popup",
      title:
        "보안/로깅/백업/이중화/부하분산 등 사용자의 요구사항에 기반해 다양한 최적화 기능을 제공합니다.",
      description:
        "전체 아키텍처 혹은 망 별 아키텍처에 대한 요구사항을 선택하고, 최적화 기능을 적용할 수 있습니다.",
      target: () => refPopup.current,
    },
    {
      id: "optimizeDiagram",
      placement: "center",

      title: "사용자의 요구사항에 맞게 최적화된 클라우드 아키텍처 예시입니다.",
      description: "웹서버 보호/이중화/부하분산 최적화 기능이 적용되었습니다.",
      target: () => refDiagram.current,
    },
    {
      id: "costDiagram",
      title: "비용 산정은 4개의 리소스를 지원합니다.",
      description:
        "EC2, RDS는 인스턴스 세부 타입까지 설정하여 비용을 산정할 수 있습니다.",
      target: () => refDiagram.current,
    },
    {
      id: "costToggle",
      title: "비용을 산정할 수 있는 토글입니다.",
      description:
        "예시로, EC2 비용산정에서는 Platform, Instance Type, Instance Size를 설정할 수 있습니다.",
      target: () => refCost.current,
    },
    {
      id: "summary",
      placement: "right",
      cover: (
        <img alt="cost" src="assets/img/cost.png" style={{ width: "40%" }} />
      ),
      title: "사용자가 선택한 리소스 별 비용을 요약해서 볼 수 있는 버튼입니다.",
      description:
        "버튼을 클릭하면 비용 요약 페이지로 넘어가게 됩니다. 이 페이지는 추후 MyPage에서도 확인 할 수 있습니다.",
      target: () => refSummary.current,
    },
    {
      id: "saveButton",
      placement: "left",
      cover: (
        <img
          alt="mypage"
          src="assets/img/mypage.png"
          style={{ width: "40%" }}
        />
      ),
      title: "저장 후 Mypage에서 다시 불러올 수 있고, 가이드를 제공합니다.",
      description:
        "MyPage에서는 아키텍처의 비용 산정 요약 및 리소스 가이드라인, 보안 권고 가이드라인을 제공합니다.",
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
        message:
          "S3가 암호화되지 않을 시, 무단 접근 및 변조 등을 통한 보험 위험이 존재할 수 있습니다.",
        tag: "Info",
      });
    }, 30);
    setTimeout(() => {
      setAlertMessage({
        key: Date.now() + 1,
        message:
          "비정상적인 동작을 모니터랑하고, 보안 사고 식별, 위협 인텔리전스 형성을 위한 로깅 서비스가 필요합니다. CloudWatch, CloudTrail 사용을 권장합니다.",
        tag: "Warn",
      });
    });

    setAlertMessage({
      key: Date.now() + 2,
      message: "VPC당 API GateWay는 한 개를 초과할 수 없습니다.",
      tag: "Error",
    });
  };

  const ec2Cost = () => {
    setShowToggle(true);
    setShowSelectToggle({ value: true, key: "EC2" });
  };
  const handleSetOpen = () => {
    setDiagram("null");
    setClickedTab([...clickedTab]);
    setOpen(!open);
  };
  return (
    <Tour
      open={open}
      onClose={() => handleSetOpen()}
      steps={steps}
      onChange={handleStepChange}
      indicatorsRender={(current, total) => (
        <span>
          {current + 1} / {total}
        </span>
      )}
    />
  );
};

export default TourDraw;
