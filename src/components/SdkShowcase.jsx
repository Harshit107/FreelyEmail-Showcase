import { useState } from 'react';
import { SDK_METHODS } from '../data/projectData';
import { Package, Code2, Check, Copy, AlertTriangle, ShieldCheck, Cpu } from 'lucide-react';

export default function SdkShowcase() {
  const [langTab, setLangTab] = useState('cjs'); // 'cjs' | 'ts'
  const [selectedMethod, setSelectedMethod] = useState(SDK_METHODS[0]);
  const [copied, setCopied] = useState(false);

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clientInitSnippetCJS = `const { FreelyEmailClient } = require('freelyemail');

// Initialize the client instance
const client = new FreelyEmailClient({
  baseUrl: process.env.EMAIL_API_URL || 'http://localhost:3000/api/v1',
  defaultSender: 'FreelyEmail Service',
  defaultApp: 'My Application',
  timeout: 10000 // Timeout in ms (defaults to 10s via AbortController)
});`;

  const clientInitSnippetTS = `import { FreelyEmailClient, ClientConfig } from 'freelyemail';

// Fully typed configuration
const config: ClientConfig = {
  baseUrl: process.env.EMAIL_API_URL || 'http://localhost:3000/api/v1',
  defaultSender: 'FreelyEmail Service',
  defaultApp: 'My Application',
  timeout: 10000
};

const client = new FreelyEmailClient(config);`;

  return (
    <div className="section-container animate-fade-in">
      <div className="section-header">
        <div className="badge badge-emerald">
          <Package size={13} />
          <span>Client Library</span>
        </div>
        <h2 className="section-title">FreelyEmail Node.js SDK</h2>
        <p className="section-subtitle">
          A lean, zero-dependency client library built for Node.js 18+ utilizing native web standards and TypeScript typings.
        </p>
      </div>

      {/* Feature Highlights Grid */}
      <div className="sdk-highlights-grid">
        <div className="sdk-feature-card glass-panel">
          <div className="feature-icon-box" style={{ color: 'var(--accent-emerald)' }}>
            <Cpu size={20} />
          </div>
          <h4>Zero Third-Party Dependencies</h4>
          <p>
            No Axios, no Undici, no Form-Data. Built on top of Node.js 18+ native <code>fetch</code> and <code>AbortController</code> to ensure zero supply-chain vulnerabilities and a featherlight footprint.
          </p>
        </div>

        <div className="sdk-feature-card glass-panel">
          <div className="feature-icon-box" style={{ color: 'var(--brand-primary-light)' }}>
            <Code2 size={20} />
          </div>
          <h4>First-Class TypeScript Typings</h4>
          <p>
            Comes bundled with comprehensive <code>index.d.ts</code> declarations offering full IntelliSense autocompletion for options, payloads, and response envelopes.
          </p>
        </div>

        <div className="sdk-feature-card glass-panel">
          <div className="feature-icon-box" style={{ color: 'var(--accent-cyan)' }}>
            <ShieldCheck size={20} />
          </div>
          <h4>Structured Error Handling</h4>
          <p>
            Throws distinct typed errors: <code>FreelyEmailValidationError</code> for bad client parameters and <code>FreelyEmailAPIError</code> for HTTP failures with raw error payloads preserved.
          </p>
        </div>
      </div>

      {/* Client Setup Code Card */}
      <div className="sdk-code-box glass-panel">
        <div className="sdk-code-top">
          <div className="sdk-tabs">
            <button 
              className={`sdk-tab-btn ${langTab === 'cjs' ? 'active' : ''}`}
              onClick={() => setLangTab('cjs')}
            >
              CommonJS (require)
            </button>
            <button 
              className={`sdk-tab-btn ${langTab === 'ts' ? 'active' : ''}`}
              onClick={() => setLangTab('ts')}
            >
              TypeScript / ESM (import)
            </button>
          </div>

          <button 
            className="copy-code-btn"
            onClick={() => copyCode(langTab === 'cjs' ? clientInitSnippetCJS : clientInitSnippetTS)}
          >
            {copied ? <Check size={14} color="var(--accent-emerald)" /> : <Copy size={14} />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        <pre className="sdk-pre">
          <code>{langTab === 'cjs' ? clientInitSnippetCJS : clientInitSnippetTS}</code>
        </pre>
      </div>

      {/* Interactive Method Reference */}
      <div className="sdk-method-explorer">
        <h3 className="sub-heading">Method Explorer</h3>
        
        <div className="method-layout-row">
          {/* Method List */}
          <div className="method-nav-column">
            {SDK_METHODS.map((m) => (
              <button
                key={m.name}
                className={`method-nav-item ${selectedMethod.name === m.name ? 'active' : ''}`}
                onClick={() => setSelectedMethod(m)}
              >
                <span className="method-prefix">client.</span>
                <span className="method-name-label">{m.name}()</span>
              </button>
            ))}
          </div>

          {/* Method Detail View */}
          <div className="method-display-card glass-panel">
            <div className="method-card-header">
              <div>
                <h4 className="method-func-title"><code>client.{selectedMethod.name}(options)</code></h4>
                <p className="method-func-desc">{selectedMethod.desc}</p>
              </div>
              <div className="method-return-badge">
                <span>Returns:</span>
                <code>{selectedMethod.returnType}</code>
              </div>
            </div>

            <div className="method-code-body">
              <pre>
                <code>{langTab === 'cjs' ? selectedMethod.exampleCJS : selectedMethod.exampleTS}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Error Handling Guide */}
      <div className="error-guide-box glass-panel">
        <div className="error-guide-header">
          <AlertTriangle size={20} color="var(--accent-amber)" />
          <h4>Robust Error Handling Pattern</h4>
        </div>
        <p className="error-guide-desc">
          Wrap SDK calls in standard <code>try / catch</code> blocks. The library guarantees standard JavaScript errors for network drops, and custom subclasses for API errors:
        </p>

        <pre className="error-code-block">
          <code>{`try {
  const result = await client.requestOtp({ recipient: 'user@example.com' });
  console.log('OTP dispatched:', result.data.otp);
} catch (error) {
  if (error instanceof FreelyEmailValidationError) {
    console.error('Invalid parameters supplied:', error.message);
  } else if (error instanceof FreelyEmailAPIError) {
    console.error(\`API returned status \${error.status}:\`, error.message, error.errorDetails);
  } else {
    console.error('Network or timeout failure:', error.message);
  }
}`}</code>
        </pre>
      </div>

    </div>
  );
}
