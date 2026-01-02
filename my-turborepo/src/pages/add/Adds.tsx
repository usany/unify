import useSelectors from 'src/hooks/useSelectors'
import { SwipeableViews } from 'src/pages/core/SwipeableViews'
import Add from './Add'
import Layout from './Layout'

function Adds() {
  const profile = useSelectors((state) => state.profile.value)
  return (
    <>
      {profile?.certificated ? (
        <SwipeableViews>
          <Add borrow={true} />
          <Add borrow={false} />
        </SwipeableViews>
      ) : (
        <SwipeableViews>
          <Layout borrow={true} />
          <Layout borrow={false} />
        </SwipeableViews>
      )}
    </>
  )
}

export default Adds
