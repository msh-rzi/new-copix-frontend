import React, { useState } from 'react'
import dynamic from 'next/dynamic'

// ** Import Custom Components
import TradingAlgorithmWizardLayoutCard from 'src/views/pages/telegram-trade-automaton/TradingAlgorithmWizardWrapperCard'

// ** Import Hooks
import useTradingAlgorithmWizardStore from 'src/zustand/useTradingAlgorithmWizardStore'
import { apiGateway } from 'src/utils/api-gateway'
import { apiEndpoints } from 'src/constants/endpoints'

// ** Dynamic Imports for Lazy Loading Components
const DynamicTelegramChannelList = dynamic(() => import('./TelegramChannelList'), { loading: () => <p>Loading...</p> })
const DynamicMessagePicker = dynamic(() => import('./MessagePicker'), { loading: () => <p>Loading...</p> })
const DynamicAlgorithmComposer = dynamic(() => import('./AlgorithmComposer'), { loading: () => <p>Loading...</p> })
const DynamicExchangeLinker = dynamic(() => import('./ExchangeLinker'), { loading: () => <p>Loading...</p> })
const DynamicAlgorithmTester = dynamic(() => import('./AlgorithmTester'), { loading: () => <p>Loading...</p> })
const DynamicAlgorithmSaver = dynamic(() => import('./AlgorithmSaver'), { loading: () => <p>Loading...</p> })
const DynamicAlgorithmList = dynamic(() => import('./AlgorithmsList'), { loading: () => <p>Loading...</p> })

const TradingAlgorithmWizardCard: React.FC<{ disableView: boolean }> = ({ disableView }) => {
  const { wizardData, setStep } = useTradingAlgorithmWizardStore()
  const { stepsList, step, TelegramChannelListState, MessagePickerState, AlgorithmListState } = wizardData
  const [saveLoading, setSaveLoading] = useState(false)

  const Component: Record<UseTradingAlgorithmWizardStoreStep, React.ReactNode> = {
    ChannelsList: <DynamicTelegramChannelList />,
    MessagePicker: <DynamicMessagePicker />,
    AlgorithmsList: <DynamicAlgorithmList />,
    AlgorithmComposer: <DynamicAlgorithmComposer />,
    ExchangeLinker: <DynamicExchangeLinker />,
    AlgorithmTester: <DynamicAlgorithmTester />,
    AlgorithmSaver: <DynamicAlgorithmSaver />
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
      url: apiEndpoints.algorithm.ADD_ALGORITHM,
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
      setStep('ChannelsList')
    } else {
      setSaveLoading(false)
    }
  }

  console.log({ stepsList })
  console.log({ step })

  const isNextDisabled =
    (step === 'ChannelsList' && !TelegramChannelListState.selectedChannel) ||
    (step === 'MessagePicker' && !MessagePickerState.selectedMessage) ||
    (step === 'AlgorithmsList' && !AlgorithmListState.selectedAlgorithm.id)

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
