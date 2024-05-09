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
import LoadingButton from '@mui/lab/LoadingButton'

// ** Import Custom Component
import Icon from 'src/@core/components/icon'

// ** Import Hook
import useTradingAlgorithmWizardStore, { Message, initialAlgorithm } from 'src/zustand/useTradingAlgorithmWizardStore'

// ** Import Stuff
import { apiGateway } from 'src/utils/api-gateway'
import { endpoints } from 'src/constants/urls'

const MessagePicker = () => {
  const { wizardData, set_2, set_3, set_4 } = useTradingAlgorithmWizardStore()
  const [loading, setLoading] = useState(false)

  const getMessages = async () => {
    setLoading(true)
    const req = await apiGateway({
      url: endpoints.telegram.GET_CHANNEL_MESSAGES,
      method: 'post',
      data: {
        channelId: wizardData._1.selectedChannel?.id,
        limit: 10
      }
    })
    if (req.isOk) {
      setLoading(false)
      set_2({ ...wizardData._2, messagesList: req.data.filter((m: Message) => m.message) })
    } else {
      console.log(req.error)
      setLoading(false)
    }
  }
  useEffect(() => {
    if (!wizardData._2.messagesList.length) getMessages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSelectMessage = (messageObj: Message) => {
    const newAlgorithm = {
      ...initialAlgorithm,
      algorithmicText: messageObj.message
    }
    set_2({
      ...wizardData._2,
      selectedMessage: messageObj
    })
    set_3({
      ...wizardData._3,
      selectedAlgorithm: newAlgorithm
    })
    set_4(newAlgorithm)
  }

  return (
    <Stack gap={4} flex={1}>
      <Stack flexDirection='row' alignItems='center' justifyContent='space-between'>
        <Typography>{`Select a message to create algorithm { Channel : ${wizardData._1.selectedChannel?.title} }`}</Typography>
        <LoadingButton
          loading={loading}
          size='small'
          variant='outlined'
          onClick={getMessages}
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
          {wizardData._2.messagesList.map(msg => {
            const labelId = `checkbox-list-label-${msg.id}`
            const checked = wizardData._2.selectedMessage?.id === msg.id

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
      )}
    </Stack>
  )
}

export default MessagePicker
