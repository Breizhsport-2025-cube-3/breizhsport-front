import { defineConfig } from "cypress";

export default defineConfig({
  video: true, // Active l'enregistrement vidéo
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});