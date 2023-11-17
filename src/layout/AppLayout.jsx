import { Layout } from 'antd'

import HeaderContainer from './HeaderContainer'

const AppLayout = ({ children }) => {
  return (
    <Layout style={{ height: '100vh' }}>
      <HeaderContainer />
      <Layout style={{ padding: '24px 24px' }}>{children}</Layout>
    </Layout>
  )
}

export default AppLayout
