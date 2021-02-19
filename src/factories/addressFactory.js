const AddressService = require('./../services/addressService')

const generateInstance = () => {
    const addressService = new AddressService()

    return addressService
}

module.exports = { generateInstance }
