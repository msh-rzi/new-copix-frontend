import React, { ReactNode } from 'react'

// ** Import Custom Components
import TradingAlgorithmWizardLayoutCard from 'src/views/pages/telegram-trade-automaton/TradingAlgorithmWizardWrapperCard'
import TelegramChannelList from './TelegramChannelList'
import MessagePicker from './MessagePicker'
import AlgorithmComposer from './AlgorithmComposer'
import ExchangeLinker from './ExchangeLinker'
import AlgorithmTester from './AlgorithmTester'
import AlgorithmSaver from './AlgorithmSaver'
import AlgorithmList from './AlgorithmsList'

// ** Import Hooks
import useTradingAlgorithmWizardStore from 'src/zustand/useTradingAlgorithmWizardStore'

const TradingAlgorithmWizardCard: React.FC<{ disableView: boolean }> = ({ disableView }) => {
  const { wizardData, setStep } = useTradingAlgorithmWizardStore()
  const { stepsList, step, TelegramChannelListState, MessagePickerState, AlgorithmListState, AlgorithmComposerState } =
    wizardData

  const Component: Record<UseTradingAlgorithmWizardStoreStep, ReactNode> = {
    ChannelsList: <TelegramChannelList />,
    MessagePicker: <MessagePicker />,
    AlgorithmsList: <AlgorithmList />,
    AlgorithmComposer: <AlgorithmComposer />,
    ExchangeLinker: <ExchangeLinker />,
    AlgorithmTester: <AlgorithmTester />,
    AlgorithmSaver: <AlgorithmSaver />
  }

  const onNextClick = () => {
    const stepIndex = stepsList.findIndex(s => s === step)
    setStep(stepsList[stepIndex + 1])
  }
  const onPrevClick = () => {
    const stepIndex = stepsList.findIndex(s => s === step)
    setStep(stepsList[stepIndex - 1])
  }
  const onSaveClick = () => {
    console.log('object')
  }

  const isNextDisabled =
    (step === 'ChannelsList' && !TelegramChannelListState.selectedChannel) ||
    (step === 'MessagePicker' && !MessagePickerState.selectedMessage) ||
    (step === 'AlgorithmsList' && !AlgorithmListState.selectedAlgorithm.id) ||
    (step === 'AlgorithmComposer' && !AlgorithmComposerState.usedAlgorithmKeys.length)

  return (
    <TradingAlgorithmWizardLayoutCard
      isFirstStep={step === 'ChannelsList'}
      isLastStep={step === 'AlgorithmSaver'}
      isNextDisabled={isNextDisabled}
      onNextClick={onNextClick}
      onPrevClick={onPrevClick}
      onSaveClick={onSaveClick}
      disableView={disableView}
      stepsList={stepsList}
      step={step}
    >
      {Component[step]}
    </TradingAlgorithmWizardLayoutCard>
  )
}

export default TradingAlgorithmWizardCard
