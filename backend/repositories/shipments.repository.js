var elasticClientProvider = require("./elastic.client.provider.js");
var client = elasticClientProvider.getElasticClient();

async function getShById(shId) {

    let query = {
        index: "shipments",
        body: {
            query: {
                bool: {
                    must: {
                        term: {
                            field: "uuid.keyword",
                            value: shId
                        }
                    }
                }
            }
        }
    }

    return await client.search(query).then(res => {
        return res
    }).catch(error => {
        console.log(`Error: ${error.message}`)
        return `Error: ${error.message}`
    })
}


async function addUser(payload) {

    let query = buildUserToCreateQuery(payload)
    

    return await client.putScript(query).then(res => {
        return res
    }).catch(error => {
        console.log(`Error updating user: ${error.message}`)
        return `Error: ${error.message}`
    })
}

async function getAllUsers() {

    let query = {
        index: "user",
        body: {
            query: {
                match_all: {}
            }
        }
    }

    return await client.search(query).then(res => {
        if (res?.hits?.hits?.length) {
            return res?.hits?.hits?.map(r => {
                return {
                    id: r._id,
                    ...r._source
                }
            })
        }
        return []
    }).catch(error => {
        console.log(`Error updating user: ${error.message}`)
        return `Error: ${error.message}`
    })
}


function buildUserToCreateQuery(payload) {
    return {
        index: "user",
        body: {
            "name": payload.name,
            "email": payload.email,
            "mobile": payload.mobile,
            "godUser": payload?.godUser ?? false
        }
    }
}

module.exports = {
    getShById: getShById,
    addUser: addUser,
    getAllUsers: getAllUsers,
}


