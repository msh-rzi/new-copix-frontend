import React from 'react'

// ** Import Mui Components
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'

// ** Import Hooks
import useTradingAlgorithmWizardStore from 'src/zustand/useTradingAlgorithmWizardStore'

// ** Import Custom Components
import Card from 'src/@core/components/mui/card'
import TelegramChannelList from './telegram-channel-list'
import MessagePicker from './message-picker'
import AlgorithmComposer from './algorithm-composer'
import ExchangeLinker from './exchange-linker'
import AlgorithmTester from './algorithm-tester'
import AlgorithmSaver from './algorithm-saver'
import AlgorithmList from './algorithms-list'
import { Typography } from '@mui/material'

interface TradingAlgorithmWizardLayoutCardProps {
  children: React.ReactNode
  isLastStep: boolean
  isFirstStep: boolean
  isNextDisabled: boolean
  onNextClick(): void
  onPrevClick(): void
  onSaveClick(): void
  disableView: boolean
}
const TradingAlgorithmWizardCardLayout: React.FC<TradingAlgorithmWizardLayoutCardProps> = ({
  children,
  isLastStep,
  isFirstStep,
  isNextDisabled = false,
  onNextClick,
  onPrevClick,
  onSaveClick,
  disableView
}) => (
  <Card sx={{ height: '100%', display: 'flex' }} cardContentProps={{ sx: { height: '100%', display: 'flex', p: 4 } }}>
    <Stack sx={{ flex: 1 }}>
      {disableView ? (
        <Typography variant='h5' sx={{ margin: 'auto' }}>
          Please Connect to your telegram account
        </Typography>
      ) : (
        <>
          <Stack sx={{ flex: 1 }}>{children}</Stack>
          <Divider sx={{ marginTop: 'auto' }} />
          <Stack flexDirection='row-reverse' gap={4}>
            <Button
              disabled={isNextDisabled}
              onClick={() => (isLastStep ? onSaveClick() : onNextClick())}
              variant='contained'
            >
              {isLastStep ? 'Save' : 'Next'}
            </Button>
            {!isFirstStep && <Button onClick={onPrevClick}>Previous</Button>}
          </Stack>
        </>
      )}
    </Stack>
  </Card>
)

const TradingAlgorithmWizardCard: React.FC<{ disableView: boolean }> = ({ disableView }) => {
  const { wizardData, setStep } = useTradingAlgorithmWizardStore()
  const { step, _1, _2, _3, _4 } = wizardData

  const Component: any = {
    _1: <TelegramChannelList />,
    _2: <MessagePicker />,
    _3: <AlgorithmList />,
    _4: <AlgorithmComposer />,
    _5: <ExchangeLinker />,
    _6: <AlgorithmTester />,
    _7: <AlgorithmSaver />
  }

  const onNextClick = () => {
    setStep(step + 1)
  }
  const onPrevClick = () => {
    setStep(step - 1)
  }
  const onSaveClick = () => {
    console.log('object')
  }

  const isNextDisabled =
    (step === 1 && !_1.selectedChannel) ||
    (step === 2 && !_2.selectedMessage) ||
    (step === 3 && !_3.selectedAlgorithm.id) ||
    (step === 4 && !_4.usedAlgorithmKeys.length)
  console.log({ isNextDisabled })

  return (
    <TradingAlgorithmWizardCardLayout
      isFirstStep={step === 1}
      isLastStep={step === 6}
      isNextDisabled={isNextDisabled}
      onNextClick={onNextClick}
      onPrevClick={onPrevClick}
      onSaveClick={onSaveClick}
      disableView={disableView}
    >
      {Component[`_${step}`]}
    </TradingAlgorithmWizardCardLayout>
  )
}

export default TradingAlgorithmWizardCard
