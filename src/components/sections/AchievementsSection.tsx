import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy } from "lucide-react";

const achievements = [
  "4th Runner Up – Invoshie Hackathon (30/07/2025)",
  "NSS Volunteer (30/11/2025)",
  "Student Coordinator – VBytes Techfest 2025",
];

const AchievementsSection = () => {
  const [stack, setStack] = useState<string[]>([]);
  const [available, setAvailable] = useState([...achievements]);

  const push = () => {
    if (available.length === 0) return;
    const item = available[0];
    setAvailable((prev) => prev.slice(1));
    setStack((prev) => [item, ...prev]);
  };

  const pop = () => {
    if (stack.length === 0) return;
    const item = stack[0];
    setStack((prev) => prev.slice(1));
    setAvailable((prev) => [...prev, item]);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Left: achievements list */}
      <div>
        <h2 className="font-display text-xl text-primary glow-text-cyan mb-6 flex items-center gap-3">
          <Trophy className="w-5 h-5" /> ACHIEVEMENTS
        </h2>
        <div className="grid gap-3">
          {achievements.map((a, i) => (
            <motion.div
              key={a}
              className="glass rounded-xl p-4 border-glow-cyan"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <p className="font-body text-foreground">{a}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right: stack DSA */}
      <div>
        <h3 className="font-display text-xs text-accent tracking-wider mb-4">DSA — STACK VISUALIZATION</h3>
        <div className="glass rounded-xl p-5 border-glow-purple">
          <div className="flex gap-3 mb-4">
            <button onClick={push} disabled={available.length === 0} className="font-mono text-xs px-4 py-2 border border-accent/30 rounded-lg text-accent hover:bg-accent/10 transition-colors disabled:opacity-30">
              Push
            </button>
            <button onClick={pop} disabled={stack.length === 0} className="font-mono text-xs px-4 py-2 border border-primary/30 rounded-lg text-primary hover:bg-primary/10 transition-colors disabled:opacity-30">
              Pop
            </button>
          </div>
          <div className="flex flex-col gap-2 min-h-[80px]">
            <AnimatePresence>
              {stack.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: -20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  className="font-mono text-xs px-4 py-2 rounded-lg bg-accent/10 text-accent border border-accent/15"
                >
                  [{i}] {item}
                </motion.div>
              ))}
            </AnimatePresence>
            {stack.length === 0 && <p className="font-mono text-[10px] text-muted-foreground">Stack is empty — click Push</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementsSection;
