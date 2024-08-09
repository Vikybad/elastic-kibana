const express = require("express");
const app = express();

const shipmentService = require('../services/shipment.service')



app.get('/shipment/:uuid', (req, res) => {
    let shipmentId = req.params.uuid

    console.log(`getting sh: ${shipmentId}`)
})

app.get('/users', (req, res) => {

    shipmentService.getUsers().then(response => {
        return res.send({
            data: response,
            error: null,
            status: 200
        })
    }).catch(error => {
        return res.send({
            data: null,
            error: error.message,
            status: 500
        })
    })
})

app.post('/create-user', (req, res) => {

    let payload = req.body
    shipmentService.createUser(payload).then(response => {
        return res.send({
            data: response,
            error: null,
            status: 200
        })
    }).catch(error => {
        return res.send({
            data: null,
            error: error.message,
            status: 500
        })
    })
})

module.exports = app