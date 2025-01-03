import React from 'react'

// ** Import Mui Component
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import LoadingButton from '@mui/lab/LoadingButton'
import CircularProgress from '@mui/material/CircularProgress'

// ** Import Custom Component
import Icon from 'src/@core/components/icon'

type TradingAlgorithmWizardContentWrapperProps = {
  loading?: boolean
  title: string
  onRefresh?(): void
  topAdornment?: React.ReactNode
  children: React.ReactNode
}

const TradingAlgorithmWizardContentWrapper: React.FC<TradingAlgorithmWizardContentWrapperProps> = ({
  loading = false,
  title,
  onRefresh,
  topAdornment,
  children
}) => {
  return (
    <Stack gap={2} flex={1}>
      <Stack flexDirection='row' alignItems='center' justifyContent='space-between'>
        <Typography>{title}</Typography>
        <Stack flexDirection='row' gap={2}>
          {onRefresh && (
            <LoadingButton
              loading={loading}
              size='small'
              variant='outlined'
              onClick={onRefresh}
              startIcon={<Icon icon='tabler:refresh' />}
            >
              Refresh
            </LoadingButton>
          )}
          {topAdornment}
        </Stack>
      </Stack>
      {loading ? <CircularProgress sx={{ margin: 'auto' }} /> : children}
    </Stack>
  )
}

export default TradingAlgorithmWizardContentWrapper
