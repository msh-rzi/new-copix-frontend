import { CardContentProps, CardProps as MuiCardProps } from '@mui/material'
import { ReactNode } from 'react'

export type CardProps = {
  headerState?: ReactNode
  headerAdornment?: ReactNode
  children: ReactNode
  cardContentProps?: Partial<CardContentProps>
} & MuiCardProps
