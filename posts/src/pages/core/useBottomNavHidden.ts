import { alpha } from "@mui/material";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { User } from 'firebase/auth';
import { Pencil, Presentation, Umbrella } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import useSelectors from 'src/hooks/useSelectors';
import { changeBottomNavigation } from 'src/stateSlices/bottomNavigationSlice';
import useBottomNav from "./useBottomNav";

// const lightTheme = createTheme({
//   palette: {
//     mode: 'light',
//   },
//   components: {
//     MuiButton: {
//       defaultProps: {
//         // Name of the slot
//         sx: {
//           // Some CSS
//           bgcolor: 'blue',
//           ":hover": {
//             bgcolor: 'blue'
//           }
//         },
//       },
//     }
//   }
// })
// const darkTheme = createTheme({
//   palette: {
//     mode: 'dark',
//   },
// })

// interface themeRootState  {
//   theme: string
// }
function useBottomNavHidden() {
  // const [isKeyboardOpen, setIsKeyboardOpen] = useState<boolean | number>(false);
  // const dispatch = useDispatch()

  // useEffect(() => {
  //   const listener = () => {
  //     const newState = window.screen.height - window.screen.height > 1000 ? 500 : 300 > (window.visualViewport?.height || window.screen.height)
  //     if (isKeyboardOpen !== newState) {
  //       setIsKeyboardOpen(newState);
  //       if (new)
  //     }
  //   };
  //   window.addEventListener('resize', listener)
  //   if (typeof visualViewport !== 'undefined') {
  //     window.visualViewport?.addEventListener('resize', listener);
  //   }
  //   visualViewport?.addEventListener('resize', listener)
  //   if (typeof visualViewport !== 'undefined') {
  //     visualViewport?.addEventListener('resize', listener);
  //   }
  //   return () => {
  //     if (typeof visualViewport !== 'undefined') {
  //       window.visualViewport?.removeEventListener('resize', listener);
  //     }
  //   };
  // }, [isKeyboardOpen]);
}

export default useBottomNavHidden
