import { Links } from './types/links';
import {
  DoorOpen,
  Film,
  MessagesSquare,
  SearchCheck,
  Siren,
  UserRound,
  Pencil, 
  Presentation, 
  Umbrella,
  Globe,
  Music
} from 'lucide-react';

const links: Links = {
  en: [
    { label: 'Documentation', href: '/docs', icon: '📚' },
    { label: 'Platform', href: '/platform', icon: <Globe /> },
    { label: 'Status', href: '/status', icon: <Umbrella />},
    { label: 'Register', href: '/register', icon: <Pencil /> },
    { label: 'Board', href: '/board', icon: <Presentation /> },
    { label: 'Profile', href: '/profile', icon: <UserRound /> },
    { label: 'Search', href: '/search', icon: <SearchCheck /> },
    { label: 'Chat', href: '/chat', icon: <MessagesSquare /> },
    { label: 'Exhibition', href: '/exhibition', icon: <Film /> },
    { label: 'Report', href: '/report', icon: <Siren /> },
    { label: 'Playlist', href: '/playlist', icon: <Music /> },
  ],
  ko: [
    { label: '문서', href: '/docs', icon: '📚' },
    { label: '플랫폼', href: '/platform', icon: <Globe /> },
    { label: '상태', href: '/status', icon: <Umbrella /> },
    { label: '등록', href: '/register', icon: <Pencil /> },
    { label: '게시판', href: '/board', icon: <Presentation /> },
    { label: '프로필', href: '/profile', icon: <UserRound /> },
    { label: '검색', href: '/search', icon: <SearchCheck /> },
    { label: '채팅', href: '/chat', icon: <MessagesSquare /> },
    { label: '전시회', href: '/exhibition', icon: <Film /> },
    { label: '신고', href: '/report', icon: <Siren /> },
    { label: '재생목록', href: '/playlist', icon: <Music /> },
  ],
}

export default links;