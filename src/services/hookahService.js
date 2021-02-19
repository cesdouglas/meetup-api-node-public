class HookahService {
    constructor({ hookahRepository }) {
        this.hookahRepository = hookahRepository
    }

    async find(itemId) {
        return this.hookahRepository.find(itemId)
    }

    async create(data) {
        return this.hookahRepository.create(data)
    }
}

module.exports = HookahService