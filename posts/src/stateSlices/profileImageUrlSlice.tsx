import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ProfileImageUrlState {
  value: string
}

const initialState: ProfileImageUrlState = {
  value: ''
}
const profileImageUrlReducer = createSlice({
  name: 'profileImageUrl',
  initialState,
  reducers: {
    changeProfileImageUrl: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
  }
})
const { changeProfileImageUrl } = profileImageUrlReducer.actions

export { changeProfileImageUrl, profileImageUrlReducer }

