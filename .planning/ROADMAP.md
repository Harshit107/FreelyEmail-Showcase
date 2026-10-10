# ROADMAP.md — FreelyEmail Showcase

## Phase 1: Foundation & Design System (Vite + React + CSS Tokens)
- Set up responsive layouts, navigation sidebar/tabs, header, search bar, dark/light theme state.
- Establish design system variables, glassmorphic cards, typography, code block styling, and badges.

## Phase 2: Overview & Architecture
- Hero section, ecosystem stats, value proposition.
- Interactive architecture visualizer (Routes -> Controllers -> Services -> Transport/Database).
- Ecosystem split: `FreelyEmail-API` vs `FreelyEmail-Node-library`.

## Phase 3: Interactive API & SDK Explorers
- API Endpoint Explorer with payload customizer, live mock test runner, status codes, error schemas.
- SDK Interactive Code Generator (CommonJS, ESM, TypeScript) for all core methods.

## Phase 4: Live Email Template Sandbox & Components
- Live email renderer reflecting backend HTML templates (`otpVerificationTemplate`, `emailVerificationTemplate`, `notificationTemplate`).
- Interactive controls to tweak app name, OTP, link, CTA text, expiry minutes in real time.

## Phase 5: Dependencies, Decisions & Developer Guide
- Dependency breakdown & rationales (zero-dependency SDK, singleton transporter, fail-safe Mongoose).
- Setup & deployment instructions, copyable env configs, build & validation.
