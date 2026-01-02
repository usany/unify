import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface loadingState {
  value: boolean
}

const initialState: loadingState = {
  value: false
}
const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    changeLoading: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload
    },
  },
})
const { changeLoading } = loadingSlice.actions
const loadingReducer = loadingSlice.reducer

export { changeLoading, loadingReducer }

