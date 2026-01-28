import { useEffect, useRef, useState } from 'react'
import locationsBuildings, { locationsCollectionLetters, markers, buildingsObj, locationsBuildingsArray } from './locationsBuildings'
import { Chip } from '@mui/material'
import { useLanguage } from '@/context/LanguageContext'
import { useTheme } from '@/context/ThemeContext'

const defaultLocations = {
  se: buildingsObj.se.secl.location,
  gu: buildingsObj.gu.gucl.location,
  gw: buildingsObj.gw.gwcl.location,
}
function BoardMap() {
  const [selectedLocation, setSelectedLocation] = useState('se')
  const locations = {
    Seoul: 'se',
    Global: 'gu',
    Gwangneung: 'gw'
  }
  const campusesArray = [
    {
      name: 'Seoul',
      displayName: 'Seoul',
      onClick: () => setSelectedLocation('se')
    },
    {
      name: 'Global',
      displayName: 'Global',
      onClick: () => setSelectedLocation('gu')
    },
    {
      name: 'Gwangneung',
      displayName: 'Gwangneung',
      onClick: () => setSelectedLocation('gw')
    },
  ]
  const [calledMap, setCalledMap] = useState(null)
  const [markings, setMarkings] = useState([])
  const [markersList, setMarkersList] = useState([])
  const [currentMarker, setCurrentMarker] = useState('')
  const [selectedValueTwo, setSelectedValueTwo] = useState('서울캠퍼스 전체')
  const {language} = useLanguage()
  const {theme} = useTheme()
  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant', // Optional if you want to skip the scrolling animation
    })
  }, [])

  const onClickMarker = (newValue) => {
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
          title: value[1].ko.name,
          id: value[1].ko.name,
        })
        const contentString = [
          `<div class="markerContainer">
            <div class="markerTitle">
              ${value[1].ko.name}
            </div>
            <div key={index} className="flex gap-5">
                <div className="pt-1">
                  ${language === 'en' ? 'Umbrella' : '우산'}
                </div>
                <div className="pt-3">
                  ${language === 'en' ? 'borrowing' : '빌리기'}
                  ${0}
                </div>
                <div className="pt-3">
                  ${language === 'en' ? 'lending' : '빌려주기'}
                  ${0}
                </div>
                <div className="pt-1">
                  ${language === 'en' ? 'Parasol' : '양산'}
                </div>
                <div className="pt-3">
                  ${language === 'en' ? 'borrowing' : '빌리기'}
                  ${0}
                </div>
                <div className="pt-3">
                  ${language === 'en' ? 'lending' : '빌려주기'}
                  ${0}
                </div>
              </div>
          </div>`,
        ].join('')
        const infoWindow = new naver.maps.InfoWindow({
          id: value[1].ko.name,
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
    displayMap()
  }, [selectedLocation])
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
      <div className='flex p-5 gap-1'>
        {campusesArray.map((value) => {
          return (
            <Chip
              key={value.name}
              sx={selectedLocation === locations[value.name] ? {}:undefined}
              label={
                <button onClick={value.onClick}>{value.displayName}</button>
              }
            />
          )
        })}
      </div>
      <div className='px-5'>
        <div
          ref={mapRef}
          className='w-full h-[300px]'
        ></div>
      </div>
    </div>
  )
}

export default BoardMap
