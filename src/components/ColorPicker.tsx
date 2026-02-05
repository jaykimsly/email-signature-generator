import React from 'react';
import { Colors } from '../types';

interface Props {
  label: string;
  field: keyof Colors;
  value: string | number;
  onChange: (field: keyof Colors, value: string | number) => void;
  showOpacity?: boolean;
  opacityField?: keyof Colors;
  opacityValue?: number;
  mainBg?: string;
}

export const ColorPicker: React.FC<Props> = ({ label, field, value, onChange, showOpacity, opacityField, opacityValue, mainBg }) => (
  <div style={{ marginBottom: '14px' }}>
    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '5px', color: '#374151' }}>{label}</label>
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <input
        type="color"
        value={value as string}
        onChange={(e) => onChange(field, e.target.value)}
        style={{ width: '44px', height: '44px', border: '1px solid #d1d5db', borderRadius: '8px', cursor: 'pointer', padding: '2px' }}
      />
      <input
        type="text"
        value={value as string}
        onChange={(e) => onChange(field, e.target.value)}
        style={{ flex: 1, padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '13px', fontFamily: 'monospace', outline: 'none' }}
      />
    </div>
    {showOpacity && opacityField && opacityValue !== undefined && (
      <div style={{ marginTop: '10px' }}>
        <label style={{ display: 'block', fontSize: '11px', fontWeight: 500, marginBottom: '4px', color: '#6b7280' }}>
          Opacity: {Math.round(opacityValue * 100)}%
        </label>
        <input
          type="range"
          min="0.1"
          max="1"
          step="0.05"
          value={opacityValue}
          onChange={(e) => onChange(opacityField, parseFloat(e.target.value))}
          style={{ width: '100%', accentColor: mainBg }}
        />
      </div>
    )}
  </div>
);
