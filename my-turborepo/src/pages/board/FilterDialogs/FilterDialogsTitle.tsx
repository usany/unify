// import { Filter } from "lucide-react";
import locationsBuildings from "src/pages/add/locationsBuildings";
import useTexts from "src/hooks/useTexts";
const itemsTitle = {
  ko: '우산 / 양산 선택',
  en: 'Select Usan / Parasol'
}
const items = {
  ko: ['전체 아이템', '우산', '양산'],
  en: ['All items', 'Umbrella', 'Parasol']
}
const locationsTitle = {
  ko: '장소 선택',
  en: 'All Places'
}
const locations = {
  ko: ['전체 장소', ...locationsBuildings['ko']],
  en: ['All Places', ...locationsBuildings['en']]
}
const timeTitle = {
  ko: '시간 정렬',
  en: 'Time order'
}
const time = {
  ko: ['최신순', '오래된'],
  en: ['Recent', 'Older']
}
const markers = [
  {
    label: '중도',
    location: { lat: 37.5970966, lng: 127.0527314 }
  },
  {
    label: '네오르네상스관',
    location: { lat: 37.5948201, lng: 127.053091 }
  },
  {
    label: '푸른솔',
    location: { lat: 37.5941125, lng: 127.0557743 }
  },
  {
    label: '간호이과대',
    location: { lat: 37.5960528, lng: 127.0536951 }
  },
  {
    label: '문과대',
    location: { lat: 37.5971991, lng: 127.0539612 }
  },
  {
    label: '청운',
    location: { lat: 37.594732, lng: 127.0517775 }
  },
  {
    label: '의과대',
    location: { lat: 37.59390, lng: 127.0549 }
  },
  {
    label: '경영대',
    location: { lat: 37.5967052, lng: 127.0552861 }
  },
  {
    label: '치과병원',
    location: { lat: 37.594054, lng: 127.0531189 }
  },
]

function FilterDialogsTitle({ selectedValues, handleSelectedValues }) {
  const { filtering } = useTexts()

  return (
    <div>
      {filtering}
    </div >
  );
}

export default FilterDialogsTitle;
