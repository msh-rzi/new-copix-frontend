// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import { apiEndpoints } from 'src/constants/endpoints'

// ** Types
import { AuthValuesType, LoginParams, ErrCallbackType, UserDataType, RegisterParams } from './types'
import { apiGateway } from 'src/utils/api-gateway'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  error: undefined,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [error, setError] = useState(defaultProvider.error)
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = window.localStorage.getItem(apiEndpoints.auth.storageTokenKeyName)!
      console.log({ storedToken })
      if (storedToken) {
        setLoading(true)
        await axios
          .get(apiEndpoints.auth.GET_ME, {
            headers: {
              Authorization: storedToken
            }
          })
          .then(async response => {
            setLoading(false)
            setUser({ ...response.data.result.userData })
          })
          .catch(error => {
            localStorage.removeItem('userData')
            localStorage.removeItem(apiEndpoints.auth.storageTokenKeyName)
            setUser(null)
            setLoading(false)
            console.log(error)

            if (!router.pathname.includes('login')) {
              router.replace('/login')
            }
          })
      } else {
        setLoading(false)
        router.replace('/')
      }
    }

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
    axios
      .post(apiEndpoints.auth.LOGIN_EMAIL, params)
      .then(async response => {
        console.log({ response })
        console.log(response.data.retCode)
        console.log(response.data.retCode !== 202)
        if (response.data.retCode !== 202) {
          setError({ message: response.data.retExtInfo, type: 'login' })

          return
        }
        const { accessToken, userData } = response.data.result
        params.rememberMe ? window.localStorage.setItem(apiEndpoints.auth.storageTokenKeyName, accessToken) : null
        const returnUrl = router.query.returnUrl

        setUser({ ...userData })
        params.rememberMe ? window.localStorage.setItem('userData', JSON.stringify(userData)) : null

        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

        router.replace(redirectURL as string)
      })

      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(apiEndpoints.auth.storageTokenKeyName)
    router.push('/login')
  }

  const handleRegister = async (registerData: RegisterParams, errorCallback?: ErrCallbackType) => {
    try {
      setLoading(true)
      const req = await apiGateway({
        url: apiEndpoints.auth.REGISTER_EMAIL,
        data: registerData,
        method: 'post'
      })

      if (req.isOk) {
        if (req.data.retCode !== 201) {
          setError({ message: req.data.retExtInfo, type: 'register' })

          return
        }
        const { accessToken, userData } = req.data.result

        // Save user data and access token to local storage
        window.localStorage.setItem(apiEndpoints.auth.storageTokenKeyName, accessToken)
        window.localStorage.setItem('userData', JSON.stringify(userData))

        // Assuming the server handles registration and returns appropriate response
        setUser(userData)
        setLoading(false)

        const returnUrl = router.query.returnUrl
        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

        router.replace(redirectURL as string)
      } else {
        setLoading(false)
        console.log('errr', req)
        console.error('Error occurred during registration:', req)
      }
    } catch (error: any) {
      setLoading(false)
      console.error('Error occurred during registration:', error.response.data)

      if (errorCallback) errorCallback(error)
    }
  }

  const values = {
    user,
    loading,
    error,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
