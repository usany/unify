import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeScrollNavigation } from "src/stateSlices/scrollNavigationSlice";

const useScroll = () => {
  const dispatch = useDispatch()
  const scrollEffect = () => {
    if (document.scrollingElement && document.scrollingElement.scrollTop > 80) {
      dispatch(changeScrollNavigation(true))
    } else {
      dispatch(changeScrollNavigation(false))
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', scrollEffect)
    return () => window.removeEventListener('scroll', scrollEffect)
  }, [])
}

export default useScroll
