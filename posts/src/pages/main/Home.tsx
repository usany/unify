import useSelectors from 'src/hooks/useSelectors'
import Auth from 'src/pages/main/auth/Auth'
import Menu from 'src/pages/main/menu/Menu'

function Home() {
  const profile = useSelectors((state) => state.profile.value)
  return (
    <>
      {profile?.certificated ? (
        <Menu />
      ) : (
        <Auth />
      )}
    </>
  )
}

export default Home
