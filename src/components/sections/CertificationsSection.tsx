import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award } from "lucide-react";

const certifications = [
  "Cyber Security Certification – Zscaler Academy (SWAYAM Plus Exam)",
  "Full Stack Web Development Certification – Dream High Institute (May 2025 – May 2026 Expected)",
  "NASA Space Apps Challenge – Participation Certificate",
];

const CertificationsSection = () => {
  const [queue, setQueue] = useState<string[]>([]);
  const [available, setAvailable] = useState([...certifications]);

  const enqueue = () => {
    if (available.length === 0) return;
    const item = available[0];
    setAvailable((prev) => prev.slice(1));
    setQueue((prev) => [...prev, item]);
  };

  const dequeue = () => {
    if (queue.length === 0) return;
    const item = queue[0];
    setQueue((prev) => prev.slice(1));
    setAvailable((prev) => [...prev, item]);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Left: certifications */}
      <div>
        <h2 className="font-display text-xl text-primary glow-text-cyan mb-6 flex items-center gap-3">
          <Award className="w-5 h-5" /> CERTIFICATIONS
        </h2>
        <div className="grid gap-3">
          {certifications.map((c, i) => (
            <motion.div
              key={c}
              className="glass rounded-xl p-4 border-glow-cyan"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <p className="font-body text-foreground">{c}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right: queue DSA */}
      <div>
        <h3 className="font-display text-xs text-accent tracking-wider mb-4">DSA — QUEUE VISUALIZATION</h3>
        <div className="glass rounded-xl p-5 border-glow-purple">
          <div className="flex gap-3 mb-4">
            <button onClick={enqueue} disabled={available.length === 0} className="font-mono text-xs px-4 py-2 border border-accent/30 rounded-lg text-accent hover:bg-accent/10 transition-colors disabled:opacity-30">
              Enqueue
            </button>
            <button onClick={dequeue} disabled={queue.length === 0} className="font-mono text-xs px-4 py-2 border border-primary/30 rounded-lg text-primary hover:bg-primary/10 transition-colors disabled:opacity-30">
              Dequeue
            </button>
          </div>
          <div className="flex gap-2 overflow-x-auto min-h-[50px] items-start pb-2">
            <AnimatePresence>
              {queue.map((item) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 30, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -30, scale: 0.9 }}
                  className="font-mono text-[10px] px-3 py-2 rounded-lg bg-accent/10 text-accent border border-accent/15 whitespace-nowrap flex-shrink-0"
                >
                  {item}
                </motion.div>
              ))}
            </AnimatePresence>
            {queue.length === 0 && <p className="font-mono text-[10px] text-muted-foreground">Queue is empty — click Enqueue</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificationsSection;
