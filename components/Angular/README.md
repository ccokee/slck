# FILES MUST BE INCLUDED AND CODE MUST BE ADDED FIRST TO THE PROJECT
## Ensure to add ngx-socket-io to your project
## Modify the websocket in the component so it matches your slck backend
```ts
// src/app/app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```