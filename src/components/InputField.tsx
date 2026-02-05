import React from 'react';

interface Props {
  label: string;
  field: string;
  value: string;
  onChange: (field: string, value: string) => void;
  type?: 'text' | 'email' | 'textarea';
  placeholder?: string;
}

export const InputField: React.FC<Props> = ({ label, field, value, onChange, type = 'text', placeholder }) => (
  <div style={{ marginBottom: '14px' }}>
    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '5px', color: '#374151' }}>{label}</label>
    {type === 'textarea' ? (
      <textarea
        value={value}
        onChange={(e) => onChange(field, e.target.value)}
        placeholder={placeholder}
        rows={3}
        style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', resize: 'vertical', outline: 'none' }}
      />
    ) : (
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(field, e.target.value)}
        placeholder={placeholder}
        style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
      />
    )}
  </div>
);
