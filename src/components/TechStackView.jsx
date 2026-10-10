import { DEPENDENCIES_TABLE, TECHNICAL_DECISIONS } from '../data/projectData';
import { Terminal, Lock } from 'lucide-react';

export default function TechStackView() {
  return (
    <div className="section-container animate-fade-in">
      <div className="section-header">
        <div className="badge badge-amber">
          <Terminal size={13} />
          <span>Architecture & Libraries</span>
        </div>
        <h2 className="section-title">Dependencies & Technical Decisions</h2>
        <p className="section-subtitle">
          Engineered for minimal footprint, maximum throughput, and zero external baggage.
        </p>
      </div>

      {/* Architectural Decisions Records (ADRs) */}
      <div className="adr-section">
        <h3 className="sub-heading">Key Architectural Decisions</h3>
        
        <div className="adr-grid">
          {TECHNICAL_DECISIONS.map((dec, idx) => (
            <div key={idx} className="adr-card glass-panel">
              <div className="adr-card-top">
                <span className="adr-status-tag">{dec.status}</span>
                <span className="adr-id">ADR-0{idx + 1}</span>
              </div>

              <h4 className="adr-title">{dec.title}</h4>
              <p className="adr-why">{dec.why}</p>

              <div className="adr-impact-box">
                <span className="impact-label">Engineered Outcome:</span>
                <span className="impact-text">{dec.impact}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dependencies Matrix Table */}
      <div className="deps-matrix-card glass-panel">
        <div className="deps-header-row">
          <div>
            <h3 className="deps-table-title">Libraries & Runtime Modules</h3>
            <p className="deps-table-desc">Audited packages across the API service and Client SDK.</p>
          </div>
          <span className="badge badge-indigo">9 Core Packages</span>
        </div>

        <div className="table-responsive">
          <table className="deps-table">
            <thead>
              <tr>
                <th>Package Name</th>
                <th>Target Subproject</th>
                <th>Version</th>
                <th>Primary Role & Responsibility</th>
              </tr>
            </thead>
            <tbody>
              {DEPENDENCIES_TABLE.map((dep, idx) => (
                <tr key={idx}>
                  <td>
                    <code className="pkg-name">{dep.name}</code>
                  </td>
                  <td>
                    <span className={`project-pill ${dep.project.includes('API') ? 'api-pill' : 'sdk-pill'}`}>
                      {dep.project}
                    </span>
                  </td>
                  <td>
                    <span className="pkg-version">{dep.version}</span>
                  </td>
                  <td className="pkg-purpose">{dep.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Security & Validation Deep Dive */}
      <div className="security-deep-dive glass-panel">
        <div className="security-title-row">
          <Lock size={20} color="var(--accent-cyan)" />
          <h3>Security & Request Hardening</h3>
        </div>

        <div className="security-grid">
          <div className="security-card">
            <h5 className="sec-topic">SMTP Header Injection Defense</h5>
            <p className="sec-desc">
              All string inputs destined for email subjects, sender names, or app names pass through <code>src/utils/validator.js</code>'s <code>sanitizeHeader()</code> function, which aggressively strips CR (<code>\r</code>) and LF (<code>\n</code>) characters to prevent header injection spam attacks.
            </p>
          </div>

          <div className="security-card">
            <h5 className="sec-topic">IP Rate Limiting</h5>
            <p className="sec-desc">
              Endpoints are shielded with <code>express-rate-limit</code> (100 requests per 15-minute window per IP) to prevent OTP flooding or abusive spam relay attempts.
            </p>
          </div>

          <div className="security-card">
            <h5 className="sec-topic">Helmet Security Headers</h5>
            <p className="sec-desc">
              Configures standard HTTP defensive headers including <code>Content-Security-Policy</code>, <code>X-Content-Type-Options: nosniff</code>, and <code>Strict-Transport-Security</code>.
            </p>
          </div>

          <div className="security-card">
            <h5 className="sec-topic">Input Validation Matrix</h5>
            <p className="sec-desc">
              Validates RFC-compliant email formats with regex, checks for non-empty trimmed strings, and enforces required fields before any SMTP socket connection is triggered.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
