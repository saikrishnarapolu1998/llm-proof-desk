import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Brain, Target, Zap } from "lucide-react";

const highlights = [
  { icon: Shield, label: "Trust & Safety", desc: "Content moderation & policy compliance" },
  { icon: Brain, label: "LLM Evaluation", desc: "Model accuracy & hallucination detection" },
  { icon: Target, label: "Prompt Engineering", desc: "Systematic prompt design & optimization" },
  { icon: Zap, label: "QA Automation", desc: "Testing pipelines & quality frameworks" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 bg-gradient-section">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          <div>
            <span className="text-primary text-sm font-mono font-medium tracking-wider uppercase">About Me</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 leading-tight">
              Where <span className="text-gradient">Quality</span> Meets{" "}
              <span className="text-gradient">Intelligence</span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                As a Quality Analyst at Wipro, I sit at the intersection of AI development and quality assurance.
                My work ensures that large language models produce outputs that are not just technically correct, but
                trustworthy, safe, and aligned with human expectations.
              </p>
              <p>
                With deep expertise in prompt engineering and LLM evaluation, I build systematic frameworks that
                measure model performance, detect hallucinations, and enforce content safety policies at scale.
                Every AI system I touch becomes more reliable.
              </p>
              <p>
                I believe the future of AI depends on rigorous quality standards. My mission is to bridge the gap
                between cutting-edge AI capabilities and the trust required for real-world deployment.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {highlights.map((h, i) => (
              <motion.div
                key={h.label}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="glass rounded-2xl p-6 hover:glow-primary transition-all duration-500 group cursor-default"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <h.icon size={20} className="text-primary" />
                </div>
                <h3 className="font-semibold text-sm mb-1">{h.label}</h3>
                <p className="text-xs text-muted-foreground">{h.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
