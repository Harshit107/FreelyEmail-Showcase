import { useState } from 'react';
import { API_ENDPOINTS } from '../data/projectData';
import { Check, Copy, Play, RefreshCw, Terminal } from 'lucide-react';

export default function ApiPlayground() {
  const [selectedEndpoint, setSelectedEndpoint] = useState(API_ENDPOINTS[0]);
  const [requestBody, setRequestBody] = useState(selectedEndpoint.defaultBody);
  const [clientType, setClientType] = useState('sdk'); // 'sdk' | 'fetch' | 'curl'
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // When changing endpoint, sync default body
  const handleEndpointChange = (ep) => {
    setSelectedEndpoint(ep);
    setRequestBody(ep.defaultBody);
    setResponse(null);
  };

  const handleFieldChange = (key, value) => {
    setRequestBody(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const executeSimulatedRequest = () => {
    setLoading(true);
    setResponse(null);

    setTimeout(() => {
      // Check required fields
      let isValid = true;
      let missingFields = [];

      selectedEndpoint.fields.forEach(f => {
        if (f.required && (!requestBody[f.name] || requestBody[f.name].toString().trim() === '')) {
          isValid = false;
          missingFields.push(f.name);
        }
      });

      if (!isValid) {
        setResponse({
          status: 400,
          statusText: "Bad Request",
          time: 24,
          data: {
            success: false,
            data: null,
            message: `Validation error: ${missingFields.join(', ')} is required`,
            error: {
              code: "VALIDATION_ERROR",
              details: missingFields.map(f => `${f} is required`)
            }
          }
        });
      } else {
        // Build realistic mock response matching FreelyEmail's format
        let customData = { ...selectedEndpoint.sampleResponse.data };
        if (selectedEndpoint.id === 'otp_request') {
          // generate random 6 digit OTP for the demo
          customData.otp = Math.floor(100000 + Math.random() * 900000).toString();
        }

        setResponse({
          status: 200,
          statusText: "OK",
          time: Math.floor(65 + Math.random() * 45),
          data: {
            ...selectedEndpoint.sampleResponse,
            data: customData
          }
        });
      }
      setLoading(false);
    }, 450);
  };

  // Generate code snippet dynamically based on current form inputs
  const generateSnippet = () => {
    const jsonStr = JSON.stringify(requestBody, null, 2);

    if (clientType === 'curl') {
      return `curl -X POST http://localhost:3000${selectedEndpoint.path} \\
  -H "Content-Type: application/json" \\
  -d '${JSON.stringify(requestBody)}'`;
    }

    if (clientType === 'fetch') {
      return `const response = await fetch('http://localhost:3000${selectedEndpoint.path}', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(${jsonStr})
});
const result = await response.json();
console.log(result);`;
    }

    // Default SDK
    let sdkMethodName = 'sendNotification';
    if (selectedEndpoint.id === 'otp_request') sdkMethodName = 'requestOtp';
    if (selectedEndpoint.id === 'otp_send') sdkMethodName = 'sendOtp';
    if (selectedEndpoint.id === 'link_verification') sdkMethodName = 'sendLinkVerification';

    return `const { FreelyEmailClient } = require('freelyemail');

const client = new FreelyEmailClient({
  baseUrl: 'http://localhost:3000/api/v1'
});

const result = await client.${sdkMethodName}(${jsonStr});
console.log(result);`;
  };

  const copyCodeSnippet = () => {
    navigator.clipboard.writeText(generateSnippet());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="section-container animate-fade-in">
      <div className="section-header">
        <div className="badge badge-cyan">
          <Terminal size={13} />
          <span>Interactive Sandbox</span>
        </div>
        <h2 className="section-title">API Playground & Endpoint Explorer</h2>
        <p className="section-subtitle">
          Test real endpoint payloads, inspect server validation responses, and export instant cURL or SDK code snippets.
        </p>
      </div>

      {/* Endpoint Tabs Selector */}
      <div className="endpoint-selector-tabs">
        {API_ENDPOINTS.map((ep) => {
          const isSelected = selectedEndpoint.id === ep.id;
          return (
            <button
              key={ep.id}
              className={`endpoint-tab-btn ${isSelected ? 'active' : ''}`}
              onClick={() => handleEndpointChange(ep)}
            >
              <span className="method-badge">POST</span>
              <span className="tab-path">{ep.path.replace('/api/v1/emails', '')}</span>
              <span className="tab-category">{ep.category}</span>
            </button>
          );
        })}
      </div>

      {/* Main Playground Workspace: Form on Left, Output & Code on Right */}
      <div className="playground-layout-grid">
        
        {/* Left Column: Request Builder */}
        <div className="playground-card glass-panel">
          <div className="card-top-bar">
            <div className="endpoint-meta">
              <span className="method-pill">POST</span>
              <span className="endpoint-full-path">{selectedEndpoint.path}</span>
            </div>
            <button 
              className="btn btn-secondary btn-sm" 
              onClick={() => setRequestBody(selectedEndpoint.defaultBody)}
              title="Reset fields to defaults"
            >
              <RefreshCw size={13} />
              <span>Reset</span>
            </button>
          </div>

          <div className="endpoint-info-box">
            <h4 className="info-title">{selectedEndpoint.title}</h4>
            <p className="info-desc">{selectedEndpoint.desc}</p>
          </div>

          {/* Form Fields */}
          <div className="request-fields-container">
            <h5 className="fields-heading">Request Body Parameters</h5>
            {selectedEndpoint.fields.map((field) => (
              <div key={field.name} className="field-group">
                <div className="field-label-row">
                  <span className="field-name">
                    {field.name}
                    {field.required && <span className="field-required">*</span>}
                  </span>
                  <span className="field-type">{field.type}</span>
                </div>

                {field.name === 'message' ? (
                  <textarea
                    rows="3"
                    value={requestBody[field.name] || ''}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                    placeholder={field.desc}
                  />
                ) : (
                  <input
                    type={field.type.includes('number') ? 'number' : 'text'}
                    value={requestBody[field.name] ?? ''}
                    onChange={(e) => handleFieldChange(field.name, field.type.includes('number') ? Number(e.target.value) : e.target.value)}
                    placeholder={field.desc}
                  />
                )}
                <span className="field-hint">{field.desc}</span>
              </div>
            ))}
          </div>

          {/* Execute Button */}
          <div className="execute-row">
            <button
              className="btn btn-primary execute-btn"
              onClick={executeSimulatedRequest}
              disabled={loading}
            >
              {loading ? (
                <>
                  <RefreshCw size={16} className="spin-icon" />
                  <span>Transmitting...</span>
                </>
              ) : (
                <>
                  <Play size={16} fill="currentColor" />
                  <span>Send Request</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Code Generator & Live Response */}
        <div className="playground-output-column">
          
          {/* Code Generator Card */}
          <div className="playground-card glass-panel">
            <div className="code-tabs-row">
              <div className="code-lang-tabs">
                <button 
                  className={`code-tab ${clientType === 'sdk' ? 'active' : ''}`}
                  onClick={() => setClientType('sdk')}
                >
                  Node SDK
                </button>
                <button 
                  className={`code-tab ${clientType === 'fetch' ? 'active' : ''}`}
                  onClick={() => setClientType('fetch')}
                >
                  fetch()
                </button>
                <button 
                  className={`code-tab ${clientType === 'curl' ? 'active' : ''}`}
                  onClick={() => setClientType('curl')}
                >
                  cURL
                </button>
              </div>

              <button className="copy-code-btn" onClick={copyCodeSnippet}>
                {copiedCode ? <Check size={14} color="var(--accent-emerald)" /> : <Copy size={14} />}
                <span>{copiedCode ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <div className="code-display-body">
              <pre>
                <code>{generateSnippet()}</code>
              </pre>
            </div>
          </div>

          {/* Live Response Card */}
          <div className="playground-card glass-panel response-panel">
            <div className="response-header-row">
              <span className="response-title">API Response</span>
              {response && (
                <div className="response-status-badge">
                  <span className={`status-pill ${response.status === 200 ? 'status-ok' : 'status-err'}`}>
                    {response.status} {response.statusText}
                  </span>
                  <span className="latency-pill">{response.time}ms</span>
                </div>
              )}
            </div>

            {loading ? (
              <div className="response-loading-state">
                <RefreshCw size={24} className="spin-icon" />
                <span>Simulating backend controller & Nodemailer delivery...</span>
              </div>
            ) : response ? (
              <div className="response-content-wrapper">
                <pre className="response-json">
                  <code>{JSON.stringify(response.data, null, 2)}</code>
                </pre>
              </div>
            ) : (
              <div className="response-placeholder-state">
                <Terminal size={32} color="var(--text-muted)" />
                <p>Click <strong>"Send Request"</strong> to execute this call and inspect the live JSON response.</p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
