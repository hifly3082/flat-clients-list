import { useEffect, useState } from 'react'
import { message } from 'antd'
import {
  deleteClient,
  getClients,
  getFlats,
  getHouses,
  getStreets,
  registerClient
} from '../api/api'
import { ContentView } from './ContentView'

export const ContentContainer = () => {
  const [loading, setLoading] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [treeData, setTreeData] = useState([])
  const [clientsData, setClientsData] = useState([])
  const [currentSelectedFlatId, setCurrentSelectedFlatId] = useState()

  const fetchClients = async (flatId) => {
    try {
      setLoading(true)
      const clientData = await getClients(flatId)
      setClientsData(clientData)
    } catch (error) {
      console.error('Error fetching clients data:', error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSelect = (selectedKeys) => {
    setCurrentSelectedFlatId(selectedKeys[0])
  }

  const handleDelete = async (clientId) => {
    try {
      await deleteClient(clientId)
      message.success('Client successfully deleted.')
    } catch (error) {
      message.error('Error deleting client. Please try again.')
    }
  }

  const handleCreate = async (values) => {
    try {
      await registerClient(values, currentSelectedFlatId)
      message.success('Client added successfully!')
      fetchClients(currentSelectedFlatId)
    } catch (error) {
      message.error('Error adding client. Please try again.')
    }
    setOpenModal(false)
  }

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true)
        const streetsData = await getStreets()
        const streets = streetsData.map((street) => ({
          title: `${street.prefix.name}. ${street.name}`,
          key: street.id,
          children: [],
          selectable: false
        }))

        for (const street of streets) {
          if (street.key) {
            try {
              const housesData = await getHouses(street.key)
              const houses = housesData.map((house) => ({
                title: `д. ${house.name}`,
                key: house.id,
                children: [],
                selectable: false
              }))
              street.children = houses
              for (const house of houses) {
                if (house.key) {
                  try {
                    const flatsData = await getFlats(house.key)
                    const flats = flatsData.map((flat) => ({
                      title: `кв. ${flat.flat}`,
                      key: flat.addressId,
                      children: []
                    }))
                    house.children = flats
                  } catch (error) {
                    console.error('Error fetching flats data:', error.message)
                  }
                }
              }
            } catch (error) {
              console.error('Error fetching houses data:', error.message)
            }
          }
        }
        setTreeData(streets)
      } catch (error) {
        console.error('Error fetching streets data:', error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [])

  useEffect(() => {
    currentSelectedFlatId && fetchClients(currentSelectedFlatId)
  }, [currentSelectedFlatId])

  return (
    <ContentView
      loading={loading}
      treeData={treeData}
      currentSelectedFlatId={currentSelectedFlatId}
      clientsData={clientsData}
      fetchClients={fetchClients}
      onSelect={handleSelect}
      onCreate={handleCreate}
      onDelete={handleDelete}
      openModal={openModal}
      setOpenModal={setOpenModal}
    />
  )
}
