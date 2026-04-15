import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin } from "lucide-react";

const contactData = [
  { key: "Email", value: "fenavadher@gmail.com", href: "mailto:fenavadher@gmail.com", icon: Mail },
  { key: "GitHub", value: "https://github.com/fenavadher", href: "https://github.com/fenavadher", icon: Github },
  { key: "LinkedIn", value: "https://www.linkedin.com/in/fena-vadher-470126341", href: "https://www.linkedin.com/in/fena-vadher-470126341", icon: Linkedin },
];

const hashmap: Record<string, string> = {
  email: "fenavadher@gmail.com",
  github: "https://github.com/fenavadher",
  linkedin: "https://www.linkedin.com/in/fena-vadher-470126341",
};

const ContactSection = () => {
  const [history, setHistory] = useState<{ cmd: string; output: string }[]>([
    { cmd: "", output: 'HashMap Terminal — type "get email", "get github", or "get linkedin"' },
  ]);
  const [input, setInput] = useState("");
  const termRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    termRef.current?.scrollTo(0, termRef.current.scrollHeight);
  }, [history]);

  const handleCommand = () => {
    const cmd = input.trim().toLowerCase();
    setInput("");
    let output = "";

    if (cmd.startsWith("get ")) {
      const key = cmd.slice(4).trim();
      const hash = key.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % 10;
      if (hashmap[key]) {
        output = `hash(${key}) → bucket[${hash}] → "${hashmap[key]}"`;
      } else {
        output = `Key "${key}" not found in HashMap.`;
      }
    } else if (cmd === "help") {
      output = 'Commands: get email | get github | get linkedin | help | clear';
    } else if (cmd === "clear") {
      setHistory([{ cmd: "", output: "Terminal cleared." }]);
      return;
    } else {
      output = `Unknown command: "${cmd}". Type "help" for available commands.`;
    }

    setHistory((prev) => [...prev, { cmd, output }]);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Left: contact info */}
      <div>
        <h2 className="font-display text-xl text-primary glow-text-cyan mb-6 flex items-center gap-3">
          <Mail className="w-5 h-5" /> CONTACT
        </h2>
        <div className="grid gap-3">
          {contactData.map((c, i) => (
            <motion.a
              key={c.key}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="glass rounded-xl p-4 border-glow-cyan flex items-center gap-4 hover:bg-muted/20 transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <c.icon className="w-5 h-5 text-primary flex-shrink-0" />
              <div className="min-w-0">
                <p className="font-display text-[10px] text-muted-foreground tracking-wider">{c.key}</p>
                <p className="font-body text-foreground text-sm truncate">{c.value}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Right: Terminal Hashmap */}
      <div>
        <h3 className="font-display text-xs text-accent tracking-wider mb-4">DSA — HASHMAP TERMINAL</h3>
        <div className="glass rounded-xl border-glow-purple overflow-hidden">
          {/* Terminal header */}
          <div className="flex items-center gap-1.5 px-4 py-2 border-b border-accent/10">
            <div className="w-2 h-2 rounded-full bg-destructive/60" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
            <div className="w-2 h-2 rounded-full bg-green-500/60" />
            <span className="font-mono text-[9px] text-muted-foreground ml-2">hashmap.terminal</span>
          </div>

          {/* Terminal body */}
          <div ref={termRef} className="p-4 max-h-64 overflow-y-auto space-y-2">
            {history.map((h, i) => (
              <div key={i} className="font-mono text-xs">
                {h.cmd && (
                  <p className="text-primary">
                    <span className="text-accent">❯</span> {h.cmd}
                  </p>
                )}
                <p className="text-muted-foreground pl-2">{h.output}</p>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 px-4 py-3 border-t border-accent/10">
            <span className="font-mono text-xs text-accent">❯</span>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && input.trim() && handleCommand()}
              className="flex-1 bg-transparent font-mono text-xs text-foreground outline-none placeholder:text-muted-foreground/40"
              placeholder='type "get email"...'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
