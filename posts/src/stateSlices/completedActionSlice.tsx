import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface completedActionState {
  value: string
}

const initialState: completedActionState = {
  value: ''
}
const completedActionReducer = createSlice({
  name: 'completedAction',
  initialState,
  reducers: {
    changeCompletedAction: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
  }
})
const { changeCompletedAction } = completedActionReducer.actions

export { completedActionReducer, changeCompletedAction, }

