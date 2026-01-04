import CommentIcon from '@mui/icons-material/Comment';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { dbservice } from 'src/baseApi/serverbase';
import Avatars from './core/Avatars';

function Allies() {
  // const [followers, setFollowers] = useState([])
  // const [followings, setFollowings] = useState([])
  const [elements, setElements] = useState([])
  const { state } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    usersCollection()
  }, [])
  const usersCollection = async () => {
    // const followersCollection = []
    // const followingsCollection = []
    const elementsCollection = []
    const collectionRef = collection(dbservice, 'members')
    const docs = await getDocs(query(collectionRef, orderBy('points', 'desc')))
    docs.forEach((element) => {
      if (state.alliesCollection.indexOf(element.data().uid) !== -1) {
        elementsCollection.push(element.data())
        setElements(elementsCollection)
      }
      // if (state.alliesCollection.indexOf(element.data().uid) !== -1) {
      //   elementsCollection.push(element.data())
      //   setFollowings(followingsCollection)
      // }
    })
  }
  // const elements = state.followers ? followers : followings
  return (
    <div>
      <div className='flex text-2xl p-5'>
        {state.user.displayName}의 {state.followers ? '팔로워' : '팔로잉'}
        {/* {state.followers &&
            <div>
            </div>
          }
          {!state.followers &&
            <div>
              {state.user.displayName}의 팔로잉
            </div>
          } */}
      </div>
      <div>
        {/* {state.followers ?
          <div className='flex flex-col justify-center flex-wrap'>
            {followers?.map((element, index) => {
              return (
                <div key={index} className='flex'>
                  <div className='flex justify-between w-full'>
                    <div className='flex'>
                      <ListItemAvatar>
                        <Avatar alt={element.displayName} sx={{ bgcolor: element.profileColor }} src="./src" />
                      </ListItemAvatar>
                      <div className='flex flex-col overflow-hidden'>
                        <div>
                          {element.displayName}
                        </div>
                        <div>
                          {element.points}
                        </div>
                      </div>
                    </div>
                    <div>
                      <IconButton aria-label="comment">
                        <Link to='/profile'
                          state = {{
                            element: element,
                          }}
                        >
                          <CommentIcon />
                        </Link>
                      </IconButton>
                    </div>
                  </div>
                  <Divider variant="inset" component="li" />
                </div>
              )
            })}
          </div>
          : */}
        <div className='flex flex-col justify-center flex-wrap'>
          {elements?.map((element, index) => {
            return (
              <div key={index}>
                <div className='flex justify-between w-full px-5'>
                  <div>
                    <Avatars element={element} uid={element.uid} profileColor={element.profileColor} profileUrl={element.profileUrl} profile={false} piazza={null} />
                    {/* <ListItemAvatar>
                      <Avatar alt={element.displayName} sx={{ bgcolor: element.profileColor || '#2196f3' }} src="./src" />
                    </ListItemAvatar> */}
                  </div>
                  <div>
                    <div className='flex flex-col overflow-hidden'>
                      <div>
                        {element.displayName}
                      </div>
                      <div>
                        {element.points}
                      </div>
                    </div>
                  </div>
                  <div>
                    <IconButton aria-label="comment">
                      <Link to={`/profile/?id:${element.uid}`}
                        state={{
                          element: element,
                        }}
                      >
                        <CommentIcon />
                      </Link>
                    </IconButton>
                  </div>
                </div>
                <Divider variant="inset" component="li" />
              </div>
            )
          })}
        </div>
        {/* } */}
      </div>
      {/* <div className='flex justify-center p-10'>
        <Button variant='outlined' onClick={() => navigate(-1)}>확인</Button>
      </div> */}
    </div>
  )
}

export default Allies
