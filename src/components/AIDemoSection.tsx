import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Loader2, Sparkles } from "lucide-react";

const prebuiltResponses: Record<string, { response: string; quality: string; safety: string; suggestions: string[] }> = {
  default: {
    response: "I'll analyze your prompt for quality, safety, and effectiveness. Try prompts like 'Write a product description' or 'Explain quantum computing'.",
    quality: "N/A",
    safety: "Safe",
    suggestions: ["Be more specific", "Add context", "Define the output format"],
  },
  "write a product description": {
    response: "Introducing the AeroFlow Pro — a lightweight, noise-canceling wireless headphone engineered for immersive audio. With 40-hour battery life and adaptive EQ, it redefines your listening experience.",
    quality: "8.5/10 — Clear, persuasive, includes key features. Could add pricing context.",
    safety: "Safe — No harmful or misleading claims detected.",
    suggestions: ["Add target audience", "Include a CTA", "Mention warranty/guarantee"],
  },
  "explain quantum computing": {
    response: "Quantum computing leverages quantum mechanical phenomena — superposition and entanglement — to process information. Unlike classical bits (0 or 1), qubits can exist in multiple states simultaneously, enabling exponential computational speedups for specific problems.",
    quality: "9.1/10 — Accurate, accessible, good analogies. Technical depth appropriate for general audience.",
    safety: "Safe — Factually grounded, no hallucinations detected.",
    suggestions: ["Add real-world applications", "Include limitations", "Provide difficulty-appropriate examples"],
  },
};

const findResponse = (input: string) => {
  const lower = input.toLowerCase().trim();
  for (const key of Object.keys(prebuiltResponses)) {
    if (key !== "default" && lower.includes(key)) return prebuiltResponses[key];
  }
  return {
    response: `Based on your prompt "${input}", here's a structured analysis: The prompt is ${input.length > 20 ? "well-detailed" : "quite brief"}. ${input.length > 20 ? "Good specificity detected." : "Consider adding more context for better results."}`,
    quality: `${Math.min(9.5, 5 + input.length * 0.05).toFixed(1)}/10 — ${input.length > 30 ? "Good detail level" : "Could use more specificity"}`,
    safety: "Safe — No concerning patterns detected.",
    suggestions: ["Add expected output format", "Specify target audience", "Include constraints or requirements"],
  };
};

const AIDemoSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [input, setInput] = useState("");
  const [result, setResult] = useState<ReturnType<typeof findResponse> | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!input.trim()) return;
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setResult(findResponse(input));
      setLoading(false);
    }, 1200);
  };

  return (
    <section id="ai-demo" className="py-32 bg-gradient-section">
      <div ref={ref} className="max-w-4xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <span className="text-primary text-sm font-mono font-medium tracking-wider uppercase">Interactive</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4">
            AI Prompt <span className="text-gradient">Lab</span>
          </h2>
          <p className="text-muted-foreground mb-12 max-w-xl">
            Test prompts and see how I evaluate LLM responses for quality, safety, and actionable improvements.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass rounded-3xl p-8"
        >
          <div className="flex gap-3 mb-6">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="Enter a prompt to analyze (e.g., 'Write a product description')..."
              className="flex-1 bg-secondary rounded-xl px-5 py-3.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
            <button
              onClick={handleSubmit}
              disabled={loading || !input.trim()}
              className="px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:shadow-lg hover:shadow-primary/25 transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              Analyze
            </button>
          </div>

          {result && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
              <div className="p-5 rounded-2xl bg-secondary/50">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles size={14} className="text-primary" />
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">LLM Response</span>
                </div>
                <p className="text-sm text-foreground leading-relaxed">{result.response}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-secondary/30">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">Quality Score</span>
                  <p className="text-sm text-muted-foreground mt-2">{result.quality}</p>
                </div>
                <div className="p-4 rounded-xl bg-secondary/30">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">Safety Check</span>
                  <p className="text-sm text-muted-foreground mt-2">{result.safety}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-secondary/30">
                <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-3 block">Improvement Suggestions</span>
                <div className="flex flex-wrap gap-2">
                  {result.suggestions.map((s) => (
                    <span key={s} className="text-xs font-mono bg-primary/10 text-primary px-3 py-1.5 rounded-lg">{s}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default AIDemoSection;
