// ** Base URL
const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000/api/v1'

// ** Assign Base URLs
const telegramUrl = backendUrl + '/telegram'
const telegramPages = '/bots/telegram'
const algorithmUrl = backendUrl + '/algorithm'
const authUrl = backendUrl + '/auth'
const exchangeUrl = backendUrl + '/exchange'
const exchangePages = '/exchange'
const cryptocurrencyUrl = backendUrl + '/cryptocurrency'
const chatgptUrl = backendUrl + '/chatgpt'
const robots = backendUrl + '/robot'

export const apiEndpoints = {
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
    onTokenExpiration: 'sub-exp-tkn',

    // ** Local storage and Cookies
    USER_DATA: 'userData'
  },

  // ** Algorithm URL
  algorithm: {
    ADD_ALGORITHM: algorithmUrl + '/add-algorithm',
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
    START_LISTENING: telegramUrl + '/start-listening',

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

  // ** Robots URL
  robot: {
    // ** Backend Urls
    GET_ROBOTS: robots + '/all-robots',
    GET_USER_ROBOTS: robots + '/user-robots',

    // ** Local storage and Cookies
    ROBOTS: 'robots',
    USER_ROBOTS: 'user-robots'
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
    GET_BYBIT_BALANCE: exchangeUrl + '/bybit-balance',
    GET_BYBIT_ACTIVE_ORDERS: exchangeUrl + '/bybit-active-orders',

    // ** Pages
    BINGX: exchangePages + '/bingx',

    // ** Local storage and Cookies
    BYBIT_API: 'bybit-api',
    EXCHANGES: 'exchanges'
  },

  // ** Cryptocurrency
  cryptocurrency: {
    CREATE_COINS: cryptocurrencyUrl + '/create-cryptocurrencies',
    GET_ALL_COINS: cryptocurrencyUrl + '/get-all-coins',
    GET_CANDELSTICK_DATA: cryptocurrencyUrl + '/get-candlestick-data'
  },

  // ** Chat GPT URL
  chatgpt: {
    INIT_AI: '/init-ai',
    GENERATE_COMPLETION: chatgptUrl + '/generate-completion'
  }
}

export const wsEndpoints = {}
