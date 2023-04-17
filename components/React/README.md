# FILES MUST BE ADDED IN PLACE TO YOUR PROJET
## Please ensure to include in your app
## Modify the websocket in the component so it matches your slck backend
```ts
// App.js
import React from 'react';
import TerminalComponent from './TerminalComponent';

function App() {
  return (
    <div className="App">
      <h1>Terminal</h1>
      <TerminalComponent />
    </div>
  );
}

export default App;
```