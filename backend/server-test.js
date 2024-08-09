const express = require('express')
const path = require('path')
const app = express()

// Serve static files from a 'public' directory
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/', async (req, res) => {
    const response = await fetch('localhost:3001/high-power').then(r => r.json())
    res.send(response)
    // res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`)
})