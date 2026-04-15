import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Code, Trophy, FolderOpen, Award, Briefcase, Mail, X } from "lucide-react";
import profileImg from "@/assets/fena-profile.jpeg";
import EducationSection from "./sections/EducationSection";
import SkillsSection from "./sections/SkillsSection";
import AchievementsSection from "./sections/AchievementsSection";
import ProjectsSection from "./sections/ProjectsSection";
import CertificationsSection from "./sections/CertificationsSection";
import ExperienceSection from "./sections/ExperienceSection";
import ContactSection from "./sections/ContactSection";

const navItems = [
  { id: "education", label: "Education", icon: GraduationCap, color: "from-primary/20 to-primary/5" },
  { id: "skills", label: "Technical Skills", icon: Code, color: "from-primary/20 to-accent/10" },
  { id: "achievements", label: "Achievements", icon: Trophy, color: "from-accent/20 to-accent/5" },
  { id: "projects", label: "Projects", icon: FolderOpen, color: "from-primary/20 to-primary/5" },
  { id: "certifications", label: "Certifications", icon: Award, color: "from-accent/20 to-primary/10" },
  { id: "experience", label: "Experience", icon: Briefcase, color: "from-primary/20 to-accent/5" },
  { id: "contact", label: "Contact", icon: Mail, color: "from-accent/20 to-accent/5" },
];

const sectionMap: Record<string, React.FC> = {
  education: EducationSection,
  skills: SkillsSection,
  achievements: AchievementsSection,
  projects: ProjectsSection,
  certifications: CertificationsSection,
  experience: ExperienceSection,
  contact: ContactSection,
};

const Dashboard = () => {
  const [active, setActive] = useState<string | null>(null);

  const ActiveSection = active ? sectionMap[active] : null;

  return (
    <motion.div
      className="min-h-screen bg-background relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Subtle background grid */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 flex items-center gap-4 px-6 py-4 border-b border-primary/8">
        <div className="w-9 h-9 rounded-full overflow-hidden border border-primary/20">
          <img src={profileImg} alt="Fena" className="w-full h-full object-cover" />
        </div>
        <div>
          <h1 className="font-display text-xs text-primary glow-text-cyan tracking-[0.15em]">SYSTEM DASHBOARD</h1>
          <p className="font-mono text-[10px] text-muted-foreground tracking-wide">Fena Vadher // AI Agentic Full Stack Developer</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-primary"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="font-mono text-[10px] text-muted-foreground tracking-wider">ONLINE</span>
        </div>
      </header>

      {/* Main content */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {!active ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="p-6 md:p-10 max-w-5xl mx-auto"
            >
              <div className="text-center mb-10">
                <h2 className="font-display text-lg md:text-xl text-primary glow-text-cyan tracking-[0.2em] mb-1">
                  SYSTEM MODULES
                </h2>
                <p className="font-mono text-[10px] text-muted-foreground tracking-widest">SELECT A MODULE TO EXPLORE</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.id}
                    onClick={() => setActive(item.id)}
                    className={`group relative glass rounded-xl p-5 md:p-6 text-left transition-all duration-300 hover:border-primary/30 border border-transparent`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Hover glow */}
                    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 to-transparent" />
                    
                    <item.icon className="w-5 h-5 text-primary mb-3 group-hover:drop-shadow-[0_0_8px_hsl(190_100%_50%/0.6)] transition-all" />
                    <p className="font-display text-[10px] md:text-xs text-foreground tracking-wider">{item.label.toUpperCase()}</p>
                    <div className="mt-2 w-6 h-[1px] bg-primary/20 group-hover:w-full group-hover:bg-primary/40 transition-all duration-500" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="p-6 md:p-10 max-w-5xl mx-auto"
            >
              {/* Back button */}
              <motion.button
                onClick={() => setActive(null)}
                className="flex items-center gap-2 mb-6 font-mono text-xs text-muted-foreground hover:text-primary transition-colors group"
                whileHover={{ x: -2 }}
              >
                <X className="w-3.5 h-3.5" />
                <span className="tracking-wider">CLOSE MODULE</span>
              </motion.button>
              
              {ActiveSection && <ActiveSection />}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Dashboard;
