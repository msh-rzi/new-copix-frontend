import React from 'react'

// ** Import Mui Components
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'
import LoadingButton from '@mui/lab/LoadingButton'

// ** Import Custom Components
import Card from 'src/@core/components/mui/card'

interface TradingAlgorithmWizardLayoutCardProps {
  children: React.ReactNode
  isLastStep: boolean
  isFirstStep: boolean
  isNextDisabled: boolean
  saveLoading: boolean
  onNextClick(): void
  onPrevClick(): void
  onSaveClick(): void
  disableView: boolean
  stepsList: UseTradingAlgorithmWizardStoreStep[]
  step: UseTradingAlgorithmWizardStoreStep
}
const TradingAlgorithmWizardLayoutCard: React.FC<TradingAlgorithmWizardLayoutCardProps> = ({
  children,
  isLastStep,
  isFirstStep,
  isNextDisabled = false,
  saveLoading = false,
  onNextClick,
  onPrevClick,
  onSaveClick,
  disableView,
  stepsList,
  step
}) => (
  <Card sx={{ height: '100%', display: 'flex' }} cardContentProps={{ sx: { height: '100%', display: 'flex' } }}>
    <Stack sx={{ flex: 1 }}>
      {disableView ? (
        <Typography variant='h5' sx={{ margin: 'auto' }}>
          Please Connect to your telegram account
        </Typography>
      ) : (
        <>
          <Stack sx={{ flex: 1 }}>
            <Stack flexDirection={'row'} sx={{ width: '100%' }}>
              <Breadcrumbs sx={{ flex: 1 }}>
                {stepsList.map(s => (
                  <Typography
                    sx={{
                      cursor: 'default',
                      ...(s === step ? { fontWeight: 'bold' } : { color: 'rgba(0, 0, 0, 0.4) !important' })
                    }}
                    variant='subtitle2'
                    key={s}
                  >
                    {s.replace(/([a-z])([A-Z])/g, '$1 $2')}
                  </Typography>
                ))}
              </Breadcrumbs>
            </Stack>
            <Divider />
            <Stack sx={{ flex: 1 }}>{children}</Stack>
          </Stack>
          <Divider sx={{ marginTop: 'auto' }} />
          <Stack flexDirection='row-reverse' gap={4}>
            <LoadingButton
              disabled={isNextDisabled}
              onClick={() => (isLastStep ? onSaveClick() : onNextClick())}
              variant='contained'
              loading={saveLoading}
            >
              {isLastStep ? 'Save' : 'Next'}
            </LoadingButton>
            {!isFirstStep && <LoadingButton onClick={onPrevClick}>Previous</LoadingButton>}
          </Stack>
        </>
      )}
    </Stack>
  </Card>
)

export default TradingAlgorithmWizardLayoutCard
