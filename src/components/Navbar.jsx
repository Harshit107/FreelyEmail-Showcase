import { useState } from 'react';
import { Mail, Moon, Sun, Search, Terminal, Code2, Layers, Cpu, BookOpen, Send } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, theme, toggleTheme }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

  const searchItems = [
    { title: 'Overview & Ecosystem', tab: 'overview', icon: Layers },
    { title: 'Architecture & Flow', tab: 'architecture', icon: Cpu },
    { title: 'API Playground (POST /emails/otp/request)', tab: 'playground', icon: Send },
    { title: 'API Playground (POST /emails/otp/send)', tab: 'playground', icon: Send },
    { title: 'API Playground (POST /emails/verification/link)', tab: 'playground', icon: Send },
    { title: 'API Playground (POST /emails/send)', tab: 'playground', icon: Send },
    { title: 'Node.js SDK (FreelyEmailClient)', tab: 'sdk', icon: Code2 },
    { title: 'Live Email Template Previewer', tab: 'templates', icon: Mail },
    { title: 'Dependencies & Design Decisions', tab: 'tech', icon: Terminal },
    { title: 'Developer & Setup Guide (.env)', tab: 'guide', icon: BookOpen },
  ];

  const filteredItems = query.trim()
    ? searchItems.filter(item => item.title.toLowerCase().includes(query.toLowerCase()))
    : searchItems;

  const handleSelect = (tab) => {
    setActiveTab(tab);
    setSearchOpen(false);
    setQuery('');
  };

  return (
    <header className="navbar-wrapper">
      <div className="container navbar-container">
        {/* Brand Logo */}
        <div className="navbar-brand" onClick={() => setActiveTab('overview')}>
          <div className="brand-logo-icon">
            <Mail size={20} color="#ffffff" />
          </div>
          <div className="brand-text">
            <span className="brand-name">FreelyEmail</span>
            <span className="brand-badge">Dev Portal</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="navbar-nav">
          <button 
            className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`nav-link ${activeTab === 'architecture' ? 'active' : ''}`}
            onClick={() => setActiveTab('architecture')}
          >
            Architecture
          </button>
          <button 
            className={`nav-link ${activeTab === 'playground' ? 'active' : ''}`}
            onClick={() => setActiveTab('playground')}
          >
            API Playground
          </button>
          <button 
            className={`nav-link ${activeTab === 'sdk' ? 'active' : ''}`}
            onClick={() => setActiveTab('sdk')}
          >
            Node SDK
          </button>
          <button 
            className={`nav-link ${activeTab === 'templates' ? 'active' : ''}`}
            onClick={() => setActiveTab('templates')}
          >
            Email Templates
          </button>
          <button 
            className={`nav-link ${activeTab === 'tech' ? 'active' : ''}`}
            onClick={() => setActiveTab('tech')}
          >
            Dependencies
          </button>
          <button 
            className={`nav-link ${activeTab === 'guide' ? 'active' : ''}`}
            onClick={() => setActiveTab('guide')}
          >
            Dev Guide
          </button>
        </nav>

        {/* Right Action Icons */}
        <div className="navbar-actions">
          {/* Quick Search Button */}
          <button 
            className="search-trigger-btn"
            onClick={() => setSearchOpen(true)}
            title="Search docs (Ctrl+K)"
          >
            <Search size={15} />
            <span className="search-text">Search...</span>
            <kbd className="search-kbd">⌘K</kbd>
          </button>

          {/* Theme Toggle */}
          <button 
            className="icon-btn theme-toggle" 
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Version Pill */}
          <div className="version-pill">
            v1.0.0
          </div>
        </div>
      </div>

      {/* Quick Search Modal */}
      {searchOpen && (
        <div className="search-modal-overlay" onClick={() => setSearchOpen(false)}>
          <div className="search-modal-box glass-panel" onClick={(e) => e.stopPropagation()}>
            <div className="search-input-row">
              <Search size={18} className="search-modal-icon" />
              <input
                type="text"
                placeholder="Search topics, endpoints, SDK methods..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
                className="search-modal-input"
              />
              <button className="search-close-btn" onClick={() => setSearchOpen(false)}>ESC</button>
            </div>
            
            <div className="search-results-list">
              {filteredItems.length > 0 ? (
                filteredItems.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="search-result-item"
                      onClick={() => handleSelect(item.tab)}
                    >
                      <Icon size={16} className="search-result-icon" />
                      <span className="search-result-title">{item.title}</span>
                      <span className="search-result-badge">{item.tab}</span>
                    </div>
                  );
                })
              ) : (
                <div className="search-empty">No results found for "{query}"</div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
