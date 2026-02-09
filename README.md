# 🏛️ TYAA 2026: The Bastions of Hope
### Official People's Choice Award Web Application

A high-fidelity, prestige-styled web application built with **React** and **Tailwind CSS**. This platform serves as the official digital registry and voting portal for the **Thomasian Youth Ambassador & Ambassadress (TYAA) 2026**.

---

## 🌟 Key Features

* **Prestige Editorial UI**: A high-end aesthetic using a deep emerald and gold color palette, serif typography, and elegant transitions.
* **Infinite Marquee Hero**: A seamless, multi-speed candidate showcase on the landing page for an immersive introduction.
* **Secure Voting System**: 
    * 3-Phase flow: Ambassador Selection → Ambassadress Selection → Identity Verification.
    * **UST Domain Validation**: Strictly restricts voting to `@ust.edu.ph` email addresses.
    * **OTP Simulation**: Integrated 6-digit code verification and resend timer logic.
* **Smart Candidate Grid**: A custom responsive layout that ensures exactly 5 candidates per row on desktop, with "orphaned" items automatically centered for visual balance.
* **Institution Filtering**: Dynamic sidebar and mobile dropdown to filter candidates by their respective faculties/colleges.
* **SEO & Tab Management**: Static and dynamic document title updates (e.g., "Candidates | TYAA 2026") for professional browser tab navigation.

---

## 🛠️ Technical Stack

| Technology | Purpose |
| :--- | :--- |
| **React (Vite)** | Core Frontend Framework |
| **Tailwind CSS** | Utility-first Styling & Animations |
| **React Router DOM** | Client-side Navigation |
| **Framer Motion / CSS Keyframes** | High-performance Marquees & Fade-ins |
| **Lucide React** | (Optional) Iconography |

---

## 📂 Project Structure

```text
tyaa-peoples-choice/
├── public/
│   └── images/
│       └── candidates/      # Headshot assets (ambassador.webp, ambassadress.avif)
├── src/
│   ├── data/
│   │   └── contestants.js   # Centralized data (Bios, Advocacies, Image paths)
│   ├── pages/
│   │   ├── CandidatesPage.jsx # The Registry Gallery
│   │   └── VotingPage.jsx     # The 3-Step Ballot system
│   ├── App.jsx              # Routing and Helmet Provider
│   └── main.jsx             # Entry point
└── tailwind.config.js       # Custom gold-gradient and animation extensions