async def receive(self, text_data):
    text_data_json = json.loads(text_data)
    command = text_data_json['command']

    # Validate that the command is in the /bin folder
    command_path = os.path.join('/bin', command.split()[0])
    if not os.path.exists(command_path):
        await self.send(json.dumps({'output': 'Command not found in /bin'}))
        return

    # Update the command to use the /bin folder
    command = f"{command_path} {' '.join(command.split()[1:])}"