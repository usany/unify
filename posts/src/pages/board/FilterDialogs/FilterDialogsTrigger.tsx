import { Chip } from "@mui/material";
import useSelectors from 'src/hooks/useSelectors';
import locationsBuildings from "src/pages/add/locationsBuildings";
import { useSearchParams } from "react-router-dom";
const items = {
  ko: ['전체 아이템', '우산', '양산'],
  en: ['All items', 'Umbrella', 'Parasol']
}
const locations = {
  ko: ['전체 장소', ...locationsBuildings['ko']],
  en: ['All Places', ...locationsBuildings['en']]
}
const time = {
  ko: ['최신순', '오래된'],
  en: ['Recent', 'Older']
}

function FilterDialogsTrigger() {
  const languages = useSelectors((state) => state.languages.value)
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedValueOne = searchParams.get('selectedValueOne') || '전체 아이템'
  const selectedValueTwo = searchParams.get('selectedValueTwo') || '전체 장소'
  const selectedValueThree = searchParams.get('selectedValueThree') || '최신순'
  const selectedValues = [selectedValueOne, selectedValueTwo, selectedValueThree]

  return (
    <div className="flex gap-1">
      {selectedValues.map((element, index) => {
        let label = element
        if (index === 0) {
          if (languages === 'en') {
            label = items['en'][items['ko'].indexOf(element)]
          }
        } else if (index === 1) {
          if (languages === 'en') {
            label = locations['en'][locations['ko'].indexOf(element)]
          }
        } else {
          if (languages === 'en') {
            label = time['en'][time['ko'].indexOf(element)]
          }
        }
        return (
          <Chip
            key={index}
            label={label}
          />
        )
      })}
    </div>
  );
}

export default FilterDialogsTrigger;
