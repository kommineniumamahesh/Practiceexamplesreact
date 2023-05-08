import React, { useState } from 'react';
import { Graph } from 'react-d3-graph';

const MyGraph = ({ data }) => {
  const [selectedNode, setSelectedNode] = useState('');

  const allNodes = data.nodes.map((node) => node.id);
  const filteredNodes = selectedNode ? data.nodes.filter((node) => node.id === selectedNode) : data.nodes;

  return (
    <div>
      <select value={selectedNode} onChange={(event) => setSelectedNode(event.target.value)}>
        <option value="">Select a node</option>
        {allNodes.map((nodeId) => (
          <option key={nodeId} value={nodeId}>{nodeId}</option>
        ))}
      </select>
      <Graph
        id="my-graph"
        data={{ nodes: filteredNodes, links: data.links }}
        // other options here
      />
    </div>
  );
};

export default MyGraph;
