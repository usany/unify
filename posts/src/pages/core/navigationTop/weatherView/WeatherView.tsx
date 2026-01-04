import useSelectors from 'src/hooks/useSelectors'
import useTexts from 'src/hooks/useTexts'
import { useGetWeatherQuery } from 'src/stateSlices/weather'

const WeatherView = () => {
  const { loading, failed, hoegi, seocheon, jinjeop } = useTexts()
  const profile = useSelectors((state) => state.profile.value)
  const campus = profile?.campus ? profile?.campus.slice(0, profile?.campus.indexOf(' ')) : 'Seoul'
  const campusText = campus === 'Seoul' ? hoegi : campus === 'Global' ? seocheon : jinjeop
  const LATITUDE = campus === 'Seoul' ? 37.5948 : campus === 'Global' ? 37.245777 : 37.748940
  const LONGITUDE = campus === 'Seoul' ? 127.0531 : campus === 'Global' ? 127.080122 : 127.186673
  const { data, error, isLoading } = useGetWeatherQuery({latitude: LATITUDE, longitude: LONGITUDE})
  if (isLoading) return <div className='flex items-center px-5 w-[148px] h-[64px]'>{loading}</div>
  if (error) return <div className='flex items-center px-5 w-[148px] h-[64px]'>{failed}</div>
  return (
    <div className='flex flex-col px-5'>
      <img className='size-10' src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} />
      <span>{campusText} {data.main.temp}°C</span>
    </div>
  )
}

export default WeatherView
