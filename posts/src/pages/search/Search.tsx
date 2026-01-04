import { SearchCheck } from 'lucide-react'
import useTexts from 'src/hooks/useTexts'
import PageTitle from 'src/pages/core/pageTitle/PageTitle'
import SearchBar from 'src/pages/search/searchBar/SearchBar'
import SearchList from 'src/pages/search/searchList/SearchList'
import RankingListsTitle from './searchList/searchListViews/searchListViewsTitle/RankingListsTitle'
// import SearchProfile from 'src/pages/search/searchList/SearchProfile'

function Search() {
  const { userSearch } = useTexts()

  return (
    <>
      <PageTitle icon={<SearchCheck />} title={userSearch} />
      <SearchBar />
      <RankingListsTitle multiple={false} />
      <SearchList multiple={false} />
      {/* <SearchProfile /> */}
      <RankingListsTitle multiple={true} />
      <SearchList multiple={true} />
    </>
  )
}

export default Search
