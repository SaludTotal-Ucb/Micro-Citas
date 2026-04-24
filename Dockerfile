# --- Etapa de Build ---
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias primero para aprovechar el cache de capas
COPY package*.json ./
RUN npm ci

# Copiar el resto del código y construir
COPY . .
RUN npm run build

# --- Etapa de Producción ---
FROM node:20-alpine

WORKDIR /app

# Instalar solo dependencias de producción
COPY package*.json ./
RUN npm ci --omit=dev --ignore-scripts

# Copiar los archivos construidos desde la etapa anterior
COPY --from=builder /app/dist ./dist

# Configurar usuario no-root por seguridad
USER node

EXPOSE 3000

CMD ["node", "dist/index.js"]