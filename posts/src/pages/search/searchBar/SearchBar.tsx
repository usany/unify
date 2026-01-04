import TextField from '@mui/material/TextField';
import { useSearchParams } from 'react-router-dom';
import useCardsBackground from 'src/hooks/useCardsBackground';
import useSelectors from 'src/hooks/useSelectors'
import useTexts from 'src/hooks/useTexts';

function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams()
  const {userName} = useTexts()
  const onChangeUserSearch = (event) => {
    const { target: { value } } = event
    setSearchParams(searchParams => {
      searchParams.set('search', value)
      if (!value) {
        searchParams.delete('search')
      }
      return searchParams
    })
  }
  const { colorTwo } = useCardsBackground()
  const searchValue = searchParams.get('search')
  return (
    <div className='px-5 flex justify-center'>
      <TextField sx={{ width: '1000px', bgcolor: colorTwo, borderRadius: '5px' }} value={searchValue} label={userName} onChange={onChangeUserSearch} />
    </div>
  )
}

export default SearchBar
