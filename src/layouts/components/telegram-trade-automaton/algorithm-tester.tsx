import React, { useState } from 'react'

// ** Import Mui Component
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'

// ** Import Hook
import useTradingAlgorithmWizardStore, { algorithmKeys, Message } from 'src/zustand/useTradingAlgorithmWizardStore'

interface Values {
  [key: string]: string | string[]
}

function extractValues(algorithmKeys: string[], algorithmicMessage: string, originalMessage: string): Values {
  const values: Values = {}

  // Loop through each key in the algorithm keys
  algorithmKeys.forEach(key => {
    // Construct a regex pattern based on the key in the algorithmic message
    const regexPattern = new RegExp(`\\b${key}:\\s*(\\S+)`)

    // Extract the value using the regex pattern
    const match = originalMessage.match(regexPattern)

    if (match) {
      // If the key is "Entry Targets", "Take-Profit Targets", or "StopLoss",
      // find all values until the next empty line in the original message
      if (key === 'Entry Targets' || key === 'Take-Profit Targets') {
        const startIndex = originalMessage.indexOf(`${key}:`)
        const endIndex = originalMessage.indexOf('\n\n', startIndex)
        const targets = originalMessage.slice(startIndex, endIndex).match(/\d+/g) || []
        values[key] = targets
      } else if (key === 'StopLoss') {
        // For "StopLoss", extract the value directly from the original message
        values[key] = match[1]
      } else {
        // Otherwise, use the value directly from the match
        // console.log({ match })
        values[key] = match[1]
      }
    }
  })

  return values
}

const AlgorithmTester = () => {
  const { wizardData } = useTradingAlgorithmWizardStore()
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)

  console.log({ selectedMessage })
  console.log(wizardData._4.algorithmicText)

  const onSelectMessage = (msg: Message) => {
    setSelectedMessage(msg)

    // const values: Values = extractValues(algorithmKeys, wizardData._4.algorithmicText!, msg.message)
  }

  return (
    <Stack gap={4} flex={1}>
      <Stack flexDirection='row' alignItems='center' justifyContent='space-between'>
        <Typography>{`Select a part of message and click on a button { Channel : ${wizardData._1.selectedChannel?.title} }`}</Typography>
      </Stack>
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
          {wizardData._2.messagesList.map(msg => (
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
          <Typography>{`Algorithm Name : ${wizardData._4.algorithmName}`}</Typography>

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
    </Stack>
  )
}

export default AlgorithmTester
