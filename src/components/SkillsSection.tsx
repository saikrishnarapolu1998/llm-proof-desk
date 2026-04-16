import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    title: "AI & LLM",
    skills: [
      { name: "Prompt Engineering", level: 95 },
      { name: "LLM Evaluation", level: 92 },
      { name: "Model Fine-tuning", level: 78 },
      { name: "RAG Systems", level: 85 },
      { name: "AI Safety", level: 90 },
    ],
  },
  {
    title: "Quality Assurance",
    skills: [
      { name: "Test Automation", level: 88 },
      { name: "API Testing", level: 90 },
      { name: "Performance Testing", level: 82 },
      { name: "CI/CD Pipelines", level: 85 },
      { name: "Bug Tracking", level: 92 },
    ],
  },
  {
    title: "Tools & Platforms",
    skills: [
      { name: "Python", level: 88 },
      { name: "Selenium / Playwright", level: 85 },
      { name: "JIRA / Confluence", level: 90 },
      { name: "OpenAI API", level: 92 },
      { name: "Langchain", level: 80 },
    ],
  },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-32">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <span className="text-primary text-sm font-mono font-medium tracking-wider uppercase">Expertise</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-16">
            Technical <span className="text-gradient">Arsenal</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: ci * 0.15 }}
              className="glass rounded-2xl p-8"
            >
              <h3 className="text-lg font-bold mb-6 text-gradient">{cat.title}</h3>
              <div className="space-y-5">
                {cat.skills.map((skill, si) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-foreground font-medium">{skill.name}</span>
                      <span className="text-muted-foreground font-mono text-xs">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1, delay: 0.5 + ci * 0.15 + si * 0.08, ease: "easeOut" }}
                        className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
