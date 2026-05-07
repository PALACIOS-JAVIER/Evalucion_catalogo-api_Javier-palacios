# Catalogo API

## 1. Instalación de dependencias

En este proyecto se utiliza NestJS con MongoDB y validación de DTOs.

Instala las dependencias del proyecto:


//npm install

Si arrancas desde cero, instala también estas dependencias importantes:

//npm install @nestjs/config dotenv @nestjs/mongoose mongoose class-validator class-transformer

## 2. Conexión para Bruno con Mongo y Docker

### Docker / Mongo

El proyecto trae un `docker-compose.yaml` con un servicio `db` que usa la imagen oficial de MongoDB.

La configuración es:

- imagen: `mongo`
- puerto local: `27017:27017`
- base de datos inicial: `catalogo-api`
- volumen local: `./mongo:/data/db`

Esto significa que la carpeta `mongo/` en el proyecto guarda los archivos de datos de MongoDB.

Para arrancar Docker:

//docker compose up -d

o si tu sistema usa `docker-compose`:


//docker-compose up -d


### Conexión en el código

La aplicación NestJS se conecta a MongoDB desde `src/app.module.ts` usando `MongooseModule.forRootAsync(...)`.

Se carga `ConfigModule.forRoot({ isGlobal: true })` y se usa la URL:


uri: configService.get<string>('MONGODB_URI', 'mongodb://localhost:27017/catalogo')


Entonces la aplicación intenta leer `MONGODB_URI` desde `.env`, y si no existe usa por defecto:

mongodb://localhost:27017/catalogo

### Ruta base

El archivo `src/main.ts` define el prefijo global:

app.setGlobalPrefix('api');

Por eso todas las rutas deben empezar con `/api`.

Ejemplo de ruta válida para crear categorías:

POST http://localhost:3000/api/categorias

## 3. Estructura por carpetas

### `src/`

Es la carpeta principal del proyecto NestJS.

### `src/app.module.ts`

- Módulo raíz de la aplicación.
- Importa `ConfigModule`, `ServeStaticModule`, `MongooseModule`, `CategoriasModule` y `ProductosModule`.

### `src/main.ts`

- Arranca el servidor Nest.
- Define el prefijo global `api`.
- Escucha el puerto `3000` o el valor de `process.env.PORT`.

### `src/categorias/`

Contiene todo lo necesario para la entidad `Categoria`.

- `categorias.controller.ts` → define las rutas HTTP para categorías.
- `categorias.service.ts` → lógica de negocio de categorías.
- `categorias.module.ts` → registra el módulo y el schema de Mongoose.
- `dto/` → objetos de transferencia de datos:
  - `create-categoria.dto.ts`
  - `update-categoria.dto.ts`
- `entities/` → esquema Mongoose de `Categoria`:
  - `categoria.entity.ts`

### `src/productos/`

Contiene el módulo de productos.

- `productos.controller.ts` → define las rutas HTTP para productos.
- `productos.service.ts` → lógica de productos.
- `dto/` → objetos de transferencia de datos para productos.
- `entities/` → entidad o esquema relacionado a productos.

### `mongo/`

- No es código de NestJS.
- Es la carpeta donde MongoDB guarda los datos cuando levantas Docker.
- No se debe modificar manualmente.

## 4. Notas adicionales

- Si obtienes `404 Not Found` en Bruno, revisa la ruta y recuerda usar el prefijo `/api`.
- Si la ruta es de categorías, usa `/api/categorias`, no `/categoria`.
- Si quieres cambiar la ruta a singular, modifica `@Controller('categorias')` en `src/categorias/categorias.controller.ts`.

---

## 5. Comandos útiles

npm run start:dev    # arranca Nest en modo desarrollo
npm run build        # compila el proyecto
npm run lint         # ejecuta eslint
npm test             # ejecuta pruebas
