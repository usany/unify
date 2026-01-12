import { Language } from './app/context/LanguageContext';
import { Links } from './types/links';

const translations: Links = {
  en: [
    { label: 'Documentation', href: '/docs', icon: '📚' },
    { label: 'Platform', href: '/platform', icon: '🌐' },
    { label: 'Status', href: '/status', icon: '📊' },
    { label: 'Register', href: '/register', icon: '📝' },
    { label: 'Board', href: '/board', icon: '📋' },
    { label: 'Profile', href: '/profile', icon: '👤' },
    { label: 'Search', href: '/search', icon: '🔍' },
    { label: 'Chat', href: '/chat', icon: '💬' },
    { label: 'Exhibition', href: '/exhibition', icon: '🖼️' },
    { label: 'Report', href: '/report', icon: '📢' },
    { label: 'Playlist', href: '/playlist', icon: '🎵' },
  ],
  ko: [
    { label: '문서', href: '/docs', icon: '📚' },
    { label: '플랫폼', href: '/platform', icon: '🌐' },
    { label: '상태', href: '/status', icon: '📊' },
    { label: '등록', href: '/register', icon: '📝' },
    { label: '게시판', href: '/board', icon: '📋' },
    { label: '프로필', href: '/profile', icon: '👤' },
    { label: '검색', href: '/search', icon: '🔍' },
    { label: '채팅', href: '/chat', icon: '💬' },
    { label: '전시회', href: '/exhibition', icon: '🖼️' },
    { label: '신고', href: '/report', icon: '📢' },
    { label: '재생목록', href: '/playlist', icon: '🎵' },
  ],
} as const;

const getLinks = (language: Language = 'ko'): ReadonlyArray<{
  label: string;
  href: string;
  icon: string;
}> => {
  return translations[language] || translations.ko;
};

export default getLinks;