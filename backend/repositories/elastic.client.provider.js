var elasticsearch = require('elasticsearch');
var common = require('../configs/common')
var elasticUrl = common.config()['elastic_url']
var client = new elasticsearch.Client({ host: elasticUrl, requestTimeout: 60000 });

console.log('Elastic url ', elasticUrl)
function getElasticClient() {
    return client
}
module.exports = {
    getElasticClient: getElasticClient
}