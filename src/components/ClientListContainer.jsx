import { useEffect, useState } from 'react'
import { Col, Row, Divider, Tree, Spin, Space } from 'antd'
import { DownOutlined, LoadingOutlined } from '@ant-design/icons'
import { getClients, getFlats, getHouses, getStreets } from '../api/api'

import ClientList from './ClientList'

const Content = () => {
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

  const handleSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info)
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
    <>
      <Divider orientation='left'>Housing stock</Divider>
      <Row>
        <Col span={4}>
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
            <Tree
              // virtual={false}
              showLine
              height={350}
              onSelect={handleSelect}
              switcherIcon={<DownOutlined />}
              treeData={treeData}
            />
          </Spin>
        </Col>

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
          {currentSelectedFlatId && (
            <ClientList
              clientsData={clientsData}
              loading={loading}
              fetchClients={fetchClients}
              currentSelectedFlatId={currentSelectedFlatId}
            />
          )}
        </Spin>
      </Row>
    </>
  )
}
export default Content
