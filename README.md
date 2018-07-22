# Tradercast - Broadcasting Trader Data via HyperCore

This demo distribute ethfinex data via hypercore.

the application listen to mongodb changes log in real time, send the data to kafka. A consumer will then read data from kafka and put it on hypercore.

The rest of the story you know, clients can consume the data  (order book, trades, candles) in a peer to peer fashion, with very little overhead to bitfinex/ethfinex infrastructure.


Usage:

Adds some trades to mongodb - websocket to mongodb

    python3 bitfinex_trades_ws.py

Listen to mongodb changes and publish on kafka

    node mongodb-listener.js

Reads data from kafka and publish on hypernode

    node kafka-server.js btcusd

To start a hypercode client that will copy the data via peer-to-peer

    node client.js

# bitfinex-hackathon-2018

# Dependencies

Please install the dependecies below to run this demo.

## NPM Packages

    npm install hypercore
    npm install hyperdiscovery
    npm install kafka-node
    npm install mongodb
    npm install random-access-memory

## Python Packages

    pip3 install websocket
    pip3 install websocket-client
    pip3 install pymongo

## MongoDB

Download MongoDB v4.0.0 and run it as a replica set.

    ./bin/mongod  --dbpath ./data --replSet rs0

For testing connect to MongoDB and run

    ./bin/mongo
    use bitfinex
    rs.initiate()

## Kafka

Follow the linked below to install and run kafka.

    https://kafka.apache.org/quickstart