import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface userCertificatedState {
  value: boolean
}

const initialState: userCertificatedState = {
  value: true
}
const userCertificatedSlice = createSlice({
  name: 'userCertificated',
  initialState,
  reducers: {
    changeUserCertificated: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload
    },
  },
})
const { changeUserCertificated } = userCertificatedSlice.actions
const userCertificatedReducer = userCertificatedSlice.reducer

export { changeUserCertificated, userCertificatedReducer, userCertificatedSlice }

