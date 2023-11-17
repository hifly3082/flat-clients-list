import { useState } from 'react'

import NavMenu from '../components/NavMenu'
import Sider from 'antd/es/layout/Sider'

const SiderContainer = () => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Sider
      theme='light'
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}>
      <NavMenu />
    </Sider>
  )
}
export default SiderContainer
