import { useEffect } from "react";
import { animate, useScroll, useMotionValueEvent } from "framer-motion";

/**
 * useStickyHeader
 * Uses Framer Motion's `useScroll` to attach a scroll listener without needing
 * a manual `window.addEventListener`. It toggles a 'scrolled' class on the header
 * when the user scrolls down more than 50px, applying compact header styles.
 */
function useStickyHeader() {
  const { scrollY } = useScroll();

  // Monitor scroll position and toggle 'scrolled' class for header styling
  useMotionValueEvent(scrollY, "change", (y) => {
    document.querySelector("header")?.classList.toggle("scrolled", y > 50);
  });
}

/**
 * useSmoothScroll
 * Intercepts clicks on all elements with the `.nav-link` class.
 * If the link targets an anchor (e.g., '#about'), it prevents the default jump and
 * calculates the exact scroll position, accounting for the header's fixed height.
 */
function useSmoothScroll() {
  useEffect(() => {
    function handleClick(e) {
      const href = e.currentTarget.getAttribute("href");
      // Only handle internal anchor links
      if (!href?.startsWith("#")) return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (!target) return;

      // Calculate offset to account for fixed header height
      const headerH = document.querySelector("header")?.offsetHeight ?? 80;
      window.scrollTo({ top: target.offsetTop - headerH, behavior: "smooth" });
    }

    // Attach click listeners to all nav links
    const links = document.querySelectorAll(".nav-link");
    links.forEach((l) => l.addEventListener("click", handleClick));
    
    // Cleanup listeners on unmount
    return () =>
      links.forEach((l) => l.removeEventListener("click", handleClick));
  }, []);
}

/**
 * useNotifications
 * Exposes a global window function `showPortfolioToast` to create temporary
 * notification toasts. It uses Framer Motion's `animate` to handle smooth
 * enter/exit motion before cleaning up the toast node.
 */
function useNotifications() {
  useEffect(() => {
    /**
     * Internal helper to create and animate a toast message.
     * @param {string} message - Text to display.
     * @param {string} type - Toast type (info, success, etc).
     */
    function showToast(message, type = "info") {
      // Create toast element
      const toast = document.createElement("div");
      toast.className = `toast toast-${type}`;
      toast.innerHTML = `<i class="fas fa-info-circle"></i><span>${message}</span>`;
      document.body.appendChild(toast);

      // Slide in from the right using Framer Motion animate
      animate(
        toast,
        { x: ["120%", "0%"] },
        { duration: 0.35, ease: "easeOut" },
      );

      // Slide out and remove after 3 seconds
      setTimeout(() => {
        animate(toast, { x: "120%" }, { duration: 0.35, ease: "easeIn" }).then(
          () => toast.remove(),
        );
      }, 3000);
    }

    // Expose the function globally for use throughout the app (including vanilla JS parts)
    window.showPortfolioToast = showToast;
    return () => delete window.showPortfolioToast;
  }, []);
}

/**
 * usePageLoad
 * Adds a 'loaded' class to the body object shortly after the app mounts.
 * Useful for transitioning in the initial layout without abrupt flashes.
 */
function usePageLoad() {
  useEffect(() => {
    const timer = setTimeout(() => document.body.classList.add("loaded"), 100);
    return () => {
      clearTimeout(timer);
      document.body.classList.remove("loaded");
    };
  }, []);
}

/**
 * usePortfolioLogic
 * Acts as a centralized controller to mount our global vanilla-DOM hybrid functionality.
 * We run this once in the root App.jsx component.
 */
export function usePortfolioLogic() {
  useStickyHeader(); // Shrink header on scroll      ← Framer Motion useScroll
  useSmoothScroll(); // Smooth anchor scrolling

  useNotifications(); // Toast slide in/out            ← Framer Motion animate
  usePageLoad(); // Body fade-in on mount
}
