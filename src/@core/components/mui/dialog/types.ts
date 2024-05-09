import { ReactNode } from 'react'

export interface DialogProps {
  open: boolean
  content: ReactNode
  title: ReactNode
  onOk: () => void
  onCancel?: () => void
  onClose: () => void
  okState?: string
  cancelState?: string
}
