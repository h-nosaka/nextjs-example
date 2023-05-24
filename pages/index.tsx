import React, { useContext } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { AppContext, Link } from '../atoms'
import { Button } from '@mui/material'
import { v4 as uuidv4 } from 'uuid'
import { useSnackbar } from 'notistack'

export const Home = () => {
  const { showAlert, showDialog, showToast } = useContext(AppContext)
  const { enqueueSnackbar } = useSnackbar()

  return (
    <Container
      maxWidth="lg"
      sx={{
        flex: '1 1 auto',
      }}
    >
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          MUI + Next.js Base Example
        </Typography>
        <Box>
          <Link href="/about" variant="contained" color="primary">
            go to about
          </Link>
          <Link href="/about" variant="contained" color="secondary">
            go to about
          </Link>
          <Link href="/about" variant="outlined" color="primary">
            go to about
          </Link>
          <Link href="/about" variant="outlined" color="warning">
            go to about
          </Link>
          <Link href="/about" variant="text" color="error">
            go to about
          </Link>
        </Box>
        <Box>
          <Button
            color="error"
            onClick={() => {
              showAlert({ title: 'test', severity: 'error' })
            }}
          >
            open alert
          </Button>
          <Button
            color="success"
            onClick={() => {
              showDialog({ title: 'this is markdown syntax', msg: '# markdown syntax\n- first\n- second', severity: 'success' })
            }}
          >
            open dialog
          </Button>
          <Button
            color="warning"
            onClick={() => {
              showToast({ msg: uuidv4(), severity: 'warning' })
            }}
          >
            open toast
          </Button>
          <Button
            color="info"
            onClick={() => {
              enqueueSnackbar(uuidv4(), { variant: 'info' })
            }}
          >
            open snackbar
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
export default Home
