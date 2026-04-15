import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderOpen } from "lucide-react";

const projects = [
  { name: "House of Aurique – AI-Enhanced Luxury Jewellery Platform", tech: "React, Node.js, Express, MongoDB, JWT", desc: "Full-stack jewellery e-commerce platform with smart price calculator and admin dashboard" },
  { name: "DSA + Development Portfolio Platform", tech: "HTML5, CSS3, JavaScript, Data Structures & Algorithms", desc: "A personal portfolio website to display my information, projects, and skills" },
  { name: "Drone Navigator Telemetry System", tech: "Python, NumPy, Pandas, Matplotlib", desc: "" },
  { name: "Computer Vision Foundations with OpenCV and NumPy", tech: "Python, OpenCV, NumPy", desc: "" },
  { name: "IoT Reconnaissance System & Air Disaster Management Prototype", tech: "IoT Sensors, Arduino", desc: "" },
  { name: "Duplicate File Finder", tech: "Java, File Handling", desc: "" },
  { name: "Heal Hub", tech: "HTML, Tailwind CSS", desc: "" },
];

interface GraphNode {
  id: number;
  name: string;
  x: number;
  y: number;
}

const ProjectsSection = () => {
  const [showGraph, setShowGraph] = useState(false);
  const nodes: GraphNode[] = projects.map((p, i) => ({
    id: i,
    name: p.name.split("–")[0].trim().slice(0, 18),
    x: 200 + 140 * Math.cos((2 * Math.PI * i) / projects.length),
    y: 180 + 110 * Math.sin((2 * Math.PI * i) / projects.length),
  }));

  const edges = nodes.slice(0, -1).map((n, i) => ({ from: n, to: nodes[i + 1] }));

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Left: project cards */}
      <div>
        <h2 className="font-display text-xl text-primary glow-text-cyan mb-6 flex items-center gap-3">
          <FolderOpen className="w-5 h-5" /> PROJECTS
        </h2>
        <div className="grid gap-3">
          {projects.map((p, i) => (
            <motion.div
              key={p.name}
              className="glass rounded-xl p-4 border-glow-cyan"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <h3 className="font-body text-foreground font-semibold text-sm mb-1">{p.name}</h3>
              <p className="font-mono text-[10px] text-primary mb-1">Technologies Used: {p.tech}</p>
              {p.desc && <p className="font-body text-xs text-muted-foreground">What It Does: {p.desc}</p>}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right: graph DSA */}
      <div>
        <h3 className="font-display text-xs text-accent tracking-wider mb-4">DSA — GRAPH VISUALIZATION</h3>
        <div className="glass rounded-xl p-5 border-glow-purple">
          <button
            onClick={() => setShowGraph(!showGraph)}
            className="font-mono text-xs px-4 py-2 border border-accent/30 rounded-lg text-accent hover:bg-accent/10 transition-colors mb-4"
          >
            {showGraph ? "Hide Graph" : "Show Project Graph"}
          </button>
          <AnimatePresence>
            {showGraph && (
              <motion.svg
                viewBox="0 0 400 360"
                className="w-full max-w-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {edges.map((e, i) => (
                  <motion.line
                    key={i}
                    x1={e.from.x} y1={e.from.y} x2={e.to.x} y2={e.to.y}
                    stroke="hsl(190 100% 50% / 0.25)"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: i * 0.12, duration: 0.4 }}
                  />
                ))}
                {nodes.map((n, i) => (
                  <g key={n.id}>
                    <motion.circle
                      cx={n.x} cy={n.y} r="18"
                      fill="hsl(270 80% 60% / 0.1)"
                      stroke="hsl(270 80% 60% / 0.4)"
                      strokeWidth="1"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.08 }}
                    />
                    <text
                      x={n.x} y={n.y + 3}
                      textAnchor="middle"
                      fill="hsl(190 100% 75%)"
                      fontSize="5.5"
                      fontFamily="Share Tech Mono"
                    >
                      {n.name}
                    </text>
                  </g>
                ))}
              </motion.svg>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;
