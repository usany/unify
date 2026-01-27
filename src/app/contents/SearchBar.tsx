import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import RankingListsTitle from './RankingListsTitle';
import ListsView from './ListsView';

interface User {
  id: number;
  name: string;
  point: number;
  campus: string;
  profileImage: boolean;
  profileImageUrl: string;
  defaultProfile: string;
  locationConfirmed: Date | null;
  ranking: number;
}
const myProfile = [{
  id: 1,
  name: 'Me',
  point: 3000,
  campus: '서울',
  profileImage: false,
  profileImageUrl: '',
  defaultProfile: 'https://ijsfbngiyhgvolsprxeh.supabase.co/storage/v1/object/public/remake/animalprofileRed.png',
  locationConfirmed: null,
  ranking: 1,
}]
const usersList: User[] = [
  ...myProfile,
  {
    id: 2,
    name: 'Buddy1',
    point: 2500,
    campus: '국제',
    profileImage: false,
    profileImageUrl: '',
    defaultProfile: 'https://ijsfbngiyhgvolsprxeh.supabase.co/storage/v1/object/public/remake/animalprofileBlue.png',
    locationConfirmed: new Date(),
    ranking: 2
  },
  {
    id: 3,
    name: 'Buddy2',
    point: 2000,
    campus: '광릉',
    profileImage: false,
    profileImageUrl: '',
    defaultProfile: 'https://ijsfbngiyhgvolsprxeh.supabase.co/storage/v1/object/public/remake/animalprofileGold.png',
    locationConfirmed: new Date(),
    ranking: 3
  },
]
function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('')
  const { language } = useLanguage()
  const filteredUsers = usersList.sort((a, b) => b.point - a.point).map((user) => {
    if (searchQuery) {
      const isMatch = user.name.toLowerCase().includes(searchQuery.toLowerCase())
      if (!isMatch) return null
    }
    return (
      <div key={user.id} className='flex items-center gap-4'>
        <img src={user.defaultProfile} alt={user.name} />
        <p>{user.name}</p>
        <p>{user.point}</p>
        <p>{user.campus}</p>
      </div>
    )
  }).filter((user) => user !== null)
  const hasResults = filteredUsers.some((user) => user !== null)
  return (
    <div className='px-5 flex flex-col w-full items-center'>
      <br />
      <TextField sx={{ width: '100%', maxWidth: '1000px', borderRadius: '5px' }} label={language === 'en' ? 'User Name' : '사용자 이름'} value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)}/>
      {!searchQuery && <RankingListsTitle multiple={false} />}
      {!searchQuery && <ListsView elements={myProfile} multiple={false} />}
      <RankingListsTitle multiple={true} />
      <ListsView elements={usersList} userSearch={searchQuery} multiple={true} />
      <br />
    </div>
  )
}

export default SearchBar
