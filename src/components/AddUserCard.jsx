import { Button, Col, Card } from 'antd'

import { ModalCreateUserForm } from './ModalCreateUserForm'

const AddUserCard = ({ onCreate, openModal, setOpenModal }) => {
  const handleOpenModal = (openState) => () => {
    setOpenModal(openState)
  }

  return (
    <Col span={4}>
      <Card
        style={{
          width: 300,
          height: 300,
          marginTop: 16,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'inherit'
        }}>
        <Button type='primary' onClick={handleOpenModal(true)}>
          Add Client
        </Button>
        <ModalCreateUserForm
          open={openModal}
          onCreate={onCreate}
          onCancel={handleOpenModal(false)}
        />
      </Card>
    </Col>
  )
}
export default AddUserCard
