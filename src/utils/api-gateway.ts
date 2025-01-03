import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios'

interface FetchOptions {
  url: string
  method?: Method
  params?: AxiosRequestConfig['params']
  data?: AxiosRequestConfig['data']
  headers?: AxiosRequestConfig['headers']
  headeruthorization?: string
}

interface dataRequestValue {
  data: AxiosResponse<any, any>['data']
  error: any
  isOk: boolean
}

const getBaseHeaders = (init?: any) => {
  const headers = init || {}

  if (!headers['Content-Type']) {
    headers['Content-Type'] = 'application/json'
  }

  if (!headers['accept']) {
    headers['accept'] = 'application/json'
  }

  const accTkn = window.localStorage.getItem('sub-acc-tkn')

  if (accTkn) {
    headers['Authorization'] = `Bearer ${accTkn}`
  }

  headers['x-timezone'] = Intl.DateTimeFormat().resolvedOptions().timeZone

  return headers
}

export const apiGateway = async (options: FetchOptions): Promise<dataRequestValue> => {
  const headers = getBaseHeaders(options?.headers)

  try {
    const requestOptions: AxiosRequestConfig = {
      method: options.method || 'get',
      url: options.url,
      params: options.params,
      data: options.data,
      headers
    }

    const response = await axios(requestOptions)
    console.log({ response })

    const isOk = response.status === 200 || response.status === 201 || response.status === 202

    return { data: response.data, error: '', isOk }
  } catch (error: any) {
    console.error('Error fetching data', error)

    return { data: [], error, isOk: false }
  }
}
