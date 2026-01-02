import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface OnLineState {
  value: boolean
}

const initialState: OnLineState = {
  value: navigator.onLine,
}
const onLineReducer = createSlice({
  name: 'piazzaSwitch',
  initialState,
  reducers: {
    changeOnLine: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload
    },
    // changePiazzaSwitchOff: (state) => {
    //   state.value = 'false'
    // },
  },
})
const { changeOnLine } = onLineReducer.actions

export { changeOnLine, onLineReducer }
