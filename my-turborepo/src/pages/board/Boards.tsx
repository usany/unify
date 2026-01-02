import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useSelectors from 'src/hooks/useSelectors'
import { SwipeableViews } from 'src/pages/core/SwipeableViews'
import locationsBuildings from '../add/locationsBuildings'
import LayoutBoard from './LayoutBoard'
import Board from './Board'

const items = {
  ko: ['전체 아이템', '우산', '양산'],
  en: ['All items', 'Umbrella', 'Parasol'],
}
const locations = {
  ko: ['전체 장소', ...locationsBuildings['ko']],
  en: ['All Places', ...locationsBuildings['en']],
}
const time = {
  ko: ['최신순', '오래된'],
  en: ['Recent', 'Older'],
}
const options = [items.ko, locations.ko, time.ko]

function Boards() {
  const profile = useSelectors((state) => state.profile.value)
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedSearchParams = [
    {
      id: 'selectedValueOne',
      value: searchParams.get('selectedValueOne') || '전체 아이템',
    },
    {
      id: 'selectedValueTwo',
      value: searchParams.get('selectedValueTwo') || '전체 장소',
    },
    {
      id: 'selectedValueThree',
      value: searchParams.get('selectedValueThree') || '최신순',
    },
  ]
  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant', // Optional if you want to skip the scrolling animation
    })
  }, [])
  useEffect(() => {
    if (!window.location.search) {
      navigate('/board?action=borrow', {replace: true})
    } else {
      selectedSearchParams.map((element, index) => {
        if (options[index].indexOf(element.value) === -1) {
          navigate('/add?action=borrow', {replace: true})
        }
      })
    }
  }, [])

  return (
    <>
      {profile?.certificated ? (
        <Board />
      ) : (
        <SwipeableViews>
          <LayoutBoard isBorrow={true} />
          <LayoutBoard isBorrow={false} />
        </SwipeableViews>
      )}
    </>
  )
}

export default Boards
