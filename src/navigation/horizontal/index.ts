// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): HorizontalNavItemsType => [
  {
    title: 'Home',
    path: '/home',
    icon: 'tabler:smart-home'
  },
  {
    title: 'Robots',
    path: '/robot',
    icon: 'tabler:robot'
  },
  {
    title: 'Coins',
    path: '/coins',
    icon: 'tabler:coins'
  }
]

export default navigation
