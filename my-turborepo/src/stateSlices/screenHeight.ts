import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ScreenHeightState {
  value: number
}

const initialState: ScreenHeightState = {
  value: 0
}
const screenHeightReducer = createSlice({
  name: 'screenHeightSwitch',
  initialState,
  reducers: {
    changeScreenHeight: (state, action: PayloadAction<number>) => {
      state.value = action.payload
    },
    // changePiazzaSwitchOff: (state) => {
    //   state.value = 'false'
    // },
  }
})
const { changeScreenHeight } = screenHeightReducer.actions

export { changeScreenHeight, screenHeightReducer }

