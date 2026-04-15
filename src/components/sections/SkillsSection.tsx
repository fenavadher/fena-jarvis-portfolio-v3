import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Code } from "lucide-react";

const skillGroups = [
  { title: "Full Stack Development", items: ["HTML", "CSS", "Tailwind CSS", "Bootstrap", "WordPress", "JavaScript", "React.js", "Node.js", "Express.js"] },
  { title: "Programming Languages", items: ["Python", "C", "C++", "Java"] },
  { title: "Systems & Core Computing", items: ["Operating Systems", "Computer Networks", "Cybersecurity (Fundamentals)"] },
  { title: "Emerging Technologies", items: ["Internet of Things (IoT)", "Agentic AI", "LLM Integration", "Prompt Engineering"] },
  { title: "Databases", items: ["MySQL", "Oracle"] },
  { title: "Tools & Platforms", items: ["Git", "GitHub", "VS Code", "Jupyter Notebook", "Eclipse", "Postman"] },
  { title: "Concepts", items: ["REST APIs", "API Integration", "JSON", "Authentication"] },
];

const bubbleSort = (arr: string[]): string[][] => {
  const a = [...arr];
  const steps: string[][] = [[...a]];
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length - i - 1; j++) {
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        steps.push([...a]);
      }
    }
  }
  return steps;
};

const quickSort = (arr: string[]): string[][] => {
  const a = [...arr];
  const steps: string[][] = [[...a]];
  const qs = (lo: number, hi: number) => {
    if (lo >= hi) return;
    const pivot = a[hi];
    let i = lo;
    for (let j = lo; j < hi; j++) {
      if (a[j] < pivot) {
        [a[i], a[j]] = [a[j], a[i]];
        i++;
        steps.push([...a]);
      }
    }
    [a[i], a[hi]] = [a[hi], a[i]];
    steps.push([...a]);
    qs(lo, i - 1);
    qs(i + 1, hi);
  };
  qs(0, a.length - 1);
  return steps;
};

const SkillsSection = () => {
  const allSkills = skillGroups.flatMap((g) => g.items);
  const [displayItems, setDisplayItems] = useState<string[]>(allSkills);
  const [sorting, setSorting] = useState(false);
  const [activeAlgo, setActiveAlgo] = useState<string | null>(null);
  const [stepInfo, setStepInfo] = useState({ current: 0, total: 0 });
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const runSort = useCallback((algo: "bubble" | "quick") => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    const steps = algo === "bubble" ? bubbleSort(allSkills) : quickSort(allSkills);
    setDisplayItems(steps[0]);
    setSorting(true);
    setActiveAlgo(algo === "bubble" ? "Bubble Sort" : "Quick Sort");
    setStepInfo({ current: 0, total: steps.length });

    let i = 0;
    intervalRef.current = setInterval(() => {
      i++;
      if (i >= steps.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
        setSorting(false);
        setStepInfo({ current: steps.length, total: steps.length });
        return;
      }
      setDisplayItems(steps[i]);
      setStepInfo({ current: i, total: steps.length });
    }, 150);
  }, [allSkills]);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div>
        <h2 className="font-display text-xl text-primary glow-text-cyan mb-6 flex items-center gap-3">
          <Code className="w-5 h-5" /> TECHNICAL SKILLS
        </h2>
        <div className="grid gap-3">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.title}
              className="glass rounded-xl p-4 border-glow-cyan"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <h3 className="font-display text-[10px] text-accent tracking-wider mb-2">{group.title}</h3>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span key={item} className="font-mono text-[10px] px-2.5 py-1 rounded-md bg-muted/50 text-foreground border border-primary/8">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-display text-xs text-accent tracking-wider mb-4">DSA — SORTING VISUALIZATION</h3>
        <div className="glass rounded-xl p-5 border-glow-purple">
          <div className="flex gap-3 mb-4">
            <button
              onClick={() => runSort("bubble")}
              disabled={sorting}
              className="font-mono text-xs px-4 py-2 border border-accent/30 rounded-lg text-accent hover:bg-accent/10 transition-colors disabled:opacity-30"
            >
              Bubble Sort
            </button>
            <button
              onClick={() => runSort("quick")}
              disabled={sorting}
              className="font-mono text-xs px-4 py-2 border border-primary/30 rounded-lg text-primary hover:bg-primary/10 transition-colors disabled:opacity-30"
            >
              Quick Sort
            </button>
          </div>

          {activeAlgo && (
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-[10px] text-muted-foreground">{activeAlgo}</span>
              <div className="flex-1 h-1 rounded-full bg-muted/30 overflow-hidden">
                <motion.div
                  className="h-full bg-primary/60 rounded-full"
                  animate={{ width: `${stepInfo.total > 0 ? (stepInfo.current / stepInfo.total) * 100 : 0}%` }}
                  transition={{ duration: 0.15 }}
                />
              </div>
              <span className="font-mono text-[10px] text-muted-foreground">
                {stepInfo.current}/{stepInfo.total}
              </span>
            </div>
          )}

          <motion.div className="flex flex-wrap gap-1.5" layout>
            {displayItems.map((item, idx) => (
              <motion.span
                key={`${idx}`}
                layout
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="font-mono text-[10px] px-2 py-1 rounded bg-primary/10 text-primary border border-primary/15"
              >
                {item}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;
