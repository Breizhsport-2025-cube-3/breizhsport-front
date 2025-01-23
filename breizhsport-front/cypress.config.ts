import { defineConfig } from "cypress";

export default defineConfig({
  video: true, // Active l'enregistrement vidéo
  screenshotsFolder: 'cypress/screenshots', // Dossier des captures d'écran
  videosFolder: 'cypress/videos', // Dossier des vidéos
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});