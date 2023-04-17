// src/app/terminal/terminal.component.ts
import { Component } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css']
})
export class TerminalComponent {
  output: string = '';
  command: string = '';

  constructor(private socket: Socket) {
    this.socket.on('message', (data) => {
      this.output += data.output;
    });
  }

  onCommandChange(event: any) {
    this.command = event.target.value;
  }

  onCommandSubmit(event: any) {
    event.preventDefault();
    this.socket.emit('message', JSON.stringify({ command: this.command }));
    this.command = '';
  }
}