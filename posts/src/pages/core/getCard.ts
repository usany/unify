import { doc, getDoc } from 'firebase/firestore'
import { dbservice } from 'src/baseApi/serverbase'

const getCard = async (id: string) => {

  const docRef = doc(dbservice, `num/${id}`)
  const docSnap = await getDoc(docRef)
  const userData = docSnap.data()
  return userData
}

export default getCard
