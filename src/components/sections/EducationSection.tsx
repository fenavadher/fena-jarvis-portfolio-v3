import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const EducationSection = () => (
  <div>
    <h2 className="font-display text-xl text-primary glow-text-cyan mb-6 flex items-center gap-3">
      <GraduationCap className="w-5 h-5" /> EDUCATION
    </h2>
    <motion.div
      className="glass rounded-xl p-6 border-glow-cyan max-w-lg relative overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Scan line effect */}
      <motion.div
        className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
      <h3 className="font-body text-lg text-foreground font-semibold">Bachelor of Computer Applications (BCA)</h3>
      <p className="font-mono text-sm text-muted-foreground mt-1">Vanita Vishram Women's University</p>
    </motion.div>
  </div>
);

export default EducationSection;
