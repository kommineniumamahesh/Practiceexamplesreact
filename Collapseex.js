const data = {
  nodes: [
    {
      id: "node1",
      img: "https://via.placeholder.com/50x50.png?text=Node+1",
      label: "Node 1",
      color: "red",
    },
    {
      id: "node2",
      img: "https://via.placeholder.com/50x50.png?text=Node+2",
      label: "Node 2",
      color: "red",
    },
    {
      id: "node3",
      img: "https://via.placeholder.com/50x50.png?text=Node+3",
      label: "Node 3",
      color: "red",
    },
    {
      id: "node4",
      img: "https://via.placeholder.com/50x50.png?text=Node+4",
      label: "Node 4",
      color: "red",
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

// Pragmatically identify the parent node of each child node
data.nodes.forEach((node) => {
  const parentNodeId = data.links
    .filter((link) => link.target === node.id)
    .map((link) => link.source)[0];
  if (parentNodeId) {
    node.parent = parentNodeId;
  }
});

const myConfig = {
  // Config options here
};

const App = () => {
  // App logic here
};
