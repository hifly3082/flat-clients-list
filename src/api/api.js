import axios from 'axios'

const baseURL = 'https://dispex.org/api/vtest'

// Get streets
export const getStreets = async () => {
  try {
    const response = await axios.get(`${baseURL}/Request/streets`)
    return response.data
  } catch (error) {
    throw new Error('Error fetching streets data')
  }
}

// Get houses
export const getHouses = async (id) => {
  try {
    const response = await axios.get(`${baseURL}/Request/houses/${id}`)
    return response.data
  } catch (error) {
    throw new Error('Error fetching house data')
  }
}

// Get flats
export const getFlats = async (id) => {
  try {
    const response = await axios.get(`${baseURL}/HousingStock?houseId=${id}`)
    return response.data
  } catch (error) {
    throw new Error('Error fetching flats data')
  }
}

// Get clients
export const getClients = async (addressId) => {
  try {
    const response = await axios.get(
      `${baseURL}/HousingStock/clients?addressId=${addressId}`
    )
    return response.data
  } catch (error) {
    throw new Error('Error fetching clients data')
  }
}

// Add client + bind it to selected flat
export const registerClient = async (clientData, flatId) => {
  try {
    const response = await addClient(clientData)
    const response2 = await bindClientToFlat(flatId, response.id)
    return response2.data
  } catch (error) {
    throw new Error('Error register client')
  }
}

// Add client
const addClient = async (clientData) => {
  try {
    const response = await axios.post(
      `${baseURL}/HousingStock/client`,
      clientData
    )

    return response.data
  } catch (error) {
    throw new Error('Error adding client')
  }
}

// Bind client to flat
const bindClientToFlat = async (flatId, clientId) => {
  try {
    const response = await axios.put(`${baseURL}/HousingStock/bind_client`, {
      AddressId: flatId,
      ClientId: clientId
    })
    return response.data
  } catch (error) {
    throw new Error('Error binding client to flat')
  }
}

// Delete client
export const deleteClient = async (id) => {
  try {
    const response = await axios.delete(
      `${baseURL}/HousingStock/bind_client/${id}`
    )
    return response.data
  } catch (error) {
    throw new Error('Error deleting client')
  }
}
