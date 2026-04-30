# Etapa 1: Construcción (compilar TypeScript a JavaScript)
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
# Evitamos que husky intente instalar git hooks en el contenedor
RUN npm install --ignore-scripts
COPY . .
RUN npm run build

# Etapa 2: Producción (imagen más ligera)
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
# Solo instalamos dependencias de producción y omitimos scripts
RUN npm install --omit=dev --ignore-scripts
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["npm", "start"]