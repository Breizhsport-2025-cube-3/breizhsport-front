import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideServerRoutesConfig } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { provideHttpClient } from '@angular/common/http'; // <-- Importez provideHttpClient

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideServerRoutesConfig(serverRoutes),
    provideHttpClient(), // <-- Ajoutez provideHttpClient ici
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);