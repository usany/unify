import { Chip, Divider } from '@mui/material'
import { Ban, Check } from 'lucide-react'
import Avatars from './Avatars'

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
  return (
    <div className="flex truncate justify-center w-full">
      <div className="w-full">
        {elements.map((element, index) => {
          if (userSearch) {
            for (let number = 0; number < userSearch.length; number++) {
              if (element?.name[number] !== userSearch[number]) {
                return null
              }
            }
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
              <div
                className={`flex justify-around
                  ${
                    multiple &&
                    index < 3 &&
                    `bg-[#e2e8f0] dark:bg-[#2d3848] rounded`
                  }`}
              >
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
    </div>
  )
}

export default ListsView
