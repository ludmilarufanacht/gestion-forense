
# Sistema de Gestión Forense

API REST desarrollada con Node.js, Express y Sequelize
para administrar peritos informáticos.

## Tecnologías
- Node.js
- Express.js
- Sequelize ORM
- SQLite
- PostgreSQL
- Morgan
- Chalk

## Instalación

1. Clonar el repositorio.
2. Ejecutar:

npm install

3. Configurar el archivo .env.
4. Iniciar el servidor:

npm run dev

## Base de datos

Se utiliza SQLite en desarrollo local.
La base de datos se genera automáticamente
en el archivo forensics.db.

## Endpoints

POST /api/v1/peritos
GET /api/v1/peritos
GET /api/v1/peritos/:id
DELETE /api/v1/peritos/:id
