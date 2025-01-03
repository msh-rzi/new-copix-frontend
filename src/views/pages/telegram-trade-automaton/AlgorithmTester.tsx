import React, { useEffect, useState } from 'react'

// ** Import Mui Component
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import CircularProgress from '@mui/material/CircularProgress'
import Tooltip from '@mui/material/Tooltip'

// ** Import Custom Component
import TradingAlgorithmWizardContentWrapper from './TradingAlgorithmWizardContentWrapper'

// ** Import Hook
import useTradingAlgorithmWizardStore from 'src/zustand/useTradingAlgorithmWizardStore'
import { apiGateway } from 'src/utils/api-gateway'
import { apiEndpoints } from 'src/constants/endpoints'
import CustomScrollbar from 'src/@core/components/scrollbar'

type obj = {
  Symbol: ''
  Market: ''
  Position: ''
  Leverage: ''
  EntryTargets: []
  TakeProfitTargets: []
  StopLoss: ''
}

const AlgorithmTester = () => {
  const { wizardData } = useTradingAlgorithmWizardStore()
  const [initAi, setInitAi] = useState(false)
  const [loading, setLoading] = React.useState(false)
  const [test, setTest] = useState<obj[]>([])

  const initAiFunc = async () => {
    const req = await apiGateway({
      url: apiEndpoints.chatgpt.INIT_AI
    })

    if (req.isOk) setInitAi(true)

    return req.isOk
  }

  useEffect(() => {
    initAiFunc()
  }, [])

  function findStringsBetweenBackticks(inputString: string) {
    // const regex = /```json(.*?)```/gs
    // const matches = []
    // let match
    // while ((match = regex.exec(inputString)) !== null) {
    //   matches.push(JSON.parse(match[1].replaceAll('\n', '')))
    // }

    return []
  }

  const onSelectMessage = async (msg: Message) => {
    if (!initAi) await initAiFunc()

    setLoading(true)

    const req = await apiGateway({
      url: apiEndpoints.chatgpt.GENERATE_COMPLETION,
      method: 'post',
      data: { prompt: msg.message }
    })

    if (req.isOk) {
      setLoading(false)
      const stringsBetweenBackticks = findStringsBetweenBackticks(req.data)
      console.log({ stringsBetweenBackticks })
      console.log({ req: req.data })
      setTest(stringsBetweenBackticks)
    } else {
      setLoading(false)
    }
  }

  console.log(test)

  return (
    <TradingAlgorithmWizardContentWrapper title='Select a part of message and click on a button'>
      <Stack sx={{ flex: 1, width: '100%', gap: 4, flexDirection: 'row' }}>
        <Stack flex={1}>
          <CustomScrollbar>
            <List
              disablePadding
              sx={theme => ({
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: theme.palette.divider,
                gap: 0,
                borderRadius: '5px'
              })}
            >
              {wizardData.MessagePickerState.messagesList.map(msg => (
                <Tooltip key={msg.id} title={msg.message}>
                  <ListItem disablePadding sx={{ mt: 1 }}>
                    <ListItemButton role={undefined} dense onClick={() => onSelectMessage(msg)}>
                      <ListItemText>{msg.message}</ListItemText>
                    </ListItemButton>
                  </ListItem>
                </Tooltip>
              ))}
            </List>
          </CustomScrollbar>
        </Stack>
        <Stack
          sx={theme => ({
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: theme.palette.divider,
            flex: 1,
            gap: 1,
            p: 4,
            borderRadius: '5px'
          })}
        >
          {loading ? (
            <CircularProgress sx={{ margin: 'auto' }} />
          ) : (
            <>
              <Typography>{`Algorithm Name : ${wizardData.AlgorithmComposerState.algorithmName.value}`}</Typography>
              <Divider />
              {test.map((obj, index) => {
                return (
                  <>
                    <MessageDisplay {...obj} />
                    {index !== test.length - 1 && <Divider sx={{ my: 2 }} />}
                  </>
                )
              })}
            </>
          )}
        </Stack>
      </Stack>
    </TradingAlgorithmWizardContentWrapper>
  )
}

export default AlgorithmTester

export const MessageDisplay: React.FC<obj> = props => {
  return (
    <>
      {Object.entries(props).map(([key, value]) => (
        <Typography variant='subtitle2' key={key} sx={{ width: '100%' }}>
          {`${key} : ${value}`}
        </Typography>
      ))}
    </>
  )
}
