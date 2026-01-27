import { Chip, Divider } from '@mui/material'
import { Ban, Check } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import useSelectors from 'src/hooks/useSelectors'
import useTexts from 'src/hooks/useTexts'
import Avatars from 'src/pages/core/Avatars'

const ListsView = ({ elements, userSearch, multiple, handleUser }) => {
  const navigate = useNavigate()
  const {empty} = useTexts()
  const profile = useSelectors((state) => state.profile.value)
  const onClick = (element) => {
    const link = '/profile'
    const userLink =
      element.uid === profile?.uid ? link : link + `/?id=${element.uid}`
    if (location.pathname !== '/contact') {
      navigate(userLink, {
        state: {
          element: element,
        },
      })
    } else {
      handleUser(element)
    }
  }
  if (!elements.length) return (
    <div className="flex justify-center">
      <div className="rounded shadow-md bg-light-1 dark:bg-dark-1 p-5">
        {empty}
      </div>
    </div>
  )
  return (
    <div className="flex truncate justify-center">
      <div className="w-[1000px]">
        {elements.map((element, index) => {
          if (userSearch) {
            for (let number = 0; number < userSearch.length; number++) {
              if (element?.displayName[number] !== userSearch[number]) {
                return null
              }
            }
          }
          const displayName =
            (element.displayName?.length || 0) > 9
              ? element.displayName.slice(0, 9) + '......'
              : element.displayName.slice(0, 9)
          const locationConfirmed =
            Date.now() - element.locationConfirmed < 50000000
          return (
            <div
              key={index}
              className="cursor-pointer"
              onClick={() => onClick(element)}
            >
              <div
                className={`flex justify-around
                  ${
                    location.pathname === '/ranking' &&
                    multiple &&
                    index < 3 &&
                    `bg-[#e2e8f0] dark:bg-[#2d3848] rounded`
                  }`}
              >
                <div className="flex items-center justify-center w-[100px]">
                  {multiple ? element.ranking : profile?.ranking}
                </div>
                <div className="flex items-center">
                  <Avatars element={element} piazza={null} profile={false} />
                </div>
                <div className="flex flex-col justify-center items-start overflow-hidden px-3 w-32">
                  <div className="overflow-hidden">{displayName}</div>
                  <div className="overflow-hidden">{element.points}</div>
                </div>
                <div className="flex flex-col justify-center items-center w-[100px]">
                  {element?.campus && element?.campus.slice(0, element?.campus.indexOf(' ')) || 'Seoul'}
                  <Chip sx={{height: '25px'}} color={locationConfirmed ? "success" : undefined} label={locationConfirmed ? <Check /> : <Ban />} />
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
