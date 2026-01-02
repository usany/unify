import {
  DoorOpen,
  Film,
  MessagesSquare,
  SearchCheck,
  Siren,
  UserRound,
} from 'lucide-react';
import { useId, useState } from 'react';
import { createPortal } from 'react-dom';
import staticImage from 'src/assets/blue.png';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from 'src/components/ui/drawer';
import useSelectors from 'src/hooks/useSelectors';
import useTexts from 'src/hooks/useTexts';
import Avatars from '../../Avatars';
import Playlist from '../../Playlist';
import Links from './links/Links';
import NavigationSignedIn from './navigationSignedIn/NavigationSignedIn';
import NavigationSignedOut from './navigationSignedOut/NavigationSignedOut';

function Navigation() {
  const linkId = useId();
  const [open, setOpen] = useState(false);
  const { myProfile, userSearch, groupChat, report, exhibition, signOut, needNetworkConnection } = useTexts()
  const profile = useSelectors((state) => state.profile.value)
  const onLine = useSelectors((state) => state.onLine.value)
  const showPlaylist = profile?.certificated && onLine

  const links = [
    {
      href: '/profile',
      passingState: null,
      icon: <UserRound />,
      description: myProfile,
    },
    {
      href: '/ranking',
      passingState: null,
      icon: <SearchCheck />,
      description: userSearch,
    },
    {
      href: '/piazza',
      passingState: { conversation: 'piazza', multiple: true },
      icon: <MessagesSquare />,
      description: groupChat,
    },
    {
      href: '/contact',
      passingState: { multiple: true },
      icon: <Siren />,
      description: report,
    },
    {
      href: '/collection',
      passingState: { multiple: true },
      icon: <Film />,
      description: exhibition,
    },
    {
      href: '/',
      passingState: { multiple: true },
      icon: <DoorOpen />,
      description: signOut,
    },
  ]
  return (
    <>
      <Drawer direction="left" onOpenChange={(value) => value ? setTimeout(() => setOpen(value), 250) : setOpen(value)}>
        <DrawerTrigger className="px-5">
          <Avatars element={profile?.certificated ? profile : { defaultProfile: staticImage }} piazza={() => {}} profile={false} />
        </DrawerTrigger>
        <DrawerContent className="border-none bg-light-2 dark:bg-dark-2 right-auto top-0 mt-0 w-[355px] overflow-hidden rounded-[10px]">
          <nav className="flex flex-col justify-between w-[350px]">
            {profile?.certificated ? <NavigationSignedIn /> : <NavigationSignedOut />}
            {onLine ? (
              <div className="flex flex-col justify-between pt-5 gap-5">
                {links.map((value) => {
                  const drawerLinks = (
                    <DrawerClose key={`${linkId}-${value.href}`}>
                      <Links
                        href={value.href}
                        passingState={value.passingState}
                        icon={value.icon}
                        description={value.description}
                      />
                    </DrawerClose>
                  )
                  if ((!['/contact', '/'].includes(value.href) && profile?.certificated) ||
                      (value.href === '/' && profile) ||
                      value.href === '/contact') {
                    return drawerLinks;
                  }
                  return null
                })}
              </div>
            ) : (
              <div className="flex justify-center pt-5 gap-5">
                {needNetworkConnection}
              </div>
            )}
          </nav>
        </DrawerContent>
      </Drawer>
      {showPlaylist && createPortal(
        <Playlist open={open} />,
        document.body
      )}
    </>
  )
}

export default Navigation
