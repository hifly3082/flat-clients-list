import { Col, Card, Button } from 'antd'

const ClientCard = ({ onDelete, client, loading }) => {
  return (
    <Col key={client.id} span={4}>
      <Card
        className='client-card'
        loading={loading}
        style={{
          width: 300,
          height: 300
        }}>
        <h2>{client.name}</h2>
        <div>
          <p> Phone: {client.phone} </p>
          <p> Email: {client.email} </p>
          <p> ClientId: {client.id} </p>
        </div>
        <div>
          <Button className='btn-delete' onClick={onDelete}>
            Delete
          </Button>
        </div>
      </Card>
    </Col>
  )
}
export default ClientCard
