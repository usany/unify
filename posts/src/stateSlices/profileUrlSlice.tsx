import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ProfileUrlState {
  value: string
}

const initialState: ProfileUrlState = {
  value: '',
}
const profileUrlReducer = createSlice({
  name: 'profileUrl',
  initialState,
  reducers: {
    changeProfileUrl: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
  },
})
const { changeProfileUrl } = profileUrlReducer.actions

export { profileUrlReducer, changeProfileUrl }
