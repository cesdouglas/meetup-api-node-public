const axios = require('axios')

class AddressService {
  async findCEP(cep) {
    const response = await axios.get(`http://viacep.com.br/ws/${cep}/json/`)

    return response.data
  }
}

module.exports = AddressService

// const addressService = new AddressService()
// addressService.findCEP()