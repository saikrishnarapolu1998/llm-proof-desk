import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { X, ExternalLink, TrendingUp } from "lucide-react";

const projects = [
  {
    title: "LLM Response Quality Framework",
    tag: "AI Evaluation",
    summary: "Built an end-to-end evaluation pipeline for LLM-generated content across 15+ dimensions.",
    problem: "No standardized way to measure LLM output quality across factuality, coherence, safety, and helpfulness.",
    approach: "Designed rubric-based evaluation criteria with automated scoring using secondary LLM judges and human-in-the-loop validation.",
    tools: ["Python", "OpenAI API", "Pandas", "Custom Rubrics"],
    impact: "Reduced hallucination rate by 34% and improved response accuracy to 94.2% across production models.",
    metric: "94.2% accuracy",
  },
  {
    title: "Prompt Engineering System",
    tag: "Prompt Engineering",
    summary: "Systematic prompt library with version control, A/B testing, and performance tracking.",
    problem: "Ad-hoc prompts led to inconsistent outputs and no way to track which prompts performed best.",
    approach: "Created a structured prompt management system with templating, version history, and automated regression testing.",
    tools: ["Langchain", "Python", "Git", "Custom Dashboard"],
    impact: "Achieved 40% improvement in task completion rates and 60% reduction in prompt iteration cycles.",
    metric: "40% improvement",
  },
  {
    title: "Content Moderation Pipeline",
    tag: "Trust & Safety",
    summary: "AI-powered content moderation system handling 100K+ daily reviews with multi-label classification.",
    problem: "Manual moderation couldn't scale. High false-positive rates in automated systems caused user frustration.",
    approach: "Combined rule-based filters with LLM classifiers for nuanced content categorization, with human escalation workflows.",
    tools: ["Python", "Transformers", "PostgreSQL", "Grafana"],
    impact: "Processed 100K+ daily items with 97.8% precision and 50% reduction in manual review workload.",
    metric: "97.8% precision",
  },
  {
    title: "Automated QA Test Suite",
    tag: "QA Automation",
    summary: "Comprehensive test automation framework covering API, UI, and AI output regression testing.",
    problem: "Release cycles were slow due to extensive manual testing. AI feature regressions went undetected.",
    approach: "Built layered test architecture: unit → integration → E2E → AI output validation with custom assertions.",
    tools: ["Selenium", "Playwright", "Pytest", "Jenkins"],
    impact: "Cut release cycle from 2 weeks to 3 days. Caught 23 critical regressions before production.",
    metric: "85% faster releases",
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="projects" className="py-32 bg-gradient-section">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <span className="text-primary text-sm font-mono font-medium tracking-wider uppercase">Portfolio</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-16">
            Featured <span className="text-gradient">Projects</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => setSelected(i)}
              className="glass rounded-2xl p-8 cursor-pointer group hover:glow-primary transition-all duration-500 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-primary bg-primary/10 px-3 py-1 rounded-full">{p.tag}</span>
                <ExternalLink size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-gradient transition-all">{p.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{p.summary}</p>
              <div className="flex items-center gap-2 text-primary">
                <TrendingUp size={14} />
                <span className="text-sm font-semibold">{p.metric}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-background/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong rounded-3xl p-8 md:p-10 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono text-primary bg-primary/10 px-3 py-1 rounded-full">
                  {projects[selected].tag}
                </span>
                <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground transition-colors">
                  <X size={20} />
                </button>
              </div>
              <h3 className="text-2xl font-bold mb-6">{projects[selected].title}</h3>
              {[
                { label: "Problem", text: projects[selected].problem },
                { label: "Approach", text: projects[selected].approach },
                { label: "Impact", text: projects[selected].impact },
              ].map((s) => (
                <div key={s.label} className="mb-5">
                  <h4 className="text-sm font-semibold text-primary mb-2">{s.label}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.text}</p>
                </div>
              ))}
              <div>
                <h4 className="text-sm font-semibold text-primary mb-3">Tools</h4>
                <div className="flex flex-wrap gap-2">
                  {projects[selected].tools.map((t) => (
                    <span key={t} className="text-xs font-mono bg-secondary px-3 py-1.5 rounded-lg text-secondary-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
