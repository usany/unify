import { useSearchParams } from 'react-router-dom'
import useSelectors from 'src/hooks/useSelectors'
import ListsView from './searchListViews/ListsView'

function SearchProfile() {
  const [searchParams, setSearchParams] = useSearchParams()
  const profile = useSelectors((state) => state.profile.value)

  if (searchParams.get('search')) return null
  return (
    <ListsView
      elements={[profile]}
      userSearch={null}
      multiple={false}
      handleUser={null}
    />
  )
}

export default SearchProfile
