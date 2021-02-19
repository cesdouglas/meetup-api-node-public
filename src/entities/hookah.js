class Hookah {
    constructor({ id, brand, model, color, size }) {
        this.id = Math.floor(Math.random() * 100) + Date.now()
        this.brand = brand
        this.model = model
        this.color = color
        this.size = size
    }

    isValid() {
        const propertyNames = Object.getOwnPropertyNames(this)
        const amountInvalid = propertyNames
            .map(property => (!!this[property]) ? null : `${property} is missing!`)
            .filter(item => !!item)

        return {
            valid: amountInvalid.length === 0,
            error: amountInvalid
        }
    }
}

module.exports = Hookah

// const hookah = new Hookah({ brand: 'Triton', model: 'Zip', color: 'Preto', size: 'P' })
// console.log('valid', hookah.isValid())
// console.log('valid', hookah)