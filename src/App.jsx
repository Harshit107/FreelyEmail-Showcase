import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ArchitectureView from './components/ArchitectureView';
import ApiPlayground from './components/ApiPlayground';
import SdkShowcase from './components/SdkShowcase';
import EmailSandbox from './components/EmailSandbox';
import TechStackView from './components/TechStackView';
import DevGuide from './components/DevGuide';
import Footer from './components/Footer';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [theme, setTheme] = useState('dark');

  // Sync theme with html root attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Handle Ctrl+K shortcut to focus search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // You could also open search modal if state is elevated
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-layout">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main Page Content */}
      <main className="main-content">
        {activeTab === 'overview' && (
          <>
            <Hero setActiveTab={handleTabChange} />
            <div className="container overview-jump-grid">
              <div 
                className="jump-card glass-panel"
                onClick={() => handleTabChange('architecture')}
              >
                <div className="jump-icon">🏗</div>
                <div className="jump-info">
                  <h4>Interactive Architecture</h4>
                  <p>Inspect the complete 7-layer request pipeline from client call to SMTP delivery.</p>
                </div>
              </div>

              <div 
                className="jump-card glass-panel"
                onClick={() => handleTabChange('playground')}
              >
                <div className="jump-icon">⚡</div>
                <div className="jump-info">
                  <h4>API Playground</h4>
                  <p>Simulate requests across all 4 endpoints with live response validation.</p>
                </div>
              </div>

              <div 
                className="jump-card glass-panel"
                onClick={() => handleTabChange('sdk')}
              >
                <div className="jump-icon">📦</div>
                <div className="jump-info">
                  <h4>Zero-Dependency SDK</h4>
                  <p>Explore native Node 18+ client methods, TypeScript declarations, and timeouts.</p>
                </div>
              </div>

              <div 
                className="jump-card glass-panel"
                onClick={() => handleTabChange('templates')}
              >
                <div className="jump-icon">✉</div>
                <div className="jump-info">
                  <h4>Live Email Sandbox</h4>
                  <p>Customize OTP, verification links, and notifications in real-time iframe preview.</p>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'architecture' && <ArchitectureView />}
        {activeTab === 'playground' && <ApiPlayground />}
        {activeTab === 'sdk' && <SdkShowcase />}
        {activeTab === 'templates' && <EmailSandbox />}
        {activeTab === 'tech' && <TechStackView />}
        {activeTab === 'guide' && <DevGuide />}
      </main>

      {/* Footer */}
      <Footer setActiveTab={handleTabChange} />
    </div>
  );
}
