import Backdrop from '@mui/material/Backdrop'
import CircularProgress, { CircularProgressPropsColorOverrides } from '@mui/material/CircularProgress'
import { OverridableStringUnion } from '@mui/types'
import { SxProps, Theme } from '@mui/material/styles'

export interface LoadingProps {
  open?: boolean
  backdrop?: boolean
  sx?: SxProps<Theme>
  color?: OverridableStringUnion<'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit', CircularProgressPropsColorOverrides>
}

export const Loading = (props: LoadingProps) => {
  return (
    <Backdrop sx={props.sx} open={props.open || false}>
      <CircularProgress color={props.color} />
    </Backdrop>
  )
}
