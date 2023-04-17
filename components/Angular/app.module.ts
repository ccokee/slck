<!-- src/app/terminal/terminal.component.html -->
<div>
  <div style="background-color: #000; color: #fff; min-height: 200px; padding: 16px;">
    <pre>{{ output }}</pre>
  </div>
  <form (submit)="onCommandSubmit($event)">
    <input
      type="text"
      [(ngModel)]="command"
      (ngModelChange)="onCommandChange($event)"
      style="width: 100%; margin-top: 8px;"
      placeholder="Enter command"
    />
  </form>
</div>

// src/app/app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppComponent } from './app.component';
import { TerminalComponent } from './terminal/terminal.component';

const config: SocketIoConfig = { url: 'ws://localhost:10443', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    TerminalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }