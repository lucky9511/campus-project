import React, { useState } from 'react';
import './tools.css';
import { Link } from 'react-router-dom';

const toolsData = [
  {
    id: 1,
    name: "Scientific Calculator",
    description: "Casio FX-991EX ClassWiz — perfect for engineering math, statistics, and complex number calculations.",
    category: "calculation",
    availability: "available",
    quantity: 12,
    emoji: "🧮",
    requests: 0
  },
  {
    id: 2,
    name: "Drafter Set",
    description: "Professional mini drafter with scale rulers, ideal for engineering drawing and architectural plans.",
    category: "drafting",
    availability: "available",
    quantity: 8,
    emoji: "📐",
    requests: 0
  },
  {
    id: 3,
    name: "Geometry Compass",
    description: "Precision metal compass for drawing circles and arcs. Includes pencil lead holder and extra leads.",
    category: "drafting",
    availability: "limited",
    quantity: 3,
    emoji: "🖊️",
    requests: 0
  },
  {
    id: 4,
    name: "Physics Lab Kit",
    description: "Complete kit with vernier caliper, screw gauge, prism, lenses, and connecting wires for practicals.",
    category: "lab",
    availability: "available",
    quantity: 6,
    emoji: "🔬",
    requests: 0
  },
  {
    id: 5,
    name: "Chemistry Lab Equipment",
    description: "Beakers, test tubes, burette, pipette, and flask set for chemistry experiments and titration.",
    category: "lab",
    availability: "limited",
    quantity: 2,
    emoji: "⚗️",
    requests: 0
  },
  {
    id: 6,
    name: "Measuring Tape (30m)",
    description: "Heavy-duty retractable 30-meter tape for surveying, civil engineering, and field measurements.",
    category: "measurement",
    availability: "available",
    quantity: 10,
    emoji: "📏",
    requests: 0
  },
  {
    id: 7,
    name: "Protractor Set",
    description: "Full-circle and half-circle protractor set with degree markings for precise angle measurements.",
    category: "drafting",
    availability: "available",
    quantity: 15,
    emoji: "📎",
    requests: 0
  },
  {
    id: 8,
    name: "Multimeter",
    description: "Digital multimeter for measuring voltage, current, and resistance in electronics and electrical labs.",
    category: "lab",
    availability: "unavailable",
    quantity: 0,
    emoji: "⚡",
    requests: 0
  },
  {
    id: 9,
    name: "Graph Board & T-Square",
    description: "Large drawing board with T-square for engineering graphics, technical drawing, and design work.",
    category: "drafting",
    availability: "limited",
    quantity: 4,
    emoji: "🗂️",
    requests: 0
  },
  {
    id: 10,
    name: "Soldering Iron Kit",
    description: "Complete soldering station with iron, solder wire, flux, and desoldering pump for electronics projects.",
    category: "lab",
    availability: "available",
    quantity: 5,
    emoji: "🔧",
    requests: 0
  },
  {
    id: 11,
    name: "Weighing Scale",
    description: "Precision digital weighing balance for chemistry and physics lab experiments (0.01g accuracy).",
    category: "measurement",
    availability: "available",
    quantity: 4,
    emoji: "⚖️",
    requests: 0
  },
  {
    id: 12,
    name: "Graphing Calculator",
    description: "TI-84 Plus CE for advanced graphing, programming, and statistical analysis in higher-level courses.",
    category: "calculation",
    availability: "limited",
    quantity: 2,
    emoji: "📟",
    requests: 0
  }
];

const categories = [
  { key: "all", label: "All Tools" },
  { key: "calculation", label: "🧮 Calculators" },
  { key: "drafting", label: "📐 Drafting" },
  { key: "lab", label: "🔬 Lab Equipment" },
  { key: "measurement", label: "📏 Measurement" }
];

function Tools() {
  const [tools, setTools] = useState(toolsData);
  const [activeFilter, setActiveFilter] = useState("all");
  const [toast, setToast] = useState({ show: false, message: '' });

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 2500);
  };

  const handleRequest = (id) => {
    setTools(prev =>
      prev.map(tool =>
        tool.id === id
          ? { ...tool, requests: tool.requests + 1 }
          : tool
      )
    );
    const tool = tools.find(t => t.id === id);
    showToast(`Request sent for "${tool.name}"!`);
  };

  const handleChat = (name) => {
    showToast(`Chat for "${name}" — coming soon!`);
  };

  const filteredTools = activeFilter === "all"
    ? tools
    : tools.filter(t => t.category === activeFilter);

  const badgeLabel = (status) => {
    if (status === "available") return "✅ Available";
    if (status === "limited") return "⚠️ Limited Stock";
    return "❌ Unavailable";
  };

  return (
    <div className="tools-page">
      <nav className="tools-nav">
        <div className="logo">Campus Resource Sharing</div>
        <ul className="tools-nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/books">Books</Link></li>
          <li><Link to="/notes">Notes</Link></li>
          <li><Link to="/tools" className="active">Tools</Link></li>
          <li><Link to="/upload">Upload</Link></li>
        </ul>
      </nav>

      <div className="tools-hero">
        <h1>Campus Tools & Equipment</h1>
        <p>Borrow calculators, drafters, lab kits and more from your campus inventory.</p>
      </div>

      {/* Category Filters */}
      <div className="tools-filter-bar">
        {categories.map(cat => (
          <button
            key={cat.key}
            className={`filter-chip ${activeFilter === cat.key ? 'active' : ''}`}
            onClick={() => setActiveFilter(cat.key)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Tools Grid */}
      <div className="tools-grid">
        {filteredTools.map(tool => (
          <div className="tool-card" key={tool.id}>
            <div className={`tool-card-image ${tool.category}`}>
              {tool.emoji}
            </div>
            <div className="tool-card-body">
              <h3>{tool.name}</h3>
              <p className="tool-desc">{tool.description}</p>
              <span className={`tool-badge ${tool.availability}`}>
                {badgeLabel(tool.availability)}
              </span>
              <p className="request-count">
                Requests: <span>{tool.requests}</span> &nbsp;|&nbsp; In Stock: <span>{tool.quantity}</span>
              </p>
              <div className="tool-card-footer">
                <button
                  className="btn-request"
                  onClick={() => handleRequest(tool.id)}
                  disabled={tool.availability === "unavailable"}
                >
                  {tool.availability === "unavailable" ? "Out of Stock" : "Request"}
                </button>
                <button className="btn-chat" onClick={() => handleChat(tool.name)}>
                  💬
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Toast */}
      <div className={`tools-toast ${toast.show ? 'show' : ''}`}>
        <span>✅</span>
        <span>{toast.message}</span>
      </div>
    </div>
  );
}

export default Tools;
