import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Payload } from 'recharts/types/component/DefaultLegendContent'

interface PiazzaSwitchState {
  value: string | null
}

const initialState: PiazzaSwitchState = {
  value: window.localStorage.getItem('piazza')
}
const piazzaSwitchReducer = createSlice({
  name: 'piazzaSwitch',
  initialState,
  reducers: {
    changePiazzaSwitch: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
    // changePiazzaSwitchOff: (state) => {
    //   state.value = 'false'
    // },
  }
})
const { changePiazzaSwitch } = piazzaSwitchReducer.actions

export { piazzaSwitchReducer, changePiazzaSwitch, }

