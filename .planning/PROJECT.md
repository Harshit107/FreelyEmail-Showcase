# FreelyEmail Developer Portal & Project Showcase

## What This Is

An interactive, modern developer portal and showcase website for the FreelyEmail ecosystem (`FreelyEmail-API` and `FreelyEmail-Node-library`). It provides developers, reviewers, and stakeholders with comprehensive interactive architecture diagrams, live code sandboxes, API endpoint explorers, SDK usage guides, and configuration references.

## Core Value

Provide a single, beautifully designed, and zero-backend developer hub that makes understanding, integrating, and evaluating the FreelyEmail suite effortless and intuitive.

## Business Context

- **Audience**: Backend developers, full-stack engineers, technical reviewers, and open-source contributors
- **Success metric**: Time-to-first-email under 2 minutes for new developers using the library or API
- **Strategy**: Clear, runnable interactive examples and live simulation without requiring SMTP credentials to explore

## Requirements

### Validated
(None yet — initial release)

### Active
- [x] Project Overview with hero banner, quick stats, feature grid, and ecosystem value proposition
- [x] Interactive API Playground / Documentation with mock request runner for all endpoints (OTP Send, OTP Request, Link Verification, Notification)
- [x] Architecture Explorer illustrating Express -> Controller -> Service -> Nodemailer flow and MongoDB fail-safe logging
- [x] SDK Client Guide detailing `FreelyEmailClient` methods, zero-dependency native fetch design, and TypeScript support
- [x] Interactive Live Email Template Previewer (OTP verification code, link verification button, notification alert)
- [x] Dependency & Tech Stack Matrix comparing API and Node SDK dependencies and design rationale
- [x] Dark / Light theme toggle with modern developer typography, glassmorphism, and responsive layout
- [x] Quick-start Developer Guide with copy-pasteable commands and environment variable template

### Out of Scope
- Direct SMTP connection from browser (all email testing on portal is simulated client-side for security)
- Database administration UI (the portal is a documentation & showcase application)

## Context
FreelyEmail consists of two tightly coupled projects:
1. `FreelyEmail-API`: A lean Node.js + Express backend with Mongoose audit logging, Nodemailer transport, rate limiting, and input sanitization.
2. `FreelyEmail-Node-library`: A zero-dependency SDK utilizing native Node 18 `fetch` for seamless API integration with full TypeScript declarations.

## Constraints
- **Stack**: React + Vite, Vanilla CSS with curated tokens, Lucide React icons
- **Zero Backend**: Fully functional as a standalone static web application
- **Non-destructive**: Isolated within `FreelyEmail-Showcase`, never modifying the parent API or Library code

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| React + Vite | Fast HMR, component reusability, clean JSX state management | ✓ Good |
| Embedded Interactive Template Preview | Allows instant visual inspection of emails produced by the backend templates | ✓ Good |
| Mock API Simulator | Developers can test request/response payloads directly in the browser without credentials | ✓ Good |
| CSS Custom Properties & Glassmorphism | Provides a sleek developer portal feel matching modern standards (Stripe/Vercel/Linear) | ✓ Good |

---
*Last updated: 2026-10-10 after initialization*
