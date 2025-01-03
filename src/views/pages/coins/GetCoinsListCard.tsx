import React from 'react'

// ** Import Mui Components
import Grid from '@mui/material/Grid'

// ** Import Custom Components
import ActionCard from 'src/views/components/action-card'
import LoadingButton from '@mui/lab/LoadingButton'

const GetCoinsListCard = () => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <ActionCard name='Get Coin List' description='Fetch and display all avaiable coins'>
        <LoadingButton>Get Data</LoadingButton>
      </ActionCard>
    </Grid>
  )
}

export default GetCoinsListCard
