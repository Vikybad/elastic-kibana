
const shResource = require('../repositories/shipments.repository')



async function getShipmentById(shId) {

    let sh = await shResource.getShById(shId)
    return sh
}

async function getUsers() {

    let users = await shResource.getAllUsers()
    return users
}

async function createUser(payload) {
    let res = await shResource.addUser(payload)
    return res
}



module.exports = {
    getShipmentById,
    getUsers,
    createUser: createUser,
}