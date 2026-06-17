import { useRef, useEffect, useState } from "react";

import planora from "../assets/planora.png";
import verifyTutionBD from "../assets/verifyTutionBD.png";
import medistore from "../assets/medistore.png";

import {
  // eslint-disable-next-line no-unused-vars
  motion,
  useMotionValue,
  useScroll,
  useTransform,
  animate,
  AnimatePresence,
} from "framer-motion";

/** 
 * Collection of portfolio projects. 
 * Includes metadata for images, titles, descriptions, links, and technology stacks.
 */
const projectsData = [
  {
    id: 1,
    image: planora,
    alt: "Planora",
    title: "Planora",
    description:
      "Planora is a comprehensive event management platform designed to help users organize, track, and discover events effortlessly.",
    liveLink: "https://planora-fronend.vercel.app",
    githubLink: "https://github.com/Muhiuddin2005/planoraFronend",
    tech: ["Next.js", "Express.js", "PostgreSQL", "Prisma", "TypeScript", "TailwindCSS", "JWT", "Bcrypt", "Shadcn UI"],
    challenges: "Designing complex relational tables for events, registrations, and organizers, and implementing reliable JWT-based authentication coupled with role-based dashboard widgets. Additionally, maintaining optimal page loading speed with Next.js when listing dynamic events.",
    futurePlans: "Integrating a secure payment processing channel (Stripe) to support paid ticket purchases, adding live websocket-driven support chat channels, and incorporating a calendar view for better event tracking."
  },
  {
    id: 2,
    image: verifyTutionBD,
    alt: "VerifyTutionBD",
    title: "VerifyTutionBD",
    description:
      "The Tuition Management System is a complete platform designed to bridge the gap between students and qualified tutors. It automates workflows for posting tuition requirements, processing tutor applications, handling secure payments, and tracking platform activity.",
    liveLink: "https://verifytutionbd.web.app",
    githubLink: "https://github.com/Muhiuddin2005/verifyTutionBD_client",
    tech: ["React", "Firebase", "JWT", "Bcrypt", "TailwindCSS", "Express", "MongoDB", "Stripe"],
    challenges: "Ensuring safe payment handling via Stripe callbacks, synchronizing Firestore databases with local backend states, and designing user-friendly search filters for students to locate and review specific tutor credentials.",
    futurePlans: "Creating an AI-based match rating index that ranks tutor options automatically according to study preferences, and adding integrated online whiteboards for interactive virtual learning sessions."
  },
  {
    id: 3,
    image: medistore,
    alt: "MediStore",
    title: "MediStore",
    description:
      "MediStore is a comprehensive store management platform designed to help users organize, track, and discover medicines effortlessly.",
    liveLink: "https://medistore-frontend-plum.vercel.app/",
    githubLink: "https://github.com/Muhiuddin2005/medicineStoreFrontend",
    tech: ["Next.js", "Express.js", "PostgreSQL", "Prisma", "TypeScript", "TailwindCSS", "JWT", "Bcrypt", "Shadcn UI", "BetterAuth"],
    challenges: "Managing persistent store inventories with automated database transaction rollbacks upon checkout failures, and securing server-side calls with Prisma ORM and TypeScript models.",
    futurePlans: "Adding digital invoicing/receipt transmission directly to customers via email, incorporating an interactive analytics graph to forecast medicine sales trends, and setting up automated low-inventory alerts."
  },
];

/**
 * Toast sub-component
 * 
 * Displays a temporary notification message with a fade-and-slide animation.
 * 
 * @param {Object} props
 * @param {string} props.message - The notification text to display.
 * @param {Function} props.onDone - Callback triggered after the toast duration expires.
 */
function Toast({ message, onDone }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          key="toast"
          className="toast"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          onAnimationComplete={() => setTimeout(onDone, 2800)}
        >
          <span className="toast-icon">i</span>
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * ProjectCard sub-component
 * 
 * Renders an individual project thumbnail with 3D hover effects.
 * 
 * @param {Object} props
 * @param {Object} props.project - The project data object.
 * @param {Function} props.onLiveClick - Handler for specifically clicking the 'Live Demo' button.
 * @param {Function} props.onOpen - Handler for opening the detailed project modal.
 */
function ProjectCard({ project, onLiveClick, onOpen }) {
  const cardRef = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const depthY = useTransform(scrollYProgress, [0, 0.5, 1], [120, 0, -120]);
  const depthScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.84, 1.03, 0.88]);
  const scrollRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [18, 0, -18]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.35]);

  const onMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * 10);
    rotateX.set((0.5 - py) * 10);
  };

  const resetTilt = () => {
    animate(rotateX, 0, { duration: 0.4 });
    animate(rotateY, 0, { duration: 0.4 });
  };

  return (
    <motion.div
      ref={cardRef}
      className="project-card project-card-3d group relative"
      style={{
        rotateX,
        rotateY,
        y: depthY,
        scale: depthScale,
        opacity,
        transformPerspective: 1200,
      }}
      onMouseMove={onMove}
      onMouseLeave={resetTilt}
      whileHover={{
        scale: 1.03,
        rotateZ: 0.5,
        transition: { duration: 0.2 },
      }}
      onClick={() => {
        const rect = cardRef.current?.getBoundingClientRect();
        onOpen(project, rect);
      }}
    >
      <motion.div className="project-card-glass" style={{ rotateX: scrollRotateX }}>
        <div className="project-card-shine" />
        <div className="project-image">
          <img src={project.image} alt={project.alt} draggable="false" />
          <div className="project-overlay">
            <div className="project-links">
              <a
                href={project.liveLink || "#"}
                className={`project-link ${!project.liveLink ? "project-link--disabled" : ""}`}
                rel="noreferrer"
                title={project.liveLink ? "Live demo" : "No live demo available"}
                onClick={(e) => onLiveClick(e, project.liveLink, project.title)}
              >
                <i className="fas fa-external-link-alt"></i>
              </a>
              <a
                href={project.githubLink}
                className="project-link"
                target="_blank"
                rel="noreferrer"
                aria-label="View GitHub Repository"
                onClick={(e) => e.stopPropagation()}
              >
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="project-info">
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <div className="project-tech">
            {project.tech.map((t, i) => (
              <span key={i}>{t}</span>
            ))}
          </div>
          <div className="project-card-action">
            <span>View More / Details <i className="fas fa-arrow-right"></i></span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/**
 * Projects Component
 * 
 * Displays a responsive grid of portfolio projects with 3D effects and expandable modals.
 * 
 * @param {Object} props
 * @param {Function} props.scrollReveal - Shared hook for viewport-based entrance animations.
 */
function Projects({ scrollReveal }) {
  const sectionRef = useRef(null);
  const [toast, setToast] = useState(null);
  const [activeProject, setActiveProject] = useState(null);
  const [originRect, setOriginRect] = useState(null);
  const [targetRect, setTargetRect] = useState(null);

  useEffect(() => {
    if (scrollReveal) {
      const cleanup = scrollReveal(".project-card");
      return () => cleanup && cleanup();
    }
  }, [scrollReveal]);

  const handleOpenProject = (project, rect) => {
    const sectionRect = sectionRef.current?.getBoundingClientRect();
    if (rect && sectionRect) {
      // Save card origin so modal can animate out from exact click position.
      const nextOrigin = {
        top: rect.top - sectionRect.top,
        left: rect.left - sectionRect.left,
        width: rect.width,
        height: rect.height,
      };
      const margin = 12;
      const preferredWidth = Math.min(
        Math.max(rect.width * 1.7, 560),
        sectionRect.width * (window.innerWidth < 768 ? 0.94 : 0.82),
      );
      const preferredHeight = Math.min(
        Math.max(rect.height * 1.9, 520),
        window.innerHeight * 0.78,
      );
      const maxWidth = Math.min(preferredWidth, sectionRect.width - margin * 2);
      const maxHeight = Math.min(
        preferredHeight,
        Math.max(360, window.innerHeight - margin * 2),
      );
      const centerX = sectionRect.width / 2;
      const centerY = nextOrigin.top + rect.height / 2;
      const clampedLeft = Math.max(
        margin,
        Math.min(centerX - maxWidth / 2, sectionRect.width - maxWidth - margin),
      );
      const clampedTop = Math.max(
        margin,
        Math.min(
          centerY - maxHeight / 2,
          Math.max(margin, sectionRect.height - maxHeight - margin),
        ),
      );

      setOriginRect(nextOrigin);
      setTargetRect({
        top: clampedTop,
        left: clampedLeft,
        width: maxWidth,
        height: maxHeight,
      });
    }
    setActiveProject(project);
  };

  function handleCloseProject() {
    setActiveProject(null);
    setTimeout(() => {
      setOriginRect(null);
      setTargetRect(null);
    }, 260);
  }

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        handleCloseProject();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const handleLiveClick = (e, liveLink, title) => {
    e.stopPropagation();
    if (liveLink) {
      window.open(liveLink, "_blank", "noreferrer");
    } else {
      e.preventDefault();
      setToast(
        `"${title}" doesn't have a live demo yet. Please use the GitHub link to view the code.`,
      );
    }
  };

  return (
    <section id="project" ref={sectionRef} className="section projects">
      <div className="container perspective-[1200px]">
        <h2 className="section-title">Featured Projects</h2>

        <div className="projects-grid projects-grid-3d">
          {projectsData.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onLiveClick={handleLiveClick}
              onOpen={handleOpenProject}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeProject && (
          <motion.div
            className="project-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseProject}
          >
            {originRect && (
              <motion.div
                className="project-origin-pulse"
                initial={{
                  opacity: 0.55,
                  top: originRect.top,
                  left: originRect.left,
                  width: originRect.width,
                  height: originRect.height,
                  scale: 0.95,
                }}
                animate={{ opacity: 0, scale: 1.18 }}
                transition={{ duration: 0.32, ease: "easeOut" }}
              />
            )}

            <motion.div
              className="project-modal-card"
              initial={
                originRect
                  ? {
                      opacity: 0.45,
                      top: originRect.top,
                      left: originRect.left,
                      width: originRect.width,
                      height: originRect.height,
                      x: 0,
                      y: 0,
                      borderRadius: 16,
                    }
                  : { opacity: 0, scale: 0.96 }
              }
              animate={{
                opacity: 1,
                top: targetRect?.top ?? 12,
                left: targetRect?.left ?? 12,
                width: targetRect?.width ?? "calc(100vw - 24px)",
                height: targetRect?.height ?? 520,
                x: 0,
                y: 0,
                borderRadius: 20,
              }}
              exit={
                originRect
                  ? {
                      opacity: 0.4,
                      top: originRect.top,
                      left: originRect.left,
                      width: originRect.width,
                      height: originRect.height,
                      x: 0,
                      y: 0,
                      borderRadius: 16,
                    }
                  : { opacity: 0, scale: 0.96 }
              }
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="project-modal-close"
                aria-label="Close project details"
                onClick={handleCloseProject}
              >
                ×
              </button>

              <div className="project-modal-media">
                <img src={activeProject.image} alt={activeProject.alt} />
              </div>

              <div className="project-modal-body">
                <h3>{activeProject.title}</h3>
                <p className="project-modal-desc">{activeProject.description}</p>

                <div className="project-modal-details-grid">
                  {activeProject.challenges && (
                    <div className="project-modal-detail-item">
                      <h4><i className="fas fa-exclamation-triangle"></i> Challenges Faced</h4>
                      <p>{activeProject.challenges}</p>
                    </div>
                  )}
                  {activeProject.futurePlans && (
                    <div className="project-modal-detail-item">
                      <h4><i className="fas fa-lightbulb"></i> Potential Improvements & Future Plans</h4>
                      <p>{activeProject.futurePlans}</p>
                    </div>
                  )}
                </div>

                <div className="project-tech">
                  {activeProject.tech.map((t, i) => (
                    <span key={i}>{t}</span>
                  ))}
                </div>

                <div className="project-modal-links">
                  <a
                    href={activeProject.liveLink || "#"}
                    className={`project-link ${!activeProject.liveLink ? "project-link--disabled" : ""}`}
                    rel="noreferrer"
                    onClick={(e) =>
                      handleLiveClick(e, activeProject.liveLink, activeProject.title)
                    }
                  >
                    <i className="fas fa-external-link-alt"></i>
                    <span>Live Demo</span>
                  </a>
                  <a
                    href={activeProject.githubLink}
                    className="project-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fab fa-github"></i>
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Toast message={toast} onDone={() => setToast(null)} />
    </section>
  );
}

export default Projects;
