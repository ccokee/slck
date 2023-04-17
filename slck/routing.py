# routing.py
from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path
from terminal_app import consumers

application = ProtocolTypeRouter({
    'websocket': URLRouter([
        path('ws/terminal/', consumers.TerminalConsumer.as_asgi()),
    ]),
})