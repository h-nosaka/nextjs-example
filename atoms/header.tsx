import React, { useContext, useState, useEffect } from 'react'
import { AppBar, Toolbar, Typography, Button } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { AppContext } from './const'

export interface HeaderProps {
  title: string
}

export const Header = (props: HeaderProps) => {
  const { state, getState, setState, showDialog, api } = useContext(AppContext)
  const [token, setToken] = useState<string | null>()
  const [name, setName] = useState<string>()
  useEffect(() => {
    setToken(localStorage.getItem('AccessToken'))
  }, [])
  useEffect(() => {
    if (token) {
      console.log('#TODO: ログイン済みトークンでユーザ情報を取得する')
      api('http://localhost:8080/api/v1/~', { method: 'GET' })
        .then((rs) => {
          setState({ name: rs.result.name, uid: rs.result.uid }) // ログインに成功したらユーザのパラメータを格納する
        })
        .catch(() => {
          localStorage.removeItem('AccessToken') // 使えなくなったトークンは削除する
          setName('')
        })
    } else {
      setName('')
    }
  }, [token])
  useEffect(() => {
    setName(getState('name') || undefined)
  }, [state])

  return (
    <AppBar
      position="static"
      sx={{
        flex: '0 0 auto',
      }}
    >
      <Toolbar>
        <SearchIcon />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {props.title}
        </Typography>
        {token !== undefined && name !== undefined ? (
          <Button
            variant={name ? 'outlined' : 'contained'}
            color={name ? 'info' : 'error'}
            onClick={() => {
              if (name) {
                showDialog({
                  title: 'ログアウトしますか？',
                  severity: 'info',
                  onSuccess: () => {
                    setState({ name: undefined, uid: undefined })
                  },
                })
              } else {
                localStorage.removeItem('AccessToken')
                console.log('#TODO: ログイン処理を実行する')
              }
            }}
          >
            {name ? `ログアウト: ${name}` : 'ログイン'}
          </Button>
        ) : null}
      </Toolbar>
    </AppBar>
  )
}
