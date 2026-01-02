import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const weather = createApi({
  reducerPath: 'weather',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.openweathermap.org/data/2.5/' }),
  endpoints: (build) => ({
    getWeather: build.query({
      query: (location) => {
        const APIKEY = import.meta.env.VITE_WEATHER_API_KEY
        return (`weather?lat=${location.latitude}&lon=${location.longitude}&APPID=${APIKEY}&units=metric`)
      }
    }),
  }),
})

export const { useGetWeatherQuery } = weather
