import { Divider, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import AddUserCard from './AddUserCard'
import ClientCard from './ClientCard'

const ClientList = ({
  clientsData,
  loading,
  onCreate,
  onDelete,
  openModal,
  setOpenModal
}) => {
  const handleDelete = (id) => () => {
    onDelete && onDelete(id)
  }

  return (
    <div>
      <Divider orientation='left'>Clients</Divider>
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
        <div className='client-list'>
          {clientsData &&
            clientsData.map((client) => (
              <ClientCard
                key={client.id}
                client={client}
                onDelete={handleDelete(client.id)}
                loading={loading}
              />
            ))}
          <AddUserCard
            onCreate={onCreate}
            openModal={openModal}
            setOpenModal={setOpenModal}
          />
        </div>
      </Spin>
    </div>
  )
}
export default ClientList
