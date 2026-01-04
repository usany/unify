import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ProfileColorState {
  value: string
}

const initialState: ProfileColorState = {
  value: '#2196f3'
}
const profileColorReducer = createSlice({
  name: 'profileColor',
  initialState,
  reducers: {
    changeProfileColor: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
  }
})
const { changeProfileColor } = profileColorReducer.actions

export { profileColorReducer, changeProfileColor, }

