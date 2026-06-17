# MD Moon - Personal Portfolio

Interactive personal portfolio built with React + Vite, focused on smooth motion, a strong visual theme, and real portfolio utility (live stats, project details, direct messaging, and dynamic theming).

## Live Demo

[moonportfolio2715.netlify.app](https://moonportfolio2715.netlify.app/)

## Tech Stack

| Layer               | Tools                                                 |
| ------------------- | ----------------------------------------------------- |
| Frontend            | React 19, Vite 8                                      |
| Motion & UI effects | Framer Motion                                         |
| 3D visuals          | Three.js, `@react-three/fiber`, `@react-three/drei`   |
| Styling             | Tailwind CSS (utility classes) + custom CSS variables |
| Messaging           | EmailJS                                               |
| Data integrations   | Codeforces + GitHub stats widgets                     |
| Deployment          | Netlify                                               |

## Project Structure

```text
Portfolio/
├── public/
│   ├── CV.pdf
│   └── SVG.svg
├── src/
│   ├── assets/
│   ├── Components/
│   │   ├── Header.jsx            # sticky nav + mobile menu
│   │   ├── ThemePaletteBar.jsx   # theme color switch buttons
│   │   ├── ProfileCard.jsx       # hero/profile section
│   │   ├── About.jsx             # bio + interactive highlights
│   │   ├── Skill.jsx             # skills grid
│   │   ├── Stats.jsx             # Codeforces/GitHub live stats
│   │   ├── Services.jsx          # services cards
│   │   ├── Projects.jsx          # 3D project cards + expandable modal
│   │   ├── Contact.jsx           # retro contact section + EmailJS form
│   │   ├── Body.jsx              # composes the main sections
│   │   └── GalaxyBackground.jsx  # global 3D starfield
│   ├── App.jsx                   # top-level app composition + global effects
│   ├── usePortfolioLogic.js      # sticky header, smooth scroll, toasts, load logic
│   ├── themePalettes.js          # centralized theme palette definitions
│   ├── index.css
│   └── main.jsx
├── package.json
└── README.md
```

## Code Logic (High-Level)

### Foundation

- **`App.jsx`**: Orchestrates global behavior, composition of page sections, custom cursor glow, and initialization of theme defaults.
- **`usePortfolioLogic.js`**: A custom utility hook that manages DOM-level behaviors such as sticky header transitions, smooth anchor scrolling (via `scrollIntoView`), global toast notifications, and initial page reveal logic.
- **`Body.jsx`**: Acts as a layout orchestrator, passing shared reveal and interaction hooks down to individual section components to ensure consistent animation timing.

### Global Components

- **`Header.jsx`**: Manages top-level navigation, mobile menu visibility, and dynamically highlights links based on the active viewport section using a custom intersection observer.
- **`ThemePaletteBar.jsx`**: Enables real-time application theme swapping by updating CSS root variables from `themePalettes.js`. Selections are persisted in `localStorage` for cross-session consistency.
- **`GalaxyBackground.jsx`**: Uses `@react-three/fiber` to render a global interactive 3D starfield that listens for theme changes to sync its ambient light and wireframe colors.

### Interactive Sections

- **`ProfileCard.jsx`**: The hero module that displays personal stats and a rotating professional title (the typewriter effect). It uses `scrollReveal` to trigger staggered entrance animations for social links and stat badges.
- **`About.jsx`**: Features a 3D-tilting profile image and interactive "Highlight" cards. Clicking a card triggers a morphing animation that expands the card into a detailed modal using `AnimatePresence`.
- **`Skill.jsx`**: Renders an expertise grid with dynamic skill bars. The component uses staggered reveal animations to emphasize different technical categories as they enter the viewport.
- **`Stats.jsx`**: Fetches live data from Codeforces and GitHub APIs. It includes custom logic for calculating unique problem counts and renders an inline SVG sparkline for competitive rating history.
- **`Services.jsx`**: A declarative grid of professional offerings that leverages the central reveal system to animate service cards into view with a staggered float-up effect.
- **`Projects.jsx`**: An advanced gallery with 3D perspective cards that react to mouse position (tilt) and scroll depth (parallax). Includes a "morphed" modal for project details and a fallback toast system for projects without live demos.
- **`Contact.jsx`**: Integrates an EmailJS-powered form with state-driven button feedback (`idle`, `sending`, `success`, `error`). It also features a 3D "Retro Orb" canvas synced with the active theme's accent color.

## Feature Highlights

### 1) Change Color Palette

Switch among predefined themes to recolor accents, gradients, borders, and cursor glow in real time.

![Change color palette](public/ColorP.png)

### 2) Live Stats (Codeforces + GitHub)

Displays active rating/contest/contribution metrics and GitHub activity heatmap.

![Live stats](public/Stats.png)

### 3) Project Overview

Click project cards to open expanded overview with stack tags and quick links.

![Project overview](public/Overview.png)

### 4) Send Direct Message

Visitors can send messages directly through the built-in EmailJS contact form.

![Direct message](public/email.png)

### More Key Features

- **3D Universe Context**: A global interactive starfield rendered with `@react-three/fiber` that reacts dynamically to theme changes.
- **Cursor Spotlight Effect**: Custom mouse-following glow that illuminates UI components and enhances the futuristic aesthetic.
- **Scroll-Linked Depth**: Project cards and section elements that use parallax-style depth transformations as the user scrolls.
- **Dynamic Reveal System**: Staggered scroll animations powered by a custom intersection observer implementation for smooth interface entrance.
- **Persistent Preferences**: LocalStorage integration to remember selected theme palettes and application states across sessions.
- **Responsive Navigation**: Sophisticated mobile menu with glassmorphism effects and active-section link tracking.
- **Graceful Loading States**: Integrated skeleton screens and animated counting effects for real-time statistical data.

## Useful Commands

```bash
# clone the repository
git clone https://github.com/MominulMoon/Portfolio.git

# move into project directory
cd Portfolio

# install dependencies
npm install

# start local dev server
npm run dev

# build for production
npm run build

# preview production build locally
npm run preview

# run lint checks
npm run lint
```

## Developer Info

| Field       | Value                                                  |
| ----------- | ------------------------------------------------------ |
| Name        | MD Moon Babu                                           |
| Degree      | B.Sc. in CSE (Running)                                 |
| University  | RUET (Rajshahi University of Engineering & Technology) |
| Location    | Tikapara, Rajshahi, Bangladesh                         |
| Focus Areas | MERN Stack, Data Science, Machine Learning             |

<b>Email </b> : m.mmoon1527@gmail.com
