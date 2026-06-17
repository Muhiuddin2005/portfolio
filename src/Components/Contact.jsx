import { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

/**
 * RetroOrb sub-component
 * 
 * Renders a spinning 3D torus knot using React Three Fiber.
 * 
 * @param {Object} props
 * @param {string} props.color - The theme color to apply to the mesh wireframe.
 */
function RetroOrb({ color }) {
  const meshRef = useRef(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.45;
    meshRef.current.rotation.x += delta * 0.25;
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[0.9, 0.22, 120, 18]} />
      <meshStandardMaterial color={color} wireframe />
    </mesh>
  );
}

const SERVICE_ID = "service_mct6aw4";
const TEMPLATE_ID = "template_046mmig";
const PUBLIC_KEY = "bKL4kJw7SbywtDtGt";

/** 
 * Data for various contact methods including email, phone, location, and WhatsApp.
 */
const contactsData = [
  {
    icon: "fas fa-envelope",
    title: "Email",
    value: "muhiuddin.bd.2005@gmail.com",
    link: "mailto:muhiuddin.bd.2005@gmail.com",
    action: "Send Email",
  },
  {
    icon: "fas fa-phone",
    title: "Phone",
    value: "+8801932-517973",
    link: "tel:+8801932517973",
    action: "Call Now",
  },
  {
    icon: "fas fa-map-marker-alt",
    title: "Location",
    value: "Kazla, Rajshahi, Bangladesh",
    link: "https://maps.app.goo.gl/38XvW78m4Nq1u6F5A",
    action: "View on Map",
  },
  {
    icon: "fab fa-whatsapp",
    title: "WhatsApp",
    value: "+880 01932-517973",
    link: "https://wa.me/8801932517973",
    action: "Send Message",
  },
];

/**
 * Contact Component
 * 
 * Includes an interactive email form (via EmailJS) and social contact links.
 * 
 * @param {Object} props
 * @param {Function} props.scrollReveal - Shared hook for viewport animations.
 */
function Contact({ scrollReveal }) {
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle"); // "idle" | "sending" | "success" | "error"
  const [accentColor, setAccentColor] = useState(
    () =>
      getComputedStyle(document.documentElement)
        .getPropertyValue("--accent-primary")
        .trim() || "#00d4ff",
  );

  useEffect(() => {
    if (scrollReveal) {
      const cleanups = [
        scrollReveal(".contact-item"),
        scrollReveal(".form-group"),
      ];
      return () => cleanups.forEach((c) => c && c());
    }
  }, [scrollReveal]);

  useEffect(() => {
    const handleThemeChange = (event) => {
      const palette = event.detail?.palette;
      if (!palette) return;
      setAccentColor(palette.accentPrimary);
    };

    window.addEventListener("themeChange", handleThemeChange);
    return () => window.removeEventListener("themeChange", handleThemeChange);
  }, []);

  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    card.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  /**
   * Handles form submission using EmailJS.
   * Updates the 'status' state to provide visual feedback to the user.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then(() => {
        setStatus("success");
        formRef.current.reset();
        // Reset status to idle after a delay
        setTimeout(() => setStatus("idle"), 4000);
      })
      .catch(() => {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      });
  };

  return (
    <section
      id="contact"
      className="section contact retro-contact overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="retro-grid-lines h-full w-full" />
      </div>

      <div className="container relative z-10">
        <h2 className="section-title">Get In Touch</h2>

        <div
          className="relative mb-8 h-40 w-full overflow-hidden rounded-2xl bg-black/35"
          style={{
            border: `1px solid ${accentColor}30`,
          }}
        >
          <Canvas camera={{ position: [0, 0, 3.6], fov: 50 }}>
            <ambientLight intensity={0.3} />
            <pointLight
              position={[2, 2, 3]}
              intensity={1.4}
              color={accentColor}
            />
            <RetroOrb color={accentColor} />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.9}
            />
          </Canvas>
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(to right, transparent, ${accentColor}10, transparent)`,
            }}
          />
        </div>

        <div className="contact-content">
          <div className="contact-info space-y-4">
            {contactsData.map((item) => (
              <motion.div
                key={item.title}
                className="contact-item dynamic-contact-item bg-black/45 backdrop-blur-md"
                whileHover={{ y: -8, rotateX: 2, rotateY: -2, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
                onMouseMove={handleCardMouseMove}
                style={{
                  border: `1px solid ${accentColor}59`,
                  boxShadow: `0 0 24px ${accentColor}2c`,
                }}
              >
                <div
                  className="contact-icon !bg-transparent"
                  style={{
                    border: `2px solid ${accentColor}99`,
                    color: accentColor,
                    boxShadow: `0 0 20px ${accentColor}40`,
                  }}
                >
                  <i className={item.icon}></i>
                </div>
                <div className="contact-details">
                  <h3
                    className="font-mono uppercase tracking-[0.18em]"
                    style={{ color: accentColor }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-slate-300">{item.value}</p>
                  <a
                    href={item.link}
                    target={item.link.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.link.startsWith("http") ? "noreferrer" : undefined
                    }
                    className="inline-block font-mono text-xs uppercase tracking-[0.16em] transition hover:opacity-80"
                    style={{ color: accentColor }}
                  >
                    {item.action}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="contact-form contact-form-3d bg-black/50 backdrop-blur-md"
            whileHover={{ rotateX: 2, rotateY: -2 }}
            transition={{ duration: 0.35 }}
            onMouseMove={handleCardMouseMove}
            style={{
              border: `1px solid ${accentColor}4d`,
              boxShadow: `0 0 32px ${accentColor}21`,
            }}
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              aria-label="Contact form"
            >
              <div className="form-group">
                <input
                  type="text"
                  name="from_name"
                  id="name"
                  required
                  placeholder=" "
                  className="font-mono tracking-wide"
                />
                <label htmlFor="name">Your Name</label>
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="from_email"
                  id="email"
                  required
                  placeholder=" "
                  className="font-mono tracking-wide"
                />
                <label htmlFor="email">Your Email</label>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  required
                  placeholder=" "
                  className="font-mono tracking-wide"
                />
                <label htmlFor="subject">Your Subject</label>
              </div>
              <div className="form-group">
                <textarea
                  name="message"
                  id="message"
                  rows="5"
                  required
                  placeholder=" "
                  className="font-mono tracking-wide"
                ></textarea>
                <label htmlFor="message">Your Message</label>
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={status === "sending"}
              >
                <span>
                  {status === "idle" && "Send Message"}
                  {status === "sending" && "Sending…"}
                  {status === "success" && "Message Sent!"}
                  {status === "error" && "Failed — Try Again"}
                </span>
                <i
                  className={`fas ${
                    status === "success"
                      ? "fa-check"
                      : status === "error"
                        ? "fa-times"
                        : "fa-paper-plane"
                  }`}
                ></i>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
