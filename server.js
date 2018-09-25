const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()

// assets. Static JS, CSS, fonts
app.use('/', express.static(path.join(__dirname, './dist')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// SPA default configuration
// it is important to declare this after the assets rule
app.get('*', (req, res, next) => {
	res.sendFile(path.resolve('./dist/index.html'))
})

// start server
const server = app.listen(process.env.PORT || 5678, () => {
	console.log(`server running on port ${server.address().port}`)
})