import * as React from 'react'
import { AppBar, Toolbar, Typography, Button } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

export interface HeaderProps {
  title: string
}

export const Header = (props: HeaderProps) => {
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
        <Button variant="outlined" color="error">
          ログイン
        </Button>
      </Toolbar>
    </AppBar>
  )
}
