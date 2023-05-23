import React, { useState } from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import { theme, createEmotionCache, Header, Footer, Alert, Dialog, AlertProps, DialogProps, Toast, ToastProps } from '../atoms'
import Box from '@mui/material/Box'
import { SnackbarProvider } from 'notistack'

const clientSideEmotionCache = createEmotionCache()

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export const AppContext = React.createContext({
  showAlert: (props: AlertProps): void => {},
  showDialog: (props: DialogProps): void => {},
  showToast: (props: ToastProps): void => {},
})

export const App = (props: MyAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  const [openAlert, setOpenAlert] = useState<AlertProps>({
    open: false,
    title: '',
    severity: 'error',
  })
  const showAlert = (props: AlertProps) => {
    setOpenAlert({ ...props, open: true })
  }
  const [openDialog, setOpenDialog] = useState<DialogProps>({
    open: false,
    title: '',
    severity: 'error',
  })
  const showDialog = (props: DialogProps) => {
    setOpenDialog({ ...props, open: true })
  }
  const [openToast, setOpenToast] = useState<ToastProps>({
    open: false,
    msg: '',
    severity: 'error',
  })
  const showToast = (props: ToastProps) => {
    setOpenToast({ ...props, open: true })
  }

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppContext.Provider
          value={{
            showAlert: showAlert,
            showDialog: showDialog,
            showToast: showToast,
          }}
        >
          <SnackbarProvider maxSnack={5}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '100vh',
              }}
            >
              <Header title="Example" />
              <Component {...pageProps} />
              <Footer copyright="Example inc." />
            </Box>
            <Alert
              {...openAlert}
              onClose={() => {
                openAlert.onClose && openAlert.onClose()
                setOpenAlert({ ...openAlert, open: false })
              }}
            />
            <Dialog
              {...openDialog}
              onSuccess={() => {
                openDialog.onSuccess && openDialog.onSuccess()
                setOpenDialog({ ...openDialog, open: false })
              }}
              onClose={() => {
                openDialog.onClose && openDialog.onClose()
                setOpenDialog({ ...openDialog, open: false })
              }}
            />
            <Toast
              {...openToast}
              onClose={() => {
                openToast.onClose && openToast.onClose()
                setOpenToast({ ...openToast, open: false })
              }}
            />
          </SnackbarProvider>
        </AppContext.Provider>
      </ThemeProvider>
    </CacheProvider>
  )
}
export default App
