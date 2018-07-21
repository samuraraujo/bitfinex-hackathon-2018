import websocket
import json
import time
import bisect
import api_math as math
from kafka import KafkaProducer


URL = "wss://api.bitfinex.com/ws/2"

PING = {"event": "ping", "cid": 123}
pong = json.dumps(PING)

TRADES_QUERY = {"event": "subscribe"
               ,"channel": "trades"
               ,"symbol": "tBTCUSD"}


class bfxwss():
    
    def __init__(self):
        self.producer = KafkaProducer(bootstrap_servers='localhost:9092')
    
    def on_message(self, ws, message):
        #message = json.loads(message)
        print(message)
        if(message[1] != "hb"):
            self.producer.send('btcusd',message.encode('utf-8'))
    
    def on_error(self, ws, error):
        print(error)
    
    def on_close(self, ws):
        print("### closed ###")
    
    def on_open(self, ws):
        ws.send(json.dumps(TRADES_QUERY))

if __name__ == "__main__":
    b = bfxwss()
    websocket.enableTrace(True)
    ws = websocket.WebSocketApp(URL,
                              on_message = b.on_message,
                              on_error = b.on_error,
                              on_close = b.on_close)

    ws.on_open = b.on_open
    ws.run_forever()
