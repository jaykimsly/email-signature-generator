export interface FormData {
  name: string;
  title: string;
  email: string;
  phone: string;
  website: string;
  companyName: string;
  tagline: string;
  tiktok: string;
  linkedin: string;
  instagram: string;
}

export interface Colors {
  mainBg: string;
  cardBg: string;
  cardOpacity: number;
  textColor: string;
  patternOpacity: number;
}

export interface Layout {
  cardWidth: number;
  cardRadius: number;
  showPattern: boolean;
  patternType: string;
  patternSize: number;
}

export interface BulkUser {
  name?: string;
  title?: string;
  email?: string;
  phone?: string;
  tiktok?: string;
  linkedin?: string;
  instagram?: string;
}

export type TabType = 'desktop' | 'tablet' | 'mobile';
export type PanelType = 'content' | 'colors' | 'layout' | 'pattern' | 'social' | 'bulk';
