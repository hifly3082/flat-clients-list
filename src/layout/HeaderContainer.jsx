import { Header } from 'antd/es/layout/layout'
import { Typography } from 'antd'

const { Title } = Typography
const HeaderContainer = () => {
  return (
    <Header
      theme='light'
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
      <Title level={4} style={{ color: '#fff' }}>
        SPA для отображения списка зарегистрированных пользователей
      </Title>
    </Header>
  )
}
export default HeaderContainer
