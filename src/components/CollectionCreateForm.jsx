import { Form, Input, Modal } from 'antd'

export const CollectionCreateForm = ({ open, onCreate, onCancel }) => {
  const [form] = Form.useForm()

  return (
    <Modal
      open={open}
      title='Create new client'
      okText='Add'
      cancelText='Cancel'
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields()
            onCreate(values)
          })
          .catch((info) => {
            console.log('Validate Failed:', info)
          })
      }}>
      <Form form={form} layout='vertical' name='registerClientForm'>
        <Form.Item
          label='Name'
          name='Name'
          rules={[
            { required: true, message: 'Please enter the client name!' }
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          label='Phone'
          name='Phone'
          rules={[
            { required: true, message: 'Please enter the client phone number!' }
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          label='Email'
          name='Email'
          rules={[
            { required: true, message: 'Please enter the client email!' },
            { type: 'email', message: 'Please enter a valid email address!' }
          ]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}
