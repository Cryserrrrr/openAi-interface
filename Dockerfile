# Utiliser l'image officielle Node.js comme base
FROM node:18

# Créer un répertoire de travail
WORKDIR /openai-interface

# Copier le package.json et le package-lock.json dans le répertoire de travail
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm install

# Copier tout le reste dans le répertoire de travail
COPY . .

# Générer l'application Next.js avant de lancer le serveur
RUN npm run build

# Exposer le port 3000
EXPOSE 3000

# Lancer l'application avec le mode production
CMD ["npm", "run", "dev"]
