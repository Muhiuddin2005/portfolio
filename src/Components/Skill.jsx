import { useEffect } from "react";

/**
 * Skill
 * Renders a grid of technical skills split by category.
 * Hooks into `scrollReveal` to sequentially animate skill bars and category 
 * cards as the user begins scrolling down the page.
 */

/** Categorized technical skills with icons and proficiency levels */
const skillsData = [
  {
    category: "Frontend Development",
    skills: [
      { icon: "fab fa-html5", name: "HTML5", level: 95 },
      { icon: "fab fa-css3-alt", name: "CSS3", level: 90 },
      { icon: "fab fa-js-square", name: "JavaScript", level: 85 },
      { icon: "fab fa-react", name: "React", level: 90 },
      { icon: "fas fa-server", name: "Next.js", level: 50 },
      { icon: "fab fa-js-square", name: "TypeScript", level: 50 },
    ],
  },
  {
    category: "Backend Development",
    skills: [
      { icon: "fab fa-node-js", name: "Node.js", level: 85 },
      { icon: "fas fa-server", name: "Express.js", level: 80 },
      { icon: "fab fa-golang", name: "Golang", level: 60 },
      { icon: "fas fa-database", name: "Prisma", level: 50 },
    ],
  },
  {
    category: "Database Management",
    skills: [
      { icon: "fas fa-database", name: "MongoDB", level: 70 },
      { icon: "fas fa-database", name: "MySQL", level: 30 },
      { icon: "fas fa-database", name: "PostgreSQL", level: 50 },
    ],
  },
  {
    category: "Tools",
    skills: [
      { icon: "fab fa-git-alt", name: "Git", level: 70 },
      { icon: "fas fa-code", name: "VS Code", level: 95 },
      { icon: "fas fa-terminal", name: "Antigravity", level: 80 },
    ],
  },
  {
    category: "UI/UX Design",
    skills: [
      { icon: "fab fa-figma", name: "Figma", level: 70 },
      { icon: "fas fa-mobile-alt", name: "Responsive Design", level: 80 },
    ],
  },
  {
    category: "Mobile Development",
    skills: [
      { icon: "fab fa-react", name: "React Native", level: 60 },
    ],
  },
  {
    category: "Programming Languages",
    skills: [
      { icon: "fas fa-code-branch", name: "C++", level: 85 },
      { icon: "fab fa-java", name: "JAVA", level: 60 },
      { icon: "fab fa-python", name: "Python", level: 80 },
    ],
  },
];

/**
 * Skill Component
 * 
 * Renders a grid of technical skills split by category.
 * Hooks into scrollReveal to sequentially animate skill bars and category 
 * cards as the user begins scrolling down the page.
 * 
 * @param {Object} props
 * @param {Function} props.scrollReveal - Shared hook for viewport animations.
 */
function Skill({ scrollReveal }) {
  useEffect(() => {
    if (scrollReveal) {
      const cleanup = scrollReveal(".skill-category");
      return () => cleanup && cleanup();
    }
  }, [scrollReveal]);
  return (
    <section id="skills" className="section skills">
      <div className="container">
        <h2 className="section-title">Skills & Expertise</h2>
        <p className="section-subtitle">
          A snapshot of my current stack and confidence level across development areas.
        </p>
        <div className="skills-content">
          <div className="skills-grid">
            {skillsData.map(({ category, skills }) => (
              <div key={category} className="skill-category">
                <h3>{category}</h3>
                <div className="skill-items">
                  {skills.map(({ icon, name, level }) => (
                    <div key={name} className="skill-item">
                      <i className={icon}></i>
                      <span>{name}</span>
                      <div className="skill-bar">
                        <div
                          className="skill-fill"
                          style={{ width: `${level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skill;
