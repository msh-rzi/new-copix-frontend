import React, { useState, SyntheticEvent, useEffect } from 'react'

// ** Import Mui Components
import Avatar, { AvatarProps } from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import Menu from '@mui/material/Menu'
import MenuItem, { MenuItemProps } from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'

// ** Import Custom Components
import Card from 'src/@core/components/mui/card'
import Icon from 'src/@core/components/icon'
import ResponsiveButton from 'src/@core/components/mui/reponsive-button'

// ** Import Zustand Slices
import useExchangesStore from 'src/zustand/useExchangesStore'
import useTelegramStore from 'src/zustand/useTelegramStore'

// ** Import Stuff
import { apiGateway } from 'src/utils/api-gateway'
import { apiEndpoints } from 'src/constants/endpoints'

const MenuItemStyled = styled(MenuItem)<MenuItemProps>(({ theme }) => ({
  '&:hover .MuiBox-root, &:hover .MuiBox-root svg': {
    color: theme.palette.primary.main
  }
}))

const InformationBarCard: React.FC = () => {
  const { telegramData } = useTelegramStore()
  const isConnected = telegramData.connectionStatus

  return (
    <Card sx={{ display: 'flex' }} cardContentProps={{ sx: { flex: 1 } }}>
      <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between', height: '100%', gap: 4 }}>
        {/* <TelegramProfile isConnectedToTelegram={isConnectedToTelegram} /> */}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Avatar
            alt={'user profile image'}
            src={
              telegramData?.profilePhoto
                ? `data:image/png;base64, ${telegramData.profilePhoto}`
                : '/images/avatars/icons8-telegram.svg'
            }
            sx={{ width: '2.5rem', height: '2.5rem' }}
          />
          <Typography sx={{ fontWeight: 500 }}>
            {telegramData?.fullname?.replace('null', '') || 'Telegram User'}
          </Typography>
        </Box>
        <Stack sx={{ flexDirection: 'row', alignItems: 'center' }}>
          <ResponsiveButton icon='tabler:logout' disabled={!isConnected} title='Disconnect' color='error' />
          <ResponsiveButton icon='tabler:switch' disabled={!isConnected} title='Change Account' />
          <ResponsiveButton
            icon='tabler:user-check'
            disabled={isConnected}
            title={isConnected ? 'Connected' : 'Connect'}
          />
        </Stack>
      </Stack>
    </Card>
  )
}

export default InformationBarCard

export const ExchangesList = () => {
  const { exchangeList, setExchangeList } = useExchangesStore()

  useEffect(() => {
    const init = async () => {
      const req = await apiGateway({
        url: apiEndpoints.exchange.GET_EXCHANGES
      })

      if (req.isOk) {
        setExchangeList(req.data)
      }
    }
    init()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Stack flexDirection='row-reverse' gap={4} alignItems='center' justifyContent='center'>
      {exchangeList.map(e => (
        <Avatar
          key={e.id}
          alt='profile alt'
          src={`data:image/png;base64,${e.image}`}
          sx={{ width: 32, height: 32, cursor: 'pointer' }}
        />
      ))}
    </Stack>
  )
}

// Define the props interface including the new prop isConnectedToTelegram
interface ShiningAvatarProps extends AvatarProps {
  isConnectedToTelegram?: boolean
}

const ShiningAvatar = styled(Avatar)<ShiningAvatarProps>(({ isConnectedToTelegram }) => ({
  animation: isConnectedToTelegram ? 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' : 'none',
  '@keyframes pulse': {
    ' 0%, 100%': {
      opacity: 1
    },
    '50%': {
      opacity: 0.5
    }
  }
}))

export const TelegramProfile: React.FC<{ isConnectedToTelegram: boolean }> = ({ isConnectedToTelegram }) => {
  const { telegramData } = useTelegramStore()
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = () => {
    setAnchorEl(null)
  }

  const styles = {
    px: 4,
    py: 1.75,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: 'text.primary',
    textDecoration: 'none',
    '& svg': {
      mr: 2.5,
      fontSize: '1.5rem',
      color: 'text.secondary'
    }
  }

  return (
    <Stack sx={{ background: 'red', flex: 1 }}>
      <ShiningAvatar
        onClick={handleDropdownOpen}
        alt='profile alt'
        src='/images/avatars/icons8-telegram.svg'
        sx={{ width: 38, height: 38, cursor: 'pointer' }}
        isConnectedToTelegram={isConnectedToTelegram}
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ '& .MuiMenu-paper': { width: 232, mt: 4.75 } }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box sx={{ py: 1.75, px: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              alt={'user profile image'}
              src={telegramData.profilePhoto!}
              sx={{ width: '2.5rem', height: '2.5rem' }}
            />
            <Box sx={{ display: 'flex', ml: 2.5, alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography sx={{ fontWeight: 500 }}>{telegramData.fullname?.replace('null', '')}</Typography>
              <Typography variant='body2'>{telegramData.connectionStatus ? 'Connected' : 'Disconnected'}</Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ my: theme => `${theme.spacing(2)} !important` }} />
        <MenuItemStyled disabled={telegramData.connectionStatus} sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <Icon icon='tabler:user-check' />
            {telegramData.connectionStatus ? 'Connected' : 'Connect'}
          </Box>
        </MenuItemStyled>
        <MenuItemStyled sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <Icon icon='tabler:user-check' />
            Change Account
          </Box>
        </MenuItemStyled>
        <Divider sx={{ my: theme => `${theme.spacing(2)} !important` }} />
        <MenuItemStyled sx={{ p: 0 }} onClick={() => console.log('object')}>
          <Box sx={styles}>
            <Icon icon='tabler:logout' />
            Disconnect
          </Box>
        </MenuItemStyled>
      </Menu>
    </Stack>
  )
}
