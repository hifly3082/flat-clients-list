import { useEffect, useState } from 'react'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { getClients, getFlats, getHouses, getStreets } from '../api/api'

import ClientList from './ClientList'
import FlatTree from './FlatTree'

const ContentContainer = () => {
  const [loading, setLoading] = useState(false)
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
    fetchClients(currentSelectedFlatId)
  }, [currentSelectedFlatId])

  return (
    <div className='content'>
      <FlatTree
        loading={loading}
        treeData={treeData}
        handleSelect={handleSelect}
      />

      {currentSelectedFlatId && (
        <ClientList
          loading={loading}
          clientsData={clientsData}
          currentSelectedFlatId={currentSelectedFlatId}
          fetchClients={fetchClients}
        />
      )}
    </div>
  )
}
export default ContentContainer
