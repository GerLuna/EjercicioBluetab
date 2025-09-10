## Microservicio Híbrido REST y GraphQL ##
Este proyecto es un microservicio desarrollado en Node.js y Express como parte de un ejercicio técnico. La aplicación expone una API híbrida que ofrece puntos de acceso tanto REST como GraphQL, y está construida siguiendo principios de Orientación a Objetos y patrones de diseño como Singleton.

## Características Principales ##
Servidor Express: Construido con Programación Orientada a Objetos.

Patrón Singleton: La instancia del servidor es única y se gestiona mediante el patrón Singleton.

Seguridad: El acceso a la API está restringido a un dominio específico (example.com).

API REST: Incluye un endpoint para consultar usuarios, documentado con OpenAPI (Swagger).

API GraphQL: Proporciona un endpoint para consultas flexibles de datos de usuario.

Base de Datos: Persistencia de datos gestionada con el ORM Prisma sobre una base de datos SQLite.

Arquitectura Híbrida: Ambas APIs (REST y GraphQL) conviven y operan en el mismo servicio.

## Empezando ##
Sigue estas instrucciones para levantar el proyecto en tu entorno local.

Prerrequisitos
Asegúrate de tener instalado lo siguiente en tu sistema:

Node.js (se recomienda v18.x o superior)

npm (se instala automáticamente con Node.js)

## Instalación y Configuración ##
Clona el repositorio:

Bash

git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_PROYECTO>
Instala las dependencias del proyecto:

Bash

npm install
Configura las variables de entorno:
Crea una copia del archivo de ejemplo .env.example y renómbrala a .env.

Bash

# En Windows (cmd)
copy .env.example .env

# En Linux/macOS
cp .env.example .env
Nota: Si no tienes un .env.example, créalo con el siguiente contenido:

Fragmento de código

# .env.example
DATABASE_URL="file:./prisma/dev.db"
PORT=3000
Configura y puebla la base de datos:
Estos comandos crearán la base de datos SQLite y la llenarán con datos de prueba.

Bash

# Crea el archivo de la base de datos y aplica el esquema
npx prisma migrate dev --name init

# Puebla la base de datos con usuarios de ejemplo
npm run prisma:seed
(Si usaste un nombre de script diferente para el seeder en tu package.json, ajústalo aquí).

🏃‍♀️ Ejecutando la Aplicación
Modo de Desarrollo
Para iniciar el servidor en modo de desarrollo con reinicio automático ante cambios:

Bash

npm run dev
El servidor estará disponible en http://localhost:3000.

Modo de Producción
Para construir la versión de producción y ejecutarla:

Bash

# 1. Compila el código de TypeScript a JavaScript
npm run build

# 2. Inicia el servidor desde los archivos compilados en /dist
npm start
Probando los Endpoints
Una vez que el servidor esté corriendo, puedes probar las APIs de la siguiente manera.

API REST
Documentación Interactiva (Swagger):
Abre tu navegador y visita http://localhost:3000/api-docs para ver y probar los endpoints.

Prueba con cURL:

Bash

# Simula una petición desde un host permitido
curl -H "Host: localhost:3000" http://localhost:3000/api/users/1
Respuesta esperada:

JSON

{"id":1,"name":"Alice"}
API GraphQL
Prueba con cURL:
Debido a la implementación manual para máxima estabilidad, no hay una interfaz gráfica. Usa el siguiente comando curl para probarla.

Bash

# Para Windows (cmd.exe)
curl -X POST -H "Content-Type: application/json" -H "Host: localhost:3000" -d "{\"query\": \"{ user(id: \\\"2\\\") { id name } }\"}" http://localhost:3000/graphql

Respuesta esperada:

JSON

{"data":{"user":{"id":"2","name":"Bob"}}}
