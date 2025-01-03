import React from 'react'

// ** Import Mui Component
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'

// ** Import Hook
import useTradingAlgorithmWizardStore, { algorithmKeys } from 'src/zustand/useTradingAlgorithmWizardStore'

const AlgorithmComposerKeyDisplay: React.FC = () => {
  const { wizardData, setAlgorithmComposerState } = useTradingAlgorithmWizardStore()
  const { algorithmicText, selectedText, usedAlgorithmKeys } = wizardData.AlgorithmComposerState

  const onAlgorithmKeyClick = (key: algorithmKeysType) => {
    if (!selectedText?.selectedText || !algorithmicText) return

    const updateAlgorithmicText = algorithmicText.replace(selectedText.selectedText, `{${key}}`)
    const updateUsedAlgorithmKeys = [...usedAlgorithmKeys, key]

    setAlgorithmComposerState({
      algorithmicText: updateAlgorithmicText,
      selectedText: null,
      usedAlgorithmKeys: updateUsedAlgorithmKeys
    })
  }

  return (
    <Stack
      sx={theme => ({
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: theme.palette.divider,
        flex: 1,
        gap: 0,
        p: 4,
        borderRadius: '5px'
      })}
    >
      <Grid container spacing={2}>
        <AlgorithmName />
        <PurchaseVolume />
        {algorithmKeys.map(key => (
          <Grid key={key} item xs={12} sm={12} md={6}>
            <Button
              disabled={usedAlgorithmKeys.includes(key)}
              onClick={() => onAlgorithmKeyClick(key)}
              variant='outlined'
              sx={{ mb: 1, width: '100%' }}
            >
              {key}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Stack>
  )
}

export default AlgorithmComposerKeyDisplay

export const AlgorithmName: React.FC = () => {
  const { wizardData, setAlgorithmComposerState: set_4 } = useTradingAlgorithmWizardStore()
  const { title, value } = wizardData.AlgorithmComposerState.algorithmName

  console.log({ title })

  return (
    <Grid item xs={12}>
      <Typography>{title}</Typography>
      <Stack sx={{ flexDirection: 'row' }}>
        <TextField
          value={value}
          autoFocus
          size='small'
          sx={{ marginRight: 'auto', flex: 1 }}
          onChange={e => set_4({ algorithmName: { title, value: e.target.value } })}
        />
      </Stack>
    </Grid>
  )
}

export const PurchaseVolume: React.FC = () => {
  const { wizardData, setAlgorithmComposerState: set_4 } = useTradingAlgorithmWizardStore()
  const { isPercentage, title, volume } = wizardData.AlgorithmComposerState.purchaseVolume

  const onChange = ({ isp, v }: { isp?: boolean; v?: number }) => {
    set_4({
      purchaseVolume: {
        title,
        isPercentage: isp !== undefined ? isp : isPercentage,
        volume: v ? v : volume
      }
    })
  }

  return (
    <Grid item xs={12}>
      <Typography>{title}</Typography>
      <Stack sx={{ flexDirection: 'row' }}>
        <TextField
          value={volume}
          size='small'
          sx={{ marginRight: 'auto', flex: 1 }}
          InputProps={{
            inputProps: {
              inputMode: 'numeric',
              pattern: '[0-9]*'
            },
            startAdornment: <InputAdornment position='start'>{isPercentage ? '%' : '$'}</InputAdornment>
          }}
          onChange={e => onChange({ v: +e.target.value })}
        />
        <FormControlLabel
          control={<Checkbox checked={isPercentage} onChange={() => onChange({ isp: !isPercentage })} />}
          labelPlacement='start'
          label='Percent'
        />
      </Stack>
    </Grid>
  )
}
