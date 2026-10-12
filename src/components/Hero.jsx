import { useState } from 'react';
import { ECOSYSTEM_INFO, ECOSYSTEM_URLS } from '../data/projectData';
import { ArrowRight, Zap, Server, Package, MailCheck, Copy, Check, ExternalLink, Activity, GitBranch, Layers } from 'lucide-react';

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
          <span className="pill-text">FreelyEmail Ecosystem v1.0 + Centralized Logging</span>
          <span className="pill-sub">4 Interconnected Projects &bull; TypeScript &bull; React 19</span>
        </div>

        {/* Hero Title & Pitch */}
        <h1 className="hero-headline">
          Transactional Emails for Node.js,
          <br />
          <span className="hero-headline-gradient">Without the Friction.</span>
        </h1>

        <p className="hero-subtext">
          A resilient, multi-service email and logging infrastructure designed for developer speed.
          Includes an Express REST API, a zero-dependency client SDK, a dedicated TypeScript Central Logging Microservice,
          and a real-time audit trail dashboard.
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

          <a 
            href={ECOSYSTEM_URLS.LOGGER_UI} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-secondary"
            title="Open Central Logging Dashboard"
          >
            <Activity size={16} className="text-indigo-400" />
            <span>Logging Dashboard</span>
            <ExternalLink size={13} />
          </a>

          <button 
            className="btn btn-secondary"
            onClick={() => setActiveTab('architecture')}
          >
            <Layers size={16} />
            <span>8-Step Architecture</span>
          </button>

          <button 
            className="btn btn-secondary"
            onClick={() => setActiveTab('sdk')}
          >
            <Package size={16} />
            <span>Node SDK</span>
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

        {/* 4 Connected Repositories Grid */}
        <div className="hero-repos-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {ECOSYSTEM_INFO.repos.map((repo, idx) => (
            <div key={idx} className="repo-card glass-panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div className="repo-card-header">
                  <div className="repo-type-badge">
                    {repo.type === 'REST Service' || repo.type === 'Microservice' ? <Server size={14} /> : repo.type === 'Web Application' ? <Activity size={14} /> : <Package size={14} />}
                    <span>{repo.type}</span>
                    {repo.port && <span style={{ opacity: 0.8, fontSize: '11px', marginLeft: '4px' }}>{repo.port}</span>}
                  </div>
                  <span className="repo-role-tag">{repo.role}</span>
                </div>

                <h3 className="repo-name">{repo.name}</h3>
                <p className="repo-summary">{repo.summary}</p>
              </div>

              <div style={{ marginTop: '16px' }}>
                <div className="repo-tech-pill" style={{ marginBottom: '12px' }}>
                  <Zap size={13} color="var(--accent-cyan)" />
                  <span>{repo.language}</span>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {repo.githubUrl && (
                    <a
                      href={repo.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary btn-sm"
                      style={{ fontSize: '11px', padding: '4px 10px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      <GitBranch size={12} />
                      <span>GitHub</span>
                      <ExternalLink size={10} />
                    </a>
                  )}
                  {repo.liveUrl && (
                    <a
                      href={repo.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary btn-sm"
                      style={{ fontSize: '11px', padding: '4px 10px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      <Activity size={12} />
                      <span>Open Live</span>
                      <ExternalLink size={10} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

