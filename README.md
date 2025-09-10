# Microservicio Híbrido REST y GraphQL

Este proyecto es un microservicio desarrollado en Node.js con Express. La aplicación expone una API híbrida que ofrece puntos de acceso tanto REST como GraphQL, y está construida siguiendo principios de Orientación a Objetos y patrones de diseño como Singleton.

## Características Principales

* **Servidor Express**: Construido con Programación Orientada a Objetos y patrón Singleton.
* **Seguridad**: El acceso a la API está restringido al dominio `example.com`.
* **API REST**: Endpoint para consultar usuarios, documentado con **OpenAPI (Swagger)**.
* **API GraphQL**: Endpoint para consultas flexibles, con una **interfaz interactiva GraphiQL**.
* **Base de Datos**: Persistencia de datos gestionada con el ORM **Prisma** sobre una base de datos **SQLite**.
* **Arquitectura Híbrida**: Ambas APIs (REST y GraphQL) conviven y operan en el mismo servicio.

---

## Empezando

Sigue estas instrucciones para configurar y ejecutar el proyecto en tu entorno local.

### Prerrequisitos

Asegúrate de tener instalado lo siguiente en tu sistema:

* [Node.js] (se recomienda v18.x o superior)
* npm (se instala automáticamente con Node.js)

---

### Instalación y Configuración

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/GerLuna/EjercicioBluetab.git
    cd EjercicioBluetab
    ```

2.  **Instala las dependencias:**
    Este proyecto usa `express-graphql`, que requiere una bandera especial para resolver conflictos de dependencias con versiones más nuevas de `graphql`.
    ```bash
    npm install --legacy-peer-deps
    ```

3.  **Configura las variables de entorno:**
    Crea un archivo `.env` en la raíz del proyecto. Agrega lo siguiente:
    ```env
    # .env
    DATABASE_URL="file:./prisma/dev.db"
    PORT=3000
    ```

4.  **Configura y puebla la base de datos:**
    Estos comandos crearán el archivo de la base de datos SQLite, aplicarán el esquema y la llenarán con datos de prueba.
    ```bash
    # 1. Crear la base de datos y aplicar la migración
    npx prisma migrate dev --name init

    # 2. Poblar la base de datos con usuarios de ejemplo
    npm run prisma:seed
    ```

---

## Ejecutando la Aplicación

### Modo de Desarrollo
Para iniciar el servidor con reinicio automático ante cambios:
```bash
npm run all
```

El servidor estará disponible en http://localhost:3000.

## Probando los Endpoints
Una vez que el servidor esté corriendo, puedes probar las APIs y la base de datos.

API REST
Documentación Interactiva (Swagger):
Abre tu navegador y visita http://localhost:3000/api-docs para ver y probar los endpoints de forma interactiva.

Prueba con cURL:

Bash

# Simula una petición desde un host permitido
1. Consutla Swagger
```
curl -H "Host: localhost:3000" http://localhost:3000/api/users/1
```
Respuesta esperada:

JSON

{"id":1,"name":"Alice"}
2. Consulta GraphQL
```
curl -X POST -H "Content-Type: application/json" -H "Host: localhost:3000" -d "{\"query\": \"{ user(id: \\\"2\\\") { id name } }\"}" http://localhost:3000/graphql
```
Respuesta esperada:

JSON

{"data":{"user":{"id":"2","name":"Bob"}}}

# API GraphQL

Interfaz Interactiva (GraphiQL):

Abre tu navegador y visita http://localhost:3000/graphql. Verás una interfaz donde puedes escribir y ejecutar consultas de GraphQL directamente.

Consulta de ejemplo:

GraphQL
```
query {
  user(id: "2") {
    id
    name
  }
}
```
Respuesta esperada en la interfaz:

JSON

{
  "data": {
    "user": {
      "id": "2",
      "name": "Bob"
    }
  }
}

# Visor de Base de Datos

**Prisma Studio:**

Abre tu navegador y visita http://localhost:5555. Verás una interfaz gráfica para interactuar con tus tablas.
