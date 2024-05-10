import React, { useEffect, useState } from 'react'

// ** Import Mui Component
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Checkbox from '@mui/material/Checkbox'
import Avatar from '@mui/material/Avatar'

// ** Import Custom Component
import TradingAlgorithmWizardContentWrapper from './TradingAlgorithmWizardContentWrapper'

// ** Import Hook
import useTradingAlgorithmWizardStore from 'src/zustand/useTradingAlgorithmWizardStore'

// ** Import Stuff
import { apiGateway } from 'src/utils/api-gateway'
import { endpoints } from 'src/constants/urls'

const TelegramChannelList = () => {
  const { wizardData, setTelegramChannelListState, setMessagePickerState } = useTradingAlgorithmWizardStore()
  const [loading, setLoading] = useState(false)

  const getChannels = async () => {
    setLoading(true)
    const req = await apiGateway({
      url: endpoints.telegram.GET_CHANNELS
    })
    if (req.isOk) {
      setLoading(false)
      setTelegramChannelListState({ channelsList: req.data })
    } else {
      console.log(req.error)
      setLoading(false)
    }
  }
  useEffect(() => {
    if (!wizardData.TelegramChannelListState.channelsList.length) getChannels()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSelectChannel = (channel: Channel) => {
    console.log(channel)
    setTelegramChannelListState({ selectedChannel: channel })
    setMessagePickerState({
      messagesList: [],
      selectedMessage: null
    })
  }

  return (
    <TradingAlgorithmWizardContentWrapper title='Select channel' loading={loading} onRefresh={getChannels}>
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
        {wizardData.TelegramChannelListState.channelsList.map(chl => {
          const labelId = `checkbox-list-label-${chl.id}`
          const checked = wizardData.TelegramChannelListState.selectedChannel?.id === chl.id

          return (
            <ListItem key={chl.id} disablePadding>
              <ListItemButton role={undefined} dense onClick={() => onSelectChannel(chl)}>
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
                  <Avatar alt={chl?.username || chl.title} src={`data:image/png;base64,${chl.profilePhoto}`} />
                </ListItemIcon>
                <ListItemText id={labelId} primary={chl.title} />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </TradingAlgorithmWizardContentWrapper>
  )
}

export default TelegramChannelList
