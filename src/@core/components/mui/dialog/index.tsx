import Button from '@mui/material/Button'
import MuiDialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { DialogProps } from './types'

const Dialog = ({
  content,
  onOk,
  onCancel,
  onClose,
  title,
  open,
  cancelState = 'Cancel',
  okState = 'Ok'
}: DialogProps) => (
  <MuiDialog
    open={open}
    onClose={onClose}
    aria-labelledby='alert-dialog-title'
    aria-describedby='alert-dialog-description'
  >
    <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
    <DialogContent>
      <DialogContentText id='alert-dialog-description'>{content}</DialogContentText>
    </DialogContent>
    <DialogActions>
      {onCancel && (
        <Button variant='tonal' color='error' onClick={onCancel}>
          {cancelState}
        </Button>
      )}
      <Button variant='contained' onClick={onOk} autoFocus>
        {okState}
      </Button>
    </DialogActions>
  </MuiDialog>
)

export default Dialog
