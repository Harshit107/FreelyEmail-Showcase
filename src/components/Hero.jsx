import { useState } from 'react';
import { ECOSYSTEM_INFO } from '../data/projectData';
import { ArrowRight, Zap, Server, Package, MailCheck, Copy, Check } from 'lucide-react';

export default function Hero({ setActiveTab }) {
  const [copiedInstall, setCopiedInstall] = useState(false);

  const copyInstallCmd = () => {
    navigator.clipboard.writeText('npm install freelyemail');
    setCopiedInstall(true);
    setTimeout(() => setCopiedInstall(false), 2000);
  };

  return (
    <section className="hero-section">
      <div className="container hero-container">
        
        {/* Top Announcement Pill */}
        <div className="hero-pill-badge">
          <span className="pill-dot"></span>
          <span className="pill-text">FreelyEmail Ecosystem v1.0 Released</span>
          <span className="pill-sub">Zero-Dependency Node SDK &bull; Express API</span>
        </div>

        {/* Hero Title & Pitch */}
        <h1 className="hero-headline">
          Transactional Emails for Node.js,
          <br />
          <span className="hero-headline-gradient">Without the Friction.</span>
        </h1>

        <p className="hero-subtext">
          A coupled, resilient email delivery ecosystem designed for developer speed.
          Includes an Express REST service with fail-safe MongoDB logging and an ultra-lightweight
          Node 18+ client library built with zero external dependencies.
        </p>

        {/* Quick Action Buttons */}
        <div className="hero-actions">
          <button 
            className="btn btn-primary"
            onClick={() => setActiveTab('playground')}
          >
            <span>Launch API Playground</span>
            <ArrowRight size={16} />
          </button>

          <button 
            className="btn btn-secondary"
            onClick={() => setActiveTab('sdk')}
          >
            <Package size={16} />
            <span>Explore Node SDK</span>
          </button>

          <button 
            className="btn btn-secondary"
            onClick={() => setActiveTab('templates')}
          >
            <MailCheck size={16} />
            <span>Live Template Sandbox</span>
          </button>
        </div>

        {/* Quick Install Snippet */}
        <div className="hero-install-box glass-panel">
          <div className="install-prompt">
            <span className="install-dollar">$</span>
            <span className="install-code">npm install freelyemail</span>
          </div>
          <button 
            className="install-copy-btn" 
            onClick={copyInstallCmd}
            title="Copy command"
          >
            {copiedInstall ? (
              <span className="copied-label"><Check size={14} /> Copied!</span>
            ) : (
              <Copy size={14} />
            )}
          </button>
        </div>

        {/* Ecosystem Key Metrics Grid */}
        <div className="hero-stats-grid">
          {ECOSYSTEM_INFO.stats.map((stat, idx) => (
            <div key={idx} className="stat-card glass-panel">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-note">{stat.note}</div>
            </div>
          ))}
        </div>

        {/* Dual Project Overview Cards */}
        <div className="hero-repos-grid">
          {ECOSYSTEM_INFO.repos.map((repo, idx) => (
            <div key={idx} className="repo-card glass-panel">
              <div className="repo-card-header">
                <div className="repo-type-badge">
                  {repo.type === 'REST Service' ? <Server size={14} /> : <Package size={14} />}
                  <span>{repo.type}</span>
                </div>
                <span className="repo-role-tag">{repo.role}</span>
              </div>

              <h3 className="repo-name">{repo.name}</h3>
              <p className="repo-summary">{repo.summary}</p>

              <div className="repo-tech-pill">
                <Zap size={13} color="var(--accent-cyan)" />
                <span>{repo.language}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
