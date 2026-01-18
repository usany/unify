import Avatars from './Avatars'
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
      <div className={`p-1 border-t rounded-xl overflow-auto w-full bg-light-3 dark:bg-dark-3 flex flex-col`}>
        <ul>
          {messagesArray.map((value, index) => {
            const passingValue = {
              defaultProfile: value.defaultProfile,
              profileImageUrl: value.profileImageUrl,
              profileImage: value.profileImage,
            }
            return (
              <li
                key={index}
                className={'text-left'}
              >
                <div
                  className={`flex justify-start`}
                >
                  <div className="flex gap-3 pt-3">
                    <button>
                      <Avatars
                        element={passingValue}
                        profile={false}
                      />
                    </button>
                    {value.id}
                  </div>
                </div>
                <div className="flex gap-3 justify-start">
                  <div className="other rounded-tr-lg rounded-bl-lg rounded-br-lg p-1 bg-light-1 dark:bg-dark-1">
                    {value.msg}
                  </div>
                  <PiazzaScreenClock value={value}/>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default PiazzaScreen
