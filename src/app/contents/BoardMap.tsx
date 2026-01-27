import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { MapIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { dbservice } from 'src/baseApi/serverbase'
import useSelectors from 'src/hooks/useSelectors'
import useTexts from 'src/hooks/useTexts'
import FilterDialogsTrigger from '../FilterDialogs/FilterDialogsTrigger'
import locationsBuildings, { locationsCollectionLetters, markers, buildingsObj, locationsBuildingsArray } from 'src/pages/add/locationsBuildings'
import { Chip } from '@mui/material'

interface Props {
  selectedValues: object
  handleSelectedValues: (newValue: {
    id: string
    newValue: string
  }) => void
}

const defaultLocations = {
  se: buildingsObj.se.secl.location,
  gu: buildingsObj.gu.gucl.location,
  gw: buildingsObj.gw.gwcl.location,
}
// const defaultLocation = markers[0].location
function BoardMap({
  selectedValues,
  handleSelectedValues,
}: Props) {
  const [items, setItems] = useState({})
  const [selectedLocation, setSelectedLocation] = useState('')
  const profile = useSelectors((state) => state.profile.value)
  const locations = {
    Seoul: 'se',
    Global: 'gu',
    Gwangneung: 'gw'
  }
  const {seoul, global, gwangneung} = useTexts()
  const campusesArray = [
    {
      name: 'Seoul',
      displayName: seoul,
      onClick: () => setSelectedLocation('se')
    },
    {
      name: 'Global',
      displayName: global,
      onClick: () => setSelectedLocation('gu')
    },
    {
      name: 'Gwangneung',
      displayName: gwangneung,
      onClick: () => setSelectedLocation('gw')
    },
  ]
  useEffect(() => {
    if (!selectedLocation) {
      setSelectedLocation(locations[profile?.campus && profile?.campus.slice(0, profile?.campus.indexOf(' ')) || 'Seoul'])
    }
  }, [])
  const languages = useSelectors((state) => state.languages.value)
  const [searchParams, setSearchParams] = useSearchParams()
  const onLine = useSelectors((state) => state.onLine.value)
  const [calledMap, setCalledMap] = useState(null)
  const [markings, setMarkings] = useState([])
  const [markersList, setMarkersList] = useState([])
  const [onAccordion, setOnAccordion] = useState(false)
  const selectedValueTwo = searchParams.get('selectedValueTwo')
  const theme = useSelectors((state) => state.theme.value)
  const { borrowing, lending, needNetworkConnection, registeredMap, registeredMapExplanation, itemOne, itemTwo } = useTexts()
  const [currentMarker, setCurrentMarker] = useState('')
  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant', // Optional if you want to skip the scrolling animation
    })
  }, [])

  useEffect(() => {
    const bringMessages = async () => {
      const collectionQuery = query(
        collection(dbservice, 'num'),
        orderBy('creatorClock'),
      )
      const docs = await getDocs(collectionQuery)
      const newArray = []
      const keys = Object.keys(locationsCollectionLetters)
      keys.splice(keys.indexOf('input'), 1)
      const itemCount = Object.fromEntries(keys.map((value) => {
        return [value, {
          usanOne: 0,
          usanTwo: 0,
          ParasolOne: 0,
          ParasolTwo: 0,
        }]
      }))
      docs.forEach((doc) => {
        newArray.push(doc.data())
        if (doc.data().item === '우산') {
          const key = Object.keys(locationsCollectionLetters).find(
            (key) => locationsCollectionLetters[key] === doc.data().text.count,
          )
          if (doc.data().text.choose === 1) {
            if (key) {
              itemCount[key].usanOne += 1
            }
          } else if (doc.data().text.choose === 2) {
            if (key) {
              itemCount[key].usanTwo += 1
            }
          }
        } else if (doc.data().item === '양산') {
          if (doc.data().text.choose === 1) {
            if (key) {
              itemCount[key].ParasolOne += 1
            }
          } else if (doc.data().text.choose === 2) {
            if (key) {
              itemCount[key].ParasolTwo += 1
            }
          }
        }
      })
      setItems(itemCount)
    }
    bringMessages()
  }, [selectedValues[1].value])
  const onClickMarker = (newValue) => {
    handleSelectedValues({ id: 'selectedValueTwo', newValue: newValue })
    const marker = newValue === '전체 장소' ? '' : newValue
    setCurrentMarker(marker)
  }
  const mapRef = useRef(null)
  const displayMap = () => {
    const { naver } = window
    if (mapRef.current && naver) {
      const markersCollection = []
      const infoWindows = []
      const location = new naver.maps.LatLng(
        defaultLocations[selectedLocation || 'se'].lat,
        defaultLocations[selectedLocation || 'se'].lng,
      )
      const map = new naver.maps.Map(mapRef.current, {
        center: location,
        zoom: 17,
      })
      setCalledMap(map)
      const entries = Object.entries(buildingsObj[selectedLocation])
      for (const value of entries) {
        const position = new naver.maps.LatLng(
          value[1].location.lat,
          value[1].location.lng,
        )

        const marker = new naver.maps.Marker({
          map: map,
          position: position,
          title: value[1][languages].name,
          id: value[1][languages].name,
        })
        const key = value[0]
        // const key = Object.keys(locationsCollectionLetters).find(
        //   (key) => locationsCollectionLetters[key] === value[1][languages].name,
        // )
        const contentString = [
          `<div class="markerContainer">
            <div class="markerTitle">
              ${value[1][languages].name}
            </div>
            <div key={index} className="flex gap-5">
                <div className="pt-1">
                  ${itemOne}
                </div>
                <div className="pt-3">
                  ${borrowing}
                  ${items[key].usanOne}
                </div>
                <div className="pt-3">
                  ${lending}
                  ${items[key].usanTwo}
                </div>
                <div className="pt-1">
                  ${itemTwo}
                </div>
                <div className="pt-3">
                  ${borrowing}
                  ${items[key].ParasolOne}
                </div>
                <div className="pt-3">
                  ${lending}
                  ${items[key].ParasolTwo}
                </div>
              </div>
          </div>`,
        ].join('')
        const infoWindow = new naver.maps.InfoWindow({
          id: value[1][languages].name,
          content: contentString,
          maxWidth: 250,
          backgroundColor: theme === 'light' ? '#fff' : '#777',
          anchorColor: theme === 'light' ? '#fff' : '#777',
          borderColor: theme !== 'light' ? '#fff' : '#777',
        })
        if (marker.id === selectedValueTwo) {
          infoWindow.open(map, marker)
        }
        markersCollection.push(marker)
        infoWindows.push(infoWindow)
        setMarkersList(markersCollection)
        setMarkings(infoWindows)
      }
      function getClickHandler(seq) {
        const marker = markersCollection[seq]
        const infoWindow = infoWindows[seq]

        if (infoWindow.getMap()) {
          infoWindow.close()
          onClickMarker('전체 장소')
        } else {
          infoWindow.open(map, marker)
          onClickMarker(entries[seq][1].ko.name)
        }
      }
      for (let number = 0, length = Object.keys(buildingsObj[selectedLocation]).length; number < length; number++) {
        naver.maps.Event.addListener(markersCollection[number], 'click', () => {
          getClickHandler(number)
        })
      }
    }
  }
  useEffect(() => {
    if (onAccordion) {
      displayMap()
    }
  }, [languages, theme, onAccordion, selectedLocation])
  useEffect(() => {
    if (selectedValueTwo && markings.length && calledMap) {
      const index = markings.findIndex((value) => value.id === selectedValueTwo)
      if (index > -1) {
        markings[index]?.open(calledMap, markersList[index])
      }
    }
    if (!selectedValueTwo) {
      markings.forEach((value) => {
        value.close()
      })
    }
  }, [selectedValueTwo])
  return (
    <div className="flex flex-col justify-center">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <div className="flex justify-center sticky top-16 z-30 px-1">
            <div className="w-[1000px]">
              <button
                onClick={() => {
                  document.getElementById('boardMap')?.click()
                }}
                className="rounded shadow-md px-3 flex sticky top-16 z-30 w-full items-center justify-between bg-light-2/50 dark:bg-dark-2/50"
              >
                <div className="flex gap-5">
                  <MapIcon />
                  <div>{registeredMap}</div>
                </div>
                <AccordionTrigger
                  id='boardMap'
                  onClick={() => {
                    setOnAccordion(!onAccordion)
                  }}
                ></AccordionTrigger>
              </button>
            </div>
          </div>
          <AccordionContent>
            <div className='flex flex-col p-5 gap-5'>
            <div className='flex gap-1'>
              {campusesArray.map((value) => {
                return (
                  <Chip
                    sx={selectedLocation === locations[value.name] ? {}:undefined}
                    label={
                      <button onClick={value.onClick}>{value.displayName}</button>
                    }
                  />
                )
              })}
            </div>
            {!currentMarker ? (
              <div className="flex">
                {onLine && registeredMapExplanation}
              </div>
            ) : (
              <div className="flex">
                {/* <FilterDialogsTrigger /> */}
                <Chip label={languages === 'ko' ? currentMarker : locationsBuildings['en'][locationsBuildings['ko'].indexOf(currentMarker)]} />
              </div>
            )}
            </div>
            {onLine ? (
              <div className='px-5'>
              <div
                ref={mapRef}
                className='w-full h-[300px]'
              ></div>
              </div>
            ) : (
              <div className="flex justify-center">
                {needNetworkConnection}
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default BoardMap
