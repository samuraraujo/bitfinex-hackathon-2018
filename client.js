const hypercore = require('hypercore')
const swarm = require('hyperdiscovery')
const ram = require('random-access-memory')

const feed = hypercore(ram, 'ed81be7c9b08daeb19618000647a5ecb8104ea6882311f1571162a292ff6f88e', {valueEncoding: 'json'})

feed.createReadStream({live: true}).on('data', console.log)

feed.ready(_ => swarm(feed))