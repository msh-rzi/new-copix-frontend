// ** Import React
import React from 'react'

// ** Import Mui Components
import { Avatar, Button, Grid } from '@mui/material'

// ** Import Custom Components
import Card from 'src/@core/components/mui/card'

// ** Import Constants
import robotsConstants from 'src/constants/robots'
import Link from 'next/link'

const Robots = () => {
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
                gap: 4
              }
            }}
          >
            <Avatar alt={bot.name} src={bot.icon} sx={{ width: 38, height: 38 }} />
            <Link href={bot.path} replace>
              <Button variant='outlined'>{bot.name}</Button>
            </Link>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default Robots
