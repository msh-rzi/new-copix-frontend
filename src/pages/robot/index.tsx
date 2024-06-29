// ** Import React
import React, { useEffect, useState } from 'react'

// ** Import Mui Components
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import LoadingButton from '@mui/lab/LoadingButton'

// ** Import Custom Components
import Card from 'src/@core/components/mui/card'

// ** Import Next
import Link from 'next/link'

// ** Import Stuff
import { apiGateway } from 'src/utils/api-gateway'
import { endpoints } from 'src/constants/urls'

// ** Import Hooks
import useLocalStorage from 'src/hooks/useLocalStorage'

type RobotsType = {
  id: string
  name: string
  path: string
  description: string
}

type UserRobotsType = {
  robotsId: string
  active: boolean
}

const Robots = () => {
  const { storedValue: robots, setValue: setRobots } = useLocalStorage<RobotsType[]>(endpoints.robot.ROBOTS, [])
  const { storedValue: userRobots, setValue: setUserRobots } = useLocalStorage<UserRobotsType[]>(
    endpoints.robot.USER_ROBOTS,
    []
  )
  const [loading, setLoading] = useState(true)
  const [startLoading, setStartLoading] = useState(false)

  const getRobots = async () => {
    if ((robots.length !== 0 && userRobots, length !== 0)) {
      setLoading(false)

      return
    }
    setLoading(true)
    const [robotsReq, userRobotsReq] = await Promise.all([
      await apiGateway({ url: endpoints.robot.GET_ROBOTS }),
      await apiGateway({ url: endpoints.robot.GET_USER_ROBOTS })
    ])
    if (robotsReq.isOk && robotsReq.data.retCode === 0) {
      setRobots(robotsReq.data.result.robots)
    }
    if (userRobotsReq.isOk && userRobotsReq.data.retCode === 0) {
      setUserRobots(userRobotsReq.data.result.userRobots)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (!robots.length) getRobots()
    else setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onStart = async () => {
    setStartLoading(true)

    const req = await apiGateway({
      url: endpoints.telegram.START_LISTENING
    })
    if (req.isOk) setStartLoading(false)
    else setStartLoading(false)
  }

  console.log({ userRobots })

  return (
    <Grid container spacing={6}>
      {loading ? (
        <Grid
          item
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
            margin: 'auto'
          }}
        >
          <CircularProgress sx={{ margin: 'auto' }} />
          <Typography>Fetching Robots...</Typography>
        </Grid>
      ) : (
        robots.map(bot => {
          const isBotStarted = !!userRobots.find(ub => ub.robotsId === bot.id)

          return (
            <Grid item key={bot.name} xs={12} sm={6} md={4}>
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
                      <LoadingButton disabled={startLoading} sx={{ width: '100%' }} size='small' variant='tonal'>
                        Config
                      </LoadingButton>
                    </Link>
                    <LoadingButton
                      onClick={onStart}
                      loading={startLoading}
                      sx={{ flex: 1 }}
                      size='small'
                      variant='contained'
                      disabled={isBotStarted}
                    >
                      {isBotStarted ? 'Started' : 'Start'}
                    </LoadingButton>
                  </Stack>
                </Stack>
              </Card>
            </Grid>
          )
        })
      )}
    </Grid>
  )
}

export default Robots
