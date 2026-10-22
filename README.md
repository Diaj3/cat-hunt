# 🐱 Cat Hunt (cat-hunt.pt)

**A sleek, mobile-first social deduction game built for single-device pass-and-play sessions.**

[![Vercel Deployment](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://cat-hunt.pt)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

[**🎮 Play Live at cat-hunt.pt**](https://cat-hunt.pt)

---

## 📱 Visual Showcase & Product Experience

<div align="center">
  <h3>Mobile App Experience</h3>
  <br />
  
  <!-- Main Banner / Cover Screenshot -->
  <img src="docs/assets/banner-preview.png" alt="Cat Hunt App Banner" width="100%" style="max-width: 800px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.5);" />
  <p><em>Midnight Noir & Neon Amber dark-mode interface with custom branding & asset preloading</em></p>

  <br />

  <!-- 3-Column Mobile Screens Layout -->
  <table>
    <tr>
      <td align="center" width="33%">
        <img src="docs/assets/screen-setup.png" alt="Setup Phase" width="100%" style="border-radius: 8px;" /><br />
        <b>1. Room & Role Setup</b><br />
        <sub>Configure player counts & dynamic roles</sub>
      </td>
      <td align="center" width="33%">
        <img src="docs/assets/screen-night.png" alt="Night Pass-the-Phone" width="100%" style="border-radius: 8px;" /><br />
        <b>2. Night Actions</b><br />
        <sub>Privacy-shielded pass-the-phone turns</sub>
      </td>
      <td align="center" width="33%">
        <img src="docs/assets/screen-role.png" alt="Role Action UI" width="100%" style="border-radius: 8px;" /><br />
        <b>3. Interactive Roles</b><br />
        <sub>Vulture, Monkey & Kamikaze mechanics</sub>
      </td>
    </tr>
  </table>
</div>

---

## 📸 Overview & Product Vision

**Cat Hunt** is a modern, web-based adaptation of classic social deduction games (like Mafia / Werewolf), specifically tailored for group gatherings around a single mobile device.

Instead of requiring every player to download an app or connect to a local server, **Cat Hunt** provides a frictionless, zero-install experience built with a tactile **"Midnight Noir / Underground Syndicate"** aesthetic.

### ✨ Key Features

* **Pass-and-Play Architecture**: Optimized state transitions designed around handing off a single device safely between players without revealing secret roles.
* **Dynamic Role Deck**: Includes classic and unique roles (*Cat, Mouse, Guard Dog, Owl, Raccoon, Kamikaze, Mischievous Monkey, Vulture*).
* **Zero Latency & Offline Resiliency**: Full asset preloading pipeline ensures instant rendering of character artwork, animated victory sequences, and phase transitions without runtime network dependencies.
* **Mobile-First Glassmorphic Design**: Built with responsive constraints (`min-w-0`, `w-full`, `object-contain`) to ensure flawless rendering across varying viewport sizes and iOS/Android dynamic islands.

---

## 💡 Engineering Highlights & Architecture

### 1. Robust Asset Preloading Pipeline
To avoid screen flashes or missing avatar graphics during secretive pass-and-play handoffs, all visual assets (WebP graphics, GIFs, custom branding elements) are imported at build time via Vite and cached sequentially during the initial landing screen load:

```typescript
// Performance-focused asset preloading utility
export const preloadGameAssets = async (assetUrls: string[]): Promise<void> => {
  const promises = assetUrls.map((url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = resolve;
      img.onerror = resolve; // Graceful fallback
    });
  });
  await Promise.all(promises);
};
```

### 2. State & Phase Management
The core engine manages a multi-stage state machine (`Setup` $\rightarrow$ `Role Reveal` $\rightarrow$ `Night Phase` $\rightarrow$ `Day Vote` $\rightarrow$ `Phase Transitions` $\rightarrow$ `Game Over`), ensuring role abilities (e.g., Night 2 *Monkey Role Swap*, *Vulture Scavenge*, *Kamikaze Revenge*) resolve deterministically without leaks in state or UI hierarchy.

### 3. Responsive & Pixel-Crisp Asset Handling
To prevent thin-layer/fringe artifacts on dark OLED backgrounds, custom graphics utilize losslessly compressed WebP exports mapped with hardware-accelerated CSS rendering rules:

```css
.game-logo {
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  backface-visibility: hidden;
  transform: translateZ(0);
}
```

---

## 🎭 Role Ecosystem

| Role | Faction | Primary Ability & Mechanics |
| :--- | :--- | :--- |
| **🐱 Cat** | Cats | Hunt in the dark. Eliminate mice each night. |
| **🐭 Mouse** | Mice | Identify the cats through daytime debate and voting. |
| **🐕 Guard Dog** | Mice | Protects one player from elimination each night. |
| **🦉 Owl** | Mice | Scans one player per night to reveal their allegiance. |
(todos)
| **💣 Kamikaze** | Mice / Chaos | If eliminated, immediately drags another player down with them. |
| **🐒 Mischievous Monkey** | Neutral | **Night 2 Ability**: Secretly swaps the roles of any two players. |
| **🦅 Vulture** | Mice $\rightarrow$ Dynamic | **Scavenger**: Steals and overrides their role with that of any eliminated player. |

---

## 🛠 Tech Stack

* **Frontend**: React 18, TypeScript, Vite
* **Styling**: Tailwind CSS (Custom color system, glassmorphism filters, hardware-accelerated transitions)
* **Deployment & Infrastructure**: Vercel (Custom Domain: `cat-hunt.pt`)
* **Asset Pipeline**: WebP & Lossless PNG pipeline with dark-matte alignment

---

## 🚀 Local Development Setup

Clone the repository and run the development server locally:

```bash
# 1. Clone the repository
git clone https://github.com/your-username/cat-hunt.git

# 2. Navigate to project directory
cd cat-hunt

# 3. Install dependencies
npm install

# 4. Start local development server
npm run dev
```

Open `http://localhost:5173` in your browser (or use responsive developer tools for mobile preview).

---

## 📋 Roadmap & Contributing

Future features and technical enhancements are actively tracked via [GitHub Issues](../../issues).

Key upcoming initiatives:
* [ ] Implement more special roles.
* [ ] Sound FX toggle using Web Audio API for subtle tactile feedback.
* [ ] Custom game rules configuration (timer adjustments, role toggles).
* [ ] PWA (Progressive Web App) manifest for offline home screen installs.

---

<div align="center">
  <sub>Crafted with 💛 for game nights. Live at <a href="https://cat-hunt.pt">cat-hunt.pt</a></sub>
</div>