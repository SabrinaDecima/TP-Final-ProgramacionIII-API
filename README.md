# gym-api

## Tech stack: Node, Express and SQLite

## Rutas de la API

### Usuarios

- `POST /register` — Registra un nuevo usuario. (Por defecto rol 'member' roleId: 3)
  - Ejemplo body:
    ```json
    {
      "name": "Juan",
      "lastname": "Pérez",
      "email": "juan@mail.com",
      "password": "123456"
    }
    ```
- `POST /login` — Inicia sesión y retorna token y datos del usuario.
  - Ejemplo body:
    ```json
    {
      "email": "juan@mail.com",
      "password": "123456"
    }
    ```
- `GET /users` — Obtiene todos los usuarios.
- `PUT /users/:id/role` — Modifica el rol de un usuario (requiere body: `{ "roleId": <nuevoId> }`).
  - Ejemplo body:
    ```json
    {
      "roleId": 2
    }
    ```

### Clases de Gimnasio

- `GET /clases` — Lista todas las clases.
- `GET /clases/:id` — Obtiene una clase por su id.
- `POST /clases` — Crea una nueva clase.
  - Ejemplo body:
    ```json
    {
      "name": "Yoga",
      "description": "Clase de yoga para principiantes",
      "instructor": "Ana",
      "durationMinutes": "45",
      "imageUrl": "https://url.com"
    }
    ```
- `PUT /clases/:id` — Modifica una clase existente.
  - Ejemplo body:
    ```json
    {
      "name": "Yoga",
      "description": "Clase de yoga para principiantes",
      "instructor": "Ana",
      "durationMinutes": "45",
      "imageUrl": "https://url.com"
    }
    ```
- `DELETE /clases/:id` — Elimina una clase por su id.
- Ejemplo body:
  ```json
  {
    "id": 2
  }
  ```
