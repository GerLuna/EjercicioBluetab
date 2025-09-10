## Microservicio Híbrido REST y GraphQL ##
Este proyecto es un microservicio desarrollado en Node.js y Express como parte de un ejercicio técnico. La aplicación expone una API híbrida que ofrece puntos de acceso tanto REST como GraphQL, y está construida siguiendo principios de Orientación a Objetos y patrones de diseño como Singleton.

## Características Principales ##
Servidor Express: Construido con Programación Orientada a Objetos.

Patrón Singleton: La instancia del servidor es única y se gestiona mediante el patrón Singleton.

Seguridad: El acceso a la API está restringido a un dominio específico.

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

git clone https://github.com/GerLuna/EjercicioBluetab.git

cd EjercicioBluetab

Instala las dependencias del proyecto:

Bash

npm install

Configura las variables de entorno:

Crea el archivo .env


# .env
DATABASE_URL="file:./prisma/dev.db"

PORT=3000


Configura y puebla la base de datos:

Estos comandos crearán la base de datos SQLite y la llenarán con datos de prueba.

# Crea el archivo de la base de datos y aplica el esquema
Bash

npx prisma migrate dev --name init

# Puebla la base de datos con usuarios de ejemplo
Bash

npm run prisma:seed

npm run dev

El servidor estará disponible en http://localhost:3000.

# Probando los Endpoints
Una vez que el servidor esté corriendo, puedes probar las APIs de la siguiente manera.

API REST

Documentación Interactiva (Swagger):

Abre tu navegador y visita http://localhost:3000/api-docs para ver y probar los endpoints.

Prueba con cURL:

# Simula una petición desde un host permitido
Bash

curl -H "Host: localhost:3000" http://localhost:3000/api/users/1

Respuesta esperada:

JSON

{"id":1,"name":"Alice"}

API GraphQL

Debido a la implementación manual para máxima estabilidad, no hay una interfaz gráfica. Usa el siguiente comando curl para probarla.

Prueba con cURL:

Para Windows (cmd.exe)

Bash

curl -X POST -H "Content-Type: application/json" -H "Host: localhost:3000" -d "{\"query\": \"{ user(id: \\\"2\\\") { id name } }\"}" http://localhost:3000/graphql

Respuesta esperada:

JSON

{"data":{"user":{"id":"2","name":"Bob"}}}
