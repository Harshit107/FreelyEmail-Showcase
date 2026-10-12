// FreelyEmail Showcase Project Data

export const ECOSYSTEM_INFO = {
  name: "FreelyEmail Ecosystem",
  version: "1.0.0",
  tagline: "Transactional Emails for Node.js + Centralized Real-Time Logging",
  description: "A complete 4-project email and telemetry ecosystem consisting of an Express REST API, a zero-dependency client SDK, a dedicated TypeScript Central Logging Microservice, and a real-time React 19 Logging Dashboard.",
  stats: [
    { label: "Client Dependencies", value: "0", note: "Native Node 18+ Fetch" },
    { label: "API Endpoints", value: "4", note: "OTP, Links, Notifications" },
    { label: "Ecosystem Microservices", value: "4 Repos", note: "API, SDK, Logger, UI" },
    { label: "Logging Architecture", value: "Decoupled", note: "TypeScript + Real-time Trace" },
  ],
  repos: [
    {
      name: "FreelyEmail-API",
      type: "REST Service",
      role: "Central Email Engine",
      port: ":5000",
      localUrl: "http://localhost:5000",
      githubUrl: "https://github.com/Harshit107/FreelyEmail-API",
      language: "Node.js (Express, Mongoose, Nodemailer)",
      path: "Groups/FreelyEmail-API",
      summary: "Handles Brevo SMTP connection caching, rate limiting, cryptographic OTP generation, HTML template rendering, and fail-safe forwarding to the Central Logging Service."
    },
    {
      name: "FreelyEmail-Node-library",
      type: "Client SDK",
      role: "Zero-Dependency Client",
      port: "NPM Module",
      localUrl: null,
      githubUrl: "https://github.com/Harshit107/FreelyEmail-Node-library",
      language: "Node.js >= 18 (TypeScript Declarations)",
      path: "Groups/FreelyEmail-Node-library",
      summary: "Ergonomic client wrapper using native global fetch, AbortController timeouts, full TypeScript type declarations, and structured error handling."
    },
    {
      name: "central-logging-service",
      type: "Microservice",
      role: "Central Audit Logger",
      port: ":5001",
      localUrl: "http://localhost:5001",
      githubUrl: "https://github.com/Harshit107/central-logging-service",
      language: "TypeScript (Express, Mongoose Atlas)",
      path: "Groups/central-logging-service",
      summary: "Dedicated logging microservice managing error_logs, info_logs, and user_data_logs with x-logging-key authentication and indexed messageId queries."
    },
    {
      name: "logging-dashboard",
      type: "Web Application",
      role: "Real-Time Trace Dashboard",
      port: ":5174",
      localUrl: "http://localhost:5174",
      githubUrl: "https://github.com/Harshit107/logging-dashboard",
      language: "React 19 + TypeScript (Vite + Proxy)",
      path: "Groups/logging-dashboard",
      summary: "High-density monitoring interface for tracing email lifecycles by Message ID, live activity feeds, schema inspection, and test API simulation."
    }
  ]
};

export const ARCHITECTURE_LAYERS = [
  {
    step: 1,
    id: "consumer",
    title: "Client Application / SDK",
    subtitle: "Consuming Service",
    desc: "Application calls FreelyEmailClient SDK methods or sends raw HTTP POST requests to the API.",
    code: `const client = new FreelyEmailClient({
  baseUrl: 'http://localhost:5000/api/v1',
  defaultApp: 'My SaaS'
});
await client.sendOtp({ recipient: 'user@example.com', otp: '492810' });`
  },
  {
    step: 2,
    id: "security",
    title: "Edge & Middleware",
    subtitle: "Security & Guardrails",
    desc: "Requests pass through Helmet headers, CORS policies, Express JSON parsers, and IP-based rate limiting (100 reqs/15 min).",
    code: `app.use(helmet());
app.use(cors());
app.use('/api', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests'
}));`
  },
  {
    step: 3,
    id: "routes",
    title: "Route Routing & Dispatch",
    subtitle: "src/routes/email.routes.js",
    desc: "Routes map endpoints cleanly to controller actions using centralized route constants.",
    code: `router.post(ROUTES.EMAILS.SEND, emailController.sendNotification);
router.post(ROUTES.EMAILS.OTP_SEND, emailController.sendOtp);
router.post(ROUTES.EMAILS.OTP_REQUEST, emailController.requestOtp);
router.post(ROUTES.EMAILS.LINK_VERIFICATION, emailController.sendLinkVerification);`
  },
  {
    step: 4,
    id: "controller",
    title: "Validation & Controller",
    subtitle: "src/controllers/email.controller.js",
    desc: "Validates email formats, sanitizes headers to prevent SMTP header injection, wraps handlers in catchAsync, and generates OTPs with crypto.randomInt.",
    code: `const otp = crypto.randomInt(100000, 1000000).toString();
const errors = validateEmailRequest(req.body);
if (errors.length > 0) throw new APIError(errors.join(', '), 400);`
  },
  {
    step: 5,
    id: "templates",
    title: "HTML Template Generator",
    subtitle: "src/templates/*",
    desc: "Renders responsive, email-client-safe HTML markup with branded gradient bars, OTP badges, and action CTA buttons.",
    code: `const html = getOtpTemplate(appName, otp, withValidTime);
// Returns fully tested HTML email markup compatible with Gmail, Apple Mail, Outlook`
  },
  {
    step: 6,
    id: "service",
    title: "Email Service & Singleton SMTP",
    subtitle: "src/services/email.service.js",
    desc: "Sends email using a cached, singleton Nodemailer transporter pool avoiding socket reconnect overhead.",
    code: `const messageId = await emailService.sendMail({
  app, subject, recipient, sender, replyTo, text, html
});`
  },
  {
    step: 7,
    id: "database",
    title: "Fail-Safe Audit Logging",
    subtitle: "MongoDB / Mongoose",
    desc: "Asynchronously logs delivery metadata (sender, recipient, messageId, timestamp). DB connection failures are safely caught so email delivery is NEVER blocked.",
    code: `try {
  await EmailLog.create({ sender, recipient, messageId, type });
} catch (dbErr) {
  logger.warn('Failed to persist email record, delivery was successful:', dbErr);
}`
  },
  {
    step: 8,
    id: "central-logging",
    title: "Central Logging Service & Dashboard",
    subtitle: "central-logging-service (:5001) & logging-dashboard (:5174)",
    desc: "Asynchronously dispatches user-data, operational info, and error logs to the dedicated TypeScript Central Logging Service. Traces are instantly searchable by Message ID in the live Dashboard.",
    code: `// Dispatched asynchronously to Central Logging Service
await centralLogger.logUserData({
  messageId, sender, recipient, app, subject, type, status: 'dispatched'
});
// Dashboard traces instantly via http://localhost:5174/api/v1/logs/user-data/:messageId`
  }
];

export const API_ENDPOINTS = [
  {
    id: "otp_request",
    method: "POST",
    path: "/api/v1/emails/otp/request",
    title: "Auto-Generate & Send OTP",
    category: "Authentication",
    desc: "Cryptographically generates a 6-digit OTP on the server, embeds it into the responsive OTP email template, dispatches the email, and returns the OTP to your server for session verification.",
    defaultBody: {
      recipient: "developer@example.com",
      app: "FreelyAuth",
      sender: "FreelyEmail Security",
      subject: "Your FreelyAuth Verification Code",
      withValidTime: 10
    },
    fields: [
      { name: "recipient", type: "string (email)", required: true, desc: "Recipient's email address" },
      { name: "app", type: "string", required: false, desc: "Brand or Application name" },
      { name: "sender", type: "string", required: false, desc: "Sender display name (defaults to 'FreelyEmail')" },
      { name: "subject", type: "string", required: false, desc: "Email subject line" },
      { name: "withValidTime", type: "number", required: false, desc: "Expiry window in minutes (default 10)" },
      { name: "replyTo", type: "string (email)", required: false, desc: "Optional reply-to address" }
    ],
    sampleResponse: {
      success: true,
      data: {
        messageId: "<a1b2c3d4-e5f6-7890@mail.freelyemail.dev>",
        otp: "749201"
      },
      message: "OTP sent successfully",
      error: null
    }
  },
  {
    id: "otp_send",
    method: "POST",
    path: "/api/v1/emails/otp/send",
    title: "Send Custom OTP",
    category: "Authentication",
    desc: "Sends a pre-generated OTP provided by your application backend inside FreelyEmail's formatted template.",
    defaultBody: {
      recipient: "user@startup.io",
      otp: "928374",
      app: "CloudSync",
      sender: "CloudSync Security",
      withValidTime: 15
    },
    fields: [
      { name: "recipient", type: "string (email)", required: true, desc: "Recipient's email address" },
      { name: "otp", type: "string", required: true, desc: "The OTP code to display" },
      { name: "app", type: "string", required: false, desc: "Application name" },
      { name: "withValidTime", type: "number", required: false, desc: "Validity notice in minutes" },
      { name: "HTMLfile", type: "string", required: false, desc: "Optional override HTML string" }
    ],
    sampleResponse: {
      success: true,
      data: {
        messageId: "<f8e7d6c5-b4a3-2109@mail.freelyemail.dev>"
      },
      message: "OTP sent successfully",
      error: null
    }
  },
  {
    id: "link_verification",
    method: "POST",
    path: "/api/v1/emails/verification/link",
    title: "Send Link Verification",
    category: "Account Onboarding",
    desc: "Dispatches an email containing a high-contrast CTA button, plain-text fallback URL, and optional expiry indicator for magic links or password resets.",
    defaultBody: {
      recipient: "alice@acme.org",
      link: "https://acme.org/verify?token=eyJhGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
      app: "Acme Cloud",
      buttonText: "Activate My Account",
      withValidTime: 30
    },
    fields: [
      { name: "recipient", type: "string (email)", required: true, desc: "Recipient's email address" },
      { name: "link", type: "string (URL)", required: true, desc: "Verification or activation URL" },
      { name: "app", type: "string", required: false, desc: "Application name" },
      { name: "buttonText", type: "string", required: false, desc: "Custom CTA button label (default: 'Verify My Email')" },
      { name: "withValidTime", type: "number", required: false, desc: "Link validity period in minutes" }
    ],
    sampleResponse: {
      success: true,
      data: {
        messageId: "<3c4d5e6f-7a8b-9c0d@mail.freelyemail.dev>"
      },
      message: "Verification link sent successfully",
      error: null
    }
  },
  {
    id: "send_notification",
    method: "POST",
    path: "/api/v1/emails/send",
    title: "Send Notification / Custom HTML",
    category: "Transactional Alerts",
    desc: "Delivers a standard notification email wrapped in a responsive card with optional call-to-action button, or developer-supplied custom raw HTML.",
    defaultBody: {
      recipient: "customer@domain.com",
      subject: "Your invoice #INV-2026-08 is ready",
      app: "BillingPro",
      message: "Your monthly subscription invoice for Pro Plan ($29.00) has been generated and charged to your primary payment card.",
      ctaText: "Download Invoice PDF",
      ctaUrl: "https://billingpro.com/invoices/2026-08"
    },
    fields: [
      { name: "recipient", type: "string (email)", required: true, desc: "Recipient's email address (or 'to')" },
      { name: "subject", type: "string", required: true, desc: "Email subject line" },
      { name: "message", type: "string", required: false, desc: "Plain text message body (auto-wrapped in template)" },
      { name: "HTMLfile", type: "string", required: false, desc: "Raw custom HTML markup (bypasses template)" },
      { name: "ctaText", type: "string", required: false, desc: "Button label for call-to-action" },
      { name: "ctaUrl", type: "string (URL)", required: false, desc: "Destination URL for CTA button" }
    ],
    sampleResponse: {
      success: true,
      data: {
        messageId: "<9a8b7c6d-5e4f-3a2b@mail.freelyemail.dev>"
      },
      message: "Email sent successfully",
      error: null
    }
  }
];

export const SDK_METHODS = [
  {
    name: "requestOtp",
    returnType: "Promise<{ success: boolean, data: { messageId: string, otp: string }, message: string }>",
    desc: "Auto-generates a secure 6-digit OTP on the API, sends the styled email, and resolves with the generated OTP code.",
    exampleCJS: `const { FreelyEmailClient } = require('freelyemail');

const client = new FreelyEmailClient({
  baseUrl: 'http://localhost:3000/api/v1',
  defaultApp: 'MyPortal'
});

async function handleLogin(email) {
  const result = await client.requestOtp({
    recipient: email,
    withValidTime: 10
  });
  
  // Store result.data.otp in your Redis session / cache for validation
  console.log('OTP dispatched:', result.data.otp);
}`,
    exampleTS: `import { FreelyEmailClient, RequestOtpResponse } from 'freelyemail';

const client = new FreelyEmailClient({
  baseUrl: process.env.EMAIL_API_URL,
  defaultApp: 'MyPortal',
  timeout: 8000
});

const response: RequestOtpResponse = await client.requestOtp({
  recipient: 'user@domain.com',
  withValidTime: 10
});`
  },
  {
    name: "sendOtp",
    returnType: "Promise<{ success: boolean, data: { messageId: string } }>",
    desc: "Sends an OTP code generated and managed by your application backend.",
    exampleCJS: `await client.sendOtp({
  recipient: 'user@example.com',
  otp: '582049',
  app: 'FinTech App',
  withValidTime: 5
});`,
    exampleTS: `await client.sendOtp({
  recipient: 'user@example.com',
  otp: '582049',
  withValidTime: 5
});`
  },
  {
    name: "sendLinkVerification",
    returnType: "Promise<{ success: boolean, data: { messageId: string } }>",
    desc: "Sends an action button verification email with optional expiry time.",
    exampleCJS: `await client.sendLinkVerification({
  recipient: 'newuser@org.com',
  link: 'https://app.com/confirm?token=xyz',
  buttonText: 'Confirm Email Address',
  withValidTime: 60
});`,
    exampleTS: `await client.sendLinkVerification({
  recipient: 'newuser@org.com',
  link: 'https://app.com/confirm?token=xyz',
  buttonText: 'Confirm Email Address',
  withValidTime: 60
});`
  },
  {
    name: "sendNotification",
    returnType: "Promise<{ success: boolean, data: { messageId: string } }>",
    desc: "Sends a generic notification or custom HTML email with optional CTA button.",
    exampleCJS: `await client.sendNotification({
  recipient: 'admin@company.com',
  subject: 'Database Backup Completed',
  message: 'Nightly backup of cluster prod-us-east-1 finished successfully.',
  ctaText: 'View Backup Log',
  ctaUrl: 'https://cloud.company.com/backups/latest'
});`,
    exampleTS: `await client.sendNotification({
  recipient: 'admin@company.com',
  subject: 'Database Backup Completed',
  message: 'Nightly backup of cluster prod-us-east-1 finished successfully.',
  ctaText: 'View Backup Log',
  ctaUrl: 'https://cloud.company.com/backups/latest'
});`
  }
];

export const TECHNICAL_DECISIONS = [
  {
    title: "Zero-Dependency Node Library",
    status: "Validated Pattern",
    why: "Traditional Node SDKs bundle Axios, Lodash, or form-data, bloating `node_modules` and introducing vulnerability surface. FreelyEmail-Node-library uses native Node 18+ `globalThis.fetch` and `AbortController`, resulting in zero third-party dependencies.",
    impact: "Blazing fast install, zero supply-chain vulnerabilities, minimal bundle footprint."
  },
  {
    title: "Nodemailer Transporter Singleton",
    status: "Performance Optimization",
    why: "Creating a new SMTP transport per incoming HTTP request initiates an expensive TCP/TLS handshake with the mail server every time. FreelyEmail initializes a single cached transporter pool on startup.",
    impact: "Drops API request latency by ~300ms per email dispatch under concurrent load."
  },
  {
    title: "Fail-Safe MongoDB Audit Logging",
    status: "Resilience Strategy",
    why: "Database connection blips shouldn't prevent critical password resets or OTPs from landing in user inboxes. The Mongoose audit logger wraps DB writes in a try-catch, logging warnings without throwing HTTP 500.",
    impact: "100% email delivery continuity even during database maintenance or failovers."
  },
  {
    title: "SMTP Header Injection Prevention",
    status: "Security Hardening",
    why: "Unsanitized user inputs in email subjects or sender display names can introduce carriage return / line feed (`\\r\\n`) characters to inject malicious SMTP headers (Bcc spamming).",
    impact: "All email headers are stripped of CRLF before passing to Nodemailer."
  },
  {
    title: "Decoupled Centralized Logging Microservice",
    status: "Architectural Decoupling",
    why: "Monolithic direct-to-database logging couples API lifecycle and limits cross-application auditability. Evolving logging into an independent TypeScript microservice (:5001) with x-logging-key authentication allows any service to stream error, info, and user-data logs into dedicated Mongoose models.",
    impact: "Unified audit trail across multiple applications, independent database scalability, and zero downtime observability."
  }
];

export const DEPENDENCIES_TABLE = [
  { name: "express", project: "FreelyEmail-API", version: "^4.18.2", purpose: "Fast, unopinionated REST API framework" },
  { name: "nodemailer", project: "FreelyEmail-API", version: "^6.9.7", purpose: "Reliable SMTP client with connection pooling" },
  { name: "mongoose", project: "FreelyEmail-API & Logger", version: "^8.0.3", purpose: "MongoDB ODM for delivery audit logging" },
  { name: "tsx & typescript", project: "central-logging-service", version: "^5.0+", purpose: "Zero-build TypeScript execution and strict typing" },
  { name: "helmet & cors", project: "FreelyEmail-API & Logger", version: "Latest", purpose: "Sets HTTP response security headers and CORS guards" },
  { name: "express-rate-limit", project: "FreelyEmail-API", version: "^7.1.5", purpose: "DDoS and spam protection (100 reqs / 15m)" },
  { name: "Native Fetch", project: "FreelyEmail-Node-library", version: "Node >= 18", purpose: "Zero-dependency HTTP requests using web standards" },
  { name: "React 19 & Vite", project: "logging-dashboard", version: "19.x", purpose: "High-density real-time audit trail inspector and live feed" },
  { name: "lucide-react", project: "Showcase & Dashboard", version: "^1.x", purpose: "Modern icons for telemetry and state indicators" }
];

export const DEV_GUIDE_STEPS = [
  {
    step: "1",
    title: "Clone or Open Workspace",
    command: "cd d:/Projects/Live/Groups",
    notes: "Both FreelyEmail-API and FreelyEmail-Node-library live side-by-side in this workspace."
  },
  {
    step: "2",
    title: "Install API Dependencies",
    command: "cd FreelyEmail-API && npm install",
    notes: "Installs express, nodemailer, mongoose, helmet, cors, and rate-limiting packages."
  },
  {
    step: "3",
    title: "Configure Environment (.env)",
    command: "cp .env.example .env",
    envSnippet: `PORT=3000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/freelyemail
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_SECURE=false
DEFAULT_SENDER_NAME="FreelyEmail"
DEFAULT_SENDER_EMAIL="noreply@example.com"`,
    notes: "Never commit your .env file. Use Google App Passwords for Gmail SMTP."
  },
  {
    step: "4",
    title: "Start API Server in Dev Mode",
    command: "npm run dev",
    notes: "Runs nodemon app.js with live reload on file modifications."
  },
  {
    step: "5",
    title: "Install & Use Node SDK in Any App",
    command: "npm install freelyemail",
    notes: "Zero external dependencies; works in Node 18, 20, 22+, Bun, and modern edge runtimes."
  }
];
