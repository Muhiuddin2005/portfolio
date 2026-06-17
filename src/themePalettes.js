/** Default palette identifier used if no theme is stored or selected */
export const DEFAULT_PALETTE_ID = "current";

/**
 * Collection of color palettes for the application.
 * Each palette defines primary/secondary colors, gradients, and RGB values for glow effects.
 */
export const colorPalettes = {
  [DEFAULT_PALETTE_ID]: {
    accentPrimary: "#00d4ff",
    accentSecondary: "#0099cc",
    gradient: "linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)",
    gradientHover: "linear-gradient(135deg, #00bfea 0%, #0088bb 100%)",
    borderAccent: "rgba(0, 212, 255, 0.15)",
    glowPrimaryRgb: "0, 212, 255",
    glowSecondaryRgb: "0, 153, 204",
  },
  green: {
    accentPrimary: "#4ade80",
    accentSecondary: "#16a34a",
    gradient: "linear-gradient(135deg, #4ade80 0%, #16a34a 100%)",
    gradientHover: "linear-gradient(135deg, #36d977 0%, #12873f 100%)",
    borderAccent: "rgba(74, 222, 128, 0.2)",
    glowPrimaryRgb: "74, 222, 128",
    glowSecondaryRgb: "22, 163, 74",
  },
  orange: {
    accentPrimary: "#fb923c",
    accentSecondary: "#ea580c",
    gradient: "linear-gradient(135deg, #fb923c 0%, #ea580c 100%)",
    gradientHover: "linear-gradient(135deg, #f77f22 0%, #cf4a08 100%)",
    borderAccent: "rgba(251, 146, 60, 0.2)",
    glowPrimaryRgb: "251, 146, 60",
    glowSecondaryRgb: "234, 88, 12",
  },
  purple: {
    accentPrimary: "#a78bfa",
    accentSecondary: "#7c3aed",
    gradient: "linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)",
    gradientHover: "linear-gradient(135deg, #9674f5 0%, #6c2fd1 100%)",
    borderAccent: "rgba(167, 139, 250, 0.2)",
    glowPrimaryRgb: "167, 139, 250",
    glowSecondaryRgb: "124, 58, 237",
  },
  darkBlue: {
    accentPrimary: "#60a5fa",
    accentSecondary: "#1d4ed8",
    gradient: "linear-gradient(135deg, #60a5fa 0%, #1d4ed8 100%)",
    gradientHover: "linear-gradient(135deg, #438ff5 0%, #1a44bc 100%)",
    borderAccent: "rgba(96, 165, 250, 0.2)",
    glowPrimaryRgb: "96, 165, 250",
    glowSecondaryRgb: "29, 78, 216",
  },
};

/** List of available palette options for the theme selection UI */
export const paletteDots = [
  { id: DEFAULT_PALETTE_ID, label: "Default cyan", color: "#00d4ff" },
  { id: "green", label: "Green", color: "#4ade80" },
  { id: "orange", label: "Orange", color: "#fb923c" },
  { id: "purple", label: "Purple", color: "#a78bfa" },
  { id: "darkBlue", label: "Dark blue", color: "#60a5fa" },
];

/**
 * Applies a selected color palette to the application by updating CSS variables on the root element.
 * It also persists the selection in localStorage and dispatches a 'themeChange' event.
 * 
 * @param {string} paletteId - The ID of the palette to apply.
 */
export function applyThemePalette(paletteId) {
  const safePaletteId = colorPalettes[paletteId]
    ? paletteId
    : DEFAULT_PALETTE_ID;
  const palette = colorPalettes[safePaletteId];
  const root = document.documentElement;
  root.style.setProperty("--accent-primary", palette.accentPrimary);
  root.style.setProperty("--accent-secondary", palette.accentSecondary);
  root.style.setProperty("--accent-gradient", palette.gradient);
  root.style.setProperty("--accent-gradient-hover", palette.gradientHover);
  root.style.setProperty("--border-accent", palette.borderAccent);
  root.style.setProperty("--glow-primary-rgb", palette.glowPrimaryRgb);
  root.style.setProperty("--glow-secondary-rgb", palette.glowSecondaryRgb);
  localStorage.setItem("portfolio-theme", safePaletteId);

  // Dispatch custom event for theme change
  window.dispatchEvent(
    new CustomEvent("themeChange", {
      detail: { paletteId: safePaletteId, palette },
    }),
  );
}

/**
 * Retrieves the last saved theme ID from localStorage.
 * Defaults to the DEFAULT_PALETTE_ID if none is found.
 * 
 * @returns {string} The stored theme ID.
 */
export function getStoredThemeId() {
  return localStorage.getItem("portfolio-theme") || DEFAULT_PALETTE_ID;
}
