const path = require('path')
const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3001
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handler = app.getRequestHandler()

app.prepare().then(() => {
    const server = express()
    const staticPath = path.join(__dirname, '../assets')
    server.use('/static', express.static(staticPath, {
        maxAge: '30d',
        immutable: true
    }))

    server.get('*', (req, res) => {
        return handler(req, res)
    })

    startServer()

    function startServer () {
        server.listen(port, () => {
            console.log(`> Ready on http://localhost:${port}`)
        })
    }
})
