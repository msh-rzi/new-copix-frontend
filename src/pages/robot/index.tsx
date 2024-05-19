// ** Import React
import React, { useState } from 'react'

// ** Import Mui Components
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import LoadingButton from '@mui/lab/LoadingButton'

// ** Import Custom Components
import Card from 'src/@core/components/mui/card'

// ** Import Constants
import robotsConstants from 'src/constants/robots'

// ** Import Next
import Link from 'next/link'
import { apiGateway } from 'src/utils/api-gateway'
import { endpoints } from 'src/constants/urls'

const Robots = () => {
  const [loading, setLoading] = useState(false)

  const onStart = async () => {
    setLoading(true)

    const req = await apiGateway({
      url: endpoints.telegram.START_LISTENING
    })
    if (req.isOk) setLoading(false)
    else setLoading(false)
  }

  return (
    <Grid container>
      {robotsConstants.map(bot => (
        <Grid key={bot.name} xs={12} sm={6} md={4}>
          <Card
            cardContentProps={{
              sx: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                gap: 4
              }
            }}
          >
            <Stack flexDirection='column' gap={2} flex={3}>
              <Typography variant='body1'>{bot.name}</Typography>
              <Typography variant='caption' sx={{ mb: 4 }}>
                {bot.description}
              </Typography>
              <Stack flexDirection='row' gap={2}>
                <Link href={bot.path} style={{ flex: 1 }}>
                  <LoadingButton disabled={loading} sx={{ width: '100%' }} size='small' variant='tonal'>
                    Config
                  </LoadingButton>
                </Link>
                <LoadingButton onClick={onStart} loading={loading} sx={{ flex: 1 }} size='small' variant='contained'>
                  Start
                </LoadingButton>
              </Stack>
            </Stack>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default Robots
