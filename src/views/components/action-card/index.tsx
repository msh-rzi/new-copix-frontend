import React, { ReactNode } from 'react'

// ** Import Next
import Link from 'next/link'

// ** Import Mui Components
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

// ** Import Custom Components
import Card from 'src/@core/components/mui/card'
import LoadingButton from '@mui/lab/LoadingButton'

// Define interface for ActionButtons
interface ActionButtonsProps {
  link: string
  onActionClick: () => void
  isActionActive: boolean
  isLoading: boolean
}

// Merge interface with ActionCardProps
interface ActionCardProps {
  name: string
  description: string
  children?: ReactNode
}

// Conditional type for link and actions if children is not provided
type FullActionCardProps = ActionCardProps & (ActionButtonsProps | { children: ReactNode })

const ActionCard: React.FC<FullActionCardProps> = ({
  name,
  description,
  children,
  ...props // Remaining props for ActionButtons
}) => {
  return (
    <Card
      cardContentProps={{
        sx: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          gap: 4
        }
      }}
    >
      <Stack flexDirection='column' gap={2} flex={3}>
        <Typography variant='body1'>{name}</Typography>
        <Typography variant='caption' sx={{ mb: 4 }}>
          {description}
        </Typography>

        {children ?? <ActionButtons {...(props as ActionButtonsProps)} />}
      </Stack>
    </Card>
  )
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ link, onActionClick, isActionActive, isLoading }) => {
  return (
    <Stack flexDirection='row' gap={2}>
      <Link href={link} style={{ flex: 1 }}>
        <Button sx={{ width: '100%' }} size='small' variant='outlined'>
          Open
        </Button>
      </Link>
      <LoadingButton
        loading={isLoading}
        onClick={onActionClick}
        sx={{ flex: 1 }}
        size='small'
        variant='tonal'
        color={isActionActive ? 'success' : 'error'}
      >
        {isActionActive ? 'Deactivate' : 'Activate'}
      </LoadingButton>
    </Stack>
  )
}

export default ActionCard
