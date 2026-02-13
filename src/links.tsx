import { Links } from './types/links';
import {
  DoorOpen,
  Film,
  MessagesSquare,
  SearchCheck,
  Siren,
  UserRound,
} from 'lucide-react';

const links: Links = {
  en: [
    { label: 'Documentation', href: '/docs', icon: '📚' },
    { label: 'Platform', href: '/platform', icon: '🌐' },
    { label: 'Status', href: '/status', icon: '📊' },
    { label: 'Register', href: '/register', icon: '📝' },
    { label: 'Board', href: '/board', icon: '📋' },
    { label: 'Profile', href: '/profile', icon: <UserRound /> },
    { label: 'Search', href: '/search', icon: <SearchCheck /> },
    { label: 'Chat', href: '/chat', icon: <MessagesSquare /> },
    { label: 'Exhibition', href: '/exhibition', icon: <Film /> },
    { label: 'Report', href: '/report', icon: <Siren /> },
    { label: 'Playlist', href: '/playlist', icon: '🎵' },
  ],
  ko: [
    { label: '문서', href: '/docs', icon: '📚' },
    { label: '플랫폼', href: '/platform', icon: '🌐' },
    { label: '상태', href: '/status', icon: '📊' },
    { label: '등록', href: '/register', icon: '📝' },
    { label: '게시판', href: '/board', icon: '📋' },
    { label: '프로필', href: '/profile', icon: <UserRound /> },
    { label: '검색', href: '/search', icon: <SearchCheck /> },
    { label: '채팅', href: '/chat', icon: <MessagesSquare /> },
    { label: '전시회', href: '/exhibition', icon: <Film /> },
    { label: '신고', href: '/report', icon: <Siren /> },
    { label: '재생목록', href: '/playlist', icon: '🎵' },
  ],
}

export default links;