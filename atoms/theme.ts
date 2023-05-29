import { Roboto } from 'next/font/google'
import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'
import createCache from '@emotion/cache'

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
})

export const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        outlined: {
          background: '#fff',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.9)',
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        container: {
          '&> .MuiPaper-root': {
            minWidth: '50vw',
            '& p': {
              margin: 0,
            },
          },
        },
      },
    },
  },
})

export const isBrowser = typeof document !== 'undefined'

export function createEmotionCache() {
  let insertionPoint

  if (isBrowser) {
    const emotionInsertionPoint = document.querySelector<HTMLMetaElement>('meta[name="emotion-insertion-point"]')
    insertionPoint = emotionInsertionPoint ?? undefined
  }

  return createCache({ key: 'mui-style', insertionPoint })
}
