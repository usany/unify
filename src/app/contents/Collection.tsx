import { GoogleGenAI } from '@google/genai'
import { Button } from '@mui/material'
import { decode } from 'base64-arraybuffer'
import { arrayRemove, arrayUnion, collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore'
import { Ban, BanIcon, Delete, Film, PlusCircle, ThumbsDown, ThumbsUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import supabase from 'src/baseApi/base'
import { dbservice } from 'src/baseApi/serverbase'
import {
  MorphingDialog,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogTrigger,
} from 'src/components/ui/morphing-dialog'
import useSelectors from 'src/hooks/useSelectors'
import useTexts from 'src/hooks/useTexts'
import LottieOnce from 'src/lottiesAnimation/LottieOnce'
import LottieProcess from 'src/lottiesAnimation/LottieProcess'
import { changeBottomNavigation } from 'src/stateSlices/bottomNavigationSlice'
import Avatars from '../core/Avatars'
import PageTitle from '../core/pageTitle/PageTitle'
import Popups from '../core/Popups'
import useCardsBackground from 'src/hooks/useCardsBackground'
import FileOpenIcon from '@mui/icons-material/FileOpen';
import { AnimatedGroup } from 'src/components/motion-primitives/animated-group'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

function Collection() {
  const {colorOne} = useCardsBackground()
  const profile = useSelectors((state) => state.profile.value)
  const genai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY })
  const {
    register,
    uploadMyFile,
    cannotFindAnUmbrella,
    findingAnUmbrella,
    exhibition,
    newUpload,
    aiIsLookingForAnUmbrella,
    aiIsBusy,
  } = useTexts()
  const [error, setError] = useState(false)
  async function chat(url) {
    try {
      let file = 'png'
      const fileText = url.slice(url.indexOf('/') + 1, url.indexOf('/') + 2)
      if (fileText === 'p') {
        file = 'png'
      } else if (fileText === 'j') {
        file = 'jpeg'
      }
      const contents = [
        {
          inlineData: {
            mimeType: `image/${file}`,
            data: url.slice(url.indexOf(',') + 1),
          },
        },
        { text: 'Is there any umbrella? Yes or no.' },
      ]
      const response = await genai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: contents,
      })
      setLoading(false)
      return response.text
    } catch (error) {
      console.log(error)
      setError(true)
      setLoading(false)
    }
  }
  const [loading, setLoading] = useState(false)
  const [isUmbrella, setIsUmbrella] = useState('')
  const [images, setImages] = useState([])
  const [attachment, setAttachment] = useState(null)
  const changeAttachment = (newValue) => setAttachment(newValue)
  const [changedImage, setChangedImage] = useState({
    attachment: false,
    profileCharacter: '',
    profileImage: false,
    defaultProfile: '',
    profileImageUrl: '',
    profileColor: '',
    initial: true,
    changed: false,
  })
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [connectedUsers, setConnectedUsers] = useState([])
  const dispatch = useDispatch()
  // const initialProfile = {
  //   attachment: false,
  //   profileCharacter: '',
  //   profileImage: false,
  //   defaultProfile: '',
  //   profileImageUrl: '',
  //   profileColor: '',
  //   initial: true,
  //   changed: false,
  // }
  const navigate = useNavigate()
  const handleChangedImage = (newValue) => setChangedImage(newValue)
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event
    const theFile = files[0]
    console.log(files)
    const reader = new FileReader()
    reader.onloadend = async (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent
      changeAttachment(result)
      setChangedImage({
        ...changedImage,
        attachment: true,
        profileImage: true,
        profileImageUrl: result,
        changed: true,
      })
      setLoading(true)
      const response = await chat(result)
      setIsUmbrella(response)
    }
    reader.readAsDataURL(theFile)
  }
  const newImage = async () => {
    if (attachment) {
      const now = new Date().getTime()
      const id = profile.uid + now.toString()
      setImages((images) => [
        {
          uid: id,
          userUid: profile.uid,
          displayName: profile.displayName,
          defaultProfile: attachment,
          connectedUsers: []
        },
        ...images,
      ])
      const docRef = doc(dbservice, `collections/${id}`)
      await setDoc(docRef, {
        uid: id,
        userUid: profile.uid,
        displayName: profile.displayName,
        defaultProfile: `${import.meta.env.VITE_SUPABASE_STORAGE_URL}/${id}`,
        connectedUsers: []
      })
      const splitedArray = attachment.split(';base64,')
      const content = splitedArray[0].slice(5)
      const base64 = splitedArray[1]
      const { data, error } = await supabase.storage
        .from('remake')
        .update(`collection/${id}`, decode(base64), {
          contentType: content,
        })
      if (data) {
        console.log(data)
      } else {
        console.log(error)
      }
    }
  }
  const deleteImage = async (id) => {
    const docRef = doc(dbservice, `collections/${id}`)
    await deleteDoc(docRef)
    await supabase.storage.from('remake').remove([`collection/${id}`])
    setImages((prev) => prev.filter((value) => value.uid !== id))
  }
  const connectUser = async (id) => {
    const docRef = doc(dbservice, `collections/${id}`)
    await updateDoc(docRef, {
      connectedUsers: arrayUnion(profile.uid)
    })
    setConnectedUsers((prev) => [...prev, profile.uid])
  }
  const disconnectUser = async (id) => {
    const docRef = doc(dbservice, `collections/${id}`)
    await updateDoc(docRef, {
      connectedUsers: arrayRemove(profile.uid)
    })
    setConnectedUsers((prev) => prev.filter((value) => value !== profile.uid))
  }
  // useEffect(() => {
  //   if (loading) {
  //     setChangedImage({
  //       attachment: false,
  //       profileCharacter: '',
  //       profileImage: false,
  //       defaultProfile: '',
  //       profileImageUrl: '',
  //       profileColor: '',
  //       initial: true,
  //       changed: false,
  //     })
  //   }
  //   if (attachment && !changedImage.attachment) {
  //     setChangedImage({
  //       ...changedImage,
  //       attachment: true,
  //       profileImage: true,
  //       profileImageUrl: attachment,
  //       changed: true,
  //     })
  //   }
  // }, [loading])
  useEffect(() => {
    const bringImages = async () => {
      const ref = collection(dbservice, 'collections')
      const docs = await getDocs(ref)
      const newImages = []
      docs.forEach((element) => {
        const uid = element.data().uid
        const userUid = element.data().userUid
        const displayName = element.data().displayName
        const defaultProfile = element.data().defaultProfile
        const connectedUsers = element.data().connectedUsers
        if (defaultProfile) {
          newImages.push({
            uid: uid,
            userUid: userUid,
            displayName: displayName,
            defaultProfile: defaultProfile,
            connectedUsers: connectedUsers
          })
        }
      })
      setImages(newImages)
    }
    bringImages()
  }, [])
  useEffect(() => {
    dispatch(changeBottomNavigation(5))
  }, [])
  return (
    <div>
      <div
        className="flex gap-5 justify-center"
        onClick={() => {
          if (!loading) {
            handleChangedImage({
              attachment: false,
              profileCharacter: '',
              profileImage: false,
              defaultProfile: '',
              profileImageUrl: '',
              profileColor: '',
              initial: true,
              changed: false,
            })
            changeAttachment(null)
            setIsUmbrella('')
            setError(false)
          }
        }}
      >
        <PlusCircle />
        {register}
      </div>
      {images.length > 0 && 
        <AnimatedGroup className="grid grid-cols-[repeat(auto-fit,minmax(80px,1fr))] col-span-full p-5">
          {images.map((element, index) => {
            return (
              <MorphingDialog key={index}>
                <MorphingDialogTrigger>
                  <img
                    src={element.defaultProfile}
                    className="w-[80px] h-[80px]"
                    onClick={() => {
                      navigate(`/collection?card=${element.uid}`, {replace: true})
                      setConnectedUsers(element.connectedUsers)
                    }}
                  />
                </MorphingDialogTrigger>
                <MorphingDialogContainer>
                  <MorphingDialogContent
                    drawerOpen={drawerOpen}
                    drawerOpenFalse={() => setDrawerOpen(false)}
                  >
                    <div className="flex flex-col px-5">
                      <img src={element.defaultProfile} />
                      <div className='flex justify-end'>
                        {element.displayName}
                      </div>
                      <div className='flex justify-end gap-1'>
                        <Button className='colorOne' variant='outlined' onClick={() => {
                          if (connectedUsers.includes(profile.uid)) {
                            disconnectUser(element.uid)
                          } else {
                            connectUser(element.uid)
                          }
                        }}>
                          {connectedUsers.includes(profile.uid) ? <div className='flex gap-1'><ThumbUpIcon />{`${connectedUsers.length}`}</div> : <div className='flex gap-1'><ThumbUpAltOutlinedIcon />{`${connectedUsers.length}`}</div>}
                        </Button>
                        {element.userUid === profile.uid && <Button className='colorOne' variant='outlined' onClick={() => {
                          navigate('/collection', {replace: true})
                          deleteImage(element.uid)
                        }}>{<Ban />}</Button>}
                      </div>
                    </div>
                  </MorphingDialogContent>
                </MorphingDialogContainer>
              </MorphingDialog>
            )
          })}
        </AnimatedGroup>
      }
    </div>
  )
}

export default Collection
