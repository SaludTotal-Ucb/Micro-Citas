# Imagen base de Node
FROM node:20-alpine

# Carpeta de trabajo dentro del contenedor
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el código
COPY . .

# Compilar NestJS (esto genera la carpeta 'dist')
RUN npm run build

# Abrir el puerto 3000 (el puerto por defecto de NestJS)
EXPOSE 3000

RUN ls -la dist/index.js || echo "ALERTA: No se encontro el archivo index.js"


# Comando para ejecutar la app compilada
CMD ["node", "dist/index.js"]