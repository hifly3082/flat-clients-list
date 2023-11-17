import { Button, Card, Col, Row, Spin, message } from 'antd'
import ModalForm from './ModalForm'
import { deleteClient } from '../api/api'

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
    <div className='client-list'>
      {clientsData
        ? clientsData.map((client) => (
            <Col key={client.id} span={4}>
              <Card
                loading={loading}
                style={{
                  width: 300,
                  height: 300,
                  marginTop: 24
                }}>
                <h2>{client.name}</h2>
                <div>
                  <p> Phone: {client.phone} </p>
                  <p> Email: {client.email} </p>
                  <p> ClientId: {client.id} </p>
                </div>
                <div>
                  <Button onClick={handleDelete(client.id)}>Delete</Button>
                </div>
              </Card>
            </Col>
          ))
        : null}
      <ModalForm
        currentSelectedFlatId={currentSelectedFlatId}
        fetchClients={fetchClients}
      />
    </div>
  )
}
export default ClientList
