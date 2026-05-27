import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "../style.css";

const navItems = [
  ["About", "about"],
  ["Education", "education"],
  ["Skills", "skills"],
  ["Competitions", "competitions"],
  ["Contact", "contact"],
];

const skills = [
  ["Microsoft Excel", "fa-solid fa-table", "82%"],
  ["Microsoft Word", "fa-solid fa-file-word", "78%"],
  ["PowerPoint", "fa-solid fa-chart-simple", "76%"],
  ["Fusion 360", "fa-solid fa-cubes", "72%"],
  ["Robotics", "fa-solid fa-robot", "86%"],
  ["Automation", "fa-solid fa-gears", "80%"],
  ["AI Basics", "fa-solid fa-brain", "68%"],
];

const competitions = [
  ["Technothon", "fa-solid fa-trophy", "Technical innovation and problem-solving competition experience."],
  ["Robo Rumble", "fa-solid fa-shield-halved", "Robotics challenge focused on strategy, control, and engineering confidence."],
  ["Circuit Debugging", "fa-solid fa-microchip", "Hands-on electronics troubleshooting and circuit logic competition."],
];

const interests = [
  ["AI & Coding", "fa-solid fa-brain"],
  ["Robotics", "fa-solid fa-robot"],
  ["Gaming", "fa-solid fa-gamepad"],
  ["Technology Innovation", "fa-solid fa-lightbulb"],
];

function App() {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 650);

    if (window.AOS) {
      window.AOS.init({
        duration: 900,
        once: true,
        offset: 90,
        easing: "ease-out-cubic",
      });
    }

    if (window.particlesJS) {
      window.particlesJS("particles-js", {
        particles: {
          number: { value: 78, density: { enable: true, value_area: 900 } },
          color: { value: ["#38bdf8", "#2563eb", "#ffffff"] },
          shape: { type: "circle" },
          opacity: { value: 0.38, random: true },
          size: { value: 3, random: true },
          line_linked: {
            enable: true,
            distance: 140,
            color: "#38bdf8",
            opacity: 0.18,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1.2,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: true, mode: "grab" },
            onclick: { enable: true, mode: "push" },
            resize: true,
          },
          modes: {
            grab: { distance: 170, line_linked: { opacity: 0.42 } },
            push: { particles_nb: 3 },
          },
        },
        retina_detect: true,
      });
    }

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const subtitle = "Diploma Robotics & Automation Student";
    let index = 0;
    let deleting = false;
    let timerId;

    const tick = () => {
      setTypedText(subtitle.slice(0, index));

      if (!deleting && index < subtitle.length) {
        index += 1;
      } else if (!deleting && index === subtitle.length) {
        deleting = true;
        timerId = window.setTimeout(tick, 1200);
        return;
      } else if (deleting && index > 0) {
        index -= 1;
      } else {
        deleting = false;
      }

      timerId = window.setTimeout(tick, deleting ? 44 : 78);
    };

    tick();
    return () => window.clearTimeout(timerId);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0);
      setShowTop(window.scrollY > 520);

      document.querySelectorAll("section[id]").forEach((section) => {
        const top = section.offsetTop - 150;
        const bottom = top + section.offsetHeight;

        if (window.scrollY >= top && window.scrollY < bottom) {
          setActiveSection(section.id);
        }
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const cursor = document.getElementById("cursorGlow");

    const moveCursor = (event) => {
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
    };

    const expandCursor = () => {
      cursor.style.width = "46px";
      cursor.style.height = "46px";
    };

    const shrinkCursor = () => {
      cursor.style.width = "26px";
      cursor.style.height = "26px";
    };

    window.addEventListener("mousemove", moveCursor);
    document.querySelectorAll("a, button, .glass-card").forEach((item) => {
      item.addEventListener("mouseenter", expandCursor);
      item.addEventListener("mouseleave", shrinkCursor);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.querySelectorAll("a, button, .glass-card").forEach((item) => {
        item.removeEventListener("mouseenter", expandCursor);
        item.removeEventListener("mouseleave", shrinkCursor);
      });
    };
  }, []);

  const downloadResume = () => {
    const resume = [
      "ATHARAVA KHAKALE",
      "Diploma Robotics & Automation Student",
      "",
      "ABOUT",
      "Robotics and AI enthusiast interested in automation, coding, design tools, and technology innovation.",
      "",
      "EDUCATION",
      "Class 10th - Podar International School - 70%",
      "Diploma - Vivekanand Education Society Polytechnic - 2024-2027",
      "",
      "SKILLS",
      "Microsoft Excel, Microsoft Word, PowerPoint, Fusion 360, Robotics, Automation, AI Basics",
      "",
      "COMPETITIONS",
      "Technothon, Robo Rumble, Circuit Debugging",
      "",
      "INTERESTS",
      "AI & Coding, Robotics, Gaming, Technology Innovation",
    ].join("\n");

    const blob = new Blob([resume], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "Atharava-Khakale-Resume.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className={`loader ${loading ? "" : "hidden"}`}>
        <div className="loader-ring"></div>
        <span>Initializing Portfolio</span>
      </div>

      <div className="scroll-progress" style={{ width: `${progress}%` }}></div>
      <div className="cursor-glow" id="cursorGlow"></div>
      <div id="particles-js" aria-hidden="true"></div>

      <nav className="navbar">
        <a className="brand" href="#hero" aria-label="Go to hero section">
          <span>AK</span>
          <strong>Atharava</strong>
        </a>
        <button
          className="nav-toggle"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          <i className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"}`}></i>
        </button>
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          {navItems.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              className={activeSection === id ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
        </div>
      </nav>

      <main>
        <section className="hero section" id="hero">
          <div className="geometric-banner" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="hero-grid">
            <aside className="profile-panel glass-card" data-aos="fade-right">
              <div className="avatar-wrap">
                <div className="avatar">
                  <span>AK</span>
                </div>
              </div>
              <div className="profile-meta">
                <p className="eyebrow">Robotics Portfolio</p>
                <h2>Diploma Robotics & Automation Student</h2>
                <p>Building discipline in engineering, automation systems, AI basics, and hands-on technical competitions.</p>
              </div>
              <div className="quick-stats">
                <div>
                  <strong>2024-27</strong>
                  <span>Diploma</span>
                </div>
                <div>
                  <strong>7+</strong>
                  <span>Core Skills</span>
                </div>
                <div>
                  <strong>3</strong>
                  <span>Competitions</span>
                </div>
              </div>
              <button className="btn primary download-cv" type="button" onClick={downloadResume}>
                <i className="fa-solid fa-download"></i>
                Download Resume
              </button>
            </aside>

            <div className="hero-content" data-aos="fade-left">
              <p className="hero-kicker">Future-ready engineer in progress</p>
              <h1>
                <span>ATHARAVA</span>
                <span>KHAKALE</span>
              </h1>
              <div className="animated-underline"></div>
              <p className="typing-line">
                <span>{typedText}</span>
                <span className="typing-caret">|</span>
              </p>
              <p className="hero-copy">
                A sleek personal portfolio shaped around robotics, automation, AI curiosity, design tools, and modern technical presentation.
              </p>
              <div className="hero-actions">
                <a className="btn primary" href="#contact">
                  <i className="fa-solid fa-paper-plane"></i>
                  Contact Me
                </a>
                <a className="btn ghost" href="#skills">
                  <i className="fa-solid fa-microchip"></i>
                  View Skills
                </a>
              </div>
            </div>
          </div>
        </section>

        <SectionHeading eyebrow="Profile" title="About Me" id="about">
          <div className="resume-layout">
            <article className="glass-card about-card" data-aos="fade-up">
              <div className="icon-orbit">
                <i className="fa-solid fa-robot"></i>
                <i className="fa-solid fa-brain"></i>
                <i className="fa-solid fa-code"></i>
              </div>
              <p>
                I am Atharava Khakale, a Diploma Robotics & Automation student with a strong interest in intelligent machines,
                automation workflows, coding fundamentals, and future technology. I enjoy learning through practical projects,
                competitions, and design tools that connect engineering ideas with real-world execution.
              </p>
            </article>

            <aside className="glass-card focus-card" data-aos="fade-up" data-aos-delay="100">
              <h3>Focus Areas</h3>
              <div className="focus-list">
                <span><i className="fa-solid fa-gears"></i> Automation systems</span>
                <span><i className="fa-solid fa-bolt"></i> Robotics concepts</span>
                <span><i className="fa-solid fa-cube"></i> CAD thinking</span>
                <span><i className="fa-solid fa-network-wired"></i> AI foundations</span>
              </div>
            </aside>
          </div>
        </SectionHeading>

        <SectionHeading eyebrow="Academic Path" title="Education Timeline" id="education">
          <div className="timeline">
            <div className="timeline-item" data-aos="fade-right">
              <div className="timeline-dot"></div>
              <div className="timeline-card glass-card">
                <span>Completed</span>
                <h3>Class 10th</h3>
                <p>Podar International School</p>
                <strong>70%</strong>
              </div>
            </div>
            <div className="timeline-item" data-aos="fade-left">
              <div className="timeline-dot"></div>
              <div className="timeline-card glass-card">
                <span>2024-2027</span>
                <h3>Diploma</h3>
                <p>Vivekanand Education Society Polytechnic</p>
                <strong>Robotics & Automation</strong>
              </div>
            </div>
          </div>
        </SectionHeading>

        <SectionHeading eyebrow="Capabilities" title="Skills" id="skills">
          <div className="skills-grid">
            {skills.map(([name, icon, level]) => (
              <article className="skill-card glass-card" data-aos="zoom-in" style={{ "--level": level }} key={name}>
                <i className={icon}></i>
                <h3>{name}</h3>
                <div className="skill-bar"><span></span></div>
              </article>
            ))}
          </div>
        </SectionHeading>

        <SectionHeading eyebrow="Experience" title="Competitions" id="competitions">
          <div className="competition-grid">
            {competitions.map(([title, icon, text], index) => (
              <article className="competition-card glass-card" data-aos="flip-left" data-aos-delay={index * 100} key={title}>
                <i className={icon}></i>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </SectionHeading>

        <SectionHeading eyebrow="Passions" title="Interests" id="interests">
          <div className="interests-strip" data-aos="fade-up">
            {interests.map(([name, icon]) => (
              <span key={name}>
                <i className={icon}></i>
                {name}
              </span>
            ))}
          </div>
        </SectionHeading>

        <SectionHeading eyebrow="Connect" title="Contact" id="contact">
          <div className="contact-card glass-card" data-aos="zoom-in">
            <div className="contact-lines">
              <a href="tel:+910000000000"><i className="fa-solid fa-phone"></i> Phone Number</a>
              <a href="mailto:atharava@example.com"><i className="fa-solid fa-envelope"></i> atharava@example.com</a>
              <span><i className="fa-solid fa-location-dot"></i> Address</span>
            </div>
            <div className="socials" aria-label="Social links">
              <a href="#" aria-label="GitHub"><i className="fa-brands fa-github"></i></a>
              <a href="#" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
              <a href="#" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
            </div>
          </div>
        </SectionHeading>
      </main>

      <button
        className={`back-to-top ${showTop ? "show" : ""}`}
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <i className="fa-solid fa-arrow-up"></i>
      </button>
    </>
  );
}

function SectionHeading({ eyebrow, title, id, children }) {
  return (
    <section className="section" id={id}>
      <div className="section-heading" data-aos="fade-up">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
