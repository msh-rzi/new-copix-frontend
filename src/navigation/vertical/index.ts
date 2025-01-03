// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
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
}

export default navigation
