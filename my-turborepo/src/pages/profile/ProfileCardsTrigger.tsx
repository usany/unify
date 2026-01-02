import { collection, getDocs, query } from 'firebase/firestore'
import { dbservice } from 'src/baseApi/serverbase'
import useTexts from 'src/hooks/useTexts'
import Card from '@mui/material/Card'
import useCardsBackground from '../../hooks/useCardsBackground'
import { useEffect, useState } from 'react'
import { AnimatedNumber } from 'src/components/motion-primitives/animated-number'

interface Props {
  cards?: {
    point?: number;
  };
  isFollowers?: boolean;
  alliesCollectionList?: string[];
  handleCompanies?: (newValue: any[]) => void;
}

const ProfileCardsTrigger: React.FC<Props> = ({
  cards,
  isFollowers = false,
  alliesCollectionList = [],
  handleCompanies = () => {}
}: Props) => {
  const [animatedPoints, setAnimatedPoints] = useState({points: 0, followers: 0, followings: 0})
  const { points, follower, following } = useTexts()
  const { colorTwo } = useCardsBackground()
  const usersCollection = async () => {
    const elementsCollection = []
    const collectionRef = collection(dbservice, 'members')
    const docs = await getDocs(query(collectionRef))
    docs.forEach((element) => {
      if (alliesCollectionList.indexOf(element.data().uid) !== -1) {
        elementsCollection.push(element.data())
      }
    })
    handleCompanies(elementsCollection)
  }
  useEffect(() => {
    if (cards) {
      setAnimatedPoints({...animatedPoints, points: cards?.point})
    } else if (isFollowers) {
      setAnimatedPoints({...animatedPoints, followers: alliesCollectionList?.length || 0 })
    } else {
      setAnimatedPoints({...animatedPoints, followings: alliesCollectionList?.length || 0 })
    }
  }, [cards?.point, alliesCollectionList?.length])
  return (
    <Card
      sx={{
        bgcolor: colorTwo,
        padding: '20px'
      }}
    >
      {cards ?
        <>
          <div>{points}</div>
          <div className='flex justify-center'>{<AnimatedNumber value={animatedPoints.points} />}</div>
        </>
        :
        <div onClick={usersCollection}>
          <div>{isFollowers ? follower : following}</div>
          <div className="flex justify-center">
            {isFollowers ? <AnimatedNumber value={animatedPoints.followers} /> : <AnimatedNumber value={animatedPoints.followings} />}
            {/* <AnimatedNumber value={isFollowers ? animatedPoints.followers : animatedPoints.followings} /> */}
          </div>
        </div>
      }
    </Card>
  )
}

export default ProfileCardsTrigger
