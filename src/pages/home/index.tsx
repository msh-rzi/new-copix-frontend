import { useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

// ** Import Cunstom Components
import Card from 'src/@core/components/mui/card'

// ** Import Stuff
import { apiGateway } from 'src/utils/api-gateway'
import { endpoints } from 'src/constants/urls'
import { Typography } from '@mui/material'

const Home = () => {
  const [balance, setBalance] = useState([])
  const [activeOrders, setActiveOrders] = useState([])

  const getBalance = async () => {
    const req = await apiGateway({
      url: endpoints.exchange.GET_BYBIT_BALANCE
    })

    if (req.isOk) {
      setBalance(req.data)
    }
  }
  const getActiveOrders = async () => {
    const req = await apiGateway({
      url: endpoints.exchange.GET_BYBIT_ACTIVE_ORDERS
    })

    if (req.isOk) {
      setActiveOrders(req.data)
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <Stack alignItems='center' flexDirection='row' gap={4}>
            <Button variant='contained' onClick={getBalance}>
              Refresh
            </Button>
            <Button variant='contained' onClick={getActiveOrders}>
              Get active orders
            </Button>
          </Stack>
        </Card>
      </Grid>
      {balance.map((coin: any) => (
        <Grid item xs={4} key={coin.coin}>
          <Card>
            <Typography>{coin.coin}</Typography>
            <Typography>equity: {coin.equity}</Typography>
            <Typography>usd value: {coin.usdValue}</Typography>
            <Typography>wallet balance: {coin.walletBalance}</Typography>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default Home
