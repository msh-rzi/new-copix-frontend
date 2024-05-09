import React from 'react'

// ** Import Mui Component
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Import Hook
import useTradingAlgorithmWizardStore, {
  algorithmKeys,
  algorithmKeysType
} from 'src/zustand/useTradingAlgorithmWizardStore'

const AlgorithmComposer = () => {
  const { wizardData, set_4 } = useTradingAlgorithmWizardStore()

  const { algorithmicText, selectedText, usedAlgorithmKeys } = wizardData._4

  const handleTextSelects = (line: string) => {
    if (!window || !window.getSelection()) return

    const selection = window.getSelection()
    if (!selection || selection.isCollapsed) return

    const highlightedText = selection.toString()
    const startIndex = selection.focusOffset

    set_4({
      ...wizardData._4,
      selectedText: {
        line,
        selectedText: highlightedText,
        startIndex
      }
    })
  }

  const onAlgorithmKeyClick = (key: algorithmKeysType) => {
    if (!selectedText?.selectedText || !algorithmicText) return

    const updateAlgorithmicText = algorithmicText.replace(selectedText.selectedText, `{${key}}`)
    const updateUsedAlgorithmKeys = [...usedAlgorithmKeys, key]

    set_4({
      ...wizardData._4,
      algorithmicText: updateAlgorithmicText,
      selectedText: null,
      usedAlgorithmKeys: updateUsedAlgorithmKeys
    })
  }

  console.log({ wizardData: wizardData._4 })

  return (
    <Stack gap={4} flex={1}>
      <Stack flexDirection='row' alignItems='center' justifyContent='space-between'>
        <Typography>{`Select a part of message and click on a button { Channel : ${wizardData._1.selectedChannel?.title} }`}</Typography>
      </Stack>
      <Stack sx={{ flex: 1, width: '100%', gap: 4, flexDirection: 'row' }}>
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
          {algorithmicText &&
            algorithmicText.split('\n').map((line: string, index: number) => (
              <Typography
                onMouseUp={() => handleTextSelects(line)}
                key={index}
                sx={{ mt: line === '' ? 4 : 0 }}
                variant='body1'
              >
                {line}
              </Typography>
            ))}
        </Stack>
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
            {algorithmKeys.map(key => {
              return (
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
              )
            })}
          </Grid>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default AlgorithmComposer

export const AlgorithmName = () => {
  const { wizardData, set_4 } = useTradingAlgorithmWizardStore()
  const { title, value } = wizardData._4.algorithmName

  console.log({ title })

  return (
    <Grid item xs={12}>
      <Typography>{title}</Typography>
      <Stack sx={{ flexDirection: 'row' }}>
        <TextField
          value={value}
          size='small'
          sx={{ marginRight: 'auto', flex: 1 }}
          onChange={e =>
            set_4({
              ...wizardData._4,
              algorithmName: {
                title,
                value: e.target.value
              }
            })
          }
        />
      </Stack>
    </Grid>
  )
}

export const PurchaseVolume: React.FC = () => {
  const { wizardData, set_4 } = useTradingAlgorithmWizardStore()
  const { isPercentage, title, volume } = wizardData._4.purchaseVolume

  const onChange = ({ isp, v }: { isp?: boolean; v?: number }) => {
    set_4({
      ...wizardData._4,
      purchaseVolume: {
        title,
        isPercentage: isp !== undefined ? isp : isPercentage,
        volume: v ? v : volume
      }
    })
  }
  console.log({ title })

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
