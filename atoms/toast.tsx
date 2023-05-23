import { default as MuiAlert, AlertColor } from '@mui/material/Alert'
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar'

export interface ToastProps {
  uuid?: string
  open?: boolean
  msg: string
  severity?: AlertColor
  anchor?: SnackbarOrigin
  onClose?: () => void
}

export const Toast = (props: ToastProps) => {
  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    props.onClose && props.onClose()
  }
  return (
    <Snackbar open={props.open || false} anchorOrigin={props.anchor || { vertical: 'top', horizontal: 'center' }} autoHideDuration={6000} onClose={handleClose}>
      <MuiAlert severity={props.severity || 'error'} sx={{ zoom: 1.2 }}>
        {props.msg}
      </MuiAlert>
    </Snackbar>
  )
}
