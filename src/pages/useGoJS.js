import React, { useState, useEffect } from "react";
import * as go from "gojs";
import "../styles/App.css"; // contains .diagram-component CSS
import handleChangedSelection from "./toggle/toggle";

const useGoJS = (setSelectedNodeData, setShowToggle, showToggle) => {
  const [diagram, setDiagram] = useState(null);
  const [clickedNodeKey, setClickedNodeKey] = useState();
  const [showSelectToggle, setShowSelectToggle] = useState({ value: false });

  useEffect(() => {
    console.log("Updated clickedNodeKey:", clickedNodeKey);
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
      "commandHandler.archetypeGroupData": { text: "Group", isGroup: true },
      "contextMenuTool.isEnabled": true,
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
        mouseDragEnter: (e, grp, prev) => highlightGroup(e, grp, true),
        mouseDragLeave: (e, grp, next) => highlightGroup(e, grp, false),
        mouseDrop: finishDrop,
        ungroupable: true,
      },

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

      $(
        go.Panel,
        "Auto",
        $(
          go.Shape,
          "Rectangle",
          {
            margin: 10,
            fill: "transparent",
            stroke: "rgba(128,128,128,0.5)",
            strokeWidth: 5,
          },
          new go.Binding("stroke"),
          new go.Binding("fill", "stroke")
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
                console.log("실선 선택", link.data);
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
                console.log("점선 선택", link.data);
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
                console.log("backward로 했음다", link.data);
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
                console.log("원래대로 돌아갔음", link.data);
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

    diagram.addDiagramListener("ObjectSingleClicked", function (e) {
      const part = e.subject.part;
      if (part instanceof go.Link) {
        console.log("링크가 클릭되었네요");
      } else if (part instanceof go.Node) {
        console.log("나는 node 입니다", part.data);
        const key = part.data.key;
        console.log("나는 key 입니다", key);
        if (key) {
          if (handleChangedSelection(key)) {
            setShowSelectToggle({ value: true, key: key });
          }
        }
      }
    });

    diagram.addDiagramListener("ExternalObjectsDropped", (e) => {
      console.log("from palette\n");
      setShowToggle(true);
    });

    diagram.addDiagramListener("SelectionMoved", (e) => {
      e.subject.each(function (part) {
        if (part instanceof go.Node) {
          console.log("move to: " + part.location.toString());
        }
      });
    });

    diagram.addDiagramListener("ChangedSelection", (e) => {
      const selectedNode = e.diagram.selection.first();
      if (selectedNode instanceof go.Node) {
        const key = selectedNode.data.key;
        console.log("나는 key 입니다", key);
      } else {
        setShowSelectToggle({ value: false }); // 추가된 로직
      }
    });

    setDiagram(diagram);

    return diagram;
  };

  return { initDiagram, diagram, showSelectToggle, clickedNodeKey };
};

export default useGoJS;
