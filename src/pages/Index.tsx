import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import CinematicIntro from "@/components/CinematicIntro";
import ProfileIntro from "@/components/ProfileIntro";
import Dashboard from "@/components/Dashboard";

type Phase = "cinematic" | "profile" | "dashboard";

const Index = () => {
  const [phase, setPhase] = useState<Phase>("cinematic");

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {phase === "cinematic" && (
          <CinematicIntro key="cinematic" onComplete={() => setPhase("profile")} />
        )}
        {phase === "profile" && (
          <ProfileIntro key="profile" onComplete={() => setPhase("dashboard")} />
        )}
        {phase === "dashboard" && <Dashboard key="dashboard" />}
      </AnimatePresence>
    </div>
  );
};

export default Index;
