import * as React from 'react'
import { Box, Typography, Divider } from '@mui/material'

export interface FooterProps {
  copyright: string
}

export const Footer = (props: FooterProps) => {
  const year = new Date().getFullYear()
  return (
    <Box
      sx={{
        flex: '0 0 auto',
      }}
    >
      <Divider />
      <Typography align="center">
        {year}&nbsp;{props.copyright}
      </Typography>
    </Box>
  )
}
