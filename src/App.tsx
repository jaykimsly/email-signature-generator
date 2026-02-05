import React, { useState, useRef } from 'react';
import { FormData, Colors, Layout, BulkUser, TabType, PanelType } from './types';
import { DEFAULT_FORM_DATA, DEFAULT_COLORS, DEFAULT_LAYOUT, PATTERNS, PATTERN_NAMES } from './constants';
import { parseCSV, generateSignatureHTML, downloadCSVTemplate, downloadHTML } from './utils';
import { SignaturePreview } from './components/SignaturePreview';
import { InputField } from './components/InputField';
import { ColorPicker } from './components/ColorPicker';

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(DEFAULT_FORM_DATA);
  const [colors, setColors] = useState<Colors>(DEFAULT_COLORS);
  const [layout, setLayout] = useState<Layout>(DEFAULT_LAYOUT);
  const [logo, setLogo] = useState<string | null>(null);
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('desktop');
  const [activePanel, setActivePanel] = useState<PanelType>('content');
  const [bulkUsers, setBulkUsers] = useState<BulkUser[]>([]);
  const [showBulk, setShowBulk] = useState(false);
  const [selectedUserIdx, setSelectedUserIdx] = useState<number | null>(null);
  const [copySuccess, setCopySuccess] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const bgInputRef = useRef<HTMLInputElement>(null);
  const csvInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: string, value: string) => setFormData(p => ({ ...p, [field]: value }));
  const handleColorChange = (field: keyof Colors, value: string | number) => setColors(p => ({ ...p, [field]: value }));
  const handleLayoutChange = (field: keyof Layout, value: string | number | boolean) => setLayout(p => ({ ...p, [field]: value }));

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setLogo(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setBgImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleBulkUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const users = parseCSV(ev.target?.result as string);
      setBulkUsers(users);
      setShowBulk(true);
      if (users.length > 0) selectUser(0, users[0]);
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const selectUser = (idx: number, user: BulkUser) => {
    setSelectedUserIdx(idx);
    setFormData(p => ({ ...p, ...user }));
  };

  const copyToClipboard = async () => {
    const html = generateSignatureHTML(formData, colors, layout, { companyName: formData.companyName, tagline: formData.tagline, website: formData.website });
    try {
      await navigator.clipboard.writeText(html);
      setCopySuccess('copied');
      setTimeout(() => setCopySuccess(''), 3000);
    } catch {
      setCopySuccess('error');
      setTimeout(() => setCopySuccess(''), 3000);
    }
  };

  const downloadSingleHTML = () => {
    const html = generateSignatureHTML(formData, colors, layout, { companyName: formData.companyName, tagline: formData.tagline, website: formData.website });
    downloadHTML(html, `signature-${formData.name.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.html`);
  };

  const downloadAllSignatures = () => {
    if (bulkUsers.length === 0) return;
    let allHTML = '';
    bulkUsers.forEach((user, idx) => {
      const userData = { ...formData, ...user };
      allHTML += `<div style="margin:40px 0;border-bottom:2px solid #eee;padding-bottom:20px;"><h3>${idx + 1}. ${user.name}</h3>${generateSignatureHTML(userData, colors, layout, { companyName: formData.companyName, tagline: formData.tagline, website: formData.website })}</div>`;
    });
    downloadHTML(allHTML, 'all-signatures.html');
  };

  const tabs: { id: PanelType; label: string }[] = [
    { id: 'content', label: 'Content' },
    { id: 'colors', label: 'Colors' },
    { id: 'layout', label: 'Layout' },
    { id: 'pattern', label: 'Pattern' },
    { id: 'social', label: 'Social' },
    { id: 'bulk', label: 'Bulk' }
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>Email Signature Generator</h1>
          <p style={{ fontSize: '14px', color: '#64748b' }}>Create professional email signatures for your team</p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: '24px', alignItems: 'start' }}>
          {/* Sidebar */}
          <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <div style={{ display: 'flex', gap: '3px', marginBottom: '20px', background: '#f1f5f9', padding: '4px', borderRadius: '10px', flexWrap: 'wrap' }}>
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActivePanel(tab.id)}
                  style={{
                    flex: '1 1 auto',
                    padding: '7px 5px',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '10px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    background: activePanel === tab.id ? '#fff' : 'transparent',
                    color: activePanel === tab.id ? '#0f172a' : '#64748b',
                    boxShadow: activePanel === tab.id ? '0 1px 2px rgba(0,0,0,0.08)' : 'none'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div style={{ maxHeight: '500px', overflowY: 'auto', paddingRight: '4px' }}>
              {activePanel === 'content' && (
                <>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: '#94a3b8', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Personal Info</div>
                  <InputField label="Full Name" field="name" value={formData.name} onChange={handleInputChange} placeholder="Enter full name"/>
                  <InputField label="Job Title" field="title" value={formData.title} onChange={handleInputChange} placeholder="Enter job title"/>
                  <InputField label="Email" field="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="email@company.com"/>
                  <InputField label="Phone" field="phone" value={formData.phone} onChange={handleInputChange} placeholder="+27 00 000 0000"/>
                  
                  <div style={{ fontSize: '10px', fontWeight: 700, color: '#94a3b8', margin: '20px 0 10px', textTransform: 'uppercase', letterSpacing: '0.5px', borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>Company Info</div>
                  <InputField label="Company Name" field="companyName" value={formData.companyName} onChange={handleInputChange} type="textarea" placeholder="Company Name"/>
                  <InputField label="Tagline" field="tagline" value={formData.tagline} onChange={handleInputChange} placeholder="Company tagline"/>
                  <InputField label="Website" field="website" value={formData.website} onChange={handleInputChange} placeholder="www.company.com"/>
                  
                  <div style={{ marginTop: '16px' }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px', color: '#374151' }}>Logo</label>
                    <input type="file" ref={fileInputRef} onChange={handleLogoUpload} accept="image/*" style={{ display: 'none' }}/>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => fileInputRef.current?.click()} style={{ flex: 1, padding: '10px', background: '#f8fafc', border: '2px dashed #cbd5e1', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 500, color: '#64748b' }}>
                        {logo ? 'Change' : 'Upload'}
                      </button>
                      {logo && <button onClick={() => setLogo(null)} style={{ padding: '10px 14px', background: '#fef2f2', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 600, color: '#dc2626' }}>Remove</button>}
                    </div>
                    {logo && <img src={logo} alt="Logo" style={{ marginTop: '10px', maxWidth: '80px', maxHeight: '80px', borderRadius: '8px', border: '1px solid #e2e8f0' }}/>}
                  </div>
                </>
              )}

              {activePanel === 'colors' && (
                <>
                  <ColorPicker label="Main Background" field="mainBg" value={colors.mainBg} onChange={handleColorChange}/>
                  <ColorPicker label="Name Card Background" field="cardBg" value={colors.cardBg} onChange={handleColorChange} showOpacity opacityField="cardOpacity" opacityValue={colors.cardOpacity} mainBg={colors.mainBg}/>
                  <ColorPicker label="Text Color" field="textColor" value={colors.textColor} onChange={handleColorChange}/>
                </>
              )}

              {activePanel === 'layout' && (
                <>
                  <div style={{ marginBottom: '14px' }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '5px', color: '#374151' }}>Name Card Width: {layout.cardWidth}%</label>
                    <input type="range" min="35" max="70" value={layout.cardWidth} onChange={(e) => handleLayoutChange('cardWidth', parseInt(e.target.value))} style={{ width: '100%', accentColor: colors.mainBg }}/>
                  </div>
                  <div style={{ marginBottom: '14px' }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '5px', color: '#374151' }}>Card Border Radius: {layout.cardRadius}px</label>
                    <input type="range" min="0" max="20" value={layout.cardRadius} onChange={(e) => handleLayoutChange('cardRadius', parseInt(e.target.value))} style={{ width: '100%', accentColor: colors.mainBg }}/>
                  </div>
                </>
              )}

              {activePanel === 'pattern' && (
                <>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', fontWeight: 600, color: '#374151', cursor: 'pointer', padding: '12px', background: '#f8fafc', borderRadius: '8px', marginBottom: '14px' }}>
                    <input type="checkbox" checked={layout.showPattern} onChange={(e) => handleLayoutChange('showPattern', e.target.checked)} style={{ width: '16px', height: '16px', accentColor: colors.mainBg }}/>
                    Show Background Pattern
                  </label>
                  <div style={{ marginBottom: '14px' }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px', color: '#374151' }}>Pattern Style</label>
                    <select value={layout.patternType} onChange={(e) => handleLayoutChange('patternType', e.target.value)} style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', outline: 'none', background: '#fff' }}>
                      {Object.keys(PATTERNS).map(key => <option key={key} value={key}>{PATTERN_NAMES[key]}</option>)}
                    </select>
                  </div>
                  <div style={{ marginBottom: '14px' }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '5px', color: '#374151' }}>Pattern Size: {layout.patternSize}px</label>
                    <input type="range" min="20" max="100" value={layout.patternSize} onChange={(e) => handleLayoutChange('patternSize', parseInt(e.target.value))} style={{ width: '100%', accentColor: colors.mainBg }}/>
                  </div>
                  <div style={{ marginBottom: '14px' }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '5px', color: '#374151' }}>Pattern Opacity: {Math.round(colors.patternOpacity * 100)}%</label>
                    <input type="range" min="0" max="0.4" step="0.01" value={colors.patternOpacity} onChange={(e) => handleColorChange('patternOpacity', parseFloat(e.target.value))} style={{ width: '100%', accentColor: colors.mainBg }}/>
                  </div>
                  <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px', color: '#374151' }}>Custom Background Image</label>
                    <p style={{ fontSize: '11px', color: '#64748b', marginBottom: '8px' }}>Upload your own repeating pattern</p>
                    <input type="file" ref={bgInputRef} onChange={handleBgUpload} accept="image/*" style={{ display: 'none' }}/>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => bgInputRef.current?.click()} style={{ flex: 1, padding: '10px', background: '#f8fafc', border: '2px dashed #cbd5e1', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 500, color: '#64748b' }}>
                        {bgImage ? 'Change' : 'Upload'}
                      </button>
                      {bgImage && <button onClick={() => setBgImage(null)} style={{ padding: '10px 14px', background: '#fef2f2', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 600, color: '#dc2626' }}>Remove</button>}
                    </div>
                    {bgImage && <div style={{ marginTop: '10px', padding: '8px', background: '#f1f5f9', borderRadius: '8px' }}><img src={bgImage} alt="Pattern" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }}/></div>}
                  </div>
                </>
              )}

              {activePanel === 'social' && (
                <>
                  <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '14px' }}>Leave empty to hide the icon.</p>
                  <InputField label="TikTok URL" field="tiktok" value={formData.tiktok} onChange={handleInputChange} placeholder="https://tiktok.com/@username"/>
                  <InputField label="LinkedIn URL" field="linkedin" value={formData.linkedin} onChange={handleInputChange} placeholder="https://linkedin.com/in/username"/>
                  <InputField label="Instagram URL" field="instagram" value={formData.instagram} onChange={handleInputChange} placeholder="https://instagram.com/username"/>
                </>
              )}

              {activePanel === 'bulk' && (
                <>
                  <div style={{ marginBottom: '16px', padding: '14px', background: '#fffbeb', borderRadius: '10px', fontSize: '12px', color: '#92400e', lineHeight: 1.5 }}>
                    <strong>Bulk Import:</strong> Upload a CSV to generate signatures for multiple users.
                  </div>
                  <button onClick={downloadCSVTemplate} style={{ width: '100%', padding: '12px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 600, marginBottom: '10px' }}>
                    Download CSV Template
                  </button>
                  <input type="file" ref={csvInputRef} onChange={handleBulkUpload} accept=".csv" style={{ display: 'none' }}/>
                  <button onClick={() => csvInputRef.current?.click()} style={{ width: '100%', padding: '12px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>
                    Upload CSV File
                  </button>
                  {bulkUsers.length > 0 && (
                    <div style={{ marginTop: '16px' }}>
                      <div style={{ fontSize: '12px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>{bulkUsers.length} users loaded</div>
                      <div style={{ maxHeight: '160px', overflowY: 'auto', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                        {bulkUsers.map((user, idx) => (
                          <div
                            key={idx}
                            onClick={() => selectUser(idx, user)}
                            style={{
                              padding: '10px 12px',
                              cursor: 'pointer',
                              borderBottom: idx < bulkUsers.length - 1 ? '1px solid #e2e8f0' : 'none',
                              background: selectedUserIdx === idx ? '#eff6ff' : '#fff'
                            }}
                          >
                            <div style={{ fontWeight: 600, fontSize: '12px', color: '#0f172a' }}>{user.name || 'Unnamed'}</div>
                            <div style={{ fontSize: '11px', color: '#64748b' }}>{user.title || 'No title'}</div>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => {
                          setBulkUsers([]);
                          setSelectedUserIdx(null);
                          setShowBulk(false);
                        }}
                        style={{ width: '100%', marginTop: '10px', padding: '10px', background: '#fef2f2', color: '#dc2626', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}
                      >
                        Clear All
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Preview */}
          <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
              <h2 style={{ fontSize: '15px', fontWeight: 600, color: '#0f172a' }}>Preview</h2>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button onClick={copyToClipboard} style={{ padding: '8px 16px', background: copySuccess === 'copied' ? '#10b981' : '#F7941D', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>
                  {copySuccess === 'copied' ? '✓ Copied!' : '📋 Copy HTML'}
                </button>
                <button onClick={downloadSingleHTML} style={{ padding: '8px 16px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>
                  💾 Download
                </button>
                {bulkUsers.length > 0 && (
                  <button onClick={downloadAllSignatures} style={{ padding: '8px 16px', background: '#8b5cf6', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>
                    📦 All ({bulkUsers.length})
                  </button>
                )}
              </div>
            </div>

            <div style={{ marginBottom: '16px', padding: '12px 16px', background: '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
              <p style={{ fontSize: '12px', color: '#166534', margin: 0 }}>
                <strong>How to use:</strong> Click "Copy HTML" then paste into your email signature settings.<br/>
                <span style={{ opacity: 0.8 }}>Gmail: Settings → Signature | Outlook: File → Options → Mail → Signatures</span>
              </p>
            </div>

            <div style={{ display: 'flex', gap: '4px', background: '#f1f5f9', padding: '4px', borderRadius: '8px', marginBottom: '16px' }}>
              {(['desktop', 'tablet', 'mobile'] as TabType[]).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: '6px 14px',
                    border: 'none',
                    borderRadius: '5px',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                    background: activeTab === tab ? '#fff' : 'transparent',
                    color: activeTab === tab ? '#0f172a' : '#64748b',
                    boxShadow: activeTab === tab ? '0 1px 2px rgba(0,0,0,0.08)' : 'none'
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div style={{ background: '#f1f5f9', borderRadius: '10px', padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '220px' }}>
              <SignaturePreview data={formData} colors={colors} layout={layout} activeTab={activeTab} logo={logo} bgImage={bgImage}/>
            </div>

            {showBulk && bulkUsers.length > 0 && (
              <div style={{ marginTop: '20px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a', marginBottom: '12px' }}>All Signatures ({bulkUsers.length})</h3>
                <div style={{ maxHeight: '400px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {bulkUsers.map((user, idx) => (
                    <div
                      key={idx}
                      onClick={() => selectUser(idx, user)}
                      style={{
                        padding: '16px',
                        background: '#f8fafc',
                        borderRadius: '10px',
                        border: selectedUserIdx === idx ? '2px solid #3b82f6' : '1px solid #e2e8f0',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', marginBottom: '10px' }}>
                        #{idx + 1} — {user.name}
                      </div>
                      <SignaturePreview data={{ ...formData, ...user }} colors={colors} layout={layout} activeTab={activeTab} logo={logo} bgImage={bgImage} compact/>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
