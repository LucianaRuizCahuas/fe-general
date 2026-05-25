# Actualización Angular → React

Este ZIP fue actualizado tomando `fe-actual.zip` como base y dejándolo con el mismo orden del proyecto React anterior.

## Estructura aplicada
- `src/api`: servicios Axios para backend.
- `src/types`: interfaces TypeScript.
- `src/layouts`: Header, Footer y layout principal.
- `src/pages`: vistas principales y administración.
- `src/router`: rutas protegidas.
- `src/assets`: imágenes originales del proyecto Angular.

## Rutas migradas
- `/` Home
- `/clientes` CRUD Clientes
- `/tour` CRUD Paquetes Turísticos
- `/login` Login
- `/register` Registro
- `/dashboard` Dashboard protegido
- `/admin` Panel admin protegido

## URLs backend preservadas desde el proyecto actual
Archivo: `src/api/environment.ts`

```ts
customerApiUrl: 'http://localhost:8086/v1/api/customer'
tourApiUrl: 'http://54.145.188.91:8086/v1/api/tour-packages'
```

## Credenciales locales
- Admin: `admin` / `admin123`
- Usuario: `user` / `user123`
