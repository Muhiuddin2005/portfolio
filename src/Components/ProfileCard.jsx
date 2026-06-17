import { useEffect } from "react";
import Muhi1 from "../assets/Muhi1.jpeg";

/** Data for social media links, including labels, icon classes, and external URLs */
const socialLinks = [
  {
    label: "WhatsApp",
    className: "whatsapp",
    icon: "fab fa-whatsapp",
    href: "https://wa.me/+8801932517973",
  },
  {
    label: "LinkedIn",
    className: "linkedin",
    icon: "fab fa-linkedin-in",
    href: "https://www.linkedin.com/in/md-muhiuddin",
  },
  {
    label: "GitHub",
    className: "github",
    icon: "fab fa-github",
    href: "https://github.com/Muhiuddin2005",
  },
];

/** Summary statistics displayed in the hero section */
const stats = [
  { number: "5+", label: "Projects Completed" },
  { number: "1+", label: "Years Experience" },
  { number: "CSE", label: "RUET" },
];

/** Interactive floating cards shown around the profile image */
const floatingCards = [
  { icon: "fas fa-code", label: "Clean Code", cardClass: "card-1" },
  { icon: "fas fa-mobile-alt", label: "Learner", cardClass: "card-2" },
  { icon: "fas fa-rocket", label: "Problem Solver", cardClass: "card-3" },
];

/**
 * ProfileCard Component
 * 
 * Renders the primary hero section elements including greeting, name,
 * typed profession through typewriter hook, profile bio, and statistics.
 * 
 * @param {Object} props
 * @param {string} props.typedText - The current text from the typewriter effect.
 * @param {Function} props.scrollReveal - Factory function to register scroll-reveal animations.
 * @param {Function} props.buttonAction - Handler for interactive button ripples and clicks.
 */
function ProfileCard({ typedText, scrollReveal, buttonAction }) {
  useEffect(() => {
    if (scrollReveal) {
      // Register individual element groups for intersection observer animations
      const cleanups = [
        scrollReveal(".hero-stats .stat"),
        scrollReveal(".floating-card"),
        scrollReveal(".social-icon"),
      ];
      // Ensure observers are disconnected when component unmounts
      return () => cleanups.forEach((c) => c && c());
    }
  }, [scrollReveal]);

  return (
    <div>
      <section id="home" className="section home">
        <div className="container">
          <div className="home-content">
            <div className="home-text">
              {/* Intro block */}
              <div className="greeting">
                👋 Assalamualaikum Wa Rahmatullah Wa Barakatuh <br /> (
                السَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ )
              </div>
              <h1 className="hero-title">
                I'm <span className="accent">Md. Muhiuddin</span>
              </h1>
              <h2 className="hero-subtitle" id="rotating-profession">
                {typedText}
                <span className="cursor">|</span>
              </h2>
              <p className="hero-desc">
                Hi, I'm Muhiuddin. 👋
                <br /><br />
                I am a Computer Science and Engineering undergraduate at RUET, driven by a passion for solving complex algorithmic puzzles and building scalable software. I bridge the gap between robust problem-solving and modern full-stack development.
                <br /><br />
                As a developer, I specialize in crafting high-performance applications using the MERN Stack, Next.js, and TypeScript, backed by efficient data management with PostgreSQL, Prisma, and Golang.
                <br /><br />
                When I’m not writing web apps, you’ll find me sharpening my analytical thinking through competitive programming, writing clean code in C++, Java, or Python. I thrive on turning complex ideas into optimized, real-world solutions. ⚡🧠
              </p>

              <div className="hero-stats">
                {stats.map(({ number, label }) => (
                  <div key={label} className="stat">
                    <span className="stat-number">{number}</span>
                    <span className="stat-label">{label}</span>
                  </div>
                ))}
              </div>

              <div className="hero-actions">
                <button className="hire-btn primary" onClick={buttonAction}>
                  <span>Hire Me</span>
                  <i className="fas fa-arrow-right"></i>
                </button>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    buttonAction(e);
                    alert("CV/Resume is not available now.");
                  }}
                  className="hire-btn secondary"
                  style={{ textDecoration: "none" }}
                >
                  <i className="fas fa-download"></i>
                  <span>Download CV</span>
                </a>
              </div>

              <div className="social-links">
                {socialLinks.map(({ label, className, icon, svgSrc, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className={`social-icon ${className}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {svgSrc ? (
                      <img
                        src={svgSrc}
                        alt={label}
                        className="social-svg-icon"
                      />
                    ) : (
                      <i className={icon}></i>
                    )}
                  </a>
                ))}
              </div>
            </div>

            <div className="home-image">
              <div className="image-container">
                <img
                  src={Muhi1}
                  alt="Profile photo of Md. Muhiuddin"
                  className="profile-image"
                />
                {floatingCards.map(({ icon, label, cardClass }) => (
                  <div key={label} className={`floating-card ${cardClass}`}>
                    <i className={icon}></i>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProfileCard;
