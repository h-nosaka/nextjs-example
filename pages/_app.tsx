import React, { useState } from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import { theme, createEmotionCache, Header, Footer, Alert, Dialog, AlertProps, DialogProps, Toast, ToastProps, AppContext } from '../atoms'
import Box from '@mui/material/Box'
import { SnackbarProvider } from 'notistack'

const clientSideEmotionCache = createEmotionCache()

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

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

  const [isHeader, setIsHeader] = useState<boolean>(true)
  const setShowHeader = (view: boolean) => {
    setIsHeader(view)
  }

  const [isFooter, setIsFooter] = useState<boolean>(true)
  const setShowFooter = (view: boolean) => {
    setIsFooter(view)
  }

  const [anyState, setAnyState] = useState<{ [key: string]: any }>({})
  const getState = (key: string): any => {
    return anyState[key]
  }
  const setState = (key: string, value: any) => {
    let src = { ...anyState }
    src[key] = value
    setAnyState(src)
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
            getState: getState,
            setState: setState,
            showAlert: showAlert,
            showDialog: showDialog,
            showToast: showToast,
            showHeader: setShowHeader,
            showFooter: setShowFooter,
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
              {isHeader ? <Header title="Example" /> : null}
              <Component {...pageProps} />
              {isFooter ? <Footer copyright="Example inc." /> : null}
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
