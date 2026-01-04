// import Avatar from '@mui/material/Avatar';

function ProfileListsView({ element, displayName, changeSelectedUser }) {
  const locationConfirmed = Date.now() - element.locationConfirmed < 50000000

  return (
    <div className="px-5">
      {/* <Lists userObj={null} elements={element} multiple={true} userSearch={userSearch} ranking={false} handleUser={(newValue) => changeViolationUser(newValue)} />
      <div
        className={`flex w-full justify-between p-3 rounded`}
        onClick={() => {
          changeSelectedUser(element)
        }}
      >
        <div className="flex gap-5">
          <Avatars element={element} uid={element.uid} piazza={null} profile={false} profileColor={''} profileUrl={element?.profileImageUrl} />
          <div className="flex flex-col justify-center overflow-hidden px-5 w-40">
            <div className="overflow-hidden">{displayName}</div>
          </div>
        </div>
        <div className='flex items-center'>
          {locationConfirmed ?
            <Chip label={'캠퍼스 위치 확인'} /> : <Chip label={'캠퍼스 위치 미확인'} />
          }
        </div>
      </div>
      <Divider /> */}
    </div>
  )
}

export default ProfileListsView
