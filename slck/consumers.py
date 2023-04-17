# terminal_app/consumers.py
import json
import os
import subprocess
import shlex
from channels.generic.websocket import AsyncWebsocketConsumer

class TerminalConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        command = text_data_json['command']

        # Split the command and arguments using shlex
        cmd_parts = shlex.split(command)

        # Validate that the command is in the /bin folder
        command_path = os.path.join('/bin', cmd_parts[0])
        if not os.path.exists(command_path):
            await self.send(json.dumps({'output': 'Command not found in /bin'}))
            return

        # Update the command to use the /bin folder and include the parameters
        secure_command = [command_path] + cmd_parts[1:]

        output = await self.run_command(secure_command)
        await self.send(json.dumps({'output': output}))

    async def run_command(self, command):
        process = subprocess.Popen(
            command,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            shell=False,
            text=True,
            bufsize=1,
            close_fds=True
        )
        output = ''
        while True:
            line = process.stdout.readline()
            if not line:
                break
            output += line
        process.stdout.close()

        return output
