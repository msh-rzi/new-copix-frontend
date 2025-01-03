import React, { useEffect, useState } from 'react'

// ** Import Mui Component
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Checkbox from '@mui/material/Checkbox'
import Avatar from '@mui/material/Avatar'
import Pagination from '@mui/material/Pagination'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'

// ** Import Custom Component
import TradingAlgorithmWizardContentWrapper from './TradingAlgorithmWizardContentWrapper'
import CustomScrollbar from 'src/@core/components/scrollbar'
import IconifyIcon from 'src/@core/components/icon'

// ** Import Hook
import useTradingAlgorithmWizardStore from 'src/zustand/useTradingAlgorithmWizardStore'

// ** Import Stuff
import { apiGateway } from 'src/utils/api-gateway'
import { apiEndpoints } from 'src/constants/endpoints'

const ITEMS_PER_PAGE = 10

const TelegramChannelList = () => {
  const { wizardData, setTelegramChannelListState, setMessagePickerState } = useTradingAlgorithmWizardStore()

  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const getChannels = async () => {
    setLoading(true)
    const req = await apiGateway({
      url: apiEndpoints.telegram.GET_CHANNELS
    })
    if (req.isOk) {
      setLoading(false)
      const channels = req.data.result.channels
      setTelegramChannelListState({ channelsList: channels })
    } else {
      console.log(req.error)
      setLoading(false)
    }
  }
  useEffect(() => {
    if (!wizardData.TelegramChannelListState.channelsList.length) getChannels()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value)
    setCurrentPage(1)
  }

  const onSelectChannel = (channel: Channel) => {
    console.log(channel)
    setTelegramChannelListState({ selectedChannel: channel })
    setMessagePickerState({
      messagesList: [],
      selectedMessage: null
    })
  }

  const searchResults: Channel[] = wizardData.TelegramChannelListState.channelsList.reduce(
    (acc: Channel[], channel: Channel) => {
      if (channel.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        acc.push(channel)
      }

      return acc
    },
    []
  )

  const totalPages = Math.ceil(searchResults.length / ITEMS_PER_PAGE)
  const paginatedResults = searchResults.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const handlePageChange = (event: any, value: number) => {
    setCurrentPage(value)
  }

  return (
    <TradingAlgorithmWizardContentWrapper
      topAdornment={
        <TextField
          sx={{ order: -1 }}
          label='Search'
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <IconifyIcon icon='tabler:search' />
              </InputAdornment>
            )
          }}
          size='small'
        />
      }
      title='Select channel'
      loading={loading}
      onRefresh={getChannels}
    >
      <CustomScrollbar>
        <List
          sx={{
            width: '100%',
            flex: 1,
            padding: 0
          }}
        >
          {paginatedResults.map(chl => {
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
                    <Avatar alt={chl.title} src={`data:image/png;base64,${chl.profilePhoto}`} />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={chl.title} />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
      </CustomScrollbar>
      <Box>
        <Divider />
        <Pagination
          size='small'
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          variant='outlined'
          shape='rounded'
          sx={{ marginTop: 2, display: 'flex', justifyContent: 'center' }}
        />
      </Box>
    </TradingAlgorithmWizardContentWrapper>
  )
}

export default TelegramChannelList
