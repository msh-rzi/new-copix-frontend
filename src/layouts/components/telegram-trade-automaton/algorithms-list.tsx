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
import CircularProgress from '@mui/material/CircularProgress'

// ** Import Custom Component
import Icon from 'src/@core/components/icon'

// ** Import Hook
import useTradingAlgorithmWizardStore, {
  AlgorithmType,
  algorithmKeys,
  algorithmKeysType,
  initialAlgorithm
} from 'src/zustand/useTradingAlgorithmWizardStore'

// ** Import Stuff
import { apiGateway } from 'src/utils/api-gateway'
import { endpoints } from 'src/constants/urls'
import { v4 as uuid } from 'uuid'
import LoadingButton from '@mui/lab/LoadingButton'

const AlgorithmsList = () => {
  const { wizardData, set_3, set_4, setStep } = useTradingAlgorithmWizardStore()
  const { algorithmsList, selectedAlgorithm } = wizardData._3
  const [loading, setLoading] = useState(false)

  const getAlgorithms = async () => {
    setLoading(true)
    const req = await apiGateway({
      url: endpoints.algorithm.GET_USER_ALGORITHMS_BY_TELEGRAM_CHANNEL_ID,
      method: 'post',
      data: {
        channelId: wizardData._1.selectedChannel?.id
      }
    })
    if (req.isOk) {
      setLoading(false)
      set_3({ ...wizardData._3, algorithmsList: req.data })
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

    set_3({
      ...wizardData._3,
      selectedAlgorithm
    })

    set_4(selectedAlgorithm)
  }

  const newAlgorithm = () => {
    const algName = wizardData._1.selectedChannel!.title + algorithmsList.length
    const newAlgorithm = {
      ...initialAlgorithm,
      algorithmicText: wizardData._4.algorithmicText,
      algorithmName: { title: initialAlgorithm.algorithmName.title, value: algName },
      id: uuid()
    }

    set_3({
      ...wizardData._3,
      selectedAlgorithm: newAlgorithm
    })
    set_4(newAlgorithm)
    setStep(wizardData.step + 1)
  }

  console.log({ wizardData: wizardData._3 })

  return (
    <Stack gap={4} flex={1}>
      <Stack flexDirection='row' alignItems='center' justifyContent='space-between'>
        <Typography>{`Select an algorithm to modify or create new one { Channel : ${wizardData._1.selectedChannel?.title} }`}</Typography>
        <Stack flexDirection='row' gap={2}>
          <LoadingButton
            loading={loading}
            size='small'
            variant='outlined'
            onClick={getAlgorithms}
            startIcon={<Icon icon='tabler:refresh' />}
          >
            Refresh
          </LoadingButton>
          <LoadingButton
            size='small'
            variant='contained'
            onClick={newAlgorithm}
            startIcon={<Icon icon='tabler:plus' />}
          >
            New
          </LoadingButton>
        </Stack>
      </Stack>
      {loading ? (
        <CircularProgress sx={{ margin: 'auto' }} />
      ) : !algorithmsList.length ? (
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
    </Stack>
  )
}

export default AlgorithmsList
