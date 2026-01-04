import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProfileState {
  value: boolean
}

const initialState: ProfileState = {
  value: true
}
const changingUserReducer = createSlice({
  name: 'changingUser',
  initialState,
  reducers: {
    changeChangingUser: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload
    },
  }
})
const { changeChangingUser } = changingUserReducer.actions

export { changeChangingUser, changingUserReducer };

