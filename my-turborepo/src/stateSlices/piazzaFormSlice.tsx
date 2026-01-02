import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PiazzaFormState {
  value: boolean
}

const initialState: PiazzaFormState = {
  value: false
}
const piazzaFormReducer = createSlice({
  name: 'piazzaFormSwitch',
  initialState,
  reducers: {
    changePiazzaForm: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload
    },
    // changePiazzaSwitchOff: (state) => {
    //   state.value = 'false'
    // },
  }
})
const { changePiazzaForm } = piazzaFormReducer.actions

export { changePiazzaForm, piazzaFormReducer }

