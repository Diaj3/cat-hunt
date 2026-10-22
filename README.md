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
  <table width="33%">
    <tr>
      <td align="center">
        <img src="/src/assets/readme/flow_gif.gif" alt="Cat Hunt Gameplay Reel" width="100%" style="border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.5);" /><br />
        <sub><em>Core gameplay flow & pass-the-phone loop</em></sub>
      </td>
    </tr>
  </table>

  <br />

  <table>
    <tr>
      <td align="center" width="33%">
        <img src="/src/assets/readme/player_setup_screen.png" alt="Setup Phase" width="100%" style="border-radius: 8px;" /><br />
        <b>1. Room & Role Setup</b><br />
        <sub>Configure player counts & dynamic roles</sub>
      </td>
      <td align="center" width="33%">
        <img src="/src/assets/readme/guard_dog_screen.png" alt="Night Pass-the-Phone" width="100%" style="border-radius: 8px;" /><br />
        <b>2. Night Action example</b><br />
        <sub>Example of special role Guard Dog screen</sub>
      </td>
      <td align="center" width="33%">
        <img src="/src/assets/readme/day_discussion_screen.png" alt="Role Action UI" width="100%" style="border-radius: 8px;" /><br />
        <b>3. Day discussion</b><br />
        <sub>Timed discussion to decide who to eliminate</sub>
      </td>
    </tr>
  </table>
</div>

---

## 📸 Overview & Product Vision

**Cat Hunt** is a modern, web-based adaptation of classic social deduction games (like Mafia / Werewolf / Among Us), specifically tailored for group gatherings around a single mobile device.

Instead of requiring every player to download an app or connect to a local server, **Cat Hunt** provides a frictionless, zero-install experience built with a tactile **"Midnight Noir / Underground Syndicate"** aesthetic.

### ✨ Key Features

* **Pass-and-Play Architecture**: Optimized state transitions designed around handing off a single device safely between players without revealing secret roles.
* **Dynamic Role Deck**: Includes classic and unique roles (*Cat, Mouse, Guard Dog, Owl, Raccoon*).
* **Zero Latency & Offline Resiliency**: Full asset preloading pipeline ensures instant rendering of character artwork, animated victory sequences, and phase transitions without runtime network dependencies.
* **Mobile-First Glassmorphic Design**: Built with responsive constraints (`min-w-0`, `w-full`, `object-contain`) to ensure flawless rendering across varying viewport sizes and iOS/Android dynamic islands.

---

## 💡 State & Phase Management
The core engine manages a multi-stage state machine (`Setup` $\rightarrow$ `Role Reveal` $\rightarrow$ `Night Phase` $\rightarrow$ `Day Vote` $\rightarrow$ `Phase Transitions` $\rightarrow$ `Game Over`), ensuring role abilities (e.g., Guard Dog, Owl) resolve deterministically without leaks in state or UI hierarchy.

---

## 🎭 Role Ecosystem

| Role | Faction | Primary Ability & Mechanics |
| :--- | :--- | :--- |
| **🐱 Cat** | Cats | Hunt in the dark. Eliminate mice each night. |
| **🐭 Mouse** | Mice | Identify the cats through daytime debate and voting. |
| **🐕 Guard Dog** | Mice | Protects one player from elimination each night. |
| **🦉 Owl** | Mice | Scans one player per night to reveal their allegiance. |
| **🤴 Host** | --- | Game Master. Announces roles and leads the story. |
*__TODOS__*
| *__💣 Kamikaze__* | Mice | If eliminated, immediately drags another player down with them. |
| *__👻 Ghost Mouse__* | Mice | When eliminated, they get one last guess, if correct, the Cat dies with them. |
| *__🦔 Porcupine__* | Mice | If targeted by the Cats at night, die and take |
| *__🦅 Vulture__* | Mice $\rightarrow$ Dynamic | **Scavenger**: Steals and overrides their role with that of any eliminated player. |

---

## 🛠 Tech Stack

* **Frontend**: React 18, TypeScript, Vite
* **Styling**: Tailwind CSS (Custom color system, glassmorphism filters, hardware-accelerated transitions)
* **Deployment & Infrastructure**: Vercel (Custom Domain: `cat-hunt.pt`)

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
* [ ] Implement more special roles (Kamikaze, Porcupine, Vulture, etc).
* [ ] Sound FX toggle using Web Audio API for subtle tactile feedback.
* [ ] More custom game rules configurations (e.g. timer adjustments).
* [ ] PWA (Progressive Web App) manifest for offline home screen installs.

---

<div align="center">
  <sub>Crafted with 💛 for game nights. Live at <a href="https://cat-hunt.pt">cat-hunt.pt</a></sub>
</div>