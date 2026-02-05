export const PATTERNS = {
  african: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='%23000'%3E%3Cpath d='M0 0l40 20L80 0v8L40 28 0 8zM80 80l-40-20L0 80v-8l40-20 40 20z'/%3E%3Cpath d='M20 40l20-10 20 10-20 10zM0 40l20-10v20L0 40zM80 40l-20 10v-20L80 40z'/%3E%3Cpath d='M40 0v16L24 8zM40 0v16l16-8zM40 80V64l-16 8zM40 80V64l16 8z'/%3E%3C/g%3E%3C/svg%3E")`,
  chevron: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M30 0L60 15L30 30L0 15z M30 30L60 45L30 60L0 45z' fill='%23000'/%3E%3C/svg%3E")`,
  zigzag: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cpath d='M0 20L10 10L20 20L30 10L40 20L40 25L30 15L20 25L10 15L0 25z' fill='%23000'/%3E%3C/svg%3E")`,
  tribal: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='%23000'%3E%3Ccircle cx='40' cy='40' r='8'/%3E%3Cpath d='M40 0v20M40 60v20M0 40h20M60 40h20' stroke='%23000' stroke-width='4'/%3E%3Cpath d='M12 12l16 16M52 12l-16 16M12 68l16-16M52 68l-16-16' stroke='%23000' stroke-width='3'/%3E%3C/g%3E%3C/svg%3E")`,
  geometric: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill='%23000'%3E%3Crect x='25' y='25' width='10' height='10'/%3E%3Cpolygon points='30,5 35,15 25,15'/%3E%3Cpolygon points='30,55 35,45 25,45'/%3E%3Cpolygon points='5,30 15,25 15,35'/%3E%3Cpolygon points='55,30 45,25 45,35'/%3E%3C/g%3E%3C/svg%3E")`,
  dots: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='5' fill='%23000'/%3E%3C/svg%3E")`,
  lines: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cpath d='M0 0l40 40M-10 30l40 40M30 -10l40 40' stroke='%23000' stroke-width='3'/%3E%3C/svg%3E")`,
  none: 'none'
};

export const PATTERN_NAMES: Record<string, string> = {
  african: 'African Traditional',
  chevron: 'Chevron',
  zigzag: 'Zigzag',
  tribal: 'Tribal',
  geometric: 'Geometric',
  dots: 'Dots',
  lines: 'Diagonal Lines',
  none: 'None'
};

export const DEFAULT_FORM_DATA = {
  name: 'Name:',
  title: 'Title:',
  email: 'email@dsf.co.za',
  phone: '000-000-0000',
  website: 'digitalsolutionfoundry.co.za',
  companyName: 'Digital\nSolution\nFoundry',
  tagline: 'Passionate People for Powerful Ideas.',
  tiktok: 'https://tiktok.com',
  linkedin: 'https://linkedin.com',
  instagram: 'https://instagram.com'
};

export const DEFAULT_COLORS = {
  mainBg: '#F7941D',
  cardBg: '#D97B00',
  cardOpacity: 0.45,
  textColor: '#FFFFFF',
  patternOpacity: 0.12
};

export const DEFAULT_LAYOUT = {
  cardWidth: 52,
  cardRadius: 10,
  showPattern: true,
  patternType: 'african',
  patternSize: 50
};
