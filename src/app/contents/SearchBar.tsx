import TextField from '@mui/material/TextField';
import { useState } from 'react';

const usersList = [
  {
    id: 1,
    name: 'KHUSAN1',
    point: 100,
    campus: '서울',
    profileImage: false,
    profileImageUrl: '',
    defaultProfile: 'https://ijsfbngiyhgvolsprxeh.supabase.co/storage/v1/object/public/remake/animalprofileRed.png',
  },
  {
    id: 2,
    name: 'KHUSAN2',
    point: 100,
    campus: '국제',
    profileImage: false,
    profileImageUrl: '',
    defaultProfile: 'https://ijsfbngiyhgvolsprxeh.supabase.co/storage/v1/object/public/remake/animalprofileRed.png',
  },
  {
    id: 3,
    name: 'KHUSAN3',
    point: 100,
    campus: '광릉',
    profileImage: false,
    profileImageUrl: '',
    defaultProfile: 'https://ijsfbngiyhgvolsprxeh.supabase.co/storage/v1/object/public/remake/animalprofileRed.png',
  },
]
function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('')
  const filteredUsers = usersList.map((user) => {
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
        })
  const hasResults = filteredUsers.some((user) => user !== null)
  return (
    <div className='px-5 flex flex-col w-[1000px] items-center'>
      <br />
      <TextField sx={{ width: '1000px', borderRadius: '5px' }} value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)}/>
      <div className='flex flex-col gap-4 mt-4'>
        {usersList.map((user) => {
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
        })}
        {!hasResults && (
          <p>No users found</p>
        )}
      </div>
      <br />
    </div>
  )
}

export default SearchBar
