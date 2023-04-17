<template>
  <v-card class="terminal">
    <v-card-text>
      <div class="output" ref="output"></div>
      <v-text-field
        ref="input"
        solo
        hide-details
        label="Enter command"
        @keydown.enter="sendCommand"
      ></v-text-field>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      socket: null,
    };
  },
  mounted() {
    this.connectSocket();
  },
  beforeDestroy() {
    if (this.socket) {
      this.socket.close();
    }
  },
  methods: {
    connectSocket() {
      this.socket = new WebSocket('wss://odin-shell-mod:10443/ws/terminal/');
      this.socket.addEventListener('message', (event) => {
        const data = JSON.parse(event.data);
        this.$refs.output.innerHTML += `<pre>${data.output}</pre>`;
      });
    },
    sendCommand() {
      const command = this.$refs.input.value;
      this.socket.send(JSON.stringify({ command: command }));
      this.$refs.input.value = '';
    },
  },
};
</script>

<style scoped>
.terminal {
  /* Add any custom styles for the terminal component */
}
</style>