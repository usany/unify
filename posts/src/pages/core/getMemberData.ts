import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { dbservice } from 'src/baseApi/serverbase'

const getMemberData = async (id: string) => {
  const docRef = doc(dbservice, `members/${id}`)
  const docSnap = await getDoc(docRef)
  const memberData = docSnap.data()
  return memberData
}

export default getMemberData
