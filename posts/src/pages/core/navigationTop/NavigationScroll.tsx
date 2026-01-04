import { MessagesSquare, SearchCheck, Siren, UserRound } from "lucide-react";
import useSelectors from 'src/hooks/useSelectors';
import texts from '../../../texts.json'
type RoutePath = '/profile' | '/ranking' | '/piazza' | '/contact';

const icons = {
  '/profile': <UserRound />,
  '/ranking': <SearchCheck />,
  '/piazza': <MessagesSquare />,
  '/contact': <Siren />,
}

const isRoutePath = (path: string) => {
  return ['/profile', '/ranking', '/piazza', '/contact'].includes(path);
};

const NavigationScroll = () => {
  const languages = useSelectors(state => state.languages.value) as 'ko' | 'en';
  const currentPath = location.pathname as RoutePath;
  if (!isRoutePath(currentPath)) {
    return null
  }

  return (
    <div className="flex text-sm gap-3 items-center">
      {icons[currentPath]}
      {texts[languages][currentPath]}
    </div>
  );
};

export default NavigationScroll;
