import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  updateDoc,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { dbservice } from 'src/baseApi/serverbase'
import useSelectors from 'src/hooks/useSelectors'
import useTexts from 'src/hooks/useTexts'
import ListsView from './searchListViews/ListsView'
import { useDispatch } from 'react-redux'
import { changeProfile } from 'src/stateSlices/profileSlice'
let point
let samePointIndex
function SearchList({multiple}) {
  const [rank, setRank] = useState([])
  const [continuing, setContinuing] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const scrollNumber = 20
  const { loading } = useTexts()
  const userSearch = searchParams.get('search')
  const profile = useSelectors((state) => state.profile.value)
  if (searchParams.get('search') && !multiple) return null
  if (!multiple) return (
    <ListsView
      elements={[profile]}
      userSearch={null}
      multiple={false}
      handleUser={null}
    />
  )
  const dispatch = useDispatch()
  useEffect(() => {
    const membersList = async () => {
      const collectionQuery = query(
        collection(dbservice, 'members'),
        orderBy('points', 'desc'),
        limit(scrollNumber),
        startAfter(continuing ? continuing : ''),
      )
      const docs = await getDocs(collectionQuery)
      const length = rank.length
      const newArray = docs.docs.map((document, index) => {
        if (document.data().points !== point) {
          point = document.data().points
          samePointIndex = length + index
        }
        const user = doc(dbservice, `members/${document?.id}`)
        const newRank = samePointIndex ? samePointIndex + 1 : index + 1
        if (document.data()?.ranking !== newRank && multiple) {
          console.log(document.data()?.ranking)
          updateDoc(user, { ranking: newRank })
          if (document.id === profile?.uid) {
            dispatch(changeProfile({...profile, ranking: newRank}))
          }
        }
        if (userSearch) {
          for (let number = 0; number < userSearch.length; number++) {
            if (document.data().displayName[number] !== userSearch[number]) {
              return null
            }
          }
        }

        if (rank.indexOf(document) === -1) {
          if (index + 1 === docs.docs.length) {
            setContinuing(document)
          }
          return {
            ...document.data(), ranking: samePointIndex+1
          }
        }
        return null
      })
      setRank([...rank, ...newArray])
      setIsLoading(false)
    }
    const searchingMembersList = async () => {
      const collectionQuery = query(
        collection(dbservice, 'members'),
        orderBy('points', 'desc'),
        startAfter(continuing ? continuing : ''),
      )
      const docs = await getDocs(collectionQuery)
      const newArray = docs.docs.map((document, index) => {
        if (rank.indexOf(document) === -1) {
          if (index + 1 === docs.docs.length) {
            setContinuing(document)
          }
          return {
            ...document.data(),
          }
        }
        return null
      })
      setRank([...rank, ...newArray])
      setIsLoading(false)
    }
    if (isLoading || rank.length === 0) {
      membersList()
    }
    if (userSearch) {
      searchingMembersList()
    }
  }, [isLoading, userSearch])
  const handleScroll = () => {
    // console.log(document.documentElement.offsetHeight)
    // console.log(window.innerHeight)
    // console.log(document.documentElement.scrollTop)
    if (
      (document.documentElement.offsetHeight -
      (window.innerHeight + Math.round(document.documentElement.scrollTop)) < scrollNumber) 
      || (document.documentElement?.scrollTop &&
      document.documentElement?.scrollTop > scrollNumber)
    ) {
      setIsLoading(true)
    }
    // if (
    //   (document.documentElement.offsetHeight -
    //     (window.innerHeight + Math.round(document.documentElement.scrollTop)) >
    //     scrollNumber) ||
    //   isLoading
    // ) {
    //   console.log(document.documentElement.offsetHeight)
    //   return
    // } else {
    //   console.log('scroll')
    //   setIsLoading(true)
    // }
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isLoading])
  return (
    <>
      <ListsView
        elements={rank}
        multiple={true}
        userSearch={userSearch}
        handleUser={null}
      />
      {userSearch && isLoading && (
        <div className="flex justify-center text-2xl bg-light-2 dark:bg-dark-2 rounded">
          {loading}
        </div>
      )}
    </>
  )
}

export default SearchList
