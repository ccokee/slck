import React, { useState, useEffect, useRef } from "react";
import "./TerminalComponent.css";
import { SLCK_BACKEND_URL } from "./config";

const TerminalComponent = () => {
  const [websocket, setWebsocket] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [outputLines, setOutputLines] = useState([]);
  const [currentCommand, setCurrentCommand] = useState("");
  const terminalOutputRef = useRef();

  useEffect(() => {
    const ws = new WebSocket(`${SLCK_BACKEND_URL}/ws/terminal/`);
    ws.onopen = () => {
      setIsReady(true);
    };
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "output" || data.type === "error") {
        setOutputLines((lines) => [...lines, data.message]);
      }
    };
    ws.onclose = () => {
      setIsReady(false);
    };
    setWebsocket(ws);
    return () => {
      ws.close();
    };
  }, []);

  const executeCommand = () => {
    if (isReady && websocket) {
      const message = {
        type: "execute_command",
        command: currentCommand,
      };
      websocket.send(JSON.stringify(message));
      setCurrentCommand("");
    }
  };

  const sendKeyInput = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
  
      // Split the input into command and arguments
      const input = currentCommand.trim().split(/\s+/);
      const command = input.shift();
      const args = input;
  
      // Send the command and its arguments
      sendCommand(command, args);
  
      // Clear the currentCommand
      setCurrentCommand("");
    } else if (isReady && websocket) {
      websocket.send(
        JSON.stringify({
          type: "key_input",
          key_input: event.key,
        })
      );
    }
  };  
  
  const sendCommand = (command, args) => {
    if (isReady && websocket) {
      websocket.send(
        JSON.stringify({
          type: "command",
          command: command,
          args: args,
        })
      );
    }
  };
  
  const copyText = (event) => {
    event.preventDefault();
    const selection = window.getSelection();
    const selectedText = selection.toString();

    if (selectedText.length > 0) {
      navigator.clipboard.writeText(selectedText).then(
        () => {
          console.log("Text copied to clipboard");
        },
        (err) => {
          console.error("Error copying text: ", err);
        }
      );
    }
  };

  return (
    <div className="terminal">
      <h3>Terminal</h3>
      <div
        className="terminal-output"
        ref={terminalOutputRef}
        onContextMenu={copyText}
        onKeyDown={sendKeyInput}
        contentEditable
      >
        {outputLines.map((line, index) => (
          <pre key={index}>{line}</pre>
        ))}
        <pre className="terminal-prompt">
          {" "}
          &gt; <span>{currentCommand}</span>
          <span className="blinking-cursor">|</span>
        </pre>
      </div>
    </div>
  );
};

export default TerminalComponent;
