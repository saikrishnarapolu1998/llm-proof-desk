import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Linkedin, Github, Twitter, ArrowUpRight } from "lucide-react";

const socials = [
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Github, label: "GitHub", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Mail, label: "Email", href: "mailto:hello@example.com" },
];

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-32 bg-gradient-section">
      <div ref={ref} className="max-w-4xl mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <span className="text-primary text-sm font-mono font-medium tracking-wider uppercase">Get In Touch</span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 mb-6">
            Let's Build <span className="text-gradient">Trustworthy AI</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-12 leading-relaxed">
            Looking for a Quality Analyst who understands AI from the inside out?
            Let's connect and discuss how I can help your team ship reliable AI products.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a
              href="mailto:hello@example.com"
              className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2"
            >
              <Mail size={18} />
              Reach Out
            </a>
            <a
              href="#"
              className="px-8 py-4 rounded-xl glass text-foreground font-semibold hover:border-primary/50 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2"
            >
              Schedule a Call
              <ArrowUpRight size={18} />
            </a>
          </div>

          <div className="flex items-center justify-center gap-6">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="w-12 h-12 rounded-xl glass flex items-center justify-center text-muted-foreground hover:text-primary hover:glow-primary transition-all duration-300"
                aria-label={s.label}
              >
                <s.icon size={20} />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-24 pt-8 border-t border-border"
        >
          <p className="text-xs text-muted-foreground">
            © 2026 · Quality Analyst Portfolio · Built with precision and purpose
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
