import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ProfileImageState {
  value: boolean
}

const initialState: ProfileImageState = {
  value: false
}
const profileImageReducer = createSlice({
  name: 'profileImage',
  initialState,
  reducers: {
    changeProfileImage: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload
    },
  }
})
const { changeProfileImage } = profileImageReducer.actions

export { changeProfileImage, profileImageReducer }

