import React from 'react'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { useMediaQuery, useTheme } from '@mui/material'
import LoadingButton, { LoadingButtonProps } from '@mui/lab/LoadingButton'
import Icon from '@mui/material/Icon'
import IconifyIcon from '../../icon'

// Define type for props
type ResponsiveButtonProps = (
  | ({
      title: string
      loading?: boolean
      color?: 'inherit' | 'primary' | 'secondary'
    } & IconButtonProps)
  | LoadingButtonProps
) & {
  icon: React.ReactNode
}

const ResponsiveButton: React.FC<ResponsiveButtonProps> = ({ title, loading, icon, ...props }) => {
  const theme = useTheme()
  const isDownMd = useMediaQuery(theme.breakpoints.down('md'))

  const iconComponent = typeof icon === 'string' ? <IconifyIcon icon={icon} /> : <Icon>{icon}</Icon>

  return (
    <Tooltip title={title} placement='bottom'>
      {isDownMd ? (
        <IconButton {...props}>{iconComponent}</IconButton>
      ) : (
        <LoadingButton href='#' startIcon={iconComponent} loading={loading} {...props}>
          {title}
        </LoadingButton>
      )}
    </Tooltip>
  )
}

export default ResponsiveButton
