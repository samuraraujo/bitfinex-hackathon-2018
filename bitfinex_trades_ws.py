import websocket
import json
import time
import bisect
from pymongo import MongoClient

URL = "wss://api.bitfinex.com/ws/2"

PING = {"event": "ping", "cid": 123}
pong = json.dumps(PING)

TRADES_QUERY = {"event": "subscribe"
               ,"channel": "trades"
               ,"symbol": "tBTCUSD"}

db = MongoClient()["bitfinex"]

class TradesToMongoWriter():
    
    def __init__(self):
        self.count = 0
    
    def on_message(self, ws, message):
        msg = json.loads(message)
        self.count += 1
        # write data to mongo
        if(self.count > 3 and msg[1] != "hb"):
            db.btcusd.insert_one({"trade": msg})
            print(message)
    
    def on_error(self, ws, error):
        print(error)
    
    def on_close(self, ws):
        print("### closed ###")
    
    def on_open(self, ws):
        ws.send(json.dumps(TRADES_QUERY))

if __name__ == "__main__":
    b = TradesToMongoWriter()
    websocket.enableTrace(True)
    ws = websocket.WebSocketApp(URL,
                              on_message = b.on_message,
                              on_error = b.on_error,
                              on_close = b.on_close)

    ws.on_open = b.on_open
    ws.run_forever()
