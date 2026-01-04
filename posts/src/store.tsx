import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { bottomNavigationReducer } from 'src/stateSlices/bottomNavigationSlice'
import { cardAccordionReducer } from 'src/stateSlices/cardAccordionSlice'
import { completedActionReducer } from 'src/stateSlices/completedActionSlice'
import { messageAccordionReducer } from 'src/stateSlices/messageAccordionSlice'
import { newMessageReducer } from 'src/stateSlices/newMessageSlice'
import { piazzaSwitchReducer } from 'src/stateSlices/piazzaSwitchSlice'
import { profileColorReducer } from 'src/stateSlices/profileColorSlice'
import { profileImageReducer } from 'src/stateSlices/profileImageSlice'
import { profileUrlReducer } from 'src/stateSlices/profileUrlSlice'
import { tabsReducer } from 'src/stateSlices/tabsSlice'
import { themeReducer } from 'src/stateSlices/themeSlice'
import { changingUserReducer } from './stateSlices/changingUserSlice'
import { defaultProfileReducer } from './stateSlices/defaultProfileSlice'
import { languagesReducer } from './stateSlices/languagesSlice'
import { onLineReducer } from './stateSlices/onLineSlice'
import { piazzaFormReducer } from './stateSlices/piazzaFormSlice'
import { profileImageUrlReducer } from './stateSlices/profileImageUrlSlice'
import { profileReducer } from './stateSlices/profileSlice'
import { scrollNavigationReducer } from './stateSlices/scrollNavigationSlice'
import { userCertificatedReducer } from './stateSlices/userCertificatedSlice'
import { weather } from './stateSlices/weather'
import { currentUserApi } from './stateSlices/baseQuery'
import { screenHeightReducer } from './stateSlices/screenHeight'
import { loadingReducer } from './stateSlices/loadingSlice'

export const store = configureStore({
  reducer: {
    userCertificated: userCertificatedReducer,
    scrollNavigation: scrollNavigationReducer,
    profileUrl: profileUrlReducer.reducer,
    profileColor: profileColorReducer.reducer,
    profileImage: profileImageReducer.reducer,
    defaultProfile: defaultProfileReducer.reducer,
    profileImageUrl: profileImageUrlReducer.reducer,
    profile: profileReducer.reducer,
    cardAccordion: cardAccordionReducer.reducer,
    messageAccordion: messageAccordionReducer.reducer,
    piazzaSwitch: piazzaSwitchReducer.reducer,
    piazzaForm: piazzaFormReducer.reducer,
    theme: themeReducer.reducer,
    bottomNavigation: bottomNavigationReducer,
    tabs: tabsReducer.reducer,
    completedAction: completedActionReducer.reducer,
    newMessage: newMessageReducer.reducer,
    weather: weather.reducer,
    languages: languagesReducer.reducer,
    changingUser: changingUserReducer.reducer,
    onLine: onLineReducer.reducer,
    user: currentUserApi.reducer,
    screenHeight: screenHeightReducer.reducer,
    loading: loadingReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      weather.middleware,
      currentUserApi.middleware,
    ]),
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
