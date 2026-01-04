import { Building } from 'lucide-react'
import useSelectors from 'src/hooks/useSelectors'
import locationsBuildings, { locationsCollectionLetters } from 'src/pages/add/locationsBuildings'
import locationsCollection from 'src/pages/add/locationsCollection'

const CardViewLocation = ({ message }) => {
  const languages = useSelectors((state) => state.languages.value)
  let location
  if (languages === 'ko') {
    location =
      message.text.count +
      ' ' +
      message.text.counter +
      ' ' +
      message.text.counting
  } else {
    const locationOne =
      locationsBuildings['en'][
      locationsBuildings['ko'].indexOf(message.text.count)
      ]
    if (locationOne) {
      const locationTwo = message.text.count === '직접 입력' ?
        locationsCollection['en'][
        Object.keys(locationsCollectionLetters).find(
          (key) => locationsCollectionLetters[key] === message.text.count,
        )
        ][
        locationsCollection['ko'][
          Object.keys(locationsCollectionLetters).find(
            (key) => locationsCollectionLetters[key] === message.text.count,
          )
        ].indexOf(message.text.counter)
        ]
        : ''
      location = locationOne + ' ' + locationTwo + ' ' + message.text.counting
    } else {
      location =
      message.text.count +
      ' ' +
      message.text.counter +
      ' ' +
      message.text.counting
    }
  }
  location = (!message.text.counter && location.length > 10) ? location.slice(0, 10)+'......' : location
  return (
    <div className="flex gap-1">
      <div className="flex items-center">
        <Building />
      </div>
      <div className="flex items-center">{location}</div>
    </div>
  )
}

export default CardViewLocation
