import { useState } from 'react'
import useLargeMedia from 'src/hooks/useLargeMedia'
import useSelectors from 'src/hooks/useSelectors'
import Navigation from 'src/pages/core/navigationTop/sideNavigation/Navigation'
import WeatherView from 'src/pages/core/navigationTop/weatherView/WeatherView'
import ToggleTabs from 'src/pages/core/ToggleTabs'
import useScroll from '../useScroll'
import NavigationScroll from './NavigationScroll'
import NavigationTopCards from './navigationTopCards/NavigationTopCards'
import NavigationTopLogOut from './navigationTopLogOut/NavigationTopLogOut'
import NavigationTopMessages from './navigationTopMessages/NavigationTopMessages'

const NavigationTop = () => {
  const bottomNavigation = useSelectors((state) => state.bottomNavigation.value)
  const scrollNavigation = useSelectors((state) => state.scrollNavigation.value)
  const profile = useSelectors((state) => state.profile.value)
  const largeMedia = useLargeMedia()
  useScroll()
  const scrollLocation =
    ['/', '/add', '/board'].indexOf(location.pathname) === -1
  const piazzaForm = useSelectors((state) => state.piazzaForm.value)
  // if (piazzaForm && location.pathname === '/piazza') return null
  return (
    <>
      <nav className={`${(piazzaForm && location.pathname === '/piazza') && 'opacity-0 pointer-events-none'} shadow-md fixed z-50 bg-light-2 dark:bg-dark-2 rounded truncate w-full`}>
        <div className="flex justify-between w-full items-center">
          <Navigation />
          <div className={`flex ${!largeMedia && 'flex-col'} items-center`}>
            {scrollNavigation && scrollLocation && <NavigationScroll />}
            <>
              {bottomNavigation % 2 === 0 && <ToggleTabs />}
              {bottomNavigation === 1 && (
                <>
                  {profile?.certificated ? (
                    <div className="flex gap-5">
                      <NavigationTopCards />
                      <NavigationTopMessages />
                    </div>
                  ) : (
                    <NavigationTopLogOut />
                  )}
                </>
              )}
            </>
          </div>
          {navigator.onLine ? (
            <WeatherView />
          ) : (
            <div className="w-[145px] h-[64px] px-5"></div>
          )}
        </div>
      </nav>
      {/* {(!piazzaForm || location.pathname !== '/piazza') &&
      } */}
    </>
  )
}

export default NavigationTop
