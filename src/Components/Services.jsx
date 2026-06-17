import { useEffect } from "react";

/**
 * Services
 * Defines and renders the various professional services offered using a 
 * declarative data array (`services`). Binds grid items to `scrollReveal` 
 * for a staggered entrance effect upon scroll visibility.
 */

/** 
 * Collection of professional services offered by the author.
 * Includes visual assets, titles, and itemized feature lists.
 */
const servicesData = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop",
    title: "Web Development",
    description:
      "I create responsive, modern websites using the latest technologies and best practices. From concept to deployment, I ensure your website looks great and performs perfectly.",
    features: ["Responsive Design", "Performance Optimized", "SEO Friendly"],
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=200&fit=crop",
    title: "UI/UX Design",
    description:
      "Designing intuitive and beautiful user interfaces that provide exceptional user experiences. I focus on usability, accessibility, and visual appeal.",
    features: ["User-Centered", "Modern Design", "Accessibility"],
  },
];

/**
 * Services Component
 * 
 * Renders various professional services. Binds grid items to the scrollReveal hook
 * for staggered entrance animations.
 * 
 * @param {Object} props
 * @param {Function} props.scrollReveal - Shared hook for viewport animations.
 */
function Services({ scrollReveal }) {
  useEffect(() => {
    if (scrollReveal) {
      const cleanup = scrollReveal(".service-card");
      return () => cleanup && cleanup();
    }
  }, [scrollReveal]);
  return (
    <section id="service" className="section services">
      <div className="container">
        <h2 className="section-title">What I Do</h2>
        <p className="section-subtitle">
          Practical services focused on clean code, maintainable delivery, and strong UX.
        </p>
        <div className="services-content">
          <div className="services-grid">
            {servicesData.map((service) => (
              <div key={service.id} className="service-card">
                <img
                  src={service.image}
                  alt={service.title}
                  className="service-img"
                />
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <div className="service-features">
                  {service.features.map((feature, index) => (
                    <span key={index}>{feature}</span>
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

export default Services;
