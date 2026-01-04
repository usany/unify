import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface newMessageState {
  value: boolean
}

const initialState: newMessageState = {
  value: true
}
const newMessageReducer = createSlice({
  name: 'newMessage',
  initialState,
  reducers: {
    changeNewMessage: (state) => {
      state.value = !state.value
    },
    changeNewMessageTrue: (state) => {
      state.value = true
    },
    changeNewMessageFalse: (state) => {
      state.value = false
    },
  }
})
const { changeNewMessage, changeNewMessageTrue, changeNewMessageFalse } = newMessageReducer.actions

export { newMessageReducer, changeNewMessage, changeNewMessageTrue, changeNewMessageFalse, }

