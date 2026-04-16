import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const accuracyData = [
  { month: "Jan", accuracy: 82, baseline: 75 },
  { month: "Feb", accuracy: 85, baseline: 75 },
  { month: "Mar", accuracy: 87, baseline: 76 },
  { month: "Apr", accuracy: 89, baseline: 76 },
  { month: "May", accuracy: 91, baseline: 77 },
  { month: "Jun", accuracy: 94, baseline: 77 },
];

const moderationData = [
  { category: "Hate Speech", caught: 98.2, missed: 1.8 },
  { category: "Misinformation", caught: 95.1, missed: 4.9 },
  { category: "PII Exposure", caught: 99.1, missed: 0.9 },
  { category: "Toxicity", caught: 96.8, missed: 3.2 },
  { category: "Bias", caught: 91.3, missed: 8.7 },
];

const stats = [
  { value: "94.2%", label: "Model Accuracy" },
  { value: "100K+", label: "Daily Reviews" },
  { value: "34%", label: "Hallucination ↓" },
  { value: "4.6/5", label: "Trust Score" },
];

const DashboardSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="dashboard" className="py-32">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <span className="text-primary text-sm font-mono font-medium tracking-wider uppercase">Metrics</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-16">
            Impact <span className="text-gradient">Dashboard</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="glass rounded-2xl p-6 text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-1">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="text-sm font-semibold mb-6">Accuracy Improvement Over Time</h3>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={accuracyData}>
                <defs>
                  <linearGradient id="colorAccuracy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(168, 80%, 50%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(168, 80%, 50%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 16%)" />
                <XAxis dataKey="month" stroke="hsl(215, 12%, 40%)" fontSize={12} />
                <YAxis domain={[70, 100]} stroke="hsl(215, 12%, 40%)" fontSize={12} />
                <Tooltip contentStyle={{ background: "hsl(220, 18%, 8%)", border: "1px solid hsl(220, 16%, 20%)", borderRadius: "12px", fontSize: 12 }} />
                <Area type="monotone" dataKey="baseline" stroke="hsl(215, 12%, 40%)" strokeDasharray="4 4" fill="none" />
                <Area type="monotone" dataKey="accuracy" stroke="hsl(168, 80%, 50%)" fill="url(#colorAccuracy)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="text-sm font-semibold mb-6">Content Moderation Accuracy (%)</h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={moderationData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 16%)" />
                <XAxis type="number" domain={[0, 100]} stroke="hsl(215, 12%, 40%)" fontSize={12} />
                <YAxis dataKey="category" type="category" stroke="hsl(215, 12%, 40%)" fontSize={11} width={100} />
                <Tooltip contentStyle={{ background: "hsl(220, 18%, 8%)", border: "1px solid hsl(220, 16%, 20%)", borderRadius: "12px", fontSize: 12 }} />
                <Bar dataKey="caught" fill="hsl(168, 80%, 50%)" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DashboardSection;
