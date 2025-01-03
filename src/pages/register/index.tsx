// ** React Imports
import { ReactNode, useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Box, { BoxProps } from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import { useAuth } from 'src/hooks/useAuth'
import { RegisterParams } from 'src/context/types'

// ** Styled Components
const RegisterIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  maxHeight: 600,
  marginTop: theme.spacing(12),
  marginBottom: theme.spacing(12),
  [theme.breakpoints.down(1540)]: {
    maxHeight: 550
  },
  [theme.breakpoints.down('lg')]: {
    maxHeight: 500
  }
}))

const RightWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 450
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 600
  },
  [theme.breakpoints.up('xl')]: {
    maxWidth: 750
  }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: `${theme.palette.primary.main} !important`
}))

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(1.75),
  '& .MuiFormControlLabel-label': {
    color: theme.palette.text.secondary
  }
}))

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(5).required(),
  terms: yup.boolean()
})

const mapper = [
  {
    field: 'firstName',
    placeholder: 'Mehdi',
    label: 'FirstName'
  },
  {
    field: 'lastName',
    placeholder: 'Rezaei',
    label: 'LastName'
  },
  {
    field: 'email',
    placeholder: 'mehdi.rezaei879@gmail.com',
    label: 'Email'
  },
  {
    field: 'password',
    label: 'Password'
  }
]

const defaultValues: RegisterParams = {
  password: '',
  email: '',
  firstName: '',
  lastName: ''
}

const Register = () => {
  // ** States
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [terms, setTerms] = useState(false)
  const [termsErrorMessage, setTermsErrorMessage] = useState(false)

  // ** Hooks
  const auth = useAuth()
  const theme = useTheme()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  // ** Vars
  const { skin } = settings

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit: SubmitHandler<RegisterParams> = (data: RegisterParams) => {
    const { firstName, lastName, email, password } = data

    console.log(data)
    if (!terms) {
      setTermsErrorMessage(true)

      return
    }

    auth.register({ firstName, lastName, email, password }, err => {
      console.log('object', err)
      setError('email', {
        message: err.error
      })
    })
  }

  const passwordProps = {
    type: showPassword ? 'text' : 'password',
    InputProps: {
      endAdornment: (
        <InputAdornment position='end'>
          <IconButton edge='end' onMouseDown={e => e.preventDefault()} onClick={() => setShowPassword(!showPassword)}>
            <Icon fontSize='1.25rem' icon={showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
          </IconButton>
        </InputAdornment>
      )
    }
  }

  const errorObject = {
    firstName: {
      error: Boolean(errors.firstName),
      ...(errors.firstName && { helperText: errors.firstName.message })
    },
    lastName: {
      error: Boolean(errors.lastName),
      ...(errors.lastName && { helperText: errors.lastName.message })
    },
    email: {
      error: Boolean(errors.email),
      ...(errors.email && { helperText: errors.email.message })
    },
    password: {
      error: Boolean(errors.password),
      ...(errors.password && { helperText: errors.password.message })
    }
  }

  const imageSource = skin === 'bordered' ? 'auth-v2-register-illustration-bordered' : 'auth-v2-register-illustration'

  return (
    <Box className='content-right' sx={{ backgroundColor: 'background.paper' }}>
      {!hidden ? (
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            position: 'relative',
            alignItems: 'center',
            borderRadius: '20px',
            justifyContent: 'center',
            backgroundColor: 'customColors.bodyBg',
            margin: theme => theme.spacing(8, 0, 8, 8)
          }}
        >
          <RegisterIllustration
            alt='register-illustration'
            src={`/images/pages/${imageSource}-${theme.palette.mode}.png`}
          />
          <FooterIllustrationsV2 />
        </Box>
      ) : null}
      <RightWrapper>
        <Box
          sx={{
            p: [6, 12],
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 400 }}>
            <svg width={34} viewBox='0 0 32 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                fill={theme.palette.primary.main}
                d='M0.00172773 0V6.85398C0.00172773 6.85398 -0.133178 9.01207 1.98092 10.8388L13.6912 21.9964L19.7809 21.9181L18.8042 9.88248L16.4951 7.17289L9.23799 0H0.00172773Z'
              />
              <path
                fill='#161616'
                opacity={0.06}
                fillRule='evenodd'
                clipRule='evenodd'
                d='M7.69824 16.4364L12.5199 3.23696L16.5541 7.25596L7.69824 16.4364Z'
              />
              <path
                fill='#161616'
                opacity={0.06}
                fillRule='evenodd'
                clipRule='evenodd'
                d='M8.07751 15.9175L13.9419 4.63989L16.5849 7.28475L8.07751 15.9175Z'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                fill={theme.palette.primary.main}
                d='M7.77295 16.3566L23.6563 0H32V6.88383C32 6.88383 31.8262 9.17836 30.6591 10.4057L19.7824 22H13.6938L7.77295 16.3566Z'
              />
            </svg>
            <Box sx={{ my: 6 }}>
              <Typography variant='h3' sx={{ mb: 1.5 }}>
                Adventure starts here 🚀
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>Make your app management easy and fun!</Typography>
            </Box>
            <form noValidate autoComplete='on' onSubmit={handleSubmit(onSubmit)}>
              {mapper.map((c, i) => {
                const itemField = c.field as keyof typeof defaultValues

                return (
                  <Box key={itemField} sx={{ mb: i + 1 === mapper.length ? 0 : 4 }}>
                    <Controller
                      name={itemField}
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <CustomTextField
                          fullWidth
                          label={c.label}
                          value={value}
                          onChange={onChange}
                          placeholder={c?.placeholder ?? ''}
                          {...(c.field === 'password' && passwordProps)}
                          {...errorObject[itemField]}
                        />
                      )}
                    />
                  </Box>
                )
              })}

              <FormControlLabel
                name='terms'
                control={
                  <Checkbox
                    checked={terms}
                    onChange={ev => {
                      const checked = ev.target.checked
                      setTerms(checked)
                      if (checked) setTermsErrorMessage(false)
                      else setTermsErrorMessage(true)
                    }}
                  />
                }
                sx={{
                  mb: 4,
                  '& .MuiFormControlLabel-label': { fontSize: theme.typography.body2.fontSize }
                }}
                label={
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      justifyContent: 'center'
                    }}
                  >
                    <Typography
                      sx={theme => ({ color: termsErrorMessage ? theme.palette.error.light : 'text.secondary' })}
                    >
                      I agree to
                    </Typography>
                    <Typography
                      component={LinkStyled}
                      sx={theme => ({
                        color: termsErrorMessage ? theme.palette.error.light : 'text.secondary',
                        ml: 1
                      })}
                      href='/'
                      onClick={e => e.preventDefault()}
                    >
                      privacy policy & terms
                    </Typography>
                  </Box>
                }
              />
              {auth?.error?.type === 'register' && (
                <Typography variant='body2' color='red'>
                  {auth.error.message}
                </Typography>
              )}
              <Button fullWidth type='submit' variant='contained' sx={{ mb: 4 }}>
                Sign up
              </Button>
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Typography sx={{ color: 'text.secondary', mr: 2 }}>Already have an account?</Typography>
                <Typography component={LinkStyled} href='/login'>
                  Sign in instead
                </Typography>
              </Box>
              <Divider
                sx={{
                  color: 'text.disabled',
                  '& .MuiDivider-wrapper': { px: 6 },
                  fontSize: theme.typography.body2.fontSize,
                  my: theme => `${theme.spacing(6)} !important`
                }}
              >
                or
              </Divider>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconButton href='/' component={Link} sx={{ color: '#497ce2' }} onClick={e => e.preventDefault()}>
                  <Icon icon='mdi:facebook' />
                </IconButton>
                <IconButton href='/' component={Link} sx={{ color: '#db4437' }} onClick={e => e.preventDefault()}>
                  <Icon icon='mdi:google' />
                </IconButton>
              </Box>
            </form>
          </Box>
        </Box>
      </RightWrapper>
    </Box>
  )
}

Register.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

Register.guestGuard = true

export default Register
