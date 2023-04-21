<template>
  <div class="terminal">
    <h3>Terminal</h3>
    <div
      ref="terminalOutput"
      class="terminal-output"
      @contextmenu.prevent="copyText"
      @keydown="sendKeyInput"
      contenteditable
    >
      <pre v-for="(line, index) in outputLines" :key="index">{{ line }}</pre>
      <pre
        class="terminal-prompt"
      >> <span>{{ currentCommand }}</span><span class="blinking-cursor">|</span></pre>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import { SLCK_BACKEND_URL } from "@/config";

export default {
  setup() {
    const websocket = ref(null);
    const isReady = ref(false);
    const outputLines = ref([]);
    const currentCommand = ref("");
    const terminalOutput = ref(null);

    onMounted(() => {
      const ws = new WebSocket(`${SLCK_BACKEND_URL}/ws/terminal/`);
      ws.onopen = () => {
        isReady.value = true;
      };
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === "output" || data.type === "error") {
          outputLines.value.push(data.message);
        }
      };
      ws.onclose = () => {
        isReady.value = false;
      };
      websocket.value = ws;
    });

    onUnmounted(() => {
      if (websocket.value) {
        websocket.value.close();
      }
    });

    const sendKeyInput = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();

        // Split the input into command and arguments
        const input = currentCommand.value.trim().split(/\s+/);
        const command = input.shift();
        const args = input;

        // Send the command and its arguments
        sendCommand(command, args);

        // Clear the currentCommand
        currentCommand.value = "";
      } else if (isReady.value && websocket.value) {
        websocket.value.send(
          JSON.stringify({
            type: "key_input",
            key_input: event.key,
          })
        );
      }
    };

    const copyText = (event) => {
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
    const sendCommand = (command, args) => {
      if (isReady.value && websocket.value) {
        websocket.value.send(
          JSON.stringify({
            type: "command",
            command: command,
            args: args,
          })
        );
      }
    };
    return {
      terminalOutput,
      isReady,
      outputLines,
      currentCommand,
      sendKeyInput,
      copyText,
      websocket: null,
      isReady: false,
      outputLines: [],
      currentCommand: "",
      terminalOutput: null,
    };
  },
};
</script>

<style>
.terminal {
  width: 100%;
  height: 100%;
}

.terminal-output {
  overflow: auto;
  height: calc(
    100% - 56px
  ); /* Adjust the height based on the space for the input and title */
  white-space: pre-wrap;
  word-wrap: break-word;
}

.terminal-output:focus {
  outline: none;
  caret-color: black;
}

.terminal-prompt {
  display: inline;
}

.blinking-cursor {
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  from,
  to {
    color: transparent;
  }
  50% {
    color: black;
  }
}
</style>
