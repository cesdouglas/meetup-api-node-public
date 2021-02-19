const http = require('http')
const PORT = 3000
const DEFAULT_HEADER = { 'Content-Type': 'application/json' }

const HookahFactory = require('./factories/hookahFactory')
const hookahService = HookahFactory.generateInstance()
const Hookah = require('./entities/hookah')

const AddressFactory = require('./factories/addressFactory')
const addressService = AddressFactory.generateInstance()

const routes = {
    '/hookahs:get': async (request, response) => {
        const { param } = request.queryString
        const id = isNaN(param) ? Number(param) : param
        const hookahs = await hookahService.find(id)
        response.write(JSON.stringify({ results: hookahs }))

        return response.end()
    },
    '/hookahs:post': async (request, response) => {
        for await (const data of request) {
            try {

                // await Promise.reject('/hookahs:post')
                const item = JSON.parse(data)
                const hookah = new Hookah(item)
                const { error, valid } = hookah.isValid()

                if (!valid) {
                    response.writeHead(400, DEFAULT_HEADER)
                    response.write(JSON.stringify({ error: error.join(',') }))
                    return response.end()
                }

                const id = await hookahService.create(hookah)
                response.writeHead(201, DEFAULT_HEADER)
                response.write(JSON.stringify({ success: 'Hookah Created with success!!', id }))

                return response.end()
            } catch (error) {
                return handleError(response)(error)
            }
        }
    },
    '/address:get': async (request, response) => {
        const { param } = request.queryString

        const address = await addressService.findCEP(param)

        response.write(JSON.stringify(address))

        return response.end()
    },
    default: (request, response) => {
        response.writeHead(404, DEFAULT_HEADER)
        response.end()
    }
}

const handleError = response => {
    return error => {
        console.error('Deu Ruim!***', error)
        response.writeHead(500, DEFAULT_HEADER)
        response.write(JSON.stringify({ error: 'Internal Server Error!!' }))

        return response.end()
    }
}

const handler = (request, response) => {
    const { url, method } = request
    const [first, route, param] = url.split('/')
    request.queryString = { param }

    const key = `/${route}:${method.toLowerCase()}`

    response.writeHead(200, DEFAULT_HEADER)

    const chosen = routes[key] || routes.default
    return chosen(request, response).catch(handleError(response))
}

http.createServer(handler)
    .listen(PORT, () => console.log('server running at', PORT))
