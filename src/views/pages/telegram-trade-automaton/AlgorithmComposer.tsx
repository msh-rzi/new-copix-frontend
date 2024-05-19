import React from 'react'

// ** Import Mui Components
import Stack from '@mui/material/Stack'

// ** Import Custom Component
import TradingAlgorithmWizardContentWrapper from './TradingAlgorithmWizardContentWrapper'
import AlgorithmComposerKeyDisplay from 'src/layouts/components/telegram-trade-automaton/AlgorithmComposerKeyDisplay'
import AlgorithmComposerMessageDisplay from 'src/layouts/components/telegram-trade-automaton/AlgorithmComposerMessageDisplay'

const AlgorithmComposer: React.FC = () => {
  return (
    <TradingAlgorithmWizardContentWrapper title='Select a part of message and click on a button'>
      <Stack flexDirection='row' flex={1} gap={2}>
        <AlgorithmComposerMessageDisplay />
        <AlgorithmComposerKeyDisplay />
      </Stack>
    </TradingAlgorithmWizardContentWrapper>
  )
}

export default AlgorithmComposer
