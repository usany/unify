import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface DefaultProfileState {
  value: string
}

const initialState: DefaultProfileState = {
  value: ''
}
const defaultProfileReducer = createSlice({
  name: 'defaultProfile',
  initialState,
  reducers: {
    changeDefaultProfile: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
  }
})
const { changeDefaultProfile } = defaultProfileReducer.actions

export { changeDefaultProfile, defaultProfileReducer }

