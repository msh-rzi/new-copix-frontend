import React from 'react'

// ** Import Custom Component
import TradingAlgorithmWizardContentWrapper from './TradingAlgorithmWizardContentWrapper'
import AlgorithmComposerKeyDisplay from 'src/layouts/components/telegram-trade-automaton/AlgorithmComposerKeyDisplay'
import AlgorithmComposerMessageDisplay from 'src/layouts/components/telegram-trade-automaton/AlgorithmComposerMessageDisplay'

const AlgorithmComposer: React.FC = () => {
  return (
    <TradingAlgorithmWizardContentWrapper title='Select a part of message and click on a button'>
      <AlgorithmComposerMessageDisplay />
      <AlgorithmComposerKeyDisplay />
    </TradingAlgorithmWizardContentWrapper>
  )
}

export default AlgorithmComposer
