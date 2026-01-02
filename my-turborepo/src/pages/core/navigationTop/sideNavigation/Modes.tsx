import { doc, updateDoc } from 'firebase/firestore'
import { useDispatch } from 'react-redux'
import { dbservice } from 'src/baseApi/serverbase'
import useSelectors from 'src/hooks/useSelectors'
import Switches from 'src/pages/core/navigationTop/sideNavigation/Switches'
import { changeEn, changeKo } from 'src/stateSlices/languagesSlice'
import { changeDark, changeLight } from 'src/stateSlices/themeSlice'
import SwitchesLanguages from './SwitchesLanguages'

const Modes = () => {
  const theme = useSelectors((state) => state.theme.value)
  const profile = useSelectors((state) => state.profile.value)
  const languages = useSelectors((state) => state.languages.value)
  const dispatch = useDispatch()
  const switchLanguages = async () => {
    const docRef = doc(dbservice, `members/${profile?.uid}`)
    if (languages === 'ko') {
      localStorage.setItem('languages', 'en')
      dispatch(changeEn())
      if (profile) {
        await updateDoc(docRef, { preferLanguage: 'en' })
      }
    } else {
      localStorage.setItem('languages', 'ko')
      dispatch(changeKo())
      if (profile) {
        await updateDoc(docRef, { preferLanguage: 'ko' })
      }
    }
  }
  return (
    <div className="flex flex-col justify-center">
      <Switches
        onClick={() => {
          document.documentElement.classList.toggle('dark')
          if (theme === 'light') {
            localStorage.setItem('theme', 'dark')
            dispatch(changeDark())
          } else {
            localStorage.setItem('theme', 'light')
            dispatch(changeLight())
          }
        }}
      />
      <SwitchesLanguages onClick={switchLanguages} />
    </div>
  )
}

export default Modes
