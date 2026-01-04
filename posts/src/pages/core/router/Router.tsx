import { Suspense, lazy } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import useSelectors from 'src/hooks/useSelectors'
import Navigations from 'src/pages/core/Navigations'
import NavigationTop from 'src/pages/core/navigationTop/NavigationTop'
import Home from 'src/pages/main/Home'
import Piazza from 'src/pages/piazza/Piazza'
import Profile from 'src/pages/profile/Profile'
import Adds from '../../add/Adds'
import Loadings from './loadings/Loadings'
import Boards from 'src/pages/board/Boards'
import { createPortal } from 'react-dom'
import LottieLoading from 'src/lottiesAnimation/LottieLoading'

const Router = () => {
  // const Home = lazy(() => import('src/pages/main/Home'))
  // const Profile = lazy(() => import('src/pages/profile/Profile'))
  // const Piazza = lazy(() => import('src/pages/piazza/Piazza'))
  const Search = lazy(() => import('src/pages/search/Search'))
  const Collection = lazy(() => import('src/pages/collection/Collection'))
  const Contact = lazy(() => import('src/pages/contact/Contact'))
  const profile = useSelectors((state) => state.profile.value)
  const loading = useSelectors((state) => state.loading.value)
  return (
    <BrowserRouter basename="/">
      <div className="flex flex-col">
        <NavigationTop />
        <div className="pt-16 pb-14">
          <Suspense fallback={<Loadings />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add" element={<Adds />} />
              <Route path="/board" element={<Boards />} />
              <Route path="/contact" element={<Contact />} />
              {profile?.certificated && (
                <>
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/ranking" element={<Search />} />
                  <Route path="/piazza" element={<Piazza />} />
                  <Route path="/collection" element={<Collection />} />
                </>
              )}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </div>
        <Navigations />
      </div>
      {loading && createPortal(<LottieLoading />, document.body)}
    </BrowserRouter>
  )
}

export default Router
