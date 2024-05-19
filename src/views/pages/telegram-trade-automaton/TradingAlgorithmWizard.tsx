import React, { ReactNode, useState } from 'react'

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
import { apiGateway } from 'src/utils/api-gateway'
import { endpoints } from 'src/constants/urls'

const TradingAlgorithmWizardCard: React.FC<{ disableView: boolean }> = ({ disableView }) => {
  const { wizardData, setStep, resetWizardData } = useTradingAlgorithmWizardStore()
  const { stepsList, step, TelegramChannelListState, MessagePickerState, AlgorithmListState, AlgorithmComposerState } =
    wizardData
  const [saveLoading, setSaveLoading] = useState(false)

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
  const onSaveClick = async () => {
    setSaveLoading(true)
    const req = await apiGateway({
      url: endpoints.algorithm.ADD_ALGORITHM,
      method: 'post',
      data: {
        algorithmName: wizardData.AlgorithmComposerState.algorithmName.value,
        exchangeId: wizardData.ExchangeLinkerState.selectedExchange?.id,
        algorithm: wizardData.AlgorithmComposerState.algorithmicText,
        channelId: wizardData.TelegramChannelListState.selectedChannel?.id,
        purchaseVolume: wizardData.AlgorithmComposerState.purchaseVolume.volume.toString(),
        purchaseType: wizardData.AlgorithmComposerState.purchaseVolume.isPercentage ? 'percent' : 'volume'
      }
    })
    if (req.isOk) {
      setSaveLoading(false)
      resetWizardData()
    } else {
      setSaveLoading(false)
    }
  }

  console.log({ stepsList })
  console.log({ step })

  const isNextDisabled =
    (step === 'ChannelsList' && !TelegramChannelListState.selectedChannel) ||
    (step === 'MessagePicker' && !MessagePickerState.selectedMessage) ||
    (step === 'AlgorithmsList' && !AlgorithmListState.selectedAlgorithm.id) ||
    (step === 'AlgorithmComposer' && !AlgorithmComposerState.usedAlgorithmKeys.length)

  return (
    <TradingAlgorithmWizardLayoutCard
      isFirstStep={step === 'ChannelsList'}
      isLastStep={step === 'AlgorithmTester'}
      isNextDisabled={isNextDisabled}
      saveLoading={saveLoading}
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
