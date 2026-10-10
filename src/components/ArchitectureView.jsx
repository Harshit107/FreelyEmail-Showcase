import { useState } from 'react';
import { ARCHITECTURE_LAYERS } from '../data/projectData';
import { Layers, ArrowRight, Database, Mail, Code, CheckCircle } from 'lucide-react';

export default function ArchitectureView() {
  const [selectedStep, setSelectedStep] = useState(ARCHITECTURE_LAYERS[0]);

  return (
    <div className="section-container animate-fade-in">
      <div className="section-header">
        <div className="badge badge-indigo">
          <Layers size={13} />
          <span>System Design</span>
        </div>
        <h2 className="section-title">Request Lifecycle & Architecture</h2>
        <p className="section-subtitle">
          How FreelyEmail routes, validates, renders, and transmits transactional messages with zero single-points-of-failure.
        </p>
      </div>

      {/* Interactive Step Track */}
      <div className="lifecycle-track-wrapper glass-panel">
        <div className="lifecycle-step-bar">
          {ARCHITECTURE_LAYERS.map((layer) => {
            const isSelected = selectedStep.id === layer.id;
            return (
              <button
                key={layer.id}
                className={`lifecycle-step-node ${isSelected ? 'active' : ''}`}
                onClick={() => setSelectedStep(layer)}
              >
                <div className="node-number">{layer.step}</div>
                <div className="node-label-group">
                  <span className="node-title">{layer.title}</span>
                  <span className="node-subtitle">{layer.subtitle}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Step Deep Dive Inspector */}
        <div className="lifecycle-detail-panel">
          <div className="detail-header">
            <div className="detail-step-badge">
              Step {selectedStep.step} of 7: {selectedStep.title}
            </div>
            <span className="detail-file-location">{selectedStep.subtitle}</span>
          </div>

          <p className="detail-description">{selectedStep.desc}</p>

          <div className="code-viewer-box">
            <div className="code-viewer-header">
              <span className="code-lang-tag">JavaScript / Node.js</span>
              <span className="code-status">Active Code Pattern</span>
            </div>
            <pre className="code-content">
              <code>{selectedStep.code}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Resilience Highlight: Fail-Safe Pattern Callout */}
      <div className="resilience-callout-grid">
        <div className="resilience-card glass-panel">
          <div className="resilience-card-icon" style={{ color: 'var(--accent-emerald)' }}>
            <Database size={24} />
          </div>
          <div className="resilience-content">
            <h4 className="resilience-title">Fail-Safe Database Logging</h4>
            <p className="resilience-desc">
              Transactional email delivery (password resets, OTP codes) should never fail due to intermittent MongoDB connection issues.
              FreelyEmail wraps email log persistence in an asynchronous catch block, guaranteeing that <strong>successful SMTP dispatches return 200 OK</strong> to the client even if the audit database is temporarily unavailable.
            </p>
          </div>
        </div>

        <div className="resilience-card glass-panel">
          <div className="resilience-card-icon" style={{ color: 'var(--accent-cyan)' }}>
            <Mail size={24} />
          </div>
          <div className="resilience-content">
            <h4 className="resilience-title">Persistent SMTP Transporter Singleton</h4>
            <p className="resilience-desc">
              Rather than paying a 250ms+ handshake penalty per request by spawning Nodemailer transporters on demand, FreelyEmail maintains a single pooled transporter instance across the Node.js process lifespan, dramatically speeding up burst throughput.
            </p>
          </div>
        </div>
      </div>

      {/* Coupling Diagram */}
      <div className="coupling-architecture-box glass-panel">
        <h3 className="coupling-title">Ecosystem Decoupling Model</h3>
        <div className="coupling-columns">
          <div className="coupling-col">
            <div className="col-header">
              <Code size={18} color="var(--brand-primary-light)" />
              <h4>FreelyEmail-Node-library</h4>
            </div>
            <ul className="coupling-list">
              <li><CheckCircle size={14} color="var(--accent-emerald)" /> Zero external npm dependencies</li>
              <li><CheckCircle size={14} color="var(--accent-emerald)" /> Native Node 18+ <code>globalThis.fetch</code></li>
              <li><CheckCircle size={14} color="var(--accent-emerald)" /> TypeScript declaration types out of the box</li>
              <li><CheckCircle size={14} color="var(--accent-emerald)" /> Configurable AbortController request timeout</li>
            </ul>
          </div>

          <div className="coupling-divider">
            <span className="divider-label">HTTP / REST</span>
            <ArrowRight size={20} className="divider-icon" />
          </div>

          <div className="coupling-col">
            <div className="col-header">
              <Server size={18} color="var(--accent-cyan)" />
              <h4>FreelyEmail-API</h4>
            </div>
            <ul className="coupling-list">
              <li><CheckCircle size={14} color="var(--accent-emerald)" /> Express 4.x REST routing</li>
              <li><CheckCircle size={14} color="var(--accent-emerald)" /> Nodemailer SMTP connection pooling</li>
              <li><CheckCircle size={14} color="var(--accent-emerald)" /> Cryptographic OTP creation with <code>crypto.randomInt</code></li>
              <li><CheckCircle size={14} color="var(--accent-emerald)" /> Header injection sanitization (CRLF defense)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function Server(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
      <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
      <line x1="6" x2="6.01" y1="6" y2="6" />
      <line x1="6" x2="6.01" y1="18" y2="18" />
    </svg>
  );
}
