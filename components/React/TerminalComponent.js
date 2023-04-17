// TerminalComponent.js
import React, { useState } from 'react';

const TerminalComponent = () => {
  const [output, setOutput] = useState('');
  const [command, setCommand] = useState('');

  const socket = new WebSocket('ws://localhost:10443/ws/terminal/');

  const handleCommandChange = (e) => {
    setCommand(e.target.value);
  };

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    socket.send(JSON.stringify({ command: command }));
    setCommand('');
  };

  socket.onmessage = (e) => {
    const data = JSON.parse(e.data);
    setOutput((prevOutput) => prevOutput + data.output);
  };

  return (
    <div>
      <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '200px', padding: '16px' }}>
        <pre>{output}</pre>
      </div>
      <form onSubmit={handleCommandSubmit}>
        <input
          type="text"
          value={command}
          onChange={handleCommandChange}
          style={{ width: '100%', marginTop: '8px' }}
          placeholder="Enter command"
        />
      </form>
    </div>
  );
};

export default TerminalComponent;
