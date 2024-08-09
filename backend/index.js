const v8 = require('v8')
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const common = require('./configs/common.js')
let configs = common.config()
const PORT = configs['PORT']

const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({ host: 'elk.databases:9200' });

const { Connection } = require('./repositories/mongo.client.provider')
const { RedisProvider } = require('./repositories/redis.client.provider')


var jsonParser = bodyParser.json({ limit: "10mb", extended: true })
var urlParser = bodyParser.urlencoded({ limit: '10mb', extended: true, type: 'application/json' })
app.use(jsonParser)
app.use(urlParser)


app.use(cors())
var http = require('http').Server(app);

console.log(`getHeapStatistics: `)
console.log(v8.getHeapStatistics())


RedisProvider.connectToRedis().then(redisRes => {
    console.log(`Redis server is ready: ${redisRes.isReady}`)


    

    const shipmentResources = require('./resources/shResource')
    app.use("/shipments", shipmentResources)

    app.listen(PORT, function () {
        console.log(`Server is listeting on port: ${PORT}`)
        console.log(`connecting to mongo...`)

        Connection.connectToMongo().then(r => {
            console.log(`Mongo is running on url: ${Connection.url}`)
        }).catch(e => {
            console.log(`Mongo connection failed ${e.stack}`)
        })
    })

}).catch(error => {
    console.log(`Error connecting to redis: ${error.stack}`)
})


