import React from 'react'

// ** Import Mui Components
import Grid from '@mui/material/Grid'

// ** Import Custom Components
import AddCoinsToDb from 'src/views/pages/coins/AddCoinsToDb'
import GetCoinsListCard from 'src/views/pages/coins/GetCoinsListCard'
import GetCoinDetail from 'src/views/pages/coins/GetCoinDetail'

const Coins = () => {
  return (
    <Grid container spacing={6}>
      <AddCoinsToDb />
      <GetCoinsListCard />
      <GetCoinDetail />
    </Grid>
  )
}

export default Coins
