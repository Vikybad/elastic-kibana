const MongoClient = require('mongodb').MongoClient
const common  =  require('../configs/common.js')
var dbNameConst = common.config()['mongo_db_name']
var mongoUrl = common.config()['mongo_url']
console.log('dbUrl ',mongoUrl , ' dbname ',dbNameConst)

class Connection {
    
    static connectToMongo() {
        let client = new MongoClient(`${mongoUrl}/`,{replicaSet: "rs0", directConnection: true})
        // let client = new MongoClient(mongoUrl,{ useUnifiedTopology: true })
        if(this.db) return Promise.resolve(this.db)
        return client.connect().then((connect)=>{
           this.db =  connect.db(dbNameConst)
           console.log('connected to mongo')
        })
        .catch(e=>{
            console.log("some db error",e.message)
            console.log(e)
        })
    }
}

Connection.db = null
Connection.url = mongoUrl+dbNameConst
Connection.options = {
    bufferMaxEntries: 0,
    reconnectTries: 5000
}

module.exports = { Connection }
