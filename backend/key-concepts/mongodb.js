// import { MongoClient } from 'mongodb';
const { MongoClient } = require('mongodb');

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */


async function main() {


    const aggregationQuery = [
        {
            '$group': {
                '_id': '$subject',
                'data': {
                    '$push': '$$ROOT'
                }
            }
        }
    ];

    const client = await MongoClient.connect(
        'mongodb://localhost:27017/'
    );
    const coll = client.db('teachers').collection('info');
    const cursor = coll.aggregate(aggregationQuery);
    const result = await cursor.toArray();
    console.log(JSON.stringify(result))

    await client.close();

}
main()