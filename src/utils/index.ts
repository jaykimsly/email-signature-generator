import { FormData, Colors, Layout } from '../types';

export const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const parseCSV = (text: string) => {
  const lines = text.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
  return lines.slice(1).filter(line => line.trim()).map(line => {
    const values: string[] = [];
    let current = '';
    let inQuotes = false;
    for (let char of line) {
      if (char === '"') inQuotes = !inQuotes;
      else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else current += char;
    }
    values.push(current.trim());
    const user: any = {};
    headers.forEach((h, i) => { user[h] = values[i] || ''; });
    return user;
  });
};

export const generateSignatureHTML = (
  userData: FormData,
  colors: Colors,
  layout: Layout,
  companyData: { companyName: string; tagline: string; website: string }
): string => {
  const d = userData;
  const hasSocial = d.tiktok || d.linkedin || d.instagram;
  const cardBgColor = hexToRgba(colors.cardBg, colors.cardOpacity);
  
  return `<table cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:760px;background-color:${colors.mainBg};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;"><tr><td style="padding:24px 24px 12px 24px;"><table cellpadding="0" cellspacing="0" border="0" style="width:100%;"><tr>${(d.name || d.title) ? `<td style="width:${layout.cardWidth}%;vertical-align:middle;"><div style="background:${cardBgColor};border-radius:${layout.cardRadius}px;padding:24px 32px;">${d.name ? `<div style="font-size:30px;font-weight:700;color:${colors.textColor};line-height:1.2;margin-bottom:${d.title ? '4px' : '0'};">${d.name}</div>` : ''}${d.title ? `<div style="font-size:18px;font-weight:400;color:${colors.textColor};opacity:0.95;">${d.title}</div>` : ''}</div></td>` : ''}<td style="vertical-align:middle;text-align:right;padding-left:20px;"><table cellpadding="0" cellspacing="0" border="0" style="margin-left:auto;"><tr><td style="vertical-align:middle;padding-right:16px;"><div style="width:80px;height:80px;background:${colors.textColor};border-radius:50%;opacity:0.2;"></div></td><td style="vertical-align:middle;text-align:left;">${companyData.companyName ? `<div style="font-size:26px;font-weight:700;color:${colors.textColor};line-height:1.15;">${companyData.companyName.replace(/\n/g, '<br/>')}</div>` : ''}${companyData.tagline ? `<div style="font-size:13px;font-style:italic;color:${colors.textColor};font-weight:500;margin-top:8px;opacity:0.95;">${companyData.tagline}</div>` : ''}</td></tr></table></td></tr></table></td></tr><tr><td style="padding:18px 24px;"><table cellpadding="0" cellspacing="0" border="0" style="width:100%;"><tr>${d.email ? `<td style="vertical-align:middle;"><a href="mailto:${d.email}" style="color:${colors.textColor};font-size:15px;font-weight:500;text-decoration:none;">✉ ${d.email}</a></td>` : ''}${d.phone ? `<td style="vertical-align:middle;"><a href="tel:${d.phone}" style="color:${colors.textColor};font-size:15px;font-weight:500;text-decoration:none;">📱 ${d.phone}</a></td>` : ''}${hasSocial ? `<td style="vertical-align:middle;">${d.tiktok ? `<a href="${d.tiktok}" style="color:${colors.textColor};text-decoration:none;margin-right:8px;">TikTok</a>` : ''}${d.linkedin ? `<a href="${d.linkedin}" style="color:${colors.textColor};text-decoration:none;margin-right:8px;">LinkedIn</a>` : ''}${d.instagram ? `<a href="${d.instagram}" style="color:${colors.textColor};text-decoration:none;">Instagram</a>` : ''}</td>` : ''}${companyData.website ? `<td style="vertical-align:middle;text-align:right;"><a href="https://${companyData.website}" style="color:${colors.textColor};font-size:15px;font-weight:600;text-decoration:none;">${companyData.website}</a></td>` : ''}</tr></table></td></tr></table>`;
};

export const downloadCSVTemplate = () => {
  const headers = ['name', 'title', 'email', 'phone', 'tiktok', 'linkedin', 'instagram'];
  const example1 = ['Jane Smith', 'Marketing Manager', 'jane@dsf.co.za', '011-234-5678', 'https://tiktok.com/@jane', 'https://linkedin.com/in/janesmith', 'https://instagram.com/jane'];
  const example2 = ['John Doe', 'Senior Developer', 'john@dsf.co.za', '011-876-5432', '', 'https://linkedin.com/in/johndoe', ''];
  const csv = [headers.join(','), example1.join(','), example2.join(',')].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'signature_template.csv';
  a.click();
  URL.revokeObjectURL(url);
};

export const downloadHTML = (html: string, filename: string) => {
  const fullHTML = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Email Signature</title></head><body>${html}</body></html>`;
  const blob = new Blob([fullHTML], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};
