# Distribute Bitfinex Data via HyperCore

Distribute ethfinex data via hypercore. This demo listen to mongodb change log in real time, send the data to kafka. A consumer will then read data from kafka and put it on hypercore.

The rest of the story you know, clients can consume the data  (order book, trades, candles) in a peer to peer fashion, with very little overhead to bitfinex infrastructure.


Usage:

# adds some trades to mongodb - websocket to mongodb

    python3 bitfinex_trades_ws.py

# listen to mongodb changes and publish on kafka

    node mongodb-listener.js

# reads data from kafka and publish on hypernode

    node kafka-server.js btcusd

# bitfinex-hackathon-2018

# Dependencies

Please install the dependecies below to run this demo.

## NPM Packages

    npm install hypercore
    npm install hyperdiscovery
    npm install kafka-node
    npm install mongodb


## MongoDB

Download MongoDB v4.0.0 and run it as a replica set.

    ./bin/mongod  --dbpath ./data --replSet rs0

For testing connect to MongoDB and run

    rs.initiate()

## Kafka

Follow the linked below to install and run kafka.

    https://kafka.apache.org/quickstart