// ** Import React
import React, { useEffect, useState } from 'react'

// ** Import Mui Components
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'

// ** Import Custom Components
import ActionCard from 'src/views/components/action-card'

// ** Import Stuff
import { apiGateway } from 'src/utils/api-gateway'
import { apiEndpoints } from 'src/constants/endpoints'

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
  const { storedValue: robots, setValue: setRobots } = useLocalStorage<RobotsType[]>(apiEndpoints.robot.ROBOTS, [])
  const { storedValue: userRobots, setValue: setUserRobots } = useLocalStorage<UserRobotsType[]>(
    apiEndpoints.robot.USER_ROBOTS,
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
      await apiGateway({ url: apiEndpoints.robot.GET_ROBOTS }),
      await apiGateway({ url: apiEndpoints.robot.GET_USER_ROBOTS })
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
      url: apiEndpoints.telegram.START_LISTENING
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
              <ActionCard
                name={bot.name}
                description={bot.description}
                link={bot.path}
                onActionClick={onStart}
                isActionActive={isBotStarted}
                isLoading={startLoading}
              />
            </Grid>
          )
        })
      )}
    </Grid>
  )
}

export default Robots
