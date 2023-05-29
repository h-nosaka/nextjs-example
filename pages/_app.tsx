import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import {
  api,
  ApiOption,
  theme,
  createEmotionCache,
  Header,
  Footer,
  Alert,
  Dialog,
  AlertProps,
  DialogProps,
  Toast,
  ToastProps,
  AppContext,
  Loading,
  RequestInitExt,
} from '../atoms'
import Box from '@mui/material/Box'
import { SnackbarProvider } from 'notistack'
import { v4 as uuidv4 } from 'uuid'

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

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const showLoading = () => {
    setIsLoading(true)
  }
  const hideLoading = () => {
    setIsLoading(false)
  }

  const [anyState, setAnyState] = useState<{ [key: string]: any }>({})
  const getState = (key: string): any => {
    return anyState[key]
  }
  const setState = (src: { [key: string]: any }) => {
    setAnyState({ ...anyState, ...src })
  }

  const [errors, setErrors] = useState<{ [key: string]: any }>({})

  // デフォルトのオプション
  const defaultApiOption = {
    showLoading,
    hideLoading,
    beforeAction: undefined,
    afterAction: undefined,
    responseAction: (rs: { response: Response; body: any }) => {
      if ([401].indexOf(rs.response.status) > -1) {
        // 認証エラー
        showAlert({
          title: '認証エラー',
          msg: '認証情報の有効期限が切れているか、通信エラーによりログインできませんでした。  \n再度、ログインしてください。',
          severity: 'warning',
        })
      }
      if ([403].indexOf(rs.response.status) > -1) {
        // アクセス拒否
        showAlert({ title: 'アクセス拒否', msg: 'ご利用のアカウントではアクセスできません。  \n管理者にお問い合わせください。', severity: 'warning' })
      }
      if ([400].indexOf(rs.response.status) > -1) {
        // バリデーションエラー
        console.log('#TODO: エラーレスポンスを正しく格納する', rs.body)
        setErrors(rs.body.errros)
      }
      if ([500].indexOf(rs.response.status) > -1) {
        // 致命的なエラー
        showAlert({
          title: '想定しないエラーが発生しました',
          msg: '管理者に問い合わせください',
          severity: 'error',
          onClose: () => {
            location.reload()
          },
        })
      }
      return false
    },
  }

  const apiCall = (url: string, req: RequestInitExt, option: ApiOption = {}): Promise<any> => {
    if (req.data) {
      req.body = JSON.stringify(req.data)
    }
    return api(url, req, {
      ...defaultApiOption, // 初期値
      ...option, // 引数
    })
  }

  useEffect(() => {
    if (!localStorage.getItem('DeviceId')) {
      localStorage.setItem('DeviceId', uuidv4())
    }
  }, [])
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppContext.Provider
          value={{
            api: apiCall,
            state: anyState,
            errors: errors,
            getState: getState,
            setState: setState,
            showAlert: showAlert,
            showDialog: showDialog,
            showToast: showToast,
            showHeader: setShowHeader,
            showFooter: setShowFooter,
            showLoading: showLoading,
            hideLoading: hideLoading,
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
            <Loading open={isLoading} />
          </SnackbarProvider>
        </AppContext.Provider>
      </ThemeProvider>
    </CacheProvider>
  )
}
export default App
