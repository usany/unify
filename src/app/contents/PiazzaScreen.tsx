import Avatars from './Avatars'
import PiazzaForm from './PiazzaForm'
import PiazzaScreenClock from './PiazzaScreenClock'

function PiazzaScreen() {
  const messagesArray = [{
    id: 'KHUSAN',
    msg: 'Welcome to KHUSAN',
    userUid: '1',
    messageClock: new Date(),
    defaultProfile: 'https://ijsfbngiyhgvolsprxeh.supabase.co/storage/v1/object/public/remake/animalprofileRed.png',
    profileImageUrl: 'https://ijsfbngiyhgvolsprxeh.supabase.co/storage/v1/object/public/remake/animalprofileRed.png',
    profileImage: true,
  }]
  return (
    <>
      <br />
      <div className={`p-1 rounded-xl overflow-auto w-full bg-light-3 dark:bg-dark-3 flex flex-col`}>
        <ul>
          {messagesArray.map((value, index) => {
            const passingValue = {
              defaultProfile: value.defaultProfile,
              profileImageUrl: value.profileImageUrl,
              profileImage: value.profileImage,
            }
            return (
              <li key={index}>
                <div className={`flex ${index ? 'justify-end' : 'justify-start'}`}>
                  <div className="flex gap-3 pt-3">
                    {index ? value.id : null}
                    <Avatars
                      element={passingValue}
                      profile={false}
                    />
                    {index ? null : value.id}
                  </div>
                </div>
                <div className={`flex ${index ? 'justify-end' : 'justify-start'}`}>
                  {index ? <PiazzaScreenClock value={value}/> : null}
                  <div className="rounded-tr-lg rounded-bl-lg rounded-br-lg p-1 bg-light-1 dark:bg-dark-1">
                    {value.msg}
                  </div>
                  {index ? null : <PiazzaScreenClock value={value}/>}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
      <PiazzaForm />
      <br />
    </>
  )
}

export default PiazzaScreen
