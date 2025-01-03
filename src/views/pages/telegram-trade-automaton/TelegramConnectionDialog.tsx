import React, { useEffect, useState } from 'react'

// ** Import Mui
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import TextField from '@mui/material/TextField'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

// ** Import Utils
import { apiGateway } from 'src/utils/api-gateway'
import { apiEndpoints } from 'src/constants/endpoints'

// ** Import Hooks
import useTelegramStore from 'src/zustand/useTelegramStore'
import useLocalStorage from 'src/hooks/useLocalStorage'

const EnterNumber: React.FC<{ onNextClick: () => void }> = ({ onNextClick }) => {
  const { storedValue: phoneNumber, setValue: setPhoneNumber } = useLocalStorage('telegramPhoneNumber', '')
  const [loading, setLoading] = useState(false)

  const onClick = async () => {
    setLoading(true)
    try {
      const req = await apiGateway({
        url: apiEndpoints.telegram.SEND_CODE,
        method: 'post',
        data: {
          phoneNumber,
          mode: 'private'
        }
      })

      if (req.isOk) {
        onNextClick()
      }
    } catch (error) {
      console.error('Error sending code:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <DialogTitle id='alert-dialog-title'>{'Your Phone Number'}</DialogTitle>
      <DialogContent>
        <DialogContentText>Please enter your phone number to continue.</DialogContentText>
        <TextField
          value={phoneNumber}
          onChange={e => setPhoneNumber(e.target.value)}
          autoFocus
          required
          margin='dense'
          id='phone'
          name='phone'
          label='Phone Number'
          type='tel'
          fullWidth
          variant='standard'
        />
      </DialogContent>
      <DialogActions>
        <Button variant='contained' disabled={loading} onClick={onClick}>
          {loading ? <CircularProgress size={24} /> : 'Next'}
        </Button>
      </DialogActions>
    </>
  )
}

const EnterConfirmCode: React.FC<{ onConnectClick: () => void; onEditNumber: () => void }> = ({
  onConnectClick,
  onEditNumber
}) => {
  const { storedValue: code, setValue: setCode } = useLocalStorage('telegramCode', '')
  const [loading, setLoading] = useState(false)
  const { setTelegramData } = useTelegramStore()

  const onClickConnect = async () => {
    setLoading(true)
    try {
      const req = await apiGateway({
        url: apiEndpoints.telegram.CREATE_CLIENT,
        method: 'post',
        data: { phoneCode: code }
      })

      if (req.isOk) {
        setTelegramData({
          ...req.data.result,
          connectionStatus: true
        })
        onConnectClick()
      }
    } catch (error) {
      console.error('Error sending code:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <DialogTitle id='alert-dialog-title'>{'Your Confirmation Code'}</DialogTitle>
      <DialogContent>
        <DialogContentText>Please enter your confirmation code.</DialogContentText>
        <TextField
          value={code}
          onChange={e => setCode(e.target.value)}
          autoFocus
          required
          margin='dense'
          id='code'
          name='code'
          label='Confirmation Code'
          fullWidth
          variant='standard'
        />
      </DialogContent>
      <DialogActions>
        <Button variant='contained' onClick={() => onEditNumber()}>
          Edit Number
        </Button>
        <Button variant='contained' onClick={() => onClickConnect()}>
          {loading ? <CircularProgress size={24} /> : 'Connect'}
        </Button>
      </DialogActions>
    </>
  )
}

const TelegramConnectionDialog: React.FC<{
  loading: boolean
  setLoading: (flag: boolean) => void
  setIsConnectedToTelegram: (flag: boolean) => void
}> = ({ loading, setLoading, setIsConnectedToTelegram }) => {
  const { telegramData, setOpenAuthDialog, setConnectionStatus, setTelegramData } = useTelegramStore()
  const { storedValue: step, setValue: setStep, removeByKey } = useLocalStorage('telegramStep', 0)

  useEffect(() => {
    try {
      setLoading(true)
      const checkUserConnectedToTelegram = async () => {
        const req = await apiGateway({
          url: apiEndpoints.telegram.CHECK_CONNECTION
        })

        if (req.isOk) {
          if (req.data.result.isConnect) {
            setIsConnectedToTelegram(false)
            const me = await apiGateway({
              url: apiEndpoints.telegram.GET_ME
            })

            if (me.isOk) {
              setTelegramData({
                ...telegramData,
                connectionStatus: req.data.result.isConnect,
                ...me.data
              })
            }
          }
          setLoading(false)
        }
      }
      checkUserConnectedToTelegram()
    } catch (error) {
      console.log(error)
      setLoading(false)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onConnectClick = () => {
    setOpenAuthDialog(false)
    setConnectionStatus(true)
    setIsConnectedToTelegram(false)
    removeByKey()
    removeByKey('telegramPhoneNumber')
    removeByKey('telegramCode')
  }

  if (telegramData.connectionStatus || loading) return null

  return (
    <Dialog maxWidth='md' fullWidth open={telegramData.openAuthDialog}>
      {step === 0 && <EnterNumber onNextClick={() => setStep(step + 1)} />}
      {step === 1 && <EnterConfirmCode onConnectClick={onConnectClick} onEditNumber={() => setStep(step - 1)} />}
    </Dialog>
  )
}

export default TelegramConnectionDialog
