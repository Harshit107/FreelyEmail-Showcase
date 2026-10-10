import { useState } from 'react';
import { DEV_GUIDE_STEPS } from '../data/projectData';
import { BookOpen, Check, Copy, ChevronDown, ChevronUp, FileCode } from 'lucide-react';

export default function DevGuide() {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [copiedEnv, setCopiedEnv] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const copyText = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const sampleEnv = `PORT=3000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/freelyemail

# SMTP Transporter Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-google-app-password
SMTP_SECURE=false

# Default Display Settings
DEFAULT_SENDER_NAME="FreelyEmail Notifications"
DEFAULT_SENDER_EMAIL="noreply@example.com"`;

  const copyEnvFile = () => {
    navigator.clipboard.writeText(sampleEnv);
    setCopiedEnv(true);
    setTimeout(() => setCopiedEnv(false), 2000);
  };

  const faqs = [
    {
      q: "What happens if MongoDB goes offline during an email send?",
      a: "FreelyEmail incorporates a fail-safe logging strategy in email.service.js. Email dispatches are primary; the audit record save is wrapped in a try/catch. If the database is disconnected, a non-blocking warning is logged on the server and the HTTP response still returns 200 OK with the valid messageId."
    },
    {
      q: "How do I configure Google Gmail as my SMTP provider?",
      a: "Enable 2-Step Verification on your Google Account, then generate a 16-character 'App Password' under Security > 2-Step Verification > App Passwords. Use this 16-character key as your SMTP_PASS with SMTP_HOST=smtp.gmail.com and SMTP_PORT=587."
    },
    {
      q: "Can I use custom branded HTML templates instead of the built-in ones?",
      a: "Yes! On both POST /api/v1/emails/send and the SDK's sendNotification, you can pass an HTMLfile (or html) string property. If provided, FreelyEmail bypasses the default template generator and directly renders your custom HTML."
    },
    {
      q: "Does the Node SDK work with TypeScript?",
      a: "Yes, FreelyEmail-Node-library ships with index.d.ts containing complete TypeScript definitions for the client constructor, all 4 dispatch methods, options, and error classes."
    }
  ];

  return (
    <div className="section-container animate-fade-in">
      <div className="section-header">
        <div className="badge badge-cyan">
          <BookOpen size={13} />
          <span>Setup & Maintenance</span>
        </div>
        <h2 className="section-title">Developer Guide & Operations</h2>
        <p className="section-subtitle">
          Everything you need to clone, configure, run, and integrate FreelyEmail locally and in production.
        </p>
      </div>

      {/* Step by Step Setup Flow */}
      <div className="steps-flow-container">
        <h3 className="sub-heading">Step-by-Step Installation</h3>

        <div className="steps-list">
          {DEV_GUIDE_STEPS.map((item, idx) => (
            <div key={idx} className="step-card glass-panel">
              <div className="step-badge-col">
                <span className="step-num">{item.step}</span>
              </div>

              <div className="step-content-col">
                <h4 className="step-title">{item.title}</h4>
                <p className="step-notes">{item.notes}</p>

                {item.command && (
                  <div className="step-command-box">
                    <span className="cmd-dollar">$</span>
                    <span className="cmd-text">{item.command}</span>
                    <button
                      className="cmd-copy-btn"
                      onClick={() => copyText(item.command, idx)}
                      title="Copy command"
                    >
                      {copiedIndex === idx ? (
                        <span className="copied-tag"><Check size={12} /> Copied</span>
                      ) : (
                        <Copy size={13} />
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Environment Variables Reference Card */}
      <div className="env-guide-card glass-panel">
        <div className="env-header-row">
          <div>
            <div className="env-title-group">
              <FileCode size={20} color="var(--brand-primary-light)" />
              <h3 className="env-title">Environment Variables Template (<code>.env</code>)</h3>
            </div>
            <p className="env-desc">Required variables for FreelyEmail-API. Never commit secrets to version control.</p>
          </div>

          <button className="copy-code-btn" onClick={copyEnvFile}>
            {copiedEnv ? <Check size={14} color="var(--accent-emerald)" /> : <Copy size={14} />}
            <span>{copiedEnv ? 'Copied .env' : 'Copy Template'}</span>
          </button>
        </div>

        <pre className="env-code-block">
          <code>{sampleEnv}</code>
        </pre>
      </div>

      {/* Troubleshooting & FAQ Accordion */}
      <div className="faq-section">
        <h3 className="sub-heading">Frequently Asked Questions & Troubleshooting</h3>

        <div className="faq-list">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="faq-item glass-panel">
                <button
                  className="faq-question-btn"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                >
                  <span className="faq-question-text">{faq.q}</span>
                  {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>

                {isOpen && (
                  <div className="faq-answer">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
