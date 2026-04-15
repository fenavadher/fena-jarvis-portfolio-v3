import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const bootMessages = [
  "Initializing AI System...",
  "Loading Neural Modules...",
  "Entering Fena's World...",
];

interface CinematicIntroProps {
  onComplete: () => void;
}

// Simple particle system
const Particle = ({ delay }: { delay: number }) => {
  const x = Math.random() * 100;
  const y = Math.random() * 100;
  const size = Math.random() * 2 + 1;
  const duration = Math.random() * 3 + 4;

  return (
    <motion.div
      className="absolute rounded-full bg-primary/30"
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.8, 0],
        scale: [0, 1, 0],
        y: [0, -60],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeOut" }}
    />
  );
};

const TypeWriter = ({ text, onDone, delay = 0 }: { text: string; onDone?: () => void; delay?: number }) => {
  const [displayed, setDisplayed] = useState("");
  const idx = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    idx.current = 0;
    setDisplayed("");
    if (!text) return;

    const startTimeout = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        idx.current++;
        if (idx.current > text.length) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setTimeout(() => onDone?.(), 400);
          return;
        }
        setDisplayed(text.slice(0, idx.current));
      }, 50);
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, delay, onDone]);

  return (
    <span>
      {displayed}
      <motion.span
        className="inline-block w-[2px] h-[1em] bg-primary ml-0.5 align-middle"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      />
    </span>
  );
};

const CinematicIntro = ({ onComplete }: CinematicIntroProps) => {
  const [currentMsg, setCurrentMsg] = useState(0);
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  const particles = Array.from({ length: 40 }, (_, i) => i);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 60);
    return () => clearInterval(interval);
  }, []);

  const handleMsgDone = () => {
    if (currentMsg < bootMessages.length - 1) {
      setCurrentMsg((p) => p + 1);
    } else {
      setTimeout(() => {
        setExiting(true);
        setTimeout(onComplete, 800);
      }, 600);
    }
  };

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background overflow-hidden"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8 }}
        >
          {/* Particles */}
          {particles.map((i) => (
            <Particle key={i} delay={i * 0.15} />
          ))}

          {/* Rotating rings */}
          <motion.div
            className="absolute w-48 h-48 rounded-full border border-primary/10"
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute w-72 h-72 rounded-full border border-accent/5"
            animate={{ rotate: -360 }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          />

          {/* Core orb */}
          <motion.div
            className="relative mb-16"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.1, 1] }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center glow-cyan">
              <motion.div
                className="w-8 h-8 rounded-full bg-primary/20"
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>

          {/* Typing messages */}
          <div className="h-8 mb-10">
            <p className="font-mono text-primary text-base md:text-lg glow-text-cyan tracking-wider text-center">
              <TypeWriter
                key={currentMsg}
                text={bootMessages[currentMsg]}
                onDone={handleMsgDone}
              />
            </p>
          </div>

          {/* Progress bar */}
          <div className="w-64 h-[2px] bg-muted/30 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-accent"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="font-mono text-muted-foreground text-[10px] mt-3 tracking-[0.3em]">
            {progress}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CinematicIntro;
