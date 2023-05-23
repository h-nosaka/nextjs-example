import { default as MuiAlert, AlertColor } from '@mui/material/Alert'
import Button from '@mui/material/Button'
import { default as MuiDialog } from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import ReactMarkdown from 'react-markdown'

export interface DialogProps {
  open?: boolean
  title: string
  msg?: string
  severity?: AlertColor
  ok?: string
  ng?: string
  onSuccess?: () => void
  onClose?: () => void
}

export const Dialog = (props: DialogProps) => {
  return (
    <MuiDialog open={props.open || false}>
      <MuiAlert severity={props.severity || 'error'} sx={{ zoom: 1.2 }}>
        {props.title}
      </MuiAlert>
      {props.msg ? (
        <DialogContent>
          <ReactMarkdown>{props.msg}</ReactMarkdown>
        </DialogContent>
      ) : null}
      <DialogActions>
        <Button onClick={props.onClose}>{props.ok || 'No'}</Button>
        <Button onClick={props.onSuccess} variant="contained" autoFocus>
          {props.ok || 'Yes'}
        </Button>
      </DialogActions>
    </MuiDialog>
  )
}
