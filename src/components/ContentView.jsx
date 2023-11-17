import ClientList from './ClientList'
import FlatTree from './FlatTree'

export const ContentView = ({
  loading,
  treeData,
  currentSelectedFlatId,
  clientsData,
  fetchClients,
  onSelect,
  onCreate,
  onDelete,
  openModal,
  setOpenModal
}) => {
  return (
    <div className='content'>
      <FlatTree loading={loading} treeData={treeData} onSelect={onSelect} />

      {currentSelectedFlatId && (
        <ClientList
          loading={loading}
          clientsData={clientsData}
          currentSelectedFlatId={currentSelectedFlatId}
          fetchClients={fetchClients}
          onCreate={onCreate}
          onDelete={onDelete}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      )}
    </div>
  )
}
