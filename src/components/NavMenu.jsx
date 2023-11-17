import { Link, useLocation } from 'react-router-dom'

import { Menu } from 'antd'
import { UnorderedListOutlined, UserOutlined } from '@ant-design/icons'
import { RouteNames } from './constants'

function getItem(label, key, icon, children) {
  return {
    label,
    key,
    icon,
    children
  }
}

const items = [
  getItem(
    <Link to={`/${RouteNames.Flats}`}>Flats</Link>,
    `/${RouteNames.Flats}`,
    <UnorderedListOutlined />
  ),
  getItem(
    <Link to={`/${RouteNames.Account}`}>Account</Link>,
    `/${RouteNames.Account}`,
    <UserOutlined />
  )
]

const NavMenu = () => {
  const location = useLocation()

  return (
    <Menu
      theme='light'
      mode='inline'
      defaultSelectedKeys={[RouteNames.Flats]}
      selectedKeys={[location.pathname]}
      items={items}
    />
  )
}
export default NavMenu
