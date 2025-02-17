# syntax=docker/dockerfile:1

ARG NODE_VERSION=20

################################################################################
# 1️⃣ Build Stage: Compile l'application Angular
################################################################################
FROM node:${NODE_VERSION}-alpine AS build

# Définir le répertoire de travail
WORKDIR /usr/src/app

# Copier les fichiers nécessaires pour installer les dépendances
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers (y compris les assets)
COPY . .

# Copier les assets pour s'assurer qu'ils sont inclus dans le build
COPY src/assets /usr/src/app/src/assets

# Construire l'application Angular
RUN npm run build --prod

################################################################################
# 2️⃣ Final Stage: Utiliser Nginx pour servir l'application
################################################################################
FROM nginx:alpine AS final

# Copier les fichiers de build Angular vers le dossier de Nginx
COPY --from=build /usr/src/app/dist/breizhsport-front/browser /usr/share/nginx/html/

# Copier les assets (images, icônes...) vers le bon dossier de Nginx
COPY --from=build /usr/src/app/src/assets /usr/share/nginx/html/assets

# Modifier les permissions pour éviter les erreurs d'accès
RUN chown -R nginx:nginx /usr/share/nginx/html

# Copier un fichier de configuration Nginx personnalisé
COPY nginx.conf /etc/nginx/nginx.conf

# Exposer le port 80 (ou 4200 si nécessaire)
EXPOSE 80

# Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]
