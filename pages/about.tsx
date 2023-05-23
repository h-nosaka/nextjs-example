import * as React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { Link } from '../atoms'

export const About = () => {
  return (
    <Container maxWidth="lg">
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
        <Box maxWidth="sm">
          <Link variant="contained" href="/">
            Go to home
          </Link>
        </Box>
      </Box>
    </Container>
  )
}
export default About
