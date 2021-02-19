const { readFile, writeFile } = require('fs/promises')

class HookahRepository {
    constructor({ file }) {
        this.file = file
    }

    async _currentFileContent() {
        return JSON.parse(await readFile(this.file))
    }

    async find(itemId) {
        const all = await this._currentFileContent()
        if (!itemId) return all

        return all.find(({ id }) => itemId === id)
    }
    async create(data) {
        const currentFile = await this._currentFileContent()
        currentFile.push(data)

        await writeFile(this.file, JSON.stringify(currentFile))

        return data.id
    }
}

module.exports = HookahRepository

// const hookahRepository = new HookahRepository({
//     file: './../../database/data.json'
// })
// HookahRepository.find().then(console.log).catch(error => console.log('error', error))
// HookahRepository.find(1).then(console.log).catch(error => console.log('error', error))
// HookahRepository.create({ id: 2, brand: 'Triton', model: 'Zip', color: 'Preto', size: 'P' })
//     .then(console.log)
//     .catch(error => console.log('error', error))