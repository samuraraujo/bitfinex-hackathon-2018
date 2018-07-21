const hypercore = require('hypercore')
const swarm = require('hyperdiscovery')
const ram = require('random-access-memory')

const feed = hypercore(ram, 'e58c2115ea39190947f8171a08683730079df5ca908753c9f8f59f93096f5db7', {valueEncoding: 'json'})

feed.createReadStream({live: true}).on('data', console.log)

feed.ready(_ => swarm(feed))