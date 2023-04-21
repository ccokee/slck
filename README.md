# SLCK

SLCK is a secure execution environment that generates endpoints for any binary under `/bin`, creating WebSocket connections that can be used with frontend components for React, Vue.js, or Angular. It allows users to interact with command-line applications in a browser-based terminal, providing a convenient and secure way to run commands remotely.

## Features

- Secure execution environment for binaries under `/bin`.
- WebSocket-based communication between the frontend and backend.
- Frontend components available for React, Vue.js, and Angular.
- Easy to integrate into existing web applications.
- Customizable to support other binary directories.

## Prerequisites

Before you get started, make sure you have the following installed:

- Docker
- Python 3.9+
- Node.js and npm (for frontend development)

## Backend Setup

1. Clone the repository and navigate to the project root directory.

2. Create a virtual environment for the Django project:

```bash
python -m venv venv
source venv/bin/activate
```

3. Install the required Python packages:

```bash
pip install -r requirements.txt
```

4. Set the `COMMAND_DIRS` environment variable to a semicolon-separated list of directories containing the binaries you want to expose:

```bash
export COMMAND_DIRS="/usr/bin;/usr/sbin;/usr/local/bin;/usr/local/sbin;/bin;/sbin"
```

5. Run the Django development server:

```bash
python manage.py runserver
```

The backend should now be running on `http://localhost:8000`.

## Frontend Setup

You can choose from three different frontend components: React, Vue.js, or Angular. Follow the instructions below for the frontend you want to use.

### React

1. Navigate to the React project directory and install the required npm packages:

```bash
cd react-app
npm install
```

2. Start the React development server:

```bash
npm start
```

The React app should now be running on `http://localhost:3000`.

### Vue.js

1. Navigate to the Vue.js project directory and install the required npm packages:

```bash
cd vue-app
npm install
```

2. Start the Vue.js development server:

```bash
npm run serve
```

The Vue.js app should now be running on `http://localhost:8080`.

### Angular

1. Navigate to the Angular project directory and install the required npm packages:

```bash
cd angular-app
npm install
```

2. Start the Angular development server:

```bash
ng serve
```

The Angular app should now be running on `http://localhost:4200`.

## Docker Deployment

1. Build the Docker image:

```bash
docker build -t slck .
```

2. Run the Docker container with the desired volumes mounted and the `COMMAND_DIRS` environment variable set:

```bash
docker run -it -p 8000:8000 \
  -v /usr/bin:/usr/bin \
  -v /usr/sbin:/usr/sbin \
  -v /usr/local/bin:/usr/local/bin \
  -v /usr/local/sbin:/usr/local/sbin \
  -v /bin:/bin \
  -v /sbin:/sbin \
  -e COMMAND_DIRS="/usr/bin;/usr/sbin;/usr/local/bin;/usr/local/sbin;/bin;/sbin" \
  slck
```

The Django backend should now be running inside a Docker container, and the frontend components can connect to it as usual.

## Usage

1. Open the frontend app in your browser (React, Vue.js, or Angular).

2. The terminal component should be displayed, and you can enter commands in the input field.

3. Press `Enter` to execute the command. The output will be displayed in the terminal area above the input field. You can scroll horizontally and vertically to view the full output.

4. To copy the text from the terminal output, simply select the text you want to copy and right-click to open the context menu. Choose "Copy" to copy the selected text to your clipboard.

5. The terminal component is interactive, allowing you to send keypress events to the backend for executing commands. This enables you to use command-line applications that require user input, such as text editors or interactive command-line utilities.

6. To run a command with arguments, simply enter the command followed by its arguments in the input field, separated by spaces. For example, to run the `ls` command with the `-al` argument, enter `ls -al` and press `Enter`.

## Customization

SLCK can be easily customized to suit your needs. You can extend the functionality by adding support for additional binary directories, modifying the frontend components, or adding new features to the Django backend.

To add support for additional binary directories, update the `COMMAND_DIRS` environment variable in the backend setup and the Docker deployment instructions with the new directories.

If you want to modify the frontend components, you can make changes to the React, Vue.js, or Angular project files as needed. The components are designed to be flexible and can be easily integrated into existing web applications.

For further customization of the backend, modify the Django code to add new features or make changes to the existing WebSocket implementation.

## Contributing

Contributions to SLCK are welcome! If you'd like to contribute, please follow the standard GitHub workflow: fork the repository, create a new branch, make your changes, and submit a pull request. Make sure to follow the existing code style and provide clear, concise commit messages.

## License

SLCK is released under the MIT License. See the `LICENSE` file for more information.