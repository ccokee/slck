# SLCK Terminal Component (React)

This README explains how to use the SLCK Terminal Component in a React application. The component must be instantiated in an external web application, and it requires specifying the correct WebSocket backend endpoint.

## Installation

1. Add the `TerminalComponent.js` and `TerminalComponent.css` files to your project.

2. Modify the WebSocket configuration in the component to match your SLCK backend by updating the `config.js` file.

## Configuration

Create a `config.js` file in the root of your project and define the `SLCK_BACKEND_URL` environment variable. This file allows you to set the WebSocket backend URL for your application.

```javascript
// config.js
const SLCK_BACKEND_URL = 'ws://your-backend-url:8000';

export { SLCK_BACKEND_URL };
```

Replace `your-backend-url` with the WebSocket backend URL you want to use.

## Integration

To integrate the SLCK Terminal Component into your React application, follow these steps:

1. Import the `TerminalComponent`:

```javascript
import TerminalComponent from './path/to/components/TerminalComponent';
```

2. Include the component in your React component's render method:

```jsx
function App() {
  return (
    <div className="App">
      <h1>Terminal</h1>
      <TerminalComponent />
    </div>
  );
}
```

## Usage

After integrating the SLCK Terminal Component, you can interact with the terminal by typing commands and pressing Enter. The terminal will send the command to the WebSocket backend and display the output received from the backend.