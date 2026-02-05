import React, { useState, useRef } from 'react';

const App = () => {
  const [formData, setFormData] = useState({
    name: 'Name:', title: 'Title:', email: 'email@dsf.co.za',
    phone: '000-000-0000', website: 'digitalsolutionfoundry.co.za',
    companyName: 'Digital\nSolution\nFoundry', tagline: 'Passionate People for Powerful Ideas.',
    tiktok: 'https://tiktok.com', linkedin: 'https://linkedin.com', instagram: 'https://instagram.com'
  });
  const [colors, setColors] = useState({ mainBg: '#F7941D', cardBg: '#D97B00', cardOpacity: 0.45, textColor: '#FFFFFF', patternOpacity: 0.12 });
  const [layout, setLayout] = useState({ cardWidth: 52, cardRadius: 10, showPattern: true, patternType: 'african', patternSize: 50 });
  const [logo, setLogo] = useState(null);
  const [bgImage, setBgImage] = useState(null);
  const [activeTab, setActiveTab] = useState('desktop');
  const [activePanel, setActivePanel] = useState('content');
  const [bulkUsers, setBulkUsers] = useState([]);
  const [showBulk, setShowBulk] = useState(false);
  const [selectedUserIdx, setSelectedUserIdx] = useState(null);
  const fileInputRef = useRef(null);
  const bgInputRef = useRef(null);
  const csvInputRef = useRef(null);

  const patterns = {
    african: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='%23000'%3E%3Cpath d='M0 0l40 20L80 0v8L40 28 0 8zM80 80l-40-20L0 80v-8l40-20 40 20z'/%3E%3Cpath d='M20 40l20-10 20 10-20 10zM0 40l20-10v20L0 40zM80 40l-20 10v-20L80 40z'/%3E%3Cpath d='M40 0v16L24 8zM40 0v16l16-8zM40 80V64l-16 8zM40 80V64l16 8z'/%3E%3C/g%3E%3C/svg%3E")`,
    chevron: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M30 0L60 15L30 30L0 15z M30 30L60 45L30 60L0 45z' fill='%23000'/%3E%3C/svg%3E")`,
    zigzag: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cpath d='M0 20L10 10L20 20L30 10L40 20L40 25L30 15L20 25L10 15L0 25z' fill='%23000'/%3E%3C/svg%3E")`,
    tribal: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='%23000'%3E%3Ccircle cx='40' cy='40' r='8'/%3E%3Cpath d='M40 0v20M40 60v20M0 40h20M60 40h20' stroke='%23000' stroke-width='4'/%3E%3Cpath d='M12 12l16 16M52 12l-16 16M12 68l16-16M52 68l-16-16' stroke='%23000' stroke-width='3'/%3E%3C/g%3E%3C/svg%3E")`,
    geometric: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill='%23000'%3E%3Crect x='25' y='25' width='10' height='10'/%3E%3Cpolygon points='30,5 35,15 25,15'/%3E%3Cpolygon points='30,55 35,45 25,45'/%3E%3Cpolygon points='5,30 15,25 15,35'/%3E%3Cpolygon points='55,30 45,25 45,35'/%3E%3C/g%3E%3C/svg%3E")`,
    dots: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='5' fill='%23000'/%3E%3C/svg%3E")`,
    lines: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cpath d='M0 0l40 40M-10 30l40 40M30 -10l40 40' stroke='%23000' stroke-width='3'/%3E%3C/svg%3E")`,
    none: 'none'
  };

  const patternNames = {
    african: 'African Traditional', chevron: 'Chevron', zigzag: 'Zigzag', tribal: 'Tribal',
    geometric: 'Geometric', dots: 'Dots', lines: 'Diagonal Lines', none: 'None'
  };

  const handleInputChange = (f, v) => setFormData(p => ({ ...p, [f]: v }));
  const handleColorChange = (f, v) => setColors(p => ({ ...p, [f]: v }));
  const handleLayoutChange = (f, v) => setLayout(p => ({ ...p, [f]: v }));

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) { const reader = new FileReader(); reader.onload = (e) => setLogo(e.target.result); reader.readAsDataURL(file); }
  };

  const handleBgUpload = (e) => {
    const file = e.target.files[0];
    if (file) { const reader = new FileReader(); reader.onload = (e) => setBgImage(e.target.result); reader.readAsDataURL(file); }
  };

  const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const downloadTemplate = () => {
    const headers = ['name', 'title', 'email', 'phone', 'tiktok', 'linkedin', 'instagram'];
    const example1 = ['Jane Smith', 'Marketing Manager', 'jane@dsf.co.za', '011-234-5678', 'https://tiktok.com/@jane', 'https://linkedin.com/in/janesmith', 'https://instagram.com/jane'];
    const example2 = ['John Doe', 'Senior Developer', 'john@dsf.co.za', '011-876-5432', '', 'https://linkedin.com/in/johndoe', ''];
    const csv = [headers.join(','), example1.join(','), example2.join(',')].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' }); const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'signature_template.csv'; a.click(); URL.revokeObjectURL(url);
  };

  const parseCSV = (text) => {
    const lines = text.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    return lines.slice(1).filter(line => line.trim()).map(line => {
      const values = []; let current = ''; let inQuotes = false;
      for (let char of line) { if (char === '"') inQuotes = !inQuotes; else if (char === ',' && !inQuotes) { values.push(current.trim()); current = ''; } else current += char; }
      values.push(current.trim());
      const user = {}; headers.forEach((h, i) => { user[h] = values[i] || ''; }); return user;
    });
  };

  const handleBulkUpload = (e) => {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => { const users = parseCSV(e.target.result); setBulkUsers(users); setShowBulk(true); if (users.length > 0) selectUser(0, users[0]); };
    reader.readAsText(file); e.target.value = '';
  };

  const selectUser = (idx, user) => {
    setSelectedUserIdx(idx);
    setFormData(p => ({ ...p, name: user.name || '', title: user.title || '', email: user.email || '', phone: user.phone || '', tiktok: user.tiktok || '', linkedin: user.linkedin || '', instagram: user.instagram || '' }));
  };

  const getViewport = () => { if (activeTab === 'mobile') return { width: '380px', isMobile: true }; return { width: '760px', isMobile: false }; };

  const Icons = {
    email: (c) => <svg width="24" height="24" viewBox="0 0 24 24" fill={c}><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>,
    phone: (c) => <svg width="22" height="22" viewBox="0 0 24 24" fill={c}><path d="M16 1H8C6.34 1 5 2.34 5 4v16c0 1.66 1.34 3 3 3h8c1.66 0 3-1.34 3-3V4c0-1.66-1.34-3-3-3zm-2 20h-4v-1h4v1zm3-3H7V4h10v14z"/></svg>,
    tiktok: (c) => <svg width="16" height="16" viewBox="0 0 24 24" fill={c}><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.89 2.89 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.4c-.26-.03-.52-.05-.79-.05a6.33 6.33 0 0 0-6.33 6.33 6.33 6.33 0 0 0 6.33 6.33 6.33 6.33 0 0 0 6.33-6.33V9.17a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.99-.6z"/></svg>,
    linkedin: (c) => <svg width="16" height="16" viewBox="0 0 24 24" fill={c}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
    instagram: (c) => <svg width="16" height="16" viewBox="0 0 24 24" fill={c}><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
  };

  const DefaultLogo = ({ color, size = 80 }) => (
    <svg viewBox="0 0 100 100" width={size} height={size}><g fill={color}>{[...Array(10)].map((_, i) => <path key={i} d="M50 10 L59 27 L50 34 L41 27 Z" transform={`rotate(${i * 36} 50 50)`}/>)}</g></svg>
  );

  const PatternBg = ({ opacity, type, size, customBg }) => {
    if (customBg) return <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity, backgroundImage: `url(${customBg})`, backgroundSize: `${size}px ${size}px`, backgroundRepeat: 'repeat' }}/>;
    if (type === 'none' || !patterns[type]) return null;
    return <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity, backgroundImage: patterns[type], backgroundSize: `${size}px ${size}px`, backgroundRepeat: 'repeat' }}/>;
  };

  const SignaturePreview = ({ data = formData, compact = false }) => {
    const d = data; const viewport = getViewport(); const isMobile = viewport.isMobile;
    const hasSocial = d.tiktok || d.linkedin || d.instagram;
    const hasContact = d.email || d.phone || hasSocial || formData.website;
    const cardBgColor = hexToRgba(colors.cardBg, colors.cardOpacity);
    const m = { cp: isMobile ? 16 : 24, trg: isMobile ? 16 : 20, cpv: isMobile ? 18 : 24, cph: isMobile ? 22 : 32, cmh: isMobile ? 'auto' : 100, ns: isMobile ? 24 : 30, ts: isMobile ? 15 : 18, ls: isMobile ? 65 : 80, cns: isMobile ? 20 : 26, tgs: isMobile ? 11 : 13, ctpv: isMobile ? 16 : 18, cfs: isMobile ? 13 : 15, ss: isMobile ? 32 : 36 };

    return (
      <div style={{ width: compact ? '100%' : viewport.width, margin: '0 auto', background: colors.mainBg, position: 'relative', overflow: 'hidden', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}>
        {layout.showPattern && <PatternBg opacity={colors.patternOpacity} type={layout.patternType} size={layout.patternSize} customBg={bgImage}/>}
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: isMobile ? 'column' : 'row', padding: m.cp, paddingBottom: isMobile ? 8 : 12, gap: m.trg, alignItems: isMobile ? 'stretch' : 'center' }}>
          {(d.name || d.title) && (
            <div style={{ background: cardBgColor, borderRadius: layout.cardRadius, paddingTop: m.cpv, paddingBottom: m.cpv, paddingLeft: m.cph, paddingRight: m.cph, flex: isMobile ? 'none' : `0 0 ${layout.cardWidth}%`, minHeight: m.cmh, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              {d.name && <div style={{ fontSize: m.ns, fontWeight: 700, color: colors.textColor, marginBottom: d.title ? 4 : 0, lineHeight: 1.2 }}>{d.name}</div>}
              {d.title && <div style={{ fontSize: m.ts, fontWeight: 400, color: colors.textColor, opacity: 0.95 }}>{d.title}</div>}
            </div>
          )}
          {(formData.companyName || formData.tagline || logo) && (
            <div style={{ flex: 1, display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', justifyContent: isMobile ? 'center' : 'flex-end', gap: isMobile ? 12 : 16, textAlign: isMobile ? 'center' : 'right' }}>
              {logo ? <img src={logo} alt="Logo" style={{ width: m.ls, height: m.ls, objectFit: 'contain' }}/> : <DefaultLogo color={colors.textColor} size={m.ls}/>}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: isMobile ? 'center' : 'flex-start' }}>
                {formData.companyName && <div style={{ fontSize: m.cns, fontWeight: 700, color: colors.textColor, lineHeight: 1.15, whiteSpace: 'pre-line', textAlign: isMobile ? 'center' : 'left' }}>{formData.companyName}</div>}
                {formData.tagline && <div style={{ fontSize: m.tgs, fontStyle: 'italic', color: colors.textColor, fontWeight: 500, marginTop: 8, opacity: 0.95 }}>{formData.tagline}</div>}
              </div>
            </div>
          )}
        </div>
        {hasContact && (
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: m.cp, paddingRight: m.cp, paddingTop: m.ctpv, paddingBottom: m.ctpv, gap: isMobile ? 14 : 0 }}>
            {d.email && <a href={`mailto:${d.email}`} style={{ display: 'flex', alignItems: 'center', gap: 10, color: colors.textColor, fontSize: m.cfs, fontWeight: 500, textDecoration: 'none' }}>{Icons.email(colors.textColor)}<span>{d.email}</span></a>}
            {d.phone && <a href={`tel:${d.phone}`} style={{ display: 'flex', alignItems: 'center', gap: 10, color: colors.textColor, fontSize: m.cfs, fontWeight: 500, textDecoration: 'none' }}>{Icons.phone(colors.textColor)}<span>{d.phone}</span></a>}
            {hasSocial && (
              <div style={{ display: 'flex', gap: 12 }}>
                {d.tiktok && <a href={d.tiktok} style={{ width: m.ss, height: m.ss, border: `2px solid ${colors.textColor}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{Icons.tiktok(colors.textColor)}</a>}
                {d.linkedin && <a href={d.linkedin} style={{ width: m.ss, height: m.ss, border: `2px solid ${colors.textColor}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{Icons.linkedin(colors.textColor)}</a>}
                {d.instagram && <a href={d.instagram} style={{ width: m.ss, height: m.ss, border: `2px solid ${colors.textColor}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{Icons.instagram(colors.textColor)}</a>}
              </div>
            )}
            {formData.website && <a href={`https://${formData.website}`} style={{ color: colors.textColor, fontSize: m.cfs, fontWeight: 600, textDecoration: 'none' }}>{formData.website}</a>}
          </div>
        )}
      </div>
    );
  };

  const InputField = ({ label, field, type = 'text', placeholder }) => (
    <div style={{ marginBottom: '14px' }}>
      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '5px', color: '#374151' }}>{label}</label>
      {type === 'textarea' ? <textarea value={formData[field]} onChange={(e) => handleInputChange(field, e.target.value)} placeholder={placeholder} rows={3} style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', resize: 'vertical', outline: 'none' }}/> : <input type={type} value={formData[field]} onChange={(e) => handleInputChange(field, e.target.value)} placeholder={placeholder} style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', outline: 'none' }}/>}
    </div>
  );

  const ColorPicker = ({ label, field, showOpacity = false, opacityField = null }) => (
    <div style={{ marginBottom: '14px' }}>
      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '5px', color: '#374151' }}>{label}</label>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <input type="color" value={colors[field]} onChange={(e) => handleColorChange(field, e.target.value)} style={{ width: '44px', height: '44px', border: '1px solid #d1d5db', borderRadius: '8px', cursor: 'pointer', padding: '2px' }}/>
        <input type="text" value={colors[field]} onChange={(e) => handleColorChange(field, e.target.value)} style={{ flex: 1, padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '13px', fontFamily: 'monospace', outline: 'none' }}/>
      </div>
      {showOpacity && opacityField && (
        <div style={{ marginTop: '10px' }}>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 500, marginBottom: '4px', color: '#6b7280' }}>Opacity: {Math.round(colors[opacityField] * 100)}%</label>
          <input type="range" min="0.1" max="1" step="0.05" value={colors[opacityField]} onChange={(e) => handleColorChange(opacityField, parseFloat(e.target.value))} style={{ width: '100%', accentColor: colors.mainBg }}/>
        </div>
      )}
    </div>
  );

  const tabs = [{ id: 'content', label: 'Content' }, { id: 'colors', label: 'Colors' }, { id: 'layout', label: 'Layout' }, { id: 'pattern', label: 'Pattern' }, { id: 'social', label: 'Social' }, { id: 'bulk', label: 'Bulk' }];

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>Email Signature Generator</h1>
          <p style={{ fontSize: '14px', color: '#64748b' }}>Create professional email signatures for your team</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: '24px', alignItems: 'start' }}>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <div style={{ display: 'flex', gap: '3px', marginBottom: '20px', background: '#f1f5f9', padding: '4px', borderRadius: '10px', flexWrap: 'wrap' }}>
              {tabs.map(tab => (<button key={tab.id} onClick={() => setActivePanel(tab.id)} style={{ flex: '1 1 auto', padding: '7px 5px', border: 'none', borderRadius: '6px', fontSize: '10px', fontWeight: 600, cursor: 'pointer', background: activePanel === tab.id ? '#fff' : 'transparent', color: activePanel === tab.id ? '#0f172a' : '#64748b', boxShadow: activePanel === tab.id ? '0 1px 2px rgba(0,0,0,0.08)' : 'none' }}>{tab.label}</button>))}
            </div>
            <div style={{ maxHeight: '500px', overflowY: 'auto', paddingRight: '4px' }}>
              {activePanel === 'content' && (<>
                <div style={{ fontSize: '10px', fontWeight: 700, color: '#94a3b8', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Personal Info</div>
                <InputField label="Full Name" field="name" placeholder="Enter full name"/>
                <InputField label="Job Title" field="title" placeholder="Enter job title"/>
                <InputField label="Email" field="email" type="email" placeholder="email@company.com"/>
                <InputField label="Phone" field="phone" placeholder="+27 00 000 0000"/>
                <div style={{ fontSize: '10px', fontWeight: 700, color: '#94a3b8', margin: '20px 0 10px', textTransform: 'uppercase', letterSpacing: '0.5px', borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>Company Info</div>
                <InputField label="Company Name" field="companyName" type="textarea" placeholder="Company Name"/>
                <InputField label="Tagline" field="tagline" placeholder="Company tagline"/>
                <InputField label="Website" field="website" placeholder="www.company.com"/>
                <div style={{ marginTop: '16px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px', color: '#374151' }}>Logo</label>
                  <input type="file" ref={fileInputRef} onChange={handleLogoUpload} accept="image/*" style={{ display: 'none' }}/>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => fileInputRef.current.click()} style={{ flex: 1, padding: '10px', background: '#f8fafc', border: '2px dashed #cbd5e1', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 500, color: '#64748b' }}>{logo ? 'Change' : 'Upload'}</button>
                    {logo && <button onClick={() => setLogo(null)} style={{ padding: '10px 14px', background: '#fef2f2', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 600, color: '#dc2626' }}>Remove</button>}
                  </div>
                  {logo && <img src={logo} alt="Logo" style={{ marginTop: '10px', maxWidth: '80px', maxHeight: '80px', borderRadius: '8px', border: '1px solid #e2e8f0' }}/>}
                </div>
              </>)}
              {activePanel === 'colors' && (<>
                <ColorPicker label="Main Background" field="mainBg"/>
                <ColorPicker label="Name Card Background" field="cardBg" showOpacity={true} opacityField="cardOpacity"/>
                <ColorPicker label="Text Color" field="textColor"/>
              </>)}
              {activePanel === 'layout' && (<>
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '5px', color: '#374151' }}>Name Card Width: {layout.cardWidth}%</label>
                  <input type="range" min="35" max="70" value={layout.cardWidth} onChange={(e) => handleLayoutChange('cardWidth', parseInt(e.target.value))} style={{ width: '100%', accentColor: colors.mainBg }}/>
                </div>
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '5px', color: '#374151' }}>Card Border Radius: {layout.cardRadius}px</label>
                  <input type="range" min="0" max="20" value={layout.cardRadius} onChange={(e) => handleLayoutChange('cardRadius', parseInt(e.target.value))} style={{ width: '100%', accentColor: colors.mainBg }}/>
                </div>
              </>)}
              {activePanel === 'pattern' && (<>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', fontWeight: 600, color: '#374151', cursor: 'pointer', padding: '12px', background: '#f8fafc', borderRadius: '8px', marginBottom: '14px' }}>
                  <input type="checkbox" checked={layout.showPattern} onChange={(e) => handleLayoutChange('showPattern', e.target.checked)} style={{ width: '16px', height: '16px', accentColor: colors.mainBg }}/>Show Background Pattern
                </label>
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px', color: '#374151' }}>Pattern Style</label>
                  <select value={layout.patternType} onChange={(e) => handleLayoutChange('patternType', e.target.value)} style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', outline: 'none', background: '#fff' }}>
                    {Object.keys(patterns).map(key => <option key={key} value={key}>{patternNames[key]}</option>)}
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
                  <p style={{ fontSize: '11px', color: '#64748b', marginBottom: '8px' }}>Upload your own repeating pattern image</p>
                  <input type="file" ref={bgInputRef} onChange={handleBgUpload} accept="image/*" style={{ display: 'none' }}/>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => bgInputRef.current.click()} style={{ flex: 1, padding: '10px', background: '#f8fafc', border: '2px dashed #cbd5e1', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 500, color: '#64748b' }}>{bgImage ? 'Change Image' : 'Upload Image'}</button>
                    {bgImage && <button onClick={() => setBgImage(null)} style={{ padding: '10px 14px', background: '#fef2f2', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 600, color: '#dc2626' }}>Remove</button>}
                  </div>
                  {bgImage && <div style={{ marginTop: '10px', padding: '8px', background: '#f1f5f9', borderRadius: '8px' }}><img src={bgImage} alt="Pattern" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }}/></div>}
                </div>
              </>)}
              {activePanel === 'social' && (<>
                <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '14px' }}>Leave empty to hide the icon.</p>
                <InputField label="TikTok URL" field="tiktok" placeholder="https://tiktok.com/@username"/>
                <InputField label="LinkedIn URL" field="linkedin" placeholder="https://linkedin.com/in/username"/>
                <InputField label="Instagram URL" field="instagram" placeholder="https://instagram.com/username"/>
              </>)}
              {activePanel === 'bulk' && (<>
                <div style={{ marginBottom: '16px', padding: '14px', background: '#fffbeb', borderRadius: '10px', fontSize: '12px', color: '#92400e', lineHeight: 1.5 }}><strong>Bulk Import:</strong> Upload a CSV to generate signatures for multiple users.</div>
                <button onClick={downloadTemplate} style={{ width: '100%', padding: '12px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 600, marginBottom: '10px' }}>Download CSV Template</button>
                <input type="file" ref={csvInputRef} onChange={handleBulkUpload} accept=".csv" style={{ display: 'none' }}/>
                <button onClick={() => csvInputRef.current.click()} style={{ width: '100%', padding: '12px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>Upload CSV File</button>
                {bulkUsers.length > 0 && (
                  <div style={{ marginTop: '16px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>{bulkUsers.length} users loaded</div>
                    <div style={{ maxHeight: '160px', overflowY: 'auto', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                      {bulkUsers.map((user, idx) => (
                        <div key={idx} onClick={() => selectUser(idx, user)} style={{ padding: '10px 12px', cursor: 'pointer', borderBottom: idx < bulkUsers.length - 1 ? '1px solid #e2e8f0' : 'none', background: selectedUserIdx === idx ? '#eff6ff' : '#fff' }}>
                          <div style={{ fontWeight: 600, fontSize: '12px', color: '#0f172a' }}>{user.name || 'Unnamed'}</div>
                          <div style={{ fontSize: '11px', color: '#64748b' }}>{user.title || 'No title'}</div>
                        </div>
                      ))}
                    </div>
                    <button onClick={() => { setBulkUsers([]); setSelectedUserIdx(null); setShowBulk(false); }} style={{ width: '100%', marginTop: '10px', padding: '10px', background: '#fef2f2', color: '#dc2626', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}>Clear All</button>
                  </div>
                )}
              </>)}
            </div>
          </div>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '15px', fontWeight: 600, color: '#0f172a' }}>Preview</h2>
              <div style={{ display: 'flex', gap: '4px', background: '#f1f5f9', padding: '4px', borderRadius: '8px' }}>
                {['desktop', 'tablet', 'mobile'].map(tab => (<button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '6px 14px', border: 'none', borderRadius: '5px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', textTransform: 'capitalize', background: activeTab === tab ? '#fff' : 'transparent', color: activeTab === tab ? '#0f172a' : '#64748b', boxShadow: activeTab === tab ? '0 1px 2px rgba(0,0,0,0.08)' : 'none' }}>{tab}</button>))}
              </div>
            </div>
            <div style={{ background: '#f1f5f9', borderRadius: '10px', padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '220px' }}><SignaturePreview/></div>
            {showBulk && bulkUsers.length > 0 && (
              <div style={{ marginTop: '20px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a', marginBottom: '12px' }}>All Signatures ({bulkUsers.length})</h3>
                <div style={{ maxHeight: '400px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {bulkUsers.map((user, idx) => (
                    <div key={idx} onClick={() => selectUser(idx, user)} style={{ padding: '16px', background: '#f8fafc', borderRadius: '10px', border: selectedUserIdx === idx ? '2px solid #3b82f6' : '1px solid #e2e8f0', cursor: 'pointer' }}>
                      <div style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', marginBottom: '10px' }}>#{idx + 1} — {user.name}</div>
                      <SignaturePreview data={{ ...formData, ...user }} compact={true}/>
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
