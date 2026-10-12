import { Mail } from 'lucide-react';
import { ECOSYSTEM_URLS } from '../data/projectData';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="footer-wrapper">
      <div className="container footer-container">
        
        {/* Left Column: Brand & Info */}
        <div className="footer-brand-col">
          <div className="footer-brand-title">
            <div className="brand-logo-icon">
              <Mail size={18} color="#ffffff" />
            </div>
            <span>FreelyEmail</span>
          </div>
          <p className="footer-tagline">
            Lightweight, high-reliability transactional email infrastructure for modern Node.js applications.
          </p>
          <div className="footer-status-pill">
            <span className="status-dot"></span>
            <span>All Systems Operational &bull; Zero SDK Dependencies</span>
          </div>
        </div>

        {/* Navigation Quick Links */}
        <div className="footer-links-col">
          <h5 className="footer-heading">Documentation</h5>
          <ul className="footer-links-list">
            <li><button onClick={() => setActiveTab('overview')}>Overview & Highlights</button></li>
            <li><button onClick={() => setActiveTab('architecture')}>Architecture & Lifecycle</button></li>
            <li><button onClick={() => setActiveTab('playground')}>API Endpoint Explorer</button></li>
            <li><button onClick={() => setActiveTab('sdk')}>Node.js Client SDK</button></li>
            <li><button onClick={() => setActiveTab('templates')}>Email Template Previewer</button></li>
          </ul>
        </div>

        {/* Resources & Workspace Reference */}
        <div className="footer-links-col">
          <h5 className="footer-heading">Ecosystem & Services</h5>
          <ul className="footer-links-list">
            <li>
              <span className="footer-repo-label">Email API:</span>
              <a href={ECOSYSTEM_URLS.MAIL_API} target="_blank" rel="noopener noreferrer" className="footer-repo-path">
                <code>freelyemail-api.harshit107.online</code>
              </a>
            </li>
            <li>
              <span className="footer-repo-label">Logging Service:</span>
              <a href={ECOSYSTEM_URLS.LOGGER_API} target="_blank" rel="noopener noreferrer" className="footer-repo-path">
                <code>logger-api.harshit107.online</code>
              </a>
            </li>
            <li>
              <span className="footer-repo-label">Logging UI:</span>
              <a href={ECOSYSTEM_URLS.LOGGER_UI} target="_blank" rel="noopener noreferrer" className="footer-repo-path">
                <code>logger.harshit107.online</code>
              </a>
            </li>
            <li>
              <span className="footer-repo-label">Showcase UI:</span>
              <a href={ECOSYSTEM_URLS.SHOWCASE_UI} target="_blank" rel="noopener noreferrer" className="footer-repo-path">
                <code>freelyemail.harshit107.online</code>
              </a>
            </li>
            <li>
              <span className="footer-repo-label">Client SDK:</span>
              <a href={ECOSYSTEM_URLS.REPOS.SDK} target="_blank" rel="noopener noreferrer" className="footer-repo-path">
                <code>FreelyEmail-Node-library</code>
              </a>
            </li>
          </ul>
        </div>

      </div>

      <div className="container footer-bottom-row">
        <p className="footer-copyright">
          &copy; 2026 FreelyEmail Ecosystem. MIT Licensed. Built with React & Vite.
        </p>
        <div className="footer-badges">
          <span className="badge badge-indigo">Node.js 18+</span>
          <span className="badge badge-emerald">Native Fetch</span>
          <span className="badge badge-cyan">Mongoose Fail-Safe</span>
        </div>
      </div>
    </footer>
  );
}
