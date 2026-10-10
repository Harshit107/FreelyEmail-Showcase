import { useState } from 'react';
import { renderOtpTemplate, renderLinkTemplate, renderNotificationTemplate } from '../utils/templateRenderers';
import { Mail, Smartphone, Monitor, Copy, Check, Eye, Code } from 'lucide-react';

export default function EmailSandbox() {
  const [templateType, setTemplateType] = useState('otp'); // 'otp' | 'link' | 'notification'
  const [viewMode, setViewMode] = useState('preview'); // 'preview' | 'html'
  const [deviceView, setDeviceView] = useState('desktop'); // 'desktop' | 'mobile'
  const [copiedHtml, setCopiedHtml] = useState(false);

  // Form states for preview customization
  const [appName, setAppName] = useState('Acme Secure');
  const [otpCode, setOtpCode] = useState('849201');
  const [validMinutes, setValidMinutes] = useState(10);
  const [linkUrl, setLinkUrl] = useState('https://acme.org/auth/verify?token=7a8b9c');
  const [buttonText, setButtonText] = useState('Confirm My Email');
  const [subject, setSubject] = useState('Your Monthly Invoice is Available');
  const [message, setMessage] = useState('Your subscription invoice for October ($29.00) has been generated. Thank you for choosing our platform!');
  const [ctaText, setCtaText] = useState('View Statement');
  const [ctaUrl, setCtaUrl] = useState('https://acme.org/billing/invoices');

  // Compute rendered HTML string based on selected template
  const getRenderedHtml = () => {
    if (templateType === 'otp') {
      return renderOtpTemplate(appName, otpCode, validMinutes);
    }
    if (templateType === 'link') {
      return renderLinkTemplate(appName, linkUrl, validMinutes, buttonText);
    }
    return renderNotificationTemplate(appName, subject, message, ctaText, ctaUrl);
  };

  const currentHtml = getRenderedHtml();

  const copyHtml = () => {
    navigator.clipboard.writeText(currentHtml);
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 2000);
  };

  return (
    <div className="section-container animate-fade-in">
      <div className="section-header">
        <div className="badge badge-indigo">
          <Mail size={13} />
          <span>Live Visualizer</span>
        </div>
        <h2 className="section-title">Email Template Sandbox</h2>
        <p className="section-subtitle">
          Real-time interactive preview of FreelyEmail's built-in responsive email templates with live parameter customization.
        </p>
      </div>

      {/* Template Selector Pills */}
      <div className="template-picker-tabs">
        <button
          className={`template-tab ${templateType === 'otp' ? 'active' : ''}`}
          onClick={() => setTemplateType('otp')}
        >
          <span className="template-tab-icon">🔢</span>
          <span>OTP Verification</span>
        </button>
        <button
          className={`template-tab ${templateType === 'link' ? 'active' : ''}`}
          onClick={() => setTemplateType('link')}
        >
          <span className="template-tab-icon">🔗</span>
          <span>Link Verification</span>
        </button>
        <button
          className={`template-tab ${templateType === 'notification' ? 'active' : ''}`}
          onClick={() => setTemplateType('notification')}
        >
          <span className="template-tab-icon">📢</span>
          <span>Standard Notification</span>
        </button>
      </div>

      {/* Main Sandbox Grid: Configurator on Left, Live Render on Right */}
      <div className="sandbox-grid">
        
        {/* Left Column: Parameter Form */}
        <div className="sandbox-config-card glass-panel">
          <h4 className="config-title">Template Parameters</h4>
          
          <div className="config-fields">
            {/* Common: App Name */}
            <div className="field-group">
              <label>Application / Brand Name</label>
              <input
                type="text"
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
                placeholder="e.g. FreelyEmail, Acme Cloud"
              />
            </div>

            {/* OTP Specific */}
            {templateType === 'otp' && (
              <>
                <div className="field-group">
                  <label>OTP Code</label>
                  <input
                    type="text"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    maxLength={8}
                    placeholder="e.g. 849201"
                  />
                </div>
                <div className="field-group">
                  <label>Validity Duration (Minutes)</label>
                  <input
                    type="number"
                    value={validMinutes}
                    onChange={(e) => setValidMinutes(Number(e.target.value))}
                    min={1}
                    max={120}
                  />
                </div>
              </>
            )}

            {/* Link Specific */}
            {templateType === 'link' && (
              <>
                <div className="field-group">
                  <label>Verification Link URL</label>
                  <input
                    type="text"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    placeholder="https://..."
                  />
                </div>
                <div className="field-group">
                  <label>Action Button Text</label>
                  <input
                    type="text"
                    value={buttonText}
                    onChange={(e) => setButtonText(e.target.value)}
                    placeholder="e.g. Confirm My Email"
                  />
                </div>
                <div className="field-group">
                  <label>Validity Duration (Minutes)</label>
                  <input
                    type="number"
                    value={validMinutes}
                    onChange={(e) => setValidMinutes(Number(e.target.value))}
                    min={1}
                    max={120}
                  />
                </div>
              </>
            )}

            {/* Notification Specific */}
            {templateType === 'notification' && (
              <>
                <div className="field-group">
                  <label>Email Subject</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Subject line"
                  />
                </div>
                <div className="field-group">
                  <label>Message Content</label>
                  <textarea
                    rows="3"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Notification message body..."
                  />
                </div>
                <div className="field-group">
                  <label>CTA Button Text (Optional)</label>
                  <input
                    type="text"
                    value={ctaText}
                    onChange={(e) => setCtaText(e.target.value)}
                    placeholder="e.g. View Invoice"
                  />
                </div>
                <div className="field-group">
                  <label>CTA Button URL</label>
                  <input
                    type="text"
                    value={ctaUrl}
                    onChange={(e) => setCtaUrl(e.target.value)}
                    placeholder="https://..."
                  />
                </div>
              </>
            )}

            {/* Template Features Callout */}
            <div className="template-features-box">
              <span className="box-title">Client Compatibility:</span>
              <p>
                Tested and verified across Gmail (Web & iOS/Android), Apple Mail, Outlook Desktop, and Yahoo Mail with inline CSS and tabular fallback.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Live Viewport Preview / HTML Inspector */}
        <div className="sandbox-preview-container glass-panel">
          {/* Top Controls Bar */}
          <div className="preview-top-bar">
            {/* View Mode Toggle: Preview vs HTML Source */}
            <div className="mode-toggle-group">
              <button
                className={`mode-btn ${viewMode === 'preview' ? 'active' : ''}`}
                onClick={() => setViewMode('preview')}
              >
                <Eye size={14} />
                <span>Visual Preview</span>
              </button>
              <button
                className={`mode-btn ${viewMode === 'html' ? 'active' : ''}`}
                onClick={() => setViewMode('html')}
              >
                <Code size={14} />
                <span>HTML Code</span>
              </button>
            </div>

            {/* Device Viewport Toggle (Only visible in preview mode) */}
            {viewMode === 'preview' && (
              <div className="device-toggle-group">
                <button
                  className={`device-btn ${deviceView === 'desktop' ? 'active' : ''}`}
                  onClick={() => setDeviceView('desktop')}
                  title="Desktop View (540px)"
                >
                  <Monitor size={15} />
                  <span>Desktop</span>
                </button>
                <button
                  className={`device-btn ${deviceView === 'mobile' ? 'active' : ''}`}
                  onClick={() => setDeviceView('mobile')}
                  title="Mobile View (360px)"
                >
                  <Smartphone size={15} />
                  <span>Mobile</span>
                </button>
              </div>
            )}

            {/* Copy Button */}
            <button className="copy-code-btn" onClick={copyHtml}>
              {copiedHtml ? <Check size={14} color="var(--accent-emerald)" /> : <Copy size={14} />}
              <span>{copiedHtml ? 'Copied HTML' : 'Copy HTML'}</span>
            </button>
          </div>

          {/* Render Area */}
          <div className="preview-canvas">
            {viewMode === 'preview' ? (
              <div className={`email-viewport-frame ${deviceView === 'mobile' ? 'mobile-frame' : 'desktop-frame'}`}>
                <div className="frame-header-indicator">
                  <span className="dot dot-red"></span>
                  <span className="dot dot-yellow"></span>
                  <span className="dot dot-green"></span>
                  <span className="frame-title">Inbox Client Simulation &bull; {appName}</span>
                </div>
                <iframe
                  title="Live Email Template Preview"
                  srcDoc={currentHtml}
                  className="email-iframe"
                />
              </div>
            ) : (
              <div className="html-source-view">
                <pre>
                  <code>{currentHtml}</code>
                </pre>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
