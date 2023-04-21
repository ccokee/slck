# SLCK Terminal Component (Angular)

This README explains how to use the SLCK Terminal Component in an Angular application. The component must be instantiated in an external web application, and it requires specifying the correct WebSocket backend endpoint.

## Installation

1. Ensure that `ngx-socket-io` is added to your project.

2. Modify the WebSocket configuration in the component to match your SLCK backend.

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

## Integration

To integrate the SLCK Terminal Component into your Angular application, follow these steps:

1. Import the `TerminalComponent`:

```typescript
import { TerminalComponent } from './path/to/terminal/terminal.component';
```

2. Include the component in your Angular component's template:

```html
<app-terminal-component></app-terminal-component>
```

## Configuration

The SLCK Terminal Component requires the WebSocket backend endpoint to be specified during the component instantiation. The `url` value in the `SocketIoConfig` object should be set to the correct WebSocket backend endpoint. For example:

```typescript
const config: SocketIoConfig = { url: 'ws://your-backend-url:10443', options: {} };
```

Replace `your-backend-url` with the WebSocket backend URL you want to use.

## Usage

After integrating the SLCK Terminal Component, you can interact with the terminal by typing commands and pressing Enter. The terminal will send the command to the WebSocket backend and display the output received from the backend.