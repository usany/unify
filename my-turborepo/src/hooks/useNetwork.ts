import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { changeOnLine } from '../stateSlices/onLineSlice'

const useNetwork = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    window.addEventListener('online', () => {
      dispatch(changeOnLine(true))
    })
    window.addEventListener('offline', () => {
      dispatch(changeOnLine(false))
    })
    return () => {
      window.removeEventListener('online', () => {
        dispatch(changeOnLine(true))
      })
      window.removeEventListener('offline', () => {
        dispatch(changeOnLine(false))
      })
    }
  }, [])
}

export default useNetwork
