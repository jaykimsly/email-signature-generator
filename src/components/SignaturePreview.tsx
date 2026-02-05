import React from 'react';
import { FormData, Colors, Layout, TabType } from '../types';
import { PATTERNS } from '../constants';
import { hexToRgba } from '../utils';
import { EmailIcon, PhoneIcon, TikTokIcon, LinkedInIcon, InstagramIcon, DefaultLogo } from './Icons';

interface Props {
  data: FormData;
  colors: Colors;
  layout: Layout;
  activeTab: TabType;
  logo: string | null;
  bgImage: string | null;
  compact?: boolean;
}

export const SignaturePreview: React.FC<Props> = ({ data, colors, layout, activeTab, logo, bgImage, compact = false }) => {
  const isMobile = activeTab === 'mobile';
  const hasSocial = data.tiktok || data.linkedin || data.instagram;
  const hasContact = data.email || data.phone || hasSocial || data.website;
  const cardBgColor = hexToRgba(colors.cardBg, colors.cardOpacity);
  const width = compact ? '100%' : isMobile ? '380px' : '760px';
  
  const m = {
    cp: isMobile ? 16 : 24,
    trg: isMobile ? 16 : 20,
    cpv: isMobile ? 18 : 24,
    cph: isMobile ? 22 : 32,
    cmh: isMobile ? 'auto' : 100,
    ns: isMobile ? 24 : 30,
    ts: isMobile ? 15 : 18,
    ls: isMobile ? 65 : 80,
    cns: isMobile ? 20 : 26,
    tgs: isMobile ? 11 : 13,
    ctpv: isMobile ? 16 : 18,
    cfs: isMobile ? 13 : 15,
    ss: isMobile ? 32 : 36
  };

  const PatternBg = () => {
    if (bgImage) {
      return <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: colors.patternOpacity, backgroundImage: `url(${bgImage})`, backgroundSize: `${layout.patternSize}px ${layout.patternSize}px`, backgroundRepeat: 'repeat' }}/>;
    }
    if (layout.patternType === 'none' || !PATTERNS[layout.patternType as keyof typeof PATTERNS]) return null;
    return <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: colors.patternOpacity, backgroundImage: PATTERNS[layout.patternType as keyof typeof PATTERNS], backgroundSize: `${layout.patternSize}px ${layout.patternSize}px`, backgroundRepeat: 'repeat' }}/>;
  };

  return (
    <div style={{ width, margin: '0 auto', background: colors.mainBg, position: 'relative', overflow: 'hidden', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}>
      {layout.showPattern && <PatternBg/>}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: isMobile ? 'column' : 'row', padding: m.cp, paddingBottom: isMobile ? 8 : 12, gap: m.trg, alignItems: isMobile ? 'stretch' : 'center' }}>
        {(data.name || data.title) && (
          <div style={{ background: cardBgColor, borderRadius: layout.cardRadius, paddingTop: m.cpv, paddingBottom: m.cpv, paddingLeft: m.cph, paddingRight: m.cph, flex: isMobile ? 'none' : `0 0 ${layout.cardWidth}%`, minHeight: m.cmh, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {data.name && <div style={{ fontSize: m.ns, fontWeight: 700, color: colors.textColor, marginBottom: data.title ? 4 : 0, lineHeight: 1.2 }}>{data.name}</div>}
            {data.title && <div style={{ fontSize: m.ts, fontWeight: 400, color: colors.textColor, opacity: 0.95 }}>{data.title}</div>}
          </div>
        )}
        {(data.companyName || data.tagline || logo) && (
          <div style={{ flex: 1, display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', justifyContent: isMobile ? 'center' : 'flex-end', gap: isMobile ? 12 : 16, textAlign: isMobile ? 'center' : 'right' }}>
            {logo ? <img src={logo} alt="Logo" style={{ width: m.ls, height: m.ls, objectFit: 'contain' }}/> : <DefaultLogo color={colors.textColor} size={m.ls}/>}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: isMobile ? 'center' : 'flex-start' }}>
              {data.companyName && <div style={{ fontSize: m.cns, fontWeight: 700, color: colors.textColor, lineHeight: 1.15, whiteSpace: 'pre-line', textAlign: isMobile ? 'center' : 'left' }}>{data.companyName}</div>}
              {data.tagline && <div style={{ fontSize: m.tgs, fontStyle: 'italic', color: colors.textColor, fontWeight: 500, marginTop: 8, opacity: 0.95 }}>{data.tagline}</div>}
            </div>
          </div>
        )}
      </div>
      {hasContact && (
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: m.cp, paddingRight: m.cp, paddingTop: m.ctpv, paddingBottom: m.ctpv, gap: isMobile ? 14 : 0 }}>
          {data.email && <a href={`mailto:${data.email}`} style={{ display: 'flex', alignItems: 'center', gap: 10, color: colors.textColor, fontSize: m.cfs, fontWeight: 500, textDecoration: 'none' }}><EmailIcon color={colors.textColor}/><span>{data.email}</span></a>}
          {data.phone && <a href={`tel:${data.phone}`} style={{ display: 'flex', alignItems: 'center', gap: 10, color: colors.textColor, fontSize: m.cfs, fontWeight: 500, textDecoration: 'none' }}><PhoneIcon color={colors.textColor}/><span>{data.phone}</span></a>}
          {hasSocial && (
            <div style={{ display: 'flex', gap: 12 }}>
              {data.tiktok && <a href={data.tiktok} style={{ width: m.ss, height: m.ss, border: `2px solid ${colors.textColor}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><TikTokIcon color={colors.textColor}/></a>}
              {data.linkedin && <a href={data.linkedin} style={{ width: m.ss, height: m.ss, border: `2px solid ${colors.textColor}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><LinkedInIcon color={colors.textColor}/></a>}
              {data.instagram && <a href={data.instagram} style={{ width: m.ss, height: m.ss, border: `2px solid ${colors.textColor}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><InstagramIcon color={colors.textColor}/></a>}
            </div>
          )}
          {data.website && <a href={`https://${data.website}`} style={{ color: colors.textColor, fontSize: m.cfs, fontWeight: 600, textDecoration: 'none' }}>{data.website}</a>}
        </div>
      )}
    </div>
  );
};
