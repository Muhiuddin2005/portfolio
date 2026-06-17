/**
 * Header Component
 * 
 * Displays the main top navigation bar. Includes a responsive hamburger menu for 
 * mobile devices and maps through nav items for link generation.
 * 
 * @param {Object} props
 * @param {string} props.activeSection - The ID of the currently visible section.
 * @param {boolean} props.isMenuOpen - State of the mobile side-menu.
 * @param {Function} props.toggleMenu - Handler to open/close mobile side-menu.
 * @param {Function} props.closeMenu - Handler to close mobile side-menu.
 * @param {Function} props.buttonAction - Shared handler for button interactive effects.
 * @param {Function} props.onHeaderHoverChange - Hook to notify sibling components (like the palette bar) of hover state.
 */
const navItems = [
  { id: "#home", label: "Home" },
  { id: "#about", label: "About" },
  { id: "#skills", label: "Skills" },
  { id: "#stats", label: "Stats" },
  { id: "#service", label: "Services" },
  { id: "#project", label: "Projects" },
  { id: "#contact", label: "Contact" },
];

function Header({
  activeSection,
  isMenuOpen,
  toggleMenu,
  closeMenu,
  buttonAction,
  onHeaderHoverChange,
}) {
  return (
    <header
      onMouseEnter={() => onHeaderHoverChange?.(true)}
      onMouseLeave={() => onHeaderHoverChange?.(false)}
    >
      <nav className="navbar">
        <div className="nav-brand">
          Portfolio<span className="brand-dot">.</span>
        </div>
        <ul className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={item.id}
                className={`nav-link ${activeSection === item.id ? "active" : ""}`}
                onClick={closeMenu}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-cta">
          <a
            href="#contact"
            className="cta-btn"
            onClick={(e) => {
              closeMenu();
              buttonAction(e);
            }}
          >
            Let's Talk
          </a>
        </div>
        <div
          className={`hamburger ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
    </header>
  );
}

export default Header;
