import React from "react";
import { Graph } from "react-d3-graph";

const data = {
  nodes: [
    { id: "node1", label: "Node 1", image: "https://via.placeholder.com/32" },
    { id: "node2", label: "Node 2", image: "https://via.placeholder.com/32" },
    { id: "node3", label: "Node 3", image: "https://via.placeholder.com/32" },
  ],
  links: [
    { source: "node1", target: "node2" },
    { source: "node2", target: "node3" },
  ],
};

const config = {
  node: {
    labelProperty: "label",
    renderLabel: true,
    labelPosition: "top",
    size: 300,
    render: ({ node, x, y, isDragging, onMouseDown, onMouseUp }) => (
      <g>
        <circle
          r={node.size || 30}
          cx={x}
          cy={y}
          fill={node.color || "blue"}
          stroke={isDragging ? "red" : "black"}
          strokeWidth={2}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          cursor="pointer"
        />
        <image
          x={x - 16}
          y={y - 16}
          href={node.image}
          height={32}
          width={32}
        />
        <text
          x={x}
          y={y + 35}
          fontFamily="Arial"
          fontSize={12}
          textAnchor="middle"
        >
          {node.label}
        </text>
      </g>
    ),
  },
  link: {
    strokeWidth: 2,
    highlightColor: "red",
  },
  d3: {
    gravity: -400,
    linkLength: 200,
  },
  drag: {
    enable: true,
  },
  tooltip: {
    render: ({ node, link }) => {
      if (node) {
        return `<h3>${node.label}</h3>`;
      } else if (link) {
        return `<h3>${link.source.label} -> ${link.target.label}</h3>`;
      }
    },
  },
};

const CustomNodeGraph = () => {
  return <Graph id="custom-node-graph" data={data} config={config} />;
};

export default CustomNodeGraph;
