import React from 'react'

// ** Import Mui Components
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import LoadingButton from '@mui/lab/LoadingButton'

type ApiCredentialDialogProps = {
  open: boolean
  onClose: () => void
  onSave: () => void
  apiKey: string
  apiSecret: string
  error: string
  onChange: (name: string, value: string) => void
  saveLoading: boolean
}

const ExchangeLinkerApiCredentialDialog = ({
  open,
  onClose,
  onSave,
  apiKey,
  apiSecret,
  error,
  onChange,
  saveLoading
}: ApiCredentialDialogProps) => {
  return (
    <Dialog maxWidth='md' fullWidth open={open} onClose={onClose}>
      <DialogTitle id='alert-dialog-title'>Enter Your Api Credential</DialogTitle>
      <DialogContent>
        <Stack>
          <TextField
            value={apiKey}
            onChange={e => onChange('apiKey', e.target.value)}
            autoFocus
            required
            margin='dense'
            id='ApiKey'
            name='ApiKey'
            label='Api Key'
            fullWidth
          />
          <TextField
            value={apiSecret}
            onChange={e => onChange('apiSecret', e.target.value)}
            required
            margin='dense'
            id='ApiSecret'
            name='ApiSecret'
            label='Api Secret'
            type='tel'
            fullWidth
          />
        </Stack>
        {error && (
          <Typography sx={{ mt: 4 }} color='error'>
            {error}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <LoadingButton color='error' onClick={onClose}>
          Cancel
        </LoadingButton>
        <LoadingButton variant='contained' onClick={onSave} loading={saveLoading}>
          Save
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

export default ExchangeLinkerApiCredentialDialog
