import React from 'react'

import MuiCard from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import { CardProps } from './types'

const Card = ({ children, headerState, headerAdornment, ...props }: CardProps) => (
  <MuiCard {...props}>
    <CardContent
      {...props.cardContentProps}
      sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: '.8rem !important' }}
    >
      {headerState && (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
            <Typography variant='button'>{headerState}</Typography>
            {headerAdornment && <Box>{headerAdornment}</Box>}
          </Box>
          <Divider />
        </>
      )}
      <Box sx={{ display: 'flex', flexDirection: 'column', ...props.cardContentProps?.sx }}>{children}</Box>
    </CardContent>
  </MuiCard>
)

export default Card
