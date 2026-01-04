import Modes from 'src/pages/core/navigationTop/sideNavigation/Modes'
import NavigationUser from '../navigationUser/NavigationUser'
import { User } from 'firebase/auth'

const NavigationSignedOut = () => {
  return (
    <div className="flex justify-between border-b border-light-3 dark:border-dark-3 p-5 gap-5 w-[350px]">
      <NavigationUser />
      <Modes />
    </div>
  )
}

export default NavigationSignedOut
