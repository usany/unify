import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { Maximize2, Minimize2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { dbservice } from 'src/baseApi/serverbase'
import useSelectors from 'src/hooks/useSelectors'
import useTexts from 'src/hooks/useTexts'
import BoardMap from 'src/pages/board/boardMap/BoardMap'
import PageTitle from 'src/pages/core/pageTitle/PageTitle'
import { SwipeableViews } from 'src/pages/core/SwipeableViews'
import { useImmer } from 'use-immer'
import locationsBuildings from '../add/locationsBuildings'
import CardsList from '../core/card/CardsList'
import Popups from '../core/Popups'
import BoardList from './BoardList'
import FilterDialogsContent from './FilterDialogs/FilterDialogsContent'
import { DocumentData } from 'firebase/firestore';

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

function Board() {
  const [messages, setMessages] = useState<{
    loaded: boolean,
    items:Array<DocumentData>
  }>({
      loaded: false,
      items: [],
    })
  const [selectedValues, setSelectedValues] = useImmer([
    {
      id: 'selectedValueOne',
      value: '전체 아이템',
    },
    {
      id: 'selectedValueTwo',
      value: '전체 장소',
    },
    {
      id: 'selectedValueThree',
      value: '최신순',
    },
  ])
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
  const handleSelectedValues = ({
    id,
    newValue,
  }: {
    id: string
    newValue: string
  }) => {
    setSelectedValues((values) => {
      const value = values.find((value) => value.id === id)
      if (value) {
        value.value = newValue
      }
    })
    setSearchParams((searchParams) => {
      if (['전체 아이템', '전체 장소', '최신순'].indexOf(newValue) === -1) {
        searchParams.set(id, newValue)
      } else {
        searchParams.delete(id)
      }
      return searchParams
    })
  }
  const profile = useSelectors((state) => state.profile.value)
  const {borrowing, lending, cardList, filtering} = useTexts()
  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant', // Optional if you want to skip the scrolling animation
    })
  }, [])
  useEffect(() => {
    const bringMessages = async () => {
      const order =selectedValues[2].value === '최신순' || !selectedValues[2].value ? 'asc' : 'desc'
      const collectionQuery = query(
        collection(dbservice, 'num'),
        orderBy('creatorClock', order),
      )
      const docs = await getDocs(collectionQuery)
      const newArray = []
      const globalIndex = locationsBuildings.ko.indexOf('국제캠퍼스 전체')
      const gwangneungIndex = locationsBuildings.ko.indexOf('광릉캠퍼스 전체')
      docs.forEach((doc) => {
        if (selectedValues[0].value === '전체 아이템' || selectedValues[0].value === doc.data().item) {
          if (selectedValues[1].value === '전체 장소' || selectedValues[1].value === doc.data().text.count) {
            newArray.push({ id: doc.id, ...doc.data() })
          } else if (selectedValues[1].value === '서울캠퍼스 전체' && locationsBuildings.ko.indexOf(doc.data().text.count) < globalIndex) {
            newArray.push({ id: doc.id, ...doc.data() })
          } else if (selectedValues[1].value === '국제캠퍼스 전체' && locationsBuildings.ko.indexOf(doc.data().text.count) < gwangneungIndex) {
            newArray.push({ id: doc.id, ...doc.data() })
          } else if (selectedValues[1].value === '광릉캠퍼스 전체' && locationsBuildings.ko.indexOf(doc.data().text.count) > gwangneungIndex) {
            newArray.push({ id: doc.id, ...doc.data() })
          }
        }
      })
      setMessages({loaded: true, items: newArray})
    }
    if (profile) {
      bringMessages()
    }
  }, [selectedValues])
  useEffect(() => {
    const bringMessages = async () => {
      const order =selectedValues[2].value === '최신순' || !selectedValues[2].value ? 'asc' : 'desc'
      const collectionQuery = query(
        collection(dbservice, 'num'),
        orderBy('creatorClock', order),
      )
      const docs = await getDocs(collectionQuery)
      const newArray = []
      docs.forEach((doc) => {
        newArray.push({ id: doc.id, ...doc.data() })
      })
      setMessages({loaded: true, items: newArray})
    }
    if (profile) {
      bringMessages()
    }
  }, [selectedValues[2].value])
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
      <SwipeableViews>
        <PageTitle
          icon={<Minimize2 />}
          title={
            `${borrowing} ${cardList}`
          }
        />
        <PageTitle
          icon={<Maximize2 />}
          title={
            `${lending} ${cardList}`
          }
        />
      </SwipeableViews>
      <BoardMap
        selectedValues={selectedSearchParams}
        handleSelectedValues={handleSelectedValues}
      />
      <div className="truncate flex justify-center sticky top-16 z-30 px-1">
        <div className="w-[1000px] shadow-md">
          <Popups
            trigger={<BoardList />}
            title={filtering}
            content={
              <FilterDialogsContent
                selectedValues={selectedSearchParams}
                handleSelectedValues={handleSelectedValues}
              />
            }
          />
        </div>
      </div>
      <SwipeableViews>
        {messages.loaded && (
          <>
            <CardsList
              choose={1}
              messages={messages.items}
            />
            <CardsList
              choose={2}
              messages={messages.items}
            />
          </>
        )}
      </SwipeableViews>
    </>
  )
}

export default Board
