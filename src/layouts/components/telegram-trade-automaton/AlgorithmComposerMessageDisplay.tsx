import React from 'react'

// ** Import Mui Component
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// ** Import Hook
import useTradingAlgorithmWizardStore from 'src/zustand/useTradingAlgorithmWizardStore'

const AlgorithmComposerMessageDisplay: React.FC = () => {
  const { wizardData, setAlgorithmComposerState } = useTradingAlgorithmWizardStore()
  const { algorithmicText } = wizardData.AlgorithmComposerState

  const handleTextSelects = (line: string) => {
    if (!window || !window.getSelection()) return

    const selection = window.getSelection()
    if (!selection || selection.isCollapsed) return

    const highlightedText = selection.toString()
    const startIndex = selection.focusOffset

    setAlgorithmComposerState({ selectedText: { line, selectedText: highlightedText, startIndex } })
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
      {algorithmicText &&
        algorithmicText.split('\n').map((line, index) => (
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
  )
}

export default AlgorithmComposerMessageDisplay
