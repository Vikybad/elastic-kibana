const express = require('express')
const app = express()

// Enable CORS for all routes
const cors = require('cors')  // Don't forget to install this package
app.use(cors())

app.get('/', (req, res) => {
    res.status(200).send({
        data: 'Direct response',
        error: null,
        status: 200
    })
})

app.get('/high-power', (req, res) => {
    const startTime = new Date().valueOf()
    let endTime = new Date().valueOf()
    while (endTime <= (startTime + 5000)) {
        endTime = new Date().valueOf()
    }
    res.send({
        data: "Done",
        error: null,
        status: 200
    })
})

app.listen(3001, () => {
    console.log(`Server is running on http://localhost:3001`)
})