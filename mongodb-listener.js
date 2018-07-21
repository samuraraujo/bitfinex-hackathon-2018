const MongoClient = require('mongodb').MongoClient;

const uri = 'mongodb://localhost:27017/?replicaSet=rs0';
var kafka = require('kafka-node'),
    Producer = kafka.Producer,
    client = new kafka.Client(),
    producer = new Producer(client)

producer.on('error', function (err) {});
producer.on('ready', function () {});
MongoClient.connect(uri, { useNewUrlParser: true } ,function(err, client) {

    const db = client.db('bitfinex');
    // Connect using MongoClient
    var filter = [{

    }];

    var options = { };
    db.collection("btcusd").watch().on('change', data =>
    {
            console.log(data);
            producer.send( [{ topic: 'btcusd', messages: data["fullDocument"]["trade"] }], function (err, data) {   });


    });
});

