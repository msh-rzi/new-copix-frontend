import React, { useEffect, useState } from 'react'
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import Icon from 'src/@core/components/icon'
import useTradingAlgorithmWizardStore, { Exchange } from 'src/zustand/useTradingAlgorithmWizardStore'
import { apiGateway } from 'src/utils/api-gateway'
import { endpoints } from 'src/constants/urls'
import LoadingButton from '@mui/lab/LoadingButton'
import Checkbox from '@mui/material/Checkbox'
import Avatar from '@mui/material/Avatar'

type ApiCredential = {
  apiKey: string
  apiSecret: string
  id: string
  image: string
  name: string
  error: string | null
}

type ExchangeListProps = {
  loading: boolean
  exchangesList: Exchange[]
  selectedExchange: Exchange | null
  userExchanges: any[]
  onSelectExchange: (exchangeObj: Exchange) => void
  setApiCredential: React.Dispatch<React.SetStateAction<ApiCredential>>
  fetchData: () => void
  channelTitle: string
  apiCredentialId: string
}

type ApiCredentialDialogProps = {
  open: boolean
  onClose: () => void
  onSave: () => Promise<void>
  apiCredential: ApiCredential
  setApiCredential: React.Dispatch<React.SetStateAction<ApiCredential>>
  saveLoading: boolean
}

const initialApiCredential: ApiCredential = {
  apiKey: '',
  apiSecret: '',
  id: '',
  image: '',
  name: '',
  error: null
}

const ApiCredentialDialog = ({
  open,
  onClose,
  onSave,
  apiCredential,
  setApiCredential,
  saveLoading
}: ApiCredentialDialogProps) => {
  return (
    <Dialog maxWidth='md' fullWidth open={open} onClose={onClose}>
      <DialogTitle id='alert-dialog-title'>Enter Your Api Credential</DialogTitle>
      <DialogContent>
        <Stack>
          <TextField
            value={apiCredential.apiKey}
            onChange={e => setApiCredential(prev => ({ ...prev, apiKey: e.target.value }))}
            autoFocus
            required
            margin='dense'
            id='ApiKey'
            name='ApiKey'
            label='Api Key'
            fullWidth
          />
          <TextField
            value={apiCredential.apiSecret}
            onChange={e => setApiCredential(prev => ({ ...prev, apiSecret: e.target.value }))}
            required
            margin='dense'
            id='ApiSecret'
            name='ApiSecret'
            label='Api Secret'
            type='tel'
            fullWidth
          />
        </Stack>
        {apiCredential.error && (
          <Typography sx={{ mt: 4 }} color='error'>
            {apiCredential.error}
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

const ExchangeList = ({
  loading,
  exchangesList,
  selectedExchange,
  userExchanges,
  onSelectExchange,
  setApiCredential,
  fetchData,
  channelTitle,
  apiCredentialId
}: ExchangeListProps) => {
  return (
    <Stack gap={4} flex={1}>
      <Stack flexDirection='row' alignItems='center' justifyContent='space-between'>
        <Typography>{`Select an exchange to connect this algorithm to it { Channel : ${channelTitle} }`}</Typography>
        <LoadingButton
          loading={loading}
          size='small'
          variant='outlined'
          onClick={fetchData}
          startIcon={<Icon icon='tabler:refresh' />}
        >
          Refresh
        </LoadingButton>
      </Stack>
      {loading ? (
        <CircularProgress sx={{ margin: 'auto' }} />
      ) : (
        <List
          sx={theme => ({
            width: '100%',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: theme.palette.divider,
            flex: 1,
            borderRadius: '5px'
          })}
        >
          {exchangesList.map(e => {
            const labelId = `checkbox-list-label-${e.id}`
            const isConnected = Boolean(userExchanges.find(ue => ue.exchangeId === e.id))
            const checked = selectedExchange?.id === e.id

            return (
              <ListItem key={e.id}>
                <ListItemButton disabled={!isConnected} role={undefined} dense onClick={() => onSelectExchange(e)}>
                  <ListItemIcon>
                    <Checkbox
                      edge='start'
                      checked={checked}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                  <ListItemIcon>
                    <Avatar
                      sx={theme => ({
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        borderColor: theme.palette.divider
                      })}
                      alt={e.name}
                      src={`data:image/png;base64,${e.image}`}
                    />
                  </ListItemIcon>
                  <ListItemText sx={{ flex: 1 }} id={labelId} primary={e.name} />
                </ListItemButton>
                <LoadingButton
                  onClick={() => {
                    setApiCredential({
                      ...initialApiCredential,
                      ...e
                    })
                  }}
                  size='small'
                  disabled={isConnected}
                  loading={!isConnected && apiCredentialId === e.id && Boolean(apiCredentialId)}
                  variant='contained'
                  sx={{ margin: 'left' }}
                >
                  {isConnected ? 'Connected' : 'Connect'}
                </LoadingButton>
              </ListItem>
            )
          })}
        </List>
      )}
    </Stack>
  )
}

const ExchangeLinker = () => {
  const { wizardData, set_5 } = useTradingAlgorithmWizardStore()
  const { exchangesList, selectedExchange, userExchanges } = wizardData._5
  const [loading, setLoading] = useState(false)
  const [saveLoading, setSaveLoading] = useState(false)
  const [apiCredential, setApiCredential] = useState(initialApiCredential)

  const fetchData = async () => {
    setLoading(true)

    try {
      const [exchangesRes, userExchangesRes] = await Promise.all([
        apiGateway({ url: endpoints.exchange.GET_EXCHANGES }),
        apiGateway({ url: endpoints.exchange.GET_USER_EXCHANGES })
      ])

      const updated_5 = {
        ...wizardData._5,
        ...(exchangesRes.isOk && { exchangesList: exchangesRes.data }),
        ...(userExchangesRes.isOk && { userExchanges: userExchangesRes.data })
      }

      set_5(updated_5)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!exchangesList.length) fetchData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSelectExchange = (exchangeObj: Exchange) => {
    set_5({
      ...wizardData._5,
      selectedExchange: exchangeObj
    })
  }

  const onClose = () => {
    setApiCredential(initialApiCredential)
  }

  const onSave = async () => {
    setSaveLoading(true)
    const req = await apiGateway({
      url: endpoints.exchange.ADD_USER_EXCHANGE,
      method: 'post',
      data: {
        ...apiCredential,
        exchangeId: apiCredential.id
      }
    })

    if (req.isOk) {
      setSaveLoading(false)
      set_5({
        ...wizardData._5,
        selectedExchange: {
          id: apiCredential.id,
          image: apiCredential.image,
          name: apiCredential.name
        }
      })
      setApiCredential(initialApiCredential)
      fetchData()
    } else {
      console.log(req.error.response.data.error)
      setApiCredential(prev => ({
        ...prev,
        error: req.error.response.data.error
      }))
      setSaveLoading(false)
    }
  }

  console.log(wizardData._5)

  return (
    <React.Fragment>
      <ApiCredentialDialog
        open={Boolean(apiCredential.id)}
        onClose={onClose}
        onSave={onSave}
        apiCredential={apiCredential}
        setApiCredential={setApiCredential}
        saveLoading={saveLoading}
      />
      <ExchangeList
        loading={loading}
        exchangesList={exchangesList}
        selectedExchange={selectedExchange}
        userExchanges={userExchanges}
        onSelectExchange={onSelectExchange}
        setApiCredential={setApiCredential}
        fetchData={fetchData}
        channelTitle={wizardData._1.selectedChannel!.title}
        apiCredentialId={apiCredential.id}
      />
    </React.Fragment>
  )
}

export default ExchangeLinker
