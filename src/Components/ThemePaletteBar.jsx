import { applyThemePalette, paletteDots } from "../themePalettes";
import { useState } from "react";

/**
 * ThemePaletteBar Component
 * 
 * Provides a UI for switching between different color themes.
 * It manages the active palette state and interacts with the theme utility 
 * function to update CSS variables across the app.
 */
function ThemePaletteBar() {
  // Initialize state from localStorage to persistent the selection
  const [activePalette, setActivePalette] = useState(
    () => localStorage.getItem("portfolio-theme") || "current",
  );

  /**
   * Handles theme selection by applying the palette and updating local state.
   * @param {string} paletteId - The ID of the selected theme palette.
   */
  const handlePaletteClick = (paletteId) => {
    applyThemePalette(paletteId);
    setActivePalette(paletteId);
  };

  return (
    <div className="flex justify-center">
      <div className="group">
        <div className="flex items-center gap-3 rounded-full border border-white/20 bg-black/35 px-3 py-2 backdrop-blur-md transition-all duration-300 group-hover:px-6">
          {paletteDots.map((dot) => (
            <button
              key={dot.id}
              type="button"
              aria-label={`Switch theme to ${dot.label}`}
              aria-pressed={activePalette === dot.id}
              className="h-4 w-4 rounded-full border border-white/60 shadow-[0_0_12px_rgba(255,255,255,0.22)] transition hover:scale-110"
              style={{ backgroundColor: dot.color }}
              onClick={() => handlePaletteClick(dot.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ThemePaletteBar;
