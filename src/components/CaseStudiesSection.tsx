import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2 } from "lucide-react";

const caseStudies = [
  {
    title: "Scaling AI Content Review from 10K to 100K/day",
    context: "Enterprise client needed to 10x moderation throughput without proportional headcount increase.",
    actions: [
      "Designed tiered review system: AI auto-approve (70%), AI-flagged human review (25%), escalation (5%)",
      "Built custom evaluation prompts achieving 97.8% classification accuracy",
      "Implemented feedback loops for continuous model improvement",
    ],
    results: [
      { metric: "10x", label: "Throughput increase" },
      { metric: "50%", label: "Cost reduction" },
      { metric: "97.8%", label: "Precision rate" },
    ],
  },
  {
    title: "Reducing LLM Hallucinations in Production",
    context: "Customer-facing AI assistant was generating inaccurate information, causing trust issues.",
    actions: [
      "Created 200+ evaluation test cases across factuality, coherence, and groundedness",
      "Implemented automated hallucination detection using cross-reference validation",
      "Established prompt guardrails and output verification pipelines",
    ],
    results: [
      { metric: "34%", label: "Hallucination reduction" },
      { metric: "94.2%", label: "Response accuracy" },
      { metric: "4.6/5", label: "User trust score" },
    ],
  },
];

const CaseStudiesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="case-studies" className="py-32">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <span className="text-primary text-sm font-mono font-medium tracking-wider uppercase">Impact</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-16">
            Case <span className="text-gradient">Studies</span>
          </h2>
        </motion.div>

        <div className="space-y-8">
          {caseStudies.map((cs, i) => (
            <motion.div
              key={cs.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="glass rounded-3xl p-8 md:p-10"
            >
              <h3 className="text-2xl font-bold mb-3">{cs.title}</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">{cs.context}</p>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-sm font-semibold text-primary mb-4">Key Actions</h4>
                  <ul className="space-y-3">
                    {cs.actions.map((a) => (
                      <li key={a} className="flex gap-3 text-sm text-muted-foreground">
                        <CheckCircle2 size={16} className="text-primary flex-shrink-0 mt-0.5" />
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {cs.results.map((r) => (
                    <div key={r.label} className="text-center p-4 rounded-2xl bg-secondary/50">
                      <div className="text-3xl font-bold text-gradient mb-1">{r.metric}</div>
                      <div className="text-xs text-muted-foreground">{r.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
