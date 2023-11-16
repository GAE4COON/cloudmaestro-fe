import React, { useState, useEffect } from "react";
import * as go from "gojs";
import "../styles/App.css"; // contains .diagram-component CSS
import handleChangedSelection from "./toggle/toggle";
import { alertCheck } from "../apis/fileAPI";
import { sidebarResource } from "../apis/sidebar"
import { useData } from '../components/DataContext';

const useGoJS = (setSelectedNodeData, setShowToggle, showToggle) => {
  const [diagram, setDiagram] = useState(null);
  const [clickedNodeKey, setClickedNodeKey] = useState();
  const [showSelectToggle, setShowSelectToggle] = useState({ value: false });
  const [DiagramCheck, setDiagramCheck] = useState(null);
  const [NodeGuide, setNodeGuide] = useState(null);
  const { setData } = useData();

  useEffect(() => {
    //console.log("Updated clickedNodeKey:", clickedNodeKey);
  }, [clickedNodeKey]);

  function highlightGroup(e, grp, show) {
    if (!grp) return;
    e.handled = true;
    if (show) {
      var tool = grp.diagram.toolManager.draggingTool;
      var map = tool.draggedParts || tool.copiedParts;
      if (grp.canAddMembers(map.toKeySet())) {
        grp.isHighlighted = true;
        return;
      }
    }
    grp.isHighlighted = false;
  }

  // add group via drag and drop
  function finishDrop(e, grp) {
    var ok =
      grp !== null
        ? grp.addMembers(grp.diagram.selection, true)
        : e.diagram.commandHandler.addTopLevelParts(e.diagram.selection, true);
    if (!ok) e.diagram.currentTool.doCancel();
  }
  const initDiagram = () => {
    const $ = go.GraphObject.make;

    const diagram = $(go.Diagram, {
      "undoManager.isEnabled": true,
      "resizingTool.isGridSnapEnabled": true,
      "commandHandler.archetypeGroupData": { text: "Group", type: "group", isGroup: true },
      "contextMenuTool.isEnabled": true,
      ModelChanged: async (e) => {
        // 오직 트랜잭션 완료 시에만 로그 출력
        if (e.isTransactionFinished) {
          const jsonString = e.model.toIncrementalJson(e);
          const data = JSON.parse(jsonString); // JSON 문자열을 JavaScript 객체로 변환
          if (data.insertedLinkKeys) {
            console.log("insertedLinkKeys", data.modifiedLinkData);
            try {
              const response = await alertCheck(data.modifiedLinkData[0]);
              if (response && response.data) {
                console.log("API Response:", response.data);
                setDiagramCheck(response.data);
                if (response.data.result.status === "fail") {
                  console.log(
                    "링크 취소해도 되는 부분.. 주석처리만 하니까 안 올라가서 우선 콘솔로그라도 띄움"
                  );
                  //   diagram.undoManager.undo();
                }
              }
            } catch (error) {
              // Handle API error here
              console.error("API Error:", error);
            }
          }
          // if (data.insertedNodeKeys) {
          //   console.log("insertedLinkKeys", data.insertedLinkKeys);
          // }
        }
      },
      model: new go.GraphLinksModel({
        linkKeyProperty: "key",
      }),
    });

    function formatKey(key) {
      // _를 공백으로 대체합니다.
      let words = key.replace(/_/g, " ").split(" ");

      // 각 단어의 첫 글자를 대문자로 바꿉니다.
      let result = words
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      return result;
    }

    // delete
    diagram.addLayerBefore(
      $(go.Layer, { name: "BottomLayer" }),
      diagram.findLayer("Background")
    );

    // Define nodeTemplate (simplified, add other properties as needed)
    diagram.nodeTemplate = $(
      go.Node,
      "Spot", // Spot 패널 사용으로 변경
      {
        click: (e, node) => {
          const text = node.data.text || node.data.key;
          setClickedNodeKey(text);
        },
      },
      { resizable: false, resizeObjectName: "Picture" },
      // { background: "#A0BCC2" },
      new go.Binding("layerName", "key", function (key) {
        return key === -7 ? "BottomLayer" : "";
      }),

      new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
        go.Point.stringify
      ),

      //마진에 포트 추가해서 링크가 동작되게 만든다
      $(go.Shape, {
        width: 70,
        height: 70,
        fill: "transparent",
        stroke: null,
        portId: "",
        fromLinkable: true,
        toLinkable: true,
        fromSpot: go.Spot.AllSides,
        toSpot: go.Spot.AllSides,
      }),

      $(
        go.Panel,
        "Vertical",
        $(
          go.Picture,
          {
            name: "Picture",
            margin: 10,
            width: 50,
            height: 50,
            background: "white",
          },
          new go.Binding("source").makeTwoWay(),
          new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(
            go.Size.stringify
          ),
          // modify or delete -> if unnecessary
          new go.Binding("fromLinkable", "key", function (k) {
            return k !== -7;
          }),
          new go.Binding("toLinkable", "key", function (k) {
            return k !== -7;
          }),
          new go.Binding("text", "key")
        ),
        $(
          go.TextBlock,
          {
            font: "bold 12pt sans-serif",
            alignment: go.Spot.TopLeft,
            portId: "",
            cursor: "pointer",
            fromLinkable: true,
            toLinkable: true,
          },
          new go.Binding("text", "key")
        ),

        // modify or delete -> if unnecessary
        new go.Binding("fromLinkable", "key", function (k) {
          return k !== -7;
        }),
        new go.Binding("toLinkable", "key", function (k) {
          return k !== -7;
        })
      )
    );

    diagram.groupTemplate = $(
      go.Group,
      "Auto",
      "Vertical",
      {
        // layout: $(go.GridLayout, { alignment: go.GridLayout.Position }),
        mouseDragEnter: (e, grp, prev) => highlightGroup(e, grp, true),
        mouseDragLeave: (e, grp, next) => highlightGroup(e, grp, false),
        mouseDrop: finishDrop,
        ungroupable: true,
      },
      $(go.TextBlock,
        {
          font: "10pt sans-serif",
          alignment: go.Spot.TopLeft,
          portId: "",
          cursor: "pointer",
          fromLinkable: true,
          toLinkable: true,
        },
        new go.Binding("text", "key")
      ),

      $(
        go.Panel,
        "Auto",
        $(
          go.Shape,
          "Rectangle",
          {
            margin: 10,
            fill: "transparent", // default fill
            stroke: "rgb(128,128,128)",
            strokeWidth: 3,
          },
          new go.Binding("fill", "", function(data) {
            if (data.key.toLowerCase().includes("public")||data.key.toLowerCase().includes("private")) {
              // Parse the RGB color to get individual components
              let rgb = data.stroke.match(/\d+/g);
              if (rgb && rgb.length >= 3) {
                // Construct an RGBA color with 0.4 opacity
                return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.2)`;
              }
            }
            return "transparent";
          }),
          new go.Binding("stroke", "", function(data) {
            if (data.key.toLowerCase().includes("public")||data.key.toLowerCase().includes("private")) {
              return "transparent";
            }
            return data.stroke;
          }),

        ),
        $(go.Placeholder, { padding: 30 })
      )
    );
    diagram.linkTemplate = $(
      go.Link,
      {
        contextMenu: $(
          go.Adornment,
          "Table",
          {
            defaultStretch: go.GraphObject.Horizontal,
          },

          $(
            "ContextMenuButton",

            $(go.Shape, "RoundedRectangle", {
              fill: "transparent",
              width: 40,
              height: 40,
            }),
            $(go.TextBlock, "━", { font: "bold 14pt serif" }),
            {
              row: 0,
              column: 0,
              click: (e, obj) => {
                const link = obj.part.adornedPart;
                link.findObject("LinkShape").strokeDashArray = null;
                //console.log("실선 선택", link.data);
              },
            }
          ),
          $(
            "ContextMenuButton",

            $(go.Shape, "RoundedRectangle", {
              fill: "transparent",
              width: 40,
              height: 40,
            }),
            $(go.TextBlock, "┈", { font: "bold 14pt serif" }),
            {
              row: 0,
              column: 1,
              click: (e, obj) => {
                const link = obj.part.adornedPart;
                link.findObject("LinkShape").strokeDashArray = [10, 10];
                //console.log("점선 선택", link.data);
              },
            }
          ),
          $(
            "ContextMenuButton",

            $(go.Shape, "RoundedRectangle", {
              fill: "transparent",
              width: 40,
              height: 40,
            }),
            $(go.TextBlock, "↔", { font: "bold 14pt serif" }),
            {
              row: 1,
              column: 0,
              click: (e, obj) => {
                const link = obj.part.adornedPart;
                link.findObject("FromArrow").visible = true;
                link.findObject("FromArrow").fromArrow = "Backward";
                //console.log("backward로 했음다", link.data);
              },
            }
          ),
          $(
            "ContextMenuButton",

            $(go.Shape, "RoundedRectangle", {
              fill: "transparent",
              width: 40,
              height: 40,
            }),
            $(go.TextBlock, "→", { font: "bold 14pt serif" }),
            {
              row: 1,
              column: 1,
              click: (e, obj) => {
                const link = obj.part.adornedPart;
                //link.findObject("FromArrow").fromArrow="Standard";
                link.findObject("FromArrow").visible = false;
                //console.log("원래대로 돌아갔음", link.data);
              },
            }
          )
        ),

        routing: go.Link.Orthogonal,
        corner: 5,
        reshapable: true,
        relinkableFrom: true,
        relinkableTo: true,
      },
      // for link shape
      $(go.Shape, { strokeWidth: 2, stroke: "#000", name: "LinkShape" }),
      // for arrowhead 여기서 standaer
      $(go.Shape, {
        toArrow: "Standard",
        scale: 1.5,
        stroke: null,
        name: "ToArrow",
      }),
      $(go.Shape, {
        fromArrow: "DoubleForwardSlash",
        scale: 1.5,
        stroke: null,
        name: "FromArrow",
      })
    );

    diagram.nodeTemplate.selectionAdornmentTemplate = $(
      go.Adornment,
      "Spot",
      $(
        go.Panel,
        "Auto",
        $(go.Shape, { fill: null, stroke: "dodgerblue", strokeWidth: 2 }),
        $(go.Placeholder)
      ),
      $(
        go.Panel,
        "Horizontal",
        { alignment: new go.Spot(1, 1), alignmentFocus: new go.Spot(1, 0) },
        $(
          go.Panel,
          "Spot",
          {
            width: 20,
            height: 20,
            mouseEnter: function (e, panel) {
              const node = panel.part.adornedPart;
              if (node instanceof go.Node) {
                setNodeGuide(node.data.key);
              }
            },
            mouseLeave: function (e, panel) {
              setNodeGuide(null);
            },
          },
          $(go.Shape, "Circle", {
            fill: "rgba(82,96,208,0.7)",
            stroke: null,
            width: 20,
            height: 20,
          }),
          $(go.TextBlock, "?", {
            font: "bold 10pt sans-serif",
            stroke: "white",
            verticalAlignment: go.Spot.Center,
          })
        )
      )
    );

    diagram.addDiagramListener("ObjectSingleClicked", function (e) {
      const part = e.subject.part;
      if (part instanceof go.Link) {
        //console.log("링크가 클릭되었네요");
      } else if (part instanceof go.Node) {
        //console.log("나는 node 입니다", part.data);
        const key = part.data.key;
        console.log("나는 node data 입니다", part.data);
        if (key) {
          if (handleChangedSelection(key)) {
            setShowSelectToggle({ value: true, key: key });
          }
        }
      }
    });

    diagram.addDiagramListener("ExternalObjectsDropped", (e) => {
      //console.log("from palette\n");
      setShowToggle(true);
    });

    diagram.addDiagramListener("SelectionMoved", (e) => {
      e.subject.each(function (part) {
        if (part instanceof go.Node) {
          //console.log("move to: " + part.location.toString());
        }
      });
    });

    diagram.addDiagramListener("ChangedSelection", async(e) => {
      const selectedNode = e.diagram.selection.first();
      if (selectedNode instanceof go.Node) {
        const key = selectedNode.data.key;
      } else {
        setShowSelectToggle({ value: false }); // 추가된 로직
      }
      const response = await sidebarResource(diagram.model.nodeDataArray);
      setData(response.data); // set the data in context
    });

    setDiagram(diagram);
    
    return diagram;
  };

  return {
    initDiagram,
    diagram,
    showSelectToggle,
    clickedNodeKey,
    DiagramCheck,
    NodeGuide,
  };
};

export default useGoJS;
