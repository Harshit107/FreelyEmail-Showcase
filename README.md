# FreelyEmail Developer Portal & Project Showcase

A modern, responsive, developer-portal showcase web application for the **FreelyEmail** ecosystem (`FreelyEmail-API` and `FreelyEmail-Node-library`).

Built with **React**, **Vite**, and clean vanilla CSS variables. Zero external backend required—runs entirely in the browser with mock execution simulators and real-time email template rendering.

---

## 🌟 Key Features

1. **Ecosystem Overview**:
   - Hero banner with key metrics (0 client dependencies, 4 core endpoints, fail-safe database logging, singleton SMTP transport).
   - Side-by-side comparison of the API service and Client SDK.

2. **Interactive 7-Step Architecture Flow**:
   - Step-by-step visualizer covering: Consumer Client &rarr; Security Middleware &rarr; Router &rarr; Controller/Validator &rarr; HTML Templates &rarr; SMTP Singleton &rarr; Fail-Safe Mongoose Logging.
   - Clickable nodes with live code snippets and architectural rationale.

3. **Live API Playground**:
   - Interactive runner for all endpoints:
     - `POST /api/v1/emails/otp/request` (server-side cryptographic 6-digit OTP)
     - `POST /api/v1/emails/otp/send` (custom OTP code)
     - `POST /api/v1/emails/verification/link` (action verification button)
     - `POST /api/v1/emails/send` (notification or custom HTML)
   - Real-time parameter inputs, execution latency simulation, and generated code export (Node SDK, `fetch`, `curl`).

4. **Node.js Client SDK Documentation**:
   - Zero-dependency design based on native Node 18+ `globalThis.fetch`.
   - TypeScript typings guide (`index.d.ts`).
   - Method explorer and structured error handling (`FreelyEmailAPIError`, `FreelyEmailValidationError`).

5. **Live Email Template Sandbox**:
   - Real-time visual iframe renderer for OTP, verification link, and notification emails.
   - Interactive parameter customizer (App Name, OTP code, valid minutes, CTA button text, links).
   - Desktop and Mobile viewport toggle.
   - Raw HTML source code inspector with copy button.

6. **Dependencies & Architectural Decision Records (ADRs)**:
   - Full package audit table.
   - Deep dive into security measures (CRLF header injection defense, rate limiting, Helmet).

7. **Developer Guide & FAQ**:
   - Step-by-step workspace setup and `.env` template.
   - FAQ covering offline MongoDB fail-safe behavior and Gmail SMTP configuration.

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- npm >= 9

### Local Development
```bash
# Navigate to the showcase project
cd FreelyEmail-Showcase

# Install dependencies
npm install

# Start Vite dev server
npm run dev
```

### Production Build & Preview
```bash
# Build production bundle
npm run build

# Run local preview server
npm run preview
```

---

## 📁 Project Structure

```
FreelyEmail-Showcase/
├── .planning/                  # GSD planning & requirements documentation
│   ├── PROJECT.md
│   ├── REQUIREMENTS.md
│   ├── ROADMAP.md
│   ├── STATE.md
│   └── config.json
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Top bar with tab switching & Ctrl+K search
│   │   ├── Hero.jsx            # Developer hero & ecosystem stats
│   │   ├── ArchitectureView.jsx# 7-layer interactive request lifecycle
│   │   ├── ApiPlayground.jsx   # Live endpoint tester & code generator
│   │   ├── SdkShowcase.jsx     # Node SDK methods & TypeScript types
│   │   ├── EmailSandbox.jsx    # Live email iframe preview & mobile frame
│   │   ├── TechStackView.jsx   # Dependencies & Architectural Decision Records
│   │   ├── DevGuide.jsx        # Setup instructions & FAQ accordion
│   │   └── Footer.jsx          # Workspace paths & license information
│   ├── data/
│   │   └── projectData.js      # Structured ecosystem facts & endpoint schemas
│   ├── utils/
│   │   └── templateRenderers.js# Authentic HTML email markup generators
│   ├── App.jsx                 # Master application controller
│   ├── App.css                 # Component & layout styles
│   ├── index.css               # Design system & dark/light theme tokens
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

---

## 📄 License
MIT © FreelyEmail Ecosystem
