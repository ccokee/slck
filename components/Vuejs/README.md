# FILES MUST BE ADDED IN PLACE TO YOUR PROJET
## Please ensure to include in your app
## Modify the websocket in the component so it matches your slck backend
```vue
<!-- src/App.vue -->
<template>
  <v-app>
    <v-main>
      <v-container>
        <h1>Terminal</h1>
        <TerminalComponent />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import TerminalComponent from './components/TerminalComponent.vue';

export default {
  components: {
    TerminalComponent,
  },
};
</script>
```