import { collection, getDocs, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { dbservice } from 'src/baseApi/serverbase';
import Cards from 'src/pages/core/card/Cards';

const ProfileCompletedContent = ({
  user,
}) => {
  const [messagesList, setMessagesList] = useState([])
  const completedAction = useSelector(state => state.completedAction.value)
  useEffect(() => {
    const getMessage = async () => {
      const messagesRef = query(collection(dbservice, 'num'))
      const querySnap = await getDocs(messagesRef)
      const messagesArray = []
      querySnap.forEach((docSnap) => {
        const messageId = docSnap.id
        const messageObj = docSnap.data()
        const message = { id: messageId, ...messageObj }
        if (messageObj.creatorId === user.uid || messageObj.connectedId === user.uid) {
          messagesArray.push(message)
        }
      })
      setMessagesList(messagesArray)
    }
    getMessage()
  }, [])

  const borrowList = messagesList.map((element) => {
    if (element.round === 5) {
      if (element.creatorId === user.uid && element.text.choose === 1) {
        return (
          <Cards key={element.id} message={element} isOwner={true} userObj={user} num={null} points={null} />
        )
      } else if (element.creatorId !== user.uid && element.text.choose === 2) {
        return (
          <Cards key={element.id} message={element} isOwner={false} userObj={user} num={null} points={null} />
        )
      }
    }
  }).filter((element) => {
    if (element) return element
  })
  const lendList = messagesList.map((element) => {
    if (element.round === 5) {
      if (element.creatorId === user.uid && element.text.choose === 2) {
        return (
          <Cards key={element.id} message={element} isOwner={true} userObj={user} num={null} points={null} />
        )
      } else if (element.creatorId !== user.uid && element.text.choose === 1) {
        return (
          <Cards key={element.id} message={element} isOwner={false} userObj={user} num={null} points={null} />
        )
      }
    }
  }).filter((element) => {
    if (element) return element
  })
  return (
    <div className='p-5'>
      {completedAction === 'borrow' ?
        <div className='flex justify-center flex-wrap'>
          {borrowList.length ? borrowList : <div className='flex justify-center rounded shadow-md bg-light-1 dark:bg-dark-1 p-5'>완료된 빌리기가 없습니다</div>}
        </div>
        :
        <div className='flex justify-center flex-wrap'>
          {lendList.length ? lendList : <div className='flex justify-center rounded shadow-md bg-light-1 dark:bg-dark-1 p-5'>완료된 빌려주기가 없습니다</div>}
        </div>
      }
    </div>
  );
}

export default ProfileCompletedContent
