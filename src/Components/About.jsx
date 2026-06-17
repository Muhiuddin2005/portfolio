import { useEffect, useRef, useState } from "react";
import {
  motion, // eslint-disable-line no-unused-vars
  AnimatePresence,
  useMotionValue,
  useSpring,
  animate,
} from "framer-motion";
import Muhi2 from "../assets/Muhi2 (2).jpeg";

/** 
 * Data for biography highlights, including icons, titles, and 
 * detailed content for the expansion modal.
 */
const highlights = [
  {
    icon: "fas fa-graduation-cap",
    title: "Education",
    content: "Academic background and current progress",
    details: [
      "1st Year RUET CSE — CGPA: 3.43 (current)",
      "HSC — Dhaka Residential Model College,Dhaka — GPA: 5.00",
      "SSC — Naogaon KD Govt. High School — GPA: 5.00",
    ],
  },
  {
    icon: "fas fa-map-marker-alt",
    title: "Location",
    content: "Kazla, Rajshahi, Bangladesh",
    details: [
      "I am currently based in Kazla, Rajshahi, Bangladesh.",
      "Open Google Maps to view the exact location and directions.",
    ],
    link: "https://maps.app.goo.gl/38XvW78m4Nq1u6F5A",
    linkLabel: "Open in Google Maps",
  },
  {
    icon: "fas fa-briefcase",
    title: "Currently Learning",
    content: "Full Stack Development, Data Science, Machine Learning",
    details: [
      "Full Stack Development: Building full-stack apps with React, Node.js, Express, PostgreSQL, Golang, TypeScript, Prisma.",
      "Data Science: Practicing data cleaning, analysis, and visualization with Python tools like pandas, numpy, scikit-learn.",
      "Machine Learning: Learning core concepts, model evaluation, and practical workflows.",
    ],
  },
];

/**
 * About Component
 * 
 * Displays the biography section with 3D image tilt effects and expandable highlight cards.
 * 
 * @param {Object} props
 * @param {Function} props.scrollReveal - Factory function for scroll-driven visibility.
 * @param {Function} props.buttonAction - Shared button interaction handler.
 */
function About({ scrollReveal, buttonAction }) {
  // Section + modal placement tracking
  const sectionRef = useRef(null);
  const imageBoundsRef = useRef(null);
  const [activeHighlight, setActiveHighlight] = useState(null);
  const [originRect, setOriginRect] = useState(null);
  const [targetRect, setTargetRect] = useState(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  // Spring smoothing keeps the tilt stable and avoids sudden jitter.
  const smoothRotateX = useSpring(rotateX, {
    stiffness: 300,
    damping: 30,
    mass: 0.45,
  });
  const smoothRotateY = useSpring(rotateY, {
    stiffness: 300,
    damping: 30,
    mass: 0.45,
  });

  useEffect(() => {
    if (scrollReveal) {
      const cleanups = [
        scrollReveal(".about-highlights .highlight"),
        scrollReveal(".floating-card"),
      ];
      return () => cleanups.forEach((c) => c && c());
    }
  }, [scrollReveal]);

  /** Update CSS variables for the glass-shimmer mouse trail effect */
  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    card.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  /** Cache image bounds on hover to optimize mousemove performance */
  const handleImageMouseEnter = (e) => {
    imageBoundsRef.current = e.currentTarget.getBoundingClientRect();
  };

  /** Update Framer Motion values for the 3D tilt effect */
  const handleImageMouseMove = (e) => {
    if (!imageBoundsRef.current) return;
    const rect = imageBoundsRef.current;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const nx = Math.max(-0.5, Math.min(0.5, px - 0.5));
    const ny = Math.max(-0.5, Math.min(0.5, 0.5 - py));
    rotateY.set(nx * 11);
    rotateX.set(ny * 11);
  };

  const handleImageMouseLeave = () => {
    imageBoundsRef.current = null;
    animate(rotateX, 0, { duration: 0.45 });
    animate(rotateY, 0, { duration: 0.45 });
  };

  /**
   * Triggers the shared expansion animation for a highlight item.
   * Calculates the origin rectangle to perform a "FLIP" style transition.
   * 
   * @param {Object} item - The highlight data object.
   * @param {DOMRect} rect - The bounding client rect of the clicked element.
   */
  const handleOpenHighlight = (item, rect) => {
    const sectionRect = sectionRef.current?.getBoundingClientRect();
    if (rect && sectionRect) {
      const nextOrigin = {
        top: rect.top - sectionRect.top,
        left: rect.left - sectionRect.left,
        width: rect.width,
        height: rect.height,
      };
      const margin = 14;
      const width = Math.min(780, sectionRect.width * 0.84);
      const height = Math.min(410, window.innerHeight * 0.62);
      const centeredLeft = (sectionRect.width - width) / 2;
      const centeredTop = Math.max(
        margin,
        Math.min(
          nextOrigin.top + rect.height / 2 - height / 2,
          Math.max(margin, sectionRect.height - height - margin),
        ),
      );

      setOriginRect(nextOrigin);
      setTargetRect({
        top: centeredTop,
        left: centeredLeft,
        width,
        height,
      });
    }

    setActiveHighlight(item);
  };

  function handleCloseHighlight() {
    setActiveHighlight(null);
    setTimeout(() => {
      setOriginRect(null);
      setTargetRect(null);
    }, 260);
  }

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        handleCloseHighlight();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div>
      <section id="about" ref={sectionRef} className="section about">
        <div className="container">
          <div className="about-content">
            <motion.div
              className="about-image"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="image-wrapper about-image-3d"
                style={{
                  rotateX: smoothRotateX,
                  rotateY: smoothRotateY,
                  transformPerspective: 1300,
                }}
                whileHover={{ scale: 1.01 }}
                onMouseEnter={handleImageMouseEnter}
                onMouseMove={handleImageMouseMove}
                onMouseLeave={handleImageMouseLeave}
              >
                <img src={Muhi2} alt="About Md. Muhiuddin" className="about-img" />
                <div className="experience-badge">
                  <span className="badge-number">1+</span>
                  <span className="badge-text">
                    Years
                    <br />
                    Experience
                  </span>
                </div>
                <div className="floating-card card-4">
                  <i className="fas fa-rocket"></i>
                  <span>Hello👋🏻 !</span>
                </div>
              </motion.div>
            </motion.div>

            <div className="about-text about-text-dynamic">
              <h2 className="section-title">About Me</h2>
              <div className="about-description">
                <p>
                  I'm Md. Muhiuddin , a CSE undergraduate at RUET and a passionate
                  developer with a strong interest in both web development and
                  data-driven technologies. My programming journey began with
                  core languages like C++ and Java, and since then I've been
                  continuously expanding my skills while improving my
                  problem-solving ability through competitive programming.
                </p>

                <p>
                  I specialize in building responsive, user-friendly web
                  applications using modern technologies. Currently, I'm focused
                  on mastering the MERN stack while also diving into Data
                  Science. I'm learning how to analyze data, work with
                  Python-based tools, and understand the fundamentals of machine
                  learning, data visualization, and statistical thinking. This
                  allows me to combine development skills with data-driven
                  decision making.
                </p>

                <p>
                  My goal is to create applications that are not only functional
                  and scalable but also intelligent and insightful by leveraging
                  data. I enjoy blending logical problem-solving with creativity
                  to build efficient solutions.
                </p>

                <p>
                  When I'm not coding, I practice competitive programming,
                  explore new technologies, and continue learning Data Science
                  concepts such as data analysis, visualization, and basic
                  machine learning to strengthen my overall skill set and stay
                  aligned with modern industry trends.
                </p>
              </div>

              <div className="about-highlights">
                {highlights.map((item) => (
                  <motion.div
                    key={item.title}
                    className="highlight dynamic-highlight highlight-button"
                    whileHover={{ y: -6, rotateX: 2 }}
                    transition={{ type: "spring", stiffness: 220, damping: 20 }}
                    onMouseMove={handleCardMouseMove}
                    onClick={(e) =>
                      handleOpenHighlight(
                        item,
                        e.currentTarget.getBoundingClientRect(),
                      )
                    }
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) =>
                      (e.key === "Enter" || e.key === " ") &&
                      handleOpenHighlight(
                        item,
                        e.currentTarget.getBoundingClientRect(),
                      )
                    }
                  >
                    <i className={item.icon}></i>
                    <div>
                      <h4>{item.title}</h4>
                      <p>{item.content}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="about-actions">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    buttonAction(e);
                    alert("CV/Resume is not available now.");
                  }}
                  className="about-btn"
                  style={{ textDecoration: "none", display: "inline-flex" }}
                >
                  <span>Download CV</span>
                  <i className="fas fa-download"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {activeHighlight && (
            <motion.div
              className="about-expand-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseHighlight}
            >
              <motion.div
                className="about-expand-card"
                initial={
                  originRect
                    ? {
                        opacity: 0.35,
                        top: originRect.top,
                        left: originRect.left,
                        width: originRect.width,
                        height: originRect.height,
                      }
                    : { opacity: 0, scale: 0.96 }
                }
                animate={{
                  opacity: 1,
                  top: targetRect?.top ?? 16,
                  left: targetRect?.left ?? 16,
                  width: targetRect?.width ?? "calc(100% - 32px)",
                  height: targetRect?.height ?? 420,
                }}
                exit={
                  originRect
                    ? {
                        opacity: 0.35,
                        top: originRect.top,
                        left: originRect.left,
                        width: originRect.width,
                        height: originRect.height,
                      }
                    : { opacity: 0, scale: 0.96 }
                }
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="about-expand-close"
                  onClick={handleCloseHighlight}
                  aria-label="Close details"
                >
                  ×
                </button>
                <h3>
                  <i className={activeHighlight.icon}></i>
                  <span>{activeHighlight.title}</span>
                </h3>
                <ul>
                  {activeHighlight.details?.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
                {activeHighlight.link && (
                  <a
                    href={activeHighlight.link}
                    target="_blank"
                    rel="noreferrer"
                    className="about-map-link"
                  >
                    {activeHighlight.linkLabel}
                  </a>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}

export default About;
