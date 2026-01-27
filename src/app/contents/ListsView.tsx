import { Chip, Divider } from '@mui/material'
import { Ban, Check } from 'lucide-react'
import Avatars from './Avatars'
import { useLanguage } from '@/context/LanguageContext';

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

const ListsView = ({ elements, userSearch, multiple }: { elements: User[], userSearch?: string, multiple: boolean }) => {
  const hasResults = elements.some((element) => {
    if (userSearch) {
      const isMatch = element.name.toLowerCase().includes(userSearch.toLowerCase())
      return isMatch
    }
    return true
  })
  const {language} = useLanguage()
  return (
    <div className="flex truncate justify-center w-full">
      <div className="w-full">
        {elements.map((element, index) => {
          if (userSearch) {
            const isMatch = element.name.toLowerCase().includes(userSearch.toLowerCase())
            if (!isMatch) return null
          }
          const displayName =
            (element.name?.length || 0) > 9
              ? element.name.slice(0, 9) + '......'
              : element.name.slice(0, 9)
          return (
            <div
              key={index}
              className="cursor-pointer"
            >
              <div className="flex justify-around">
                <div className="flex items-center justify-center w-[100px]">
                  {multiple ? element.ranking : element?.ranking}
                </div>
                <div className="flex items-center">
                  <Avatars element={element} profile={false} />
                </div>
                <div className="flex flex-col justify-center items-start overflow-hidden px-3 w-32">
                  <div className="overflow-hidden">{displayName}</div>
                  <div className="overflow-hidden">{element.point}</div>
                </div>
                <div className="flex flex-col justify-center items-center">
                  {element?.campus && element?.campus.slice(0, element?.campus.indexOf(' ')) || 'Seoul'}
                  <Chip sx={{height: '25px'}} color={element.locationConfirmed ? "success" : undefined} label={element.locationConfirmed ? <Check /> : <Ban />} />
                </div>
              </div>
              <Divider />
            </div>
          )
        })}
      </div>
      {!hasResults && (
        <p className='text-center'>{language === 'en' ? 'No users found' : '사용자를 찾을 수 없습니다.'}</p>
      )}
    </div>
  )
}

export default ListsView
