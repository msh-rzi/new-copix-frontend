// ** Base URL
const backendUrl = 'http://localhost:3000/api/v1'

// ** Assign Base URLs
const telegramUrl = backendUrl + '/telegram'
const telegramPages = '/bots/telegram'
const algorithmUrl = backendUrl + '/algorithm'
const usersUrl = backendUrl + '/users'
const coinsUrl = backendUrl + '/coins'
const authUrl = backendUrl + '/auth'
const exchangeUrl = backendUrl + '/exchange'
const exchangePages = '/exchange'

export const endpoints = {
  // ** Auth URL
  auth: {
    LOGIN_EMAIL: authUrl + '/email/login',
    REGISTER_EMAIL: authUrl + '/email/register',
    CONFIRM_EMAIL: authUrl + '/email/confirm',
    FORGOT_PASSWORD: authUrl + '/forgot/password',
    RESET_PASSWORD: authUrl + '/reset/password',
    GET_ME: authUrl + '/me',
    UPDATE_ME: authUrl + '/me',
    DELETE_ME: authUrl + '/me',
    REFRESH_AUTH: authUrl + '/refresh',
    LOGOUT_AUTH: authUrl + '/logout',
    LOGIN_FACEBOOK: authUrl + '/facebook/login',
    LOGIN_GOOGLE: authUrl + '/google/login',
    storageTokenKeyName: 'sub-acc-tkn',
    onTokenExpiration: 'sub-exp-tkn'
  },

  // ** Algorithm URL
  algorithm: {
    GET_USER_ALGORITHMS_BY_TELEGRAM_CHANNEL_ID: algorithmUrl + '/get-user-algorithms-by-telegram-channel-id'
  },

  // ** Telegram URL
  telegram: {
    // ** Backend Urls
    SEND_CODE: telegramUrl + '/send-code',
    VALIDATE_CODE: telegramUrl + '/validate-code',
    GET_CHANNEL_MESSAGES: telegramUrl + '/channel-history',
    GET_CHANNELS: telegramUrl + '/channels',
    INIT_CONNECTION: telegramUrl + '/init-connection',
    CREATE_CLIENT: telegramUrl + '/signin',
    LOG_OUT: telegramUrl + '/logout',
    CHECK_CONNECTION: telegramUrl + '/check-connection',
    GET_ME: telegramUrl + '/get-me',

    // ** Pages
    SELECT_MODE: telegramPages,
    PRIVATE_MODE: telegramPages + '/private-mode',
    DEFAULT_MODE: telegramPages + '/default-mode',

    // ** Local storage and Cookies
    ACCOUNT_MODE: 'tel-mode-con',
    IS_CONNECTED: 'srv-tel-con',
    TELEGRAM_DEFAULT_CHANNELS: 'tel-def-chl',
    TELEGRAM_SELECTED_CHANNEL: 'tel-sel-chl',

    // TELEGRAM_DEFAULT_CHANNELS_MESSAGES: 'tel-def-chl-mgs',
    SAVED_ALGORITHMS: 'saved-algo'
  },

  // ** Exchange URL
  exchange: {
    // ** Backend Urls
    GET_EXCHANGES: exchangeUrl + '/all-exchanges',
    GET_USER_EXCHANGES: exchangeUrl + '/user-exchanges',
    GET_EXCHANGE_ICON: exchangeUrl + '/get-exchange-icon',
    CONNECT_TO_BINGX: exchangeUrl + '/connect-to-bingx',
    ADD_ALGORITHM: exchangeUrl + '/add-algorithm',
    ADD_USER_EXCHANGE: exchangeUrl + '/add-user-exchange',

    // ** Pages
    BINGX: exchangePages + '/bingx',

    // ** Local storage and Cookies
    BYBIT_API: 'bybit-api',
    EXCHANGES: 'exchanges'
  },

  // ** Users Bot URL
  users: {
    CREATE: usersUrl,
    LIST: usersUrl,
    GET_BY_ID: (id: number) => usersUrl + `/${id}`,
    UPDATE: (id: number) => usersUrl + `/${id}`,
    DELETE: (id: number) => usersUrl + `/${id}`
  },

  // ** Coins Bot URL
  coins: {
    CREATE: coinsUrl,
    LIST: coinsUrl,
    GET_BY_ID: (id: number) => coinsUrl + `/${id}`,
    UPDATE: (id: number) => coinsUrl + `/${id}`,
    DELETE: (id: number) => coinsUrl + `/${id}`
  }
}
