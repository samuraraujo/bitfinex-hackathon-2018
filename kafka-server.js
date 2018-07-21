// Kafka Consumer
// This script consumes two parameter:
// pair - the pair to listen to. E.g. btcusd
// endpoint - kafka endpoint. E.g: localhost:2181 (default)

console.log("Usage: node kafka-server.js pair kafka-endpoint")
console.log("Example: node kafka-server.js btcusd localhost:2181(default)")

const hypercore = require('hypercore')
const hyperdiscovery = require('hyperdiscovery')

var pair = process.argv.slice(2)[0].toLowerCase();
var endpoint = process.argv.slice(2)[1];

endpoint = endpoint == undefined ? "localhost:2181" : endpoint

console.log("Using pair => " + pair)
console.log("Using endpoint => " + endpoint)

const feed = hypercore('./data/' + pair, {valueEncoding: 'json'})

feed.once('ready', () => console.log(feed.key.toString('hex')))
feed.once('ready', () => hyperdiscovery(feed))


var kafka = require('kafka-node')
var Consumer = kafka.Consumer
var client = new kafka.Client(endpoint)

var consumer = new Consumer(
    client,
    [],
    {fromOffset: true}
);

consumer.addTopics([
    { topic: pair, partition: 0, offset: 0}
]);

consumer.on('message', function (message) {
    feed.append([message.value]);
    console.log(message.value);
});




