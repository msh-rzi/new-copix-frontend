import React, { useEffect, useState } from 'react'

// ** Import Mui Components
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import LoadingButton from '@mui/lab/LoadingButton'
import Checkbox from '@mui/material/Checkbox'
import Avatar from '@mui/material/Avatar'

// ** Import Custom Components
import TradingAlgorithmWizardContentWrapper from './TradingAlgorithmWizardContentWrapper'
import CustomScrollbar from 'src/@core/components/scrollbar'
import ExchangeLinkerApiCredentialDialog from 'src/layouts/components/telegram-trade-automaton/ExchangeLinkerApiCredentialDialog'

// ** Import Hooks
import useTradingAlgorithmWizardStore from 'src/zustand/useTradingAlgorithmWizardStore'

// ** Import Stuff
import { apiGateway } from 'src/utils/api-gateway'
import { apiEndpoints } from 'src/constants/endpoints'

type ApiCredential = {
  apiKey: string
  apiSecret: string
  id: string
  image: string
  name: string
  error: string | null
}

const initialApiCredential: ApiCredential = {
  apiKey: '',
  apiSecret: '',
  id: '',
  image: '',
  name: '',
  error: null
}

const ExchangeLinker = () => {
  const { wizardData, setExchangeLinkerState: set_5 } = useTradingAlgorithmWizardStore()
  const { exchangesList, selectedExchange, userExchanges } = wizardData.ExchangeLinkerState
  const [loading, setLoading] = useState(false)
  const [saveLoading, setSaveLoading] = useState(false)
  const [apiCredential, setApiCredential] = useState(initialApiCredential)

  const fetchData = async () => {
    setLoading(true)

    try {
      const [exchangesRes, userExchangesRes] = await Promise.all([
        apiGateway({ url: apiEndpoints.exchange.GET_EXCHANGES }),
        apiGateway({ url: apiEndpoints.exchange.GET_USER_EXCHANGES })
      ])

      const updated_5 = {
        ...(exchangesRes.isOk &&
          exchangesRes.data.retCode === 0 && { exchangesList: exchangesRes.data.result.exchanges }),
        ...(userExchangesRes.isOk &&
          userExchangesRes.data.retCode === 202 && { userExchanges: userExchangesRes.data.result.exchanges })
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
    set_5({ selectedExchange: exchangeObj })
  }

  const onClose = () => {
    setApiCredential(initialApiCredential)
  }

  const onSave = async () => {
    setSaveLoading(true)

    console.log({ apiCredential })
    const req = await apiGateway({
      url: apiEndpoints.exchange.ADD_USER_EXCHANGE,
      method: 'post',
      data: {
        ...apiCredential,
        exchangeId: apiCredential.id
      }
    })

    if (req.isOk) {
      setSaveLoading(false)
      set_5({
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

  console.log({ userExchanges })

  return (
    <React.Fragment>
      <ExchangeLinkerApiCredentialDialog
        open={Boolean(apiCredential.id)}
        onClose={onClose}
        onSave={onSave}
        apiKey={apiCredential.apiKey}
        apiSecret={apiCredential.apiSecret}
        error={apiCredential?.error ?? ''}
        onChange={(key, value) => setApiCredential(prev => ({ ...prev, [key]: value }))}
        saveLoading={saveLoading}
      />

      <TradingAlgorithmWizardContentWrapper
        title='Select an exchange to connect this algorithm to it'
        loading={loading}
        onRefresh={fetchData}
      >
        <CustomScrollbar>
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
                  <ExchangeListItemButton
                    checked={checked}
                    exchange={e}
                    isConnected={isConnected}
                    labelId={labelId}
                    onSelectExchange={onSelectExchange}
                  />
                  <LoadingButton
                    onClick={() => {
                      setApiCredential({
                        ...initialApiCredential,
                        ...e
                      })
                    }}
                    size='small'
                    disabled={isConnected}
                    loading={!isConnected && apiCredential.id === e.id && Boolean(apiCredential.id)}
                    variant='contained'
                    sx={{ ml: 2 }}
                  >
                    {isConnected ? 'Connected' : 'Connect'}
                  </LoadingButton>
                </ListItem>
              )
            })}
          </List>
        </CustomScrollbar>
      </TradingAlgorithmWizardContentWrapper>
    </React.Fragment>
  )
}

export default ExchangeLinker

type ExchangeListItemButtonProps = {
  exchange: Exchange
  checked: boolean
  labelId: string
  isConnected: boolean
  onSelectExchange: (exchange: Exchange) => void
}

const ExchangeListItemButton: React.FC<ExchangeListItemButtonProps> = ({
  exchange,
  checked,
  labelId,
  isConnected,
  onSelectExchange
}) => {
  return (
    <ListItemButton disabled={!isConnected} role={undefined} dense onClick={() => onSelectExchange(exchange)}>
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
          alt={exchange.name}
          src={`data:image/png;base64,${exchange.image}`}
        />
      </ListItemIcon>
      <ListItemText sx={{ flex: 1 }} id={labelId} primary={exchange.name} />
    </ListItemButton>
  )
}
