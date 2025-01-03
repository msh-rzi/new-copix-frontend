import React, { useEffect, useState } from 'react'

// ** Import Mui Component
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Checkbox from '@mui/material/Checkbox'

// ** Import Custom Component
import TradingAlgorithmWizardContentWrapper from './TradingAlgorithmWizardContentWrapper'
import CustomScrollbar from 'src/@core/components/scrollbar'

// ** Import Hook
import useTradingAlgorithmWizardStore, { initialAlgorithm } from 'src/zustand/useTradingAlgorithmWizardStore'

// ** Import Stuff
import { apiGateway } from 'src/utils/api-gateway'
import { apiEndpoints } from 'src/constants/endpoints'

const MessagePicker = () => {
  const { wizardData, setMessagePickerState, setAlgorithmListState, setAlgorithmComposerState } =
    useTradingAlgorithmWizardStore()
  const [loading, setLoading] = useState(false)

  const getMessages = async () => {
    setLoading(true)
    const req = await apiGateway({
      url: apiEndpoints.telegram.GET_CHANNEL_MESSAGES,
      method: 'post',
      data: {
        channelId: wizardData.TelegramChannelListState.selectedChannel?.id,
        limit: 10
      }
    })
    if (req.isOk) {
      setLoading(false)
      setMessagePickerState({ messagesList: req.data.result.history.filter((m: Message) => m.message) })
    } else {
      console.log(req.error)
      setLoading(false)
    }
  }
  useEffect(() => {
    if (!wizardData.MessagePickerState.messagesList.length) getMessages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSelectMessage = (messageObj: Message) => {
    const newAlgorithm = {
      ...initialAlgorithm,
      algorithmicText: messageObj.message
    }
    setMessagePickerState({ selectedMessage: messageObj })
    setAlgorithmListState({ selectedAlgorithm: newAlgorithm })
    setAlgorithmComposerState(newAlgorithm)
  }

  return (
    <TradingAlgorithmWizardContentWrapper
      title='Select a message to create algorithm'
      loading={loading}
      onRefresh={getMessages}
    >
      <CustomScrollbar>
        <List
          sx={{
            width: '100%',
            flex: 1,
            padding: 0
          }}
        >
          {wizardData.MessagePickerState.messagesList.map(msg => {
            const labelId = `checkbox-list-label-${msg.id}`
            const checked = wizardData.MessagePickerState.selectedMessage?.id === msg.id

            return (
              <ListItem key={msg.id} disablePadding>
                <ListItemButton role={undefined} dense onClick={() => onSelectMessage(msg)}>
                  <ListItemIcon>
                    <Checkbox
                      edge='start'
                      checked={checked}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={msg.message} />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
      </CustomScrollbar>
    </TradingAlgorithmWizardContentWrapper>
  )
}

export default MessagePicker
