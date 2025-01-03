import React, { useState } from 'react'

// ** Import Mui Components
import Grid from '@mui/material/Grid'

// ** Import Custom Components
import ActionCard from 'src/views/components/action-card'
import LoadingButton from '@mui/lab/LoadingButton'
import { apiGateway } from 'src/utils/api-gateway'
import { apiEndpoints } from 'src/constants/endpoints'

const AddCoinsToDb = () => {
  const [loading, setLoading] = useState(false)

  const onClick = async () => {
    setLoading(true)

    const req = await apiGateway({
      method: 'post',
      url: apiEndpoints.cryptocurrency.CREATE_COINS
    })

    if (req.isOk) {
      setLoading(false)
    } else {
      setLoading(false)
    }
  }

  return (
    <Grid item xs={12} sm={6} md={4}>
      <ActionCard name='Add Coins To Database' description='Fetch and add coins to db'>
        <LoadingButton onClick={onClick} loading={loading} variant='tonal'>
          Fetch Data
        </LoadingButton>
      </ActionCard>
    </Grid>
  )
}

export default AddCoinsToDb
