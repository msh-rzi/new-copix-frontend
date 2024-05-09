// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import { endpoints } from 'src/constants/urls'

// ** Types
import { AuthValuesType, LoginParams, ErrCallbackType, UserDataType, RegisterParams } from './types'
import { apiGateway } from 'src/utils/api-gateway'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
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
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = window.localStorage.getItem(endpoints.auth.storageTokenKeyName)!
      if (storedToken) {
        setLoading(true)
        await axios
          .get(endpoints.auth.GET_ME, {
            headers: {
              Authorization: storedToken
            }
          })
          .then(async response => {
            setLoading(false)
            setUser({ ...response.data.userData })
          })
          .catch(error => {
            localStorage.removeItem('userData')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('accessToken')
            setUser(null)
            setLoading(false)
            console.log(error)

            if (!router.pathname.includes('login')) {
              router.replace('/login')
            }
          })
      } else {
        setLoading(false)
      }
    }

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
    axios
      .post(endpoints.auth.LOGIN_EMAIL, params)
      .then(async response => {
        params.rememberMe
          ? window.localStorage.setItem(endpoints.auth.storageTokenKeyName, response.data.accessToken)
          : null
        const returnUrl = router.query.returnUrl

        setUser({ ...response.data.userData })
        params.rememberMe ? window.localStorage.setItem('userData', JSON.stringify(response.data.userData)) : null

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
    window.localStorage.removeItem(endpoints.auth.storageTokenKeyName)
    router.push('/login')
  }

  const handleRegister = async (registerData: RegisterParams, errorCallback?: ErrCallbackType) => {
    try {
      setLoading(true)
      const req = await apiGateway({
        url: endpoints.auth.REGISTER_EMAIL,
        data: registerData,
        method: 'post'
      })

      console.log({ req })
      if (req.isOk) {
        const { accessToken, userData } = req.data

        // Save user data and access token to local storage
        window.localStorage.setItem(endpoints.auth.storageTokenKeyName, accessToken)
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
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
