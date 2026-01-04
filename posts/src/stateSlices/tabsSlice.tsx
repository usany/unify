import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface TabsState {
  value: number
}

// Define the initial state using that type
const initialState: TabsState = {
  value: location.search === '?action=lend' ? 1 : 0
}

const tabsReducer = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    changeTabs: (state, action: PayloadAction<number>) => {
      state.value = action.payload
    },
  }
})
const { changeTabs } = tabsReducer.actions

export { tabsReducer, changeTabs }

