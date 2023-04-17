import json
import os
import subprocess
import shlex
from channels.generic.websocket import AsyncWebsocketConsumer

class TerminalConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.process = None
        await self.accept()

    async def disconnect(self, close_code):
        if self.process and not self.process.poll():
            self.process.terminate()

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message_type = text_data_json.get('type')

        if message_type == 'execute_command':
            command = text_data_json.get('command')
            args = text_data_json.get('args', [])

            await self.execute_command(command, *args)
        elif message_type == 'key_input':
            key_input = text_data_json.get('key_input')
            if self.process and not self.process.poll():
                os.write(self.process.stdin.fileno(), key_input.encode())

    async def execute_command(self, command, *args):
        if self.process and not self.process.poll():
            await self.send_error('A command is already running.')
            return

        cmd = os.path.join('/bin', command)
        if not os.path.isfile(cmd):
            await self.send_error(f"Command '{command}' not found.")
            return

        cmd_with_args = shlex.split(cmd) + list(args)
        self.process = subprocess.Popen(cmd_with_args, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

        while self.process.poll() is None:
            stdout_line = self.process.stdout.readline().decode()
            if stdout_line:
                await self.send_output(stdout_line)

            stderr_line = self.process.stderr.readline().decode()
            if stderr_line:
                await self.send_error(stderr_line)

    async def send_output(self, message):
        await self.send(json.dumps({'type': 'output', 'message': message}))

    async def send_error(self, message):
        await self.send(json.dumps({'type': 'error', 'message': message}))