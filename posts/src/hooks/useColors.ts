import { createTheme } from '@mui/material'
import useCardsBackground from './useCardsBackground'

const useColors = () => {
  const { colorOne, colorTwo, colorThree } = useCardsBackground()
  const common = {
    components: {
      MuiCard: {
        defaultProps: {
          sx: {
            bgcolor: colorThree,
            ':hover': {
              bgcolor: colorThree,
            },
          },
        },
        styleOverrides: {
          root: {
            variants: [
              {
                props: { className: 'colorTwo' },
                style: {
                  backgroundColor: colorTwo,
                },
              },
              {
                props: { className: 'colorOne' },
                style: {
                  backgroundColor: colorOne,
                },
              },
            ],
          },
        },
      },
      // MuiButtonBase: {
      //   defaultProps: {
      //     sx: {
      //       bgcolor: colorTwo,
      //     },
      //   }
      // },
      MuiButton: {
        styleOverrides: {
          root: {
            variants: [
              {
                props: { className: 'colorOne' },
                style: {
                  backgroundColor: colorOne,
                },
              },
              {
                props: { className: 'colorTwo' },
                style: {
                  backgroundColor: colorTwo,
                },
              },
            ],
          },
        },
      },
      MuiChip: {
        defaultProps: {
          sx: {
            bgcolor: colorOne,
            ':hover': {
              bgcolor: colorOne,
            },
          },
        },
        styleOverrides: {
          root: {
            variants: [
              {
                props: { className: 'specific' },
                style: {
                  fontSize: '12px',
                },
              },
            ],
          },
        },
      },
    },
  }
  const lightTheme = createTheme({
    palette: {
      mode: 'light',
    },
    ...common,
  })
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
    ...common,
  })

  return { lightTheme, darkTheme }
}
export default useColors
