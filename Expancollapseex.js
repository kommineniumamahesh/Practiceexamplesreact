import React from "react";
import { Graph } from "react-d3-graph";

const data = {
  nodes: [
    {
      id: "node1",
      img: "https://via.placeholder.com/50x50.png?text=Node+1",
      label: "Node 1",
    },
    {
      id: "node2",
      img: "https://via.placeholder.com/50x50.png?text=Node+2",
      label: "Node 2",
    },
    {
      id: "node3",
      img: "https://via.placeholder.com/50x50.png?text=Node+3",
      label: "Node 3",
    },
    {
      id: "node4",
      img: "https://via.placeholder.com/50x50.png?text=Node+4",
      label: "Node 4",
    },
  ],
  links: [
    {
      source: "node1",
      target: "node2",
    },
    {
      source: "node2",
      target: "node3",
    },
    {
      source: "node2",
      target: "node4",
    },
  ],
};

const myConfig = {
  node: {
    renderLabel: true,
    labelProperty: "label",
    labelPosition: "right",
    renderLabel: true,
    fontSize: 12,
    fontWeight: "normal",
    fontFamily: "Arial",
    labelOffsetX: 10,
    labelOffsetY: 10,
    viewGenerator: (node) => (
      <div>
        <img src={node.img} alt={node.label} width={50} height={50} />
        <span>{node.label}</span>
      </div>
    ),
  },
  link: {
    renderLabel: false,
    strokeWidth: 2,
  },
  d3: {
    linkLength: 100,
  },
  directed: false,
  collapsible: true,
};

const App = () => {
  const [graphData, setGraphData] = React.useState(data);

  const onNodeClick = (nodeId) => {
    const node = graphData.nodes.find((n) => n.id === nodeId);
    if (node.collapsed) {
      setGraphData({
        nodes: graphData.nodes.map((n) => {
          if (n.id === nodeId) {
            return { ...n, collapsed: false };
          } else if (n.parent === nodeId) {
            return { ...n, hidden: false };
          } else {
            return n;
          }
        }),
        links: graphData.links,
      });
    } else {
      setGraphData({
        nodes: graphData.nodes.map((n) => {
          if (n.id === nodeId) {
            return { ...n, collapsed: true };
          } else if (n.parent === nodeId) {
            return { ...n, hidden: true };
          } else {
            return n;
          }
        }),
        links: graphData.links,
      });
    }
  };

  return (
    <Graph
      id="graph-id"
      data={graphData}
      config={myConfig}
      onClickNode={onNodeClick}
    />
  );
};

export default App;
