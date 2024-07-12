# Usar una imagen de Node.js 20 como base
FROM node:20

# Establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar el package.json y el package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de la aplicación
COPY . .

# Construir la aplicación
RUN npm run build

# Instalar el servidor HTTP estático para servir la aplicación
RUN npm install -g serve

# Exponer el puerto
EXPOSE 3000

# Comando para ejecutar la aplicación en producción
CMD ["serve", "-s", "build", "-l", "3000"]
