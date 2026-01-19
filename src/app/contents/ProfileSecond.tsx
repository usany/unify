import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useLanguage } from '@/context/LanguageContext'
import { Button } from '@mui/material'

const campuses = {
  ko: ['서울캠퍼스', '국제캠퍼스', '광릉캠퍼스'],
  en: ['Seoul Campus', 'Global Campus', 'Gwangneung Campus']
}
const ProfileSecond = () => {
  const {language} = useLanguage()
  
  return (
    <div className={`flex justify-center gap-1`}>
      <div className='flex items-center'>
        <Select defaultValue={campuses.en[campuses.en.indexOf('Seoul Campus')]}>
          <SelectTrigger
            className="w-52 bg-light-1 dark:bg-dark-1"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-light-1 dark:bg-dark-1">
            <SelectGroup>
              {campuses[language].map((value, index) => {
                return (
                  <SelectItem key={index} value={campuses.en[index]}>
                    {value}
                  </SelectItem>
                )
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button>{language === 'ko' ? '저장' : 'Save'}</Button>
      </div>
    </div>
  )
}

export default ProfileSecond