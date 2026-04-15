import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase } from "lucide-react";

const experiences = [
  { title: "NSS Volunteer, Social & Cultural Committee", period: "07/2025 – 03/2026" },
  { title: "Winter Training Internship – Advanced Drone Technology India Space Academy", subtitle: "Space Science & Technology Program", period: "" },
];

interface LLNode { data: typeof experiences[0]; next: number | null; }

const ExperienceSection = () => {
  const [list, setList] = useState<LLNode[]>([]);
  const [available, setAvailable] = useState([...experiences]);
  const [traversing, setTraversing] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const addNode = () => {
    if (available.length === 0) return;
    const item = available[0];
    setAvailable((prev) => prev.slice(1));
    setList((prev) => {
      const newNode: LLNode = { data: item, next: null };
      if (prev.length === 0) return [newNode];
      const updated = [...prev];
      updated[updated.length - 1] = { ...updated[updated.length - 1], next: prev.length };
      return [...updated, newNode];
    });
  };

  const traverse = () => {
    if (list.length === 0 || traversing) return;
    setTraversing(true);
    let i = 0;
    const interval = setInterval(() => {
      setActiveIdx(i);
      i++;
      if (i >= list.length) {
        clearInterval(interval);
        setTimeout(() => { setActiveIdx(null); setTraversing(false); }, 600);
      }
    }, 500);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Left: timeline */}
      <div>
        <h2 className="font-display text-xl text-primary glow-text-cyan mb-6 flex items-center gap-3">
          <Briefcase className="w-5 h-5" /> EXPERIENCE
        </h2>
        <div className="grid gap-3">
          {experiences.map((e, i) => (
            <motion.div
              key={e.title}
              className="glass rounded-xl p-4 border-glow-cyan"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <h3 className="font-body text-foreground font-semibold">{e.title}</h3>
              {e.subtitle && <p className="font-body text-sm text-muted-foreground">{e.subtitle}</p>}
              {e.period && <p className="font-mono text-xs text-primary mt-1">{e.period}</p>}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right: linked list DSA */}
      <div>
        <h3 className="font-display text-xs text-accent tracking-wider mb-4">DSA — LINKED LIST VISUALIZATION</h3>
        <div className="glass rounded-xl p-5 border-glow-purple">
          <div className="flex gap-3 mb-4">
            <button onClick={addNode} disabled={available.length === 0} className="font-mono text-xs px-4 py-2 border border-accent/30 rounded-lg text-accent hover:bg-accent/10 transition-colors disabled:opacity-30">
              Add Node
            </button>
            <button onClick={traverse} disabled={list.length === 0 || traversing} className="font-mono text-xs px-4 py-2 border border-primary/30 rounded-lg text-primary hover:bg-primary/10 transition-colors disabled:opacity-30">
              Traverse
            </button>
          </div>
          <div className="flex gap-2 items-center overflow-x-auto min-h-[50px] pb-2">
            <AnimatePresence>
              {list.map((node, i) => (
                <motion.div key={node.data.title} className="flex items-center gap-2" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
                  <div className={`font-mono text-[10px] px-3 py-2 rounded-lg border whitespace-nowrap transition-all duration-300 ${
                    activeIdx === i ? "bg-primary/20 text-primary border-primary/40 glow-cyan" : "bg-accent/10 text-accent border-accent/15"
                  }`}>
                    {node.data.title.slice(0, 25)}...
                  </div>
                  {node.next !== null && <span className="text-primary font-mono text-sm">→</span>}
                </motion.div>
              ))}
            </AnimatePresence>
            {list.length === 0 && <p className="font-mono text-[10px] text-muted-foreground">List is empty — click Add Node</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceSection;
