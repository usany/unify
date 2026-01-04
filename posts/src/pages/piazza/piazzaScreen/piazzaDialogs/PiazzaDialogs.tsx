
const PiazzaDialogs = ({ initiateContinuing, multiple, handleMultiple, user, userObj, handleMessagesList, displayedName, }) => {
  return (
    <div>
      {/* <Dialog open={selectUser} onClose={handleClose}>
                <DialogContent>
                    <div>
                        <Avatar alt={user?.displayName} sx={{ bgcolor: user?.profileColor || '#2196f3' }} src={user?.profileImageUrl || './src'} variant="rounded" />
                    </div>
                    <div>
                        {user?.displayName}
                    </div>
                    {user?.displayName !== displayedName &&
                        <div>
                            ({displayedName}에서 개명)
                        </div>
                    }
                </DialogContent>
                <DialogActions>
                <Link to='/profile'
                state={{element: user}}
                >
                    <Button variant='outlined' onClick={() => {
                        handleClose()
                    }}>
                        프로필 확인
                    </Button>
                </Link>
                {multiple && userObj.uid !== user?.uid &&
                    <Link to='/piazza'
                    state={{conversation: conversation, displayName: user?.displayName, userUid: userObj.uid, chattingUid: user?.uid, multiple: false, profileUrl: user?.profileImageUrl}}>
                        <Button variant='outlined' onClick={() => {
                            handleMsgList([])
                            handleChangeMessage(true)
                            handleClose()
                        }}>
                            개인 대화
                        </Button>
                    </Link>
                }
                </DialogActions>
            </Dialog> */}
      {/* <Avatar className={'bg-profile-blue'}>
                <AvatarImage src={user?.profileImageUrl} />
                <AvatarFallback className='text-xl border-none	'>{user?.displayName[0]}</AvatarFallback>
              </Avatar> */}
      {/* <Drawer>
        <DrawerTrigger>
          <div id='drawer'></div>
        </DrawerTrigger>
        <DrawerContent className='bg-light-3 dark:bg-dark-3'>
          <ScrollArea className='overflow-y-scroll'>
            <DrawersBar />
            <div className='flex flex-col items-center pt-5'>
              <Avatars uid={userObj.uid} profile={false} profileColor="" profileUrl={user?.profileImageUrl} fallback="" piazza={null} />
              <div>
                {user?.displayName}
              </div>
              {user?.displayName !== displayedName &&
                <div>
                  {languages === 'ko' ?
                    <div>
                      ({displayedName}에서 개명)
                    </div>
                    :
                    <div>
                      (Changed name from {displayedName})
                    </div>
                  }
                </div>
              }
            </div>
            <div className='flex justify-center p-5'>
              <Link
                to={`${location.pathname}?id=${conversation}`}
                state={{ element: user }}>
                <Button variant='outlined' onClick={() => {
                  handleClose()
                }}>
                  {languages === 'ko' ? '프로필 확인' : 'Check Profile'}
                </Button>
              </Link>
              {multiple && userObj.uid !== user?.uid &&
                <Link
                  to={`${location.pathname}?id=${conversation}`}
                  state={{ conversation: conversation, displayName: user?.displayName, userUid: userObj.uid, chattingUid: user?.uid, multiple: false, profileUrl: user?.profileImageUrl }}>
                  <DrawerClose>
                    <Button variant='outlined' onClick={() => {
                      handleMessagesList([])
                      handleChangeMessage(true)
                      handleMultiple(false)
                      initiateContinuing()
                      handleClose()
                    }}>
                      {languages === 'ko' ? '개인 대화' : 'Private messaging'}
                    </Button>
                  </DrawerClose>
                </Link>
              }
            </div>
          </ScrollArea>
        </DrawerContent>
      </Drawer> */}
    </div>
  )
}

export default PiazzaDialogs
