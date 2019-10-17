let express = require('express')
let app = express()

// this starting code for node

// Create routes
let routes = require('../routes/routes.js');

// Make app use the
app.use(routes)


// To serve static content (images, html pages etc..)
app.use(express.static('public'))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.info(`Server has started on port: ${PORT}`))


// API endPoints == Routes in Express

