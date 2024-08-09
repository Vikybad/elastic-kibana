
const { createClient } = require('redis');
const common = require('../configs/common.js')
let configs = common.config()
const redis_db_url = configs['redis_url']
console.log('redis url ' + redis_db_url)


class RedisProvider {
    static connectToRedis() {
        if (this.redis_client) return Promise.resolve(this.redis_client)
        return new Promise((resolve, reject) => {
            const client = createClient({ url: `redis://${redis_db_url}:6379`, database: 3 });
            client.on('error', err => {
                console.error('Redis Client Error :by error :', err);
                reject(err);
            });
            client.connect().then(_ => {
                console.log('Connected to Redis Server with db: 3');
                this.redis_client = client;
                const clientV2 = createClient({ url: `redis://${redis_db_url}:6379`, database: 7 });
                clientV2.on('error', err => {
                    console.error('Redis ClientV2 Error :by error :', err);
                    reject(err);
                });
                clientV2.connect().then(_ => {
                    console.log('Connected to Redis Server with db 7');
                    this.redis_client_v2 = clientV2;
                    resolve(this.redis_client_v2)
                }).catch(e => {
                    console.error('Redis ClientV2 COnnection  Error:', e);
                    reject(e);
                })
            }).catch(e => {
                console.error('Redis Client COnnection  Error:', e);
                reject(e);
            })
        });
    }
}

RedisProvider.redis_client = null
RedisProvider.redis_client_v2 = null



module.exports = { RedisProvider }