import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.6, ease: "easeOut" },
  }),
};

export default function BusinessLandingPage() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const { t, i18n } = useTranslation();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Floating particles animation
  useEffect(() => {
    const canvas = document.getElementById("particles");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    const parts = Array.from({ length: 70 }).map(() => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
    }));
    function anim() {
      ctx.clearRect(0, 0, W, H);
      parts.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.06)";
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > W) p.dx *= -1;
        if (p.y < 0 || p.y > H) p.dy *= -1;
      });
      requestAnimationFrame(anim);
    }
    anim();
    const onRes = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onRes);
    return () => window.removeEventListener("resize", onRes);
  }, []);

  const projects = [
    {
      title: "Real-Time Stock Market Analysis",
      desc: "Live analytics dashboard with prediction models and visualization.",
      link: "https://github.com/ArmandoSaboia/realtime-stock-analysis",
    },
    ...Array.from({ length: 9 }).map(() => ({
      title: "Coming Soon",
      desc: "Innovative AI solution in development.",
    })),
  ];

  return (
    <div ref={ref} className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <canvas id="particles" className="absolute inset-0 w-full h-full z-0" />
      <div
        className="absolute inset-0 bg-gradient-to-tr from-indigo-900/30 via-purple-800/10 to-transparent z-10"
        style={{ mixBlendMode: "overlay" }}
      />

      {/* HERO */}
      <motion.header
        style={{ y }}
        className="relative z-20 max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-8"
      >
        {/* LEFT SIDE */}
        <div className="md:w-1/2 z-30">
          {/* Language switcher */}
          <div className="flex items-center justify-between mb-6">
            <div className="text-sm text-gray-300" />
            <div className="space-x-3">
              {["en", "pt"].map((l) => (
                <button
                  key={l}
                  onClick={() => i18n.changeLanguage(l)}
                  className={`text-sm ${
                    i18n.language === l
                      ? "text-indigo-300 font-semibold"
                      : "text-gray-400 hover:text-indigo-300"
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold leading-tight mb-4 text-white"
          >
            {t("hero_title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="text-lg text-gray-300 mb-8 max-w-xl"
          >
            {t("hero_description")}
          </motion.p>

          {/* CTA BUTTONS */}
          <div className="flex gap-4">
            <a
              href="#projects"
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              {t("primaryCTA")}
            </a>

            {/* 🔹 N8N contact webhook integration */}
            <button
              onClick={() => {
                fetch(
                  "https://n8n.armandosaboia.tech/webhook/portfolio-contact",
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      source: "portfolio",
                      lang: i18n.language,
                      message:
                        "User clicked the contact CTA from portfolio site",
                    }),
                  }
                )
                  .then(() =>
                    alert("✅ Message sent! We'll reach out soon.")
                  )
                  .catch(() => {
                    // fallback: open mail client
                    window.location.href =
                      "mailto:armando.saboia.tech@gmail.com";
                  });
              }}
              className="px-6 py-3 border border-indigo-400 rounded-lg text-indigo-400 hover:bg-indigo-800/20 transition"
            >
              {t("secondaryCTA")}
            </button>
          </div>

          {/* SOCIAL LINKS */}
          <div className="mt-8 flex gap-3">
            <a
              href="https://github.com/ArmandoSaboia"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2 bg-gray-800/60 rounded flex items-center gap-2"
            >
              <Github size={16} /> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/armandosaboia/"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2 bg-gray-800/60 rounded flex items-center gap-2"
            >
              <Linkedin size={16} /> LinkedIn
            </a>
            <a
              href="mailto:armando.saboia.tech@gmail.com"
              className="px-3 py-2 bg-gray-800/60 rounded flex items-center gap-2"
            >
              <Mail size={16} /> Email
            </a>
          </div>
        </div>

        {/* RIGHT SIDE – HERO IMAGE */}
        <motion.div
          className="md:w-1/2 relative z-20 flex justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="absolute inset-0 md:rounded-3xl md:-right-12 bg-gradient-to-tr from-black/40 via-indigo-900/20 to-transparent pointer-events-none" />
          <motion.img
            src="/preview-Photoroom.png"
            alt="Armando Saboia"
            className="hero-photo w-full max-w-md object-cover rounded-2xl"
            style={{ willChange: "transform" }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.header>

      {/* SERVICES */}
      <section className="relative z-20 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-6 text-white"
          >
            {t("services_title")}
          </motion.h2>
          <p className="text-gray-400 mb-8">
            Consulting, custom ML models, automation integrations and
            production deployment.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass p-6 rounded-xl text-left"
            >
              <h3 className="font-semibold mb-2">
                {t("services.ai_consulting")}
              </h3>
              <p className="text-gray-300 text-sm">
                Technical audits, roadmap and PoC to production plans.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass p-6 rounded-xl text-left"
            >
              <h3 className="font-semibold mb-2">
                {t("services.custom_ml")}
              </h3>
              <p className="text-gray-300 text-sm">
                Tailored models and data pipelines for your business problems.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass p-6 rounded-xl text-left"
            >
              <h3 className="font-semibold mb-2">
                {t("services.automation")}
              </h3>
              <p className="text-gray-300 text-sm">
                AI Integration — Automate with ML, APIs, n8n, or Make/Zapier.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="relative z-20 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-8 text-white text-center"
          >
            {t("projects_title")}
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={cardVariants}
                className={`p-6 rounded-2xl glass transition relative overflow-hidden ${
                  p.link
                    ? "hover:shadow-[0_0_20px_rgba(99,102,241,0.12)]"
                    : "pulse-indigo"
                }`}
              >
                <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{p.desc}</p>
                {p.link ? (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-300 font-medium"
                  >
                    {t("view_project")}
                  </a>
                ) : (
                  <div className="text-indigo-200 font-medium">
                    {t("coming_soon")}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="relative z-20 py-8 text-center text-gray-400">
        © {new Date().getFullYear()} Armando Saboia
      </footer>

      {showTop && (
        <a
          href="#top"
          className="fixed right-6 bottom-6 bg-indigo-600 p-3 rounded-full z-50"
        >
          <ArrowUp color="white" />
        </a>
      )}
    </div>
  );
}

