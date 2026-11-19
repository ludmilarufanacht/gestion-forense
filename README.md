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
2. Ejecutar `npm install`.
3. Copiar `.env.example` como `.env`.
4. Iniciar en modo desarrollo: `npm run dev`.
5. La API queda disponible en `http://localhost:3000`.

### SQLite local

El proyecto usa SQLite cuando `DB_DIALECT=sqlite`. El archivo predeterminado es
`forensics.db`. Al iniciar, Sequelize crea las tablas y carga los roles y usuarios
de prueba si todavía no existen.

### PostgreSQL con Docker

1. Configurar en `.env`:

```env
DB_DIALECT=postgres
DB_HOST=localhost
DB_PORT=5432
DB_NAME=gestion_forense
DB_USER=forense
DB_PASSWORD=forense
```

2. Crear el contenedor:

```bash
docker compose up -d
```

3. Comprobar el estado:

```bash
docker compose ps
```

4. Iniciar la API con `npm run dev`.

Para detener PostgreSQL: `docker compose down`. Para borrar también los datos:
`docker compose down -v`.

## Base de datos

Se utiliza SQLite en desarrollo local.
La base de datos se genera automáticamente
en el archivo forensics.db.

## Endpoints

POST /api/v1/peritos
GET /api/v1/peritos
GET /api/v1/peritos/:id
DELETE /api/v1/peritos/:id

## Auditoría

Los errores de acceso `401`, `403` y `404` se muestran en consola con Chalk
y se guardan en la tabla `audit_logs`. La tabla registra el método, la ruta,
el estado HTTP, el mensaje y la IP del intento.