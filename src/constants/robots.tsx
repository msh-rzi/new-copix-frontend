export type robotsConstantsType = {
  name: string
  icon: string
  path: string
  description: string
}

const robotsConstants: robotsConstantsType[] = [
  {
    icon: '/images/avatars/rocket.png',
    name: 'Telegram Trade Automaton',
    path: '/robot/telegram-trade-automaton',
    description:
      'receive real-time notifications, and customize your strategies, all from Telegram. Trade smarter with precision and confidence.'
  }
]

export default robotsConstants
