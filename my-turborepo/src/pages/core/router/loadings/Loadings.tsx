import { useLocation } from 'react-router-dom'
import LoadingsCollection from './loadingsCollection/LoadingsCollection'
import LoadingsContact from './loadingsContact/LoadingsContact'
import LoadingsMain from './loadingsMain/LoadingsMain'
import LoadingsPiazza from './loadingsPiazza/LoadingsPiazza'
import LoadingsProfile from './loadingsProfile/LoadingsProfile'
import LoadingsRanking from './loadingsRanking/LoadingsRanking'
import LoadingsTitle from './loadingsTitle/LoadingsTitle'

function Loadings() {
  const location = useLocation()

  return (
    <div className="flex justify-center flex-col pb-5">
      <LoadingsTitle />
      {location.pathname === '/' && <LoadingsMain />}
      {location.pathname === '/add' && <LoadingsMain />}
      {location.pathname === '/board' && <LoadingsMain />}
      {location.pathname === '/profile' && <LoadingsProfile />}
      {location.pathname === '/ranking' && <LoadingsRanking />}
      {location.pathname === '/piazza' && <LoadingsPiazza />}
      {location.pathname === '/contact' && <LoadingsContact />}
      {location.pathname === '/collection' && <LoadingsCollection />}
    </div>
  )
}

export default Loadings
