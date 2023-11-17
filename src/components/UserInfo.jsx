import { Avatar, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { RouteNames } from './constants'

const styles = {
  container: {
    display: 'flex'
  },
  username: {
    marginLeft: 8,
    color: 'white'
  }
}

const UserInfo = () => {
  return (
    <Link to={`/${RouteNames.Account}`}>
      <Avatar size='small' icon={<UserOutlined />} />
      <Typography.Text style={styles.username}>Username</Typography.Text>
    </Link>
  )
}

export default UserInfo
