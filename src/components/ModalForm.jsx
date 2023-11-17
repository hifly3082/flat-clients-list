import { useState } from 'react'
import { Button, Col, Card, message } from 'antd'

import { CollectionCreateForm } from './CollectionCreateForm'
import { registerClient } from '../api/api'

const ModalForm = ({ currentSelectedFlatId, fetchClients }) => {
  const [open, setOpen] = useState(false)

  const onCreate = async (values) => {
    try {
      await registerClient(values, currentSelectedFlatId)
      message.success('Client added successfully!')
      fetchClients(currentSelectedFlatId)
    } catch (error) {
      message.error('Error adding client. Please try again.')
    }
    setOpen(false)
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
        <Button
          type='primary'
          onClick={() => {
            setOpen(true)
          }}>
          Add Client
        </Button>
        <CollectionCreateForm
          open={open}
          onCreate={onCreate}
          onCancel={() => {
            setOpen(false)
          }}
        />
      </Card>
    </Col>
  )
}
export default ModalForm
