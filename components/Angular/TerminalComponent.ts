import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-terminal-component',
  templateUrl: './terminal-component.component.html',
  styleUrls: ['./terminal-component.component.css']
})
export class TerminalComponentComponent implements OnInit, OnDestroy {
  websocket: WebSocket;
  isReady = false;
  outputLines: string[] = [];
  currentCommand = '';

  @ViewChild('terminalOutput') terminalOutput: ElementRef;

  constructor() { }

  ngOnInit(): void {
    this.websocket = new WebSocket('ws://localhost:8000/ws/terminal/');
    this.websocket.onopen = () => {
      this.isReady = true;
    };
    this.websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'output' || data.type === 'error') {
        this.outputLines.push(data.message);
      }
    };
    this.websocket.onclose = () => {
      this.isReady = false;
    };
  }

  ngOnDestroy(): void {
    this.websocket.close();
  }
  
  sendCommand(command: string, args: string[]): void {
    if (this.isReady && this.websocket) {
      this.websocket.send(
        JSON.stringify({
          type: "command",
          command: command,
          args: args,
        })
      );
    }
  }

  sendKeyInput(event: KeyboardEvent): void {
    if (event.key === "Enter") {
      event.preventDefault();
  
      // Split the input into command and arguments
      const input = this.currentCommand.trim().split(/\s+/);
      const command = input.shift();
      const args = input;
  
      // Send the command and its arguments
      this.sendCommand(command, args);
  
      // Clear the currentCommand
      this.currentCommand = "";
    } else if (this.isReady && this.websocket) {
      this.websocket.send(
        JSON.stringify({
          type: "key_input",
          key_input: event.key,
        })
      );
    }
  }  

  copyText(event: MouseEvent): void {
    event.preventDefault();
    const selection = window.getSelection();
    const selectedText = selection.toString();

    if (selectedText.length > 0) {
      navigator.clipboard.writeText(selectedText).then(
        () => {
          console.log('Text copied to clipboard');
        },
        (err) => {
          console.error('Error copying text: ', err);
        }
      );
    }
  }
}
