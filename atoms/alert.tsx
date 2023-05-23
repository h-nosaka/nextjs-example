import { default as MuiAlert, AlertColor } from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import ReactMarkdown from 'react-markdown'

export interface AlertProps {
  open?: boolean
  title: string
  msg?: string
  severity?: AlertColor
  ok?: string
  onClose?: () => void
}

export const Alert = (props: AlertProps) => {
  return (
    <Dialog open={props.open || false}>
      <MuiAlert severity={props.severity || 'error'} sx={{ zoom: 1.2 }}>
        {props.title}
      </MuiAlert>
      {props.msg ? (
        <DialogContent>
          <ReactMarkdown>{props.msg}</ReactMarkdown>
        </DialogContent>
      ) : null}
      <DialogActions>
        <Button onClick={props.onClose} autoFocus>
          {props.ok || 'OK'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
