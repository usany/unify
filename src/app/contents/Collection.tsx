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
import { useLanguage } from '@/context/LanguageContext'

function Collection() {
  const { language } = useLanguage()
  return (
    <div>
      <button
        className="flex gap-5 justify-center"
      >
        <PlusCircle />
        {language === 'en' ? 'Register' : '등록'}
      </button>
      {images.length > 0 && 
        <AnimatedGroup className="grid grid-cols-[repeat(auto-fit,minmax(80px,1fr))] col-span-full p-5">
          {images.map((element, index) => {
            return (
              <img
                src={element.defaultProfile}
                className="w-[80px] h-[80px]"
                // onClick={() => {
                //   navigate(`/collection?card=${element.uid}`, {replace: true})
                //   setConnectedUsers(element.connectedUsers)
                // }}
              />
            )
          })}
        </AnimatedGroup>
      }
    </div>
  )
}

export default Collection
