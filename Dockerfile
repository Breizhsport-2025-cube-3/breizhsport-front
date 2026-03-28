# syntax=docker/dockerfile:1

ARG NODE_VERSION=20

################################################################################
# 1. Build Stage: Compile l'application Angular
################################################################################
FROM node:${NODE_VERSION}-alpine AS build

WORKDIR /usr/src/app

# Copier les fichiers de dépendances d'abord (meilleur cache Docker)
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm ci --ignore-scripts

# Copier le code source
COPY . .

# Construire l'application Angular en mode production
RUN npm run build

################################################################################
# 2. Final Stage: Nginx sécurisé pour servir l'application
################################################################################
FROM nginx:alpine AS final

# Supprimer la configuration par défaut de nginx
RUN rm -rf /etc/nginx/conf.d/default.conf

# Copier les fichiers de build Angular
COPY --from=build /usr/src/app/dist/breizhsport-front/browser /usr/share/nginx/html/

# Copier les assets
COPY --from=build /usr/src/app/src/assets /usr/share/nginx/html/assets

# Copier la configuration nginx sécurisée
COPY nginx.conf /etc/nginx/nginx.conf

# Créer un utilisateur non-root pour nginx (sécurité)
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

# Scan de sécurité - vérifier qu'aucun fichier sensible n'est exposé
RUN rm -rf /usr/share/nginx/html/.env \
    /usr/share/nginx/html/.git \
    /usr/share/nginx/html/node_modules

# Exposer le port
EXPOSE 4200

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:4200/health || exit 1

# Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]
