import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import profileImg from "@/assets/fena-profile.jpeg";

interface ProfileIntroProps {
  onComplete: () => void;
}

const TypeLine = ({ text, delay, onDone }: { text: string; delay: number; onDone?: () => void }) => {
  const [displayed, setDisplayed] = useState("");
  const idx = useRef(0);

  useEffect(() => {
    const start = setTimeout(() => {
      const interval = setInterval(() => {
        idx.current++;
        if (idx.current > text.length) {
          clearInterval(interval);
          onDone?.();
          return;
        }
        setDisplayed(text.slice(0, idx.current));
      }, 30);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(start);
  }, [text, delay, onDone]);

  return <>{displayed}</>;
};

const ProfileIntro = ({ onComplete }: ProfileIntroProps) => {
  const [phase, setPhase] = useState<"center" | "split" | "text">("center");
  const [line, setLine] = useState(0);

  const lines = [
    "Hello, I'm Fena — an AI Agentic Full Stack Developer.",
    "I design and build intelligent systems where logic meets creativity.",
    "From full-stack applications to AI-driven solutions, I continuously craft tools that solve real-world problems with precision and innovation.",
  ];

  useEffect(() => {
    // Center phase: image appears centered
    const t1 = setTimeout(() => setPhase("split"), 2000);
    return () => clearTimeout(t1);
  }, []);

  useEffect(() => {
    if (phase === "split") {
      const t = setTimeout(() => setPhase("text"), 800);
      return () => clearTimeout(t);
    }
  }, [phase]);

  useEffect(() => {
    if (line >= lines.length) {
      const t = setTimeout(onComplete, 2000);
      return () => clearTimeout(t);
    }
  }, [line, lines.length, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-40 flex items-center justify-center bg-background overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.6 }}
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-14 px-6 max-w-5xl w-full relative z-10">
        {/* Profile Image */}
        <motion.div
          className="relative flex-shrink-0"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={
            phase === "center"
              ? { scale: 1.1, opacity: 1, x: 0 }
              : { scale: 1, opacity: 1, x: 0 }
          }
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="w-44 h-44 md:w-52 md:h-52 rounded-full overflow-hidden border border-primary/30 glow-cyan">
            <img src={profileImg} alt="Fena" className="w-full h-full object-cover" />
          </div>
          <motion.div
            className="absolute -inset-3 rounded-full border border-primary/10"
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>

        {/* Text */}
        {phase === "text" && (
          <motion.div
            className="flex-1 text-center md:text-left max-w-xl"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1
              className="font-display text-xl md:text-3xl font-bold text-primary mb-2 glow-text-cyan"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              FENA VADHER
            </motion.h1>
            <motion.p
              className="font-mono text-accent text-xs mb-6 tracking-[0.2em]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              AI AGENTIC FULL STACK DEVELOPER
            </motion.p>

            <div className="space-y-3">
              {lines.map((l, i) => (
                <p key={i} className="font-body text-foreground text-sm md:text-base leading-relaxed">
                  {i <= line ? (
                    i < line ? (
                      l
                    ) : (
                      <TypeLine
                        text={l}
                        delay={0}
                        onDone={() => setLine((p) => p + 1)}
                      />
                    )
                  ) : null}
                </p>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ProfileIntro;
