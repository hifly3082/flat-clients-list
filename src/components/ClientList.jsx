import { Divider, Spin, message } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import { deleteClient } from '../api/api'
import ModalForm from './ModalForm'
import ClientCard from './ClientCard'

const ClientList = ({
  clientsData,
  loading,
  currentSelectedFlatId,
  fetchClients
}) => {
  const handleDelete = (clientId) => async () => {
    try {
      await deleteClient(clientId)
      message.success('Client successfully deleted.')
    } catch (error) {
      message.error('Error deleting client. Please try again.')
    }
  }

  return (
    <Spin
      spinning={loading}
      indicator={
        <LoadingOutlined
          style={{
            fontSize: 24
          }}
          spin
        />
      }>
      <Divider orientation='left'>Clients</Divider>
      <div className='client-list'>
        {clientsData
          ? clientsData.map((client) => (
              <ClientCard
                key={client.id}
                client={client}
                handleDelete={handleDelete}
                loading={loading}
              />
            ))
          : null}
        <ModalForm
          currentSelectedFlatId={currentSelectedFlatId}
          fetchClients={fetchClients}
        />
      </div>
    </Spin>
  )
}
export default ClientList
