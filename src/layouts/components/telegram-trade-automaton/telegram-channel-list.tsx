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
import Avatar from '@mui/material/Avatar'
import CircularProgress from '@mui/material/CircularProgress'

// ** Import Custom Component
import Icon from 'src/@core/components/icon'

// ** Import Hook
import useTradingAlgorithmWizardStore, { Channel } from 'src/zustand/useTradingAlgorithmWizardStore'

// ** Import Stuff
import { apiGateway } from 'src/utils/api-gateway'
import { endpoints } from 'src/constants/urls'
import LoadingButton from '@mui/lab/LoadingButton'

const TelegramChannelList = () => {
  const { wizardData, set_1, set_2 } = useTradingAlgorithmWizardStore()
  const [loading, setLoading] = useState(false)

  const getChannels = async () => {
    setLoading(true)
    const req = await apiGateway({
      url: endpoints.telegram.GET_CHANNELS
    })
    if (req.isOk) {
      setLoading(false)
      set_1({ ...wizardData._1, channelsList: req.data })
    } else {
      console.log(req.error)
      setLoading(false)
    }
  }
  useEffect(() => {
    if (!wizardData._1.channelsList.length) getChannels()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSelectChannel = (channel: Channel) => {
    console.log(channel)
    set_1({
      ...wizardData._1,
      selectedChannel: channel
    })
    set_2({
      messagesList: [],
      selectedMessage: null
    })
  }

  return (
    <Stack gap={4} flex={1}>
      <Stack flexDirection='row' alignItems='center' justifyContent='space-between'>
        <Typography>Select channel</Typography>
        <LoadingButton
          loading={loading}
          size='small'
          variant='outlined'
          onClick={getChannels}
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
          {wizardData._1.channelsList.map(chl => {
            const labelId = `checkbox-list-label-${chl.id}`
            const checked = wizardData._1.selectedChannel?.id === chl.id

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
      )}
    </Stack>
  )
}

export default TelegramChannelList
