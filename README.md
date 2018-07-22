# Tradercast - Broadcasting Trader Data via HyperCore

Tradercast broadcasts historical trading data to users via HyperCore peer to peer networks. This massively increases the speed at which historical datasets can be accessed and also greatly reduces load on exchange rest API's. 
It's good for traders and good for exchanges

## The problem
Traditionally historical data used by algorithmic traders, is extremely slow to download from an exchange via rest API's. It takes days and places a large load on exchange's web servers. Worse still, the painful process is repeated by all algorithmic traders compounding the problem. This is a perfect use case for a peer to peer network. Unlike centrally served networks, peer to peer networks become more efficient with heavier usage

## How it works
Bitfinex internally stores historical data in a mongoDb database. Tradercast defines a process, which could sit on bitfinex servers and listen to updates to the mongoDb database. The updates are then streamed to a kafka server, which in turn streams the data to another server, which writes to a hypercore network. The rest of the story you know, clients can consume the data  (order book, trades, candles) in a peer to peer fashion, with very little overhead to bitfinex/ethfinex infrastructure.

## Demo
Adds some trades to mongodb - websocket to mongodb

    python3 bitfinex_trades_ws.py

Listen to mongodb changes and publish on kafka

    node mongodb-listener.js

Reads data from kafka and publish on hypernode

    node kafka-server.js btcusd

To start a hypercode client that will copy the data via peer-to-peer

    node client.js

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
