const HookahRepository = require('./../repositories/hookahRepository')
const HookahService = require('./../services/hookahService')

const { join } = require('path')
const filename = join(__dirname, '../../database', 'data.json')

const generateInstance = () => {
    const hookahRepository = new HookahRepository({
        file: filename
    })
    const hookahService = new HookahService({
        hookahRepository
    })

    return hookahService
}

module.exports = { generateInstance }

// generateInstance().find().then(console.log)