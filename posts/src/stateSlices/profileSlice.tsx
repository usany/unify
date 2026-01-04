import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DocumentData } from 'firebase/firestore';

interface ProfileState {
  value: DocumentData | undefined | null
}

const initialState: ProfileState = {
  value: undefined
}
const profileReducer = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    changeProfile: (state, action: PayloadAction<DocumentData | undefined | null>) => {
      state.value = action.payload
    },
  }
})
const { changeProfile } = profileReducer.actions

export { changeProfile, profileReducer };

