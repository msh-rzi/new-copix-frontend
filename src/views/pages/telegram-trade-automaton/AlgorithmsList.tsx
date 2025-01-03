import React, { useEffect, useState } from 'react'

// ** Import Mui Component
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Checkbox from '@mui/material/Checkbox'

// ** Import Custom Component
import Icon from 'src/@core/components/icon'
import TradingAlgorithmWizardContentWrapper from './TradingAlgorithmWizardContentWrapper'

// ** Import Hook
import useTradingAlgorithmWizardStore, {
  algorithmKeys,
  initialAlgorithm
} from 'src/zustand/useTradingAlgorithmWizardStore'

// ** Import Stuff
import { apiGateway } from 'src/utils/api-gateway'
import { apiEndpoints } from 'src/constants/endpoints'
import { v4 as uuid } from 'uuid'
import LoadingButton from '@mui/lab/LoadingButton'

const AlgorithmsList = () => {
  const { wizardData, setAlgorithmListState, setAlgorithmComposerState, setStep } = useTradingAlgorithmWizardStore()
  const { algorithmsList, selectedAlgorithm } = wizardData.AlgorithmListState
  const [loading, setLoading] = useState(false)

  const getAlgorithms = async () => {
    setLoading(true)
    const req = await apiGateway({
      url: apiEndpoints.algorithm.GET_USER_ALGORITHMS_BY_TELEGRAM_CHANNEL_ID,
      method: 'post',
      data: {
        channelId: wizardData.TelegramChannelListState.selectedChannel?.id
      }
    })
    if (req.isOk) {
      setLoading(false)
      const converted = req.data.result.userAlgorithms.map((item: any) => ({
        id: item.id.toString(),
        selectedText: null,
        algorithmicText: item.algorithm,
        usedAlgorithmKeys: algorithmKeys.filter(key => item.algorithm.includes(`{${key}}`)),
        purchaseVolume: {
          title: wizardData.AlgorithmListState.selectedAlgorithm.purchaseVolume.title,
          volume: item.purchaseVolume,
          isPercentage: item.purchaseType === 'percent'
        },
        algorithmName: {
          title: wizardData.AlgorithmListState.selectedAlgorithm.algorithmName.title,
          value: item.algorithmName
        }
      }))

      console.log({ converted })
      setAlgorithmListState({ algorithmsList: converted })
    } else {
      console.log(req.error)
      setLoading(false)
    }
  }
  useEffect(() => {
    if (!algorithmsList.length) getAlgorithms()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSelectMessage = (algorithmObj: AlgorithmType) => {
    const usedAlgorithmKeys: algorithmKeysType[] = []
    algorithmKeys.forEach(k => {
      if (algorithmObj.algorithmicText?.includes(k)) {
        usedAlgorithmKeys.push(k)
      }
    })
    const selectedAlgorithm = { ...algorithmObj, usedAlgorithmKeys }

    setAlgorithmListState({ selectedAlgorithm })

    setAlgorithmComposerState(selectedAlgorithm)
  }

  const newAlgorithm = () => {
    const algName = wizardData.TelegramChannelListState.selectedChannel!.title + algorithmsList.length
    const newAlgorithm = {
      ...initialAlgorithm,
      algorithmicText: wizardData.AlgorithmComposerState.algorithmicText,
      algorithmName: { title: initialAlgorithm.algorithmName.title, value: algName },
      id: uuid()
    }

    setAlgorithmListState({ selectedAlgorithm: newAlgorithm })
    setAlgorithmComposerState(newAlgorithm)
    setStep('AlgorithmComposer')
  }

  return (
    <TradingAlgorithmWizardContentWrapper
      title='Select an algorithm to modify or create new one'
      loading={loading}
      onRefresh={getAlgorithms}
      topAdornment={
        <LoadingButton size='small' variant='contained' onClick={newAlgorithm} startIcon={<Icon icon='tabler:plus' />}>
          New
        </LoadingButton>
      }
    >
      {!algorithmsList.length ? (
        <Stack
          sx={theme => ({
            flex: 1,
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: theme.palette.divider,
            borderRadius: '5px'
          })}
        >
          <Typography sx={{ margin: 'auto' }}>Create new algorithm for this channel</Typography>
        </Stack>
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
          {algorithmsList.map(alg => {
            const labelId = `checkbox-list-label-${alg.id}`
            const checked = selectedAlgorithm?.id === alg.id

            return (
              <ListItem key={alg.id} disablePadding>
                <ListItemButton role={undefined} dense onClick={() => onSelectMessage(alg)}>
                  <ListItemIcon>
                    <Checkbox
                      edge='start'
                      checked={checked}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={alg.algorithmName.value} />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
      )}
    </TradingAlgorithmWizardContentWrapper>
  )
}

export default AlgorithmsList
