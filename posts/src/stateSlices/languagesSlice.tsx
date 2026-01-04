import { createSlice } from '@reduxjs/toolkit'
interface languagesState {
  value: string
}
const initialState: languagesState = { value: localStorage.getItem('languages') ? localStorage.getItem('languages') : (navigator.language.slice(0, 2) !== 'ko' ? 'en' : 'ko') }
const languagesReducer = createSlice({
  name: 'languages',
  initialState: initialState,
  reducers: {
    changeKo: state => {
      state.value = 'ko'
    },
    changeEn: state => {
      state.value = 'en'
    },
  }
})
const { changeKo, changeEn } = languagesReducer.actions

export { changeEn, changeKo, languagesReducer }
// export default counterSlice
