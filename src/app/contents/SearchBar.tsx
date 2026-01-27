import TextField from '@mui/material/TextField';

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
  return (
    <div className='px-5 flex flex-col w-[1000px] items-center'>
      <br />
      <TextField sx={{ width: '1000px', borderRadius: '5px' }} />
      <div className='flex flex-col gap-4 mt-4'>
        {usersList.map((user) => (
          <div key={user.id} className='flex items-center gap-4'>
            <img src={user.defaultProfile} alt={user.name} />
            <p>{user.name}</p>
            <p>{user.point}</p>
            <p>{user.campus}</p>
          </div>
        ))}
      </div>
      <br />
    </div>
  )
}

export default SearchBar
