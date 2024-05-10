import React from 'react'

// ** Import Mui Component
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'

// ** Import Custom Component
import TradingAlgorithmWizardContentWrapper from './TradingAlgorithmWizardContentWrapper'

// ** Import Hook
import useTradingAlgorithmWizardStore, { algorithmKeys } from 'src/zustand/useTradingAlgorithmWizardStore'

const AlgorithmTester = () => {
  const { wizardData } = useTradingAlgorithmWizardStore()

  const onSelectMessage = (msg: Message) => {
    console.log({ msg })
  }

  return (
    <TradingAlgorithmWizardContentWrapper title='Select a part of message and click on a button'>
      <Stack sx={{ flex: 1, width: '100%', gap: 4, flexDirection: 'row' }}>
        <List
          disablePadding
          sx={theme => ({
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: theme.palette.divider,
            flex: 1,
            gap: 0,
            borderRadius: '5px'
          })}
        >
          {wizardData.MessagePickerState.messagesList.map(msg => (
            <ListItem key={msg.id} disablePadding sx={{ mt: 1 }}>
              <ListItemButton role={undefined} dense onClick={() => onSelectMessage(msg)}>
                <ListItemText>{msg.message}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
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
          <Typography>{`Algorithm Name : ${wizardData.AlgorithmComposerState.algorithmName.value}`}</Typography>
          <Divider />
          {algorithmKeys.map((key, index) => {
            return (
              <>
                <Typography variant='subtitle2' key={key} sx={{ width: '100%' }}>
                  {key}
                </Typography>
                {index !== algorithmKeys.length - 1 && <Divider />}
              </>
            )
          })}
        </Stack>
      </Stack>
    </TradingAlgorithmWizardContentWrapper>
  )
}

export default AlgorithmTester
