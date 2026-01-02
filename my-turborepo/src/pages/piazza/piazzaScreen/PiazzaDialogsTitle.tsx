// import {
//   collection,
//   doc,
//   getDoc,
//   getDocs,
//   limit,
//   orderBy,
//   query,
//   startAfter,
//   updateDoc,
// } from 'firebase/firestore'
// import { useEffect, useRef, useState } from 'react'
// import { dbservice } from 'src/baseApi/serverbase'
// import Avatars from 'src/pages/core/Avatars'
// import Popups from 'src/pages/core/Popups'
// import { webSocket } from 'src/webSocket.tsx'
// import PiazzaDialogsContent from './piazzaDialogs/PiazzaDialogsContent'
import useSelectors from 'src/hooks/useSelectors'
import useTexts from 'src/hooks/useTexts'

const PiazzaDialogsTitle = ({user, displayedName}) => {
  const languages = useSelectors((state) => state.languages.value)
  return (
    <>
      <div className="flex justify-center">
        {user?.displayName}
      </div>
      {user?.displayName !== displayedName && (
        <>
          {languages === 'ko' ? (
            `(${displayedName}에서 개명)`
          ) : (
            `(Changed name from ${displayedName})`
          )}
        </>
      )}
    </>
  )
}

export default PiazzaDialogsTitle
