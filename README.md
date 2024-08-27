# Administrador de Invitados para Asado

Este repositorio contiene el código de una aplicación SPA (Single Page Application) desarrollada con Angular (versión 18) para administrar personas que asisten a un asado y calcular el total de dinero recolectado por los participantes confirmados. La aplicación está acompañada por un backend en Express.js. 

## Descripción

La aplicación permite a los usuarios:
- Administrar una lista de invitados para un evento de asado.
- Confirmar la asistencia de los invitados.
- Ver el total de dinero recolectado de los participantes confirmados.

**Nota:** La aplicación comienza con un usuario ya logueado. El proceso de validación y verificación de usuario queda fuera del scope de este proyecto. 

### Vistas principales de la aplicación

1. **Invitados**: Muestra una lista de todos los invitados.
2. **Confirmados**: Muestra una lista de los invitados confirmados y el total de dinero recolectado.
3. **Edición de Invitado**: Permite editar los detalles de un invitado específico.

### Backend

El backend está desarrollado en Express.js. Por cuestiones de alcance, la persistencia de datos está fuera del scope del proyecto, por lo que todos los datos se manejan de forma local.

## Estructura del Proyecto

El repositorio está dividido en dos carpetas principales:

- `guest-management-front/`: Contiene la aplicación Angular.
- `guest-management-back/`: Contiene el servidor Express.js.

## Requisitos

Para ejecutar este proyecto, necesitas tener instalados:

- Node.js (versión 22 o superior)
- npm (versión 10 o superior)
- Angular CLI (versión 18 o superior)

## Instalación

1. **Clonar el repositorio:**
   ```
   git clone https://github.com/mcarolinadiaz/guest-management.git
   cd guest-management

2. **Instalar dependencias para el frontend**
    ```
    cd guest-management-front
    npm install

3. **Instalar dependencias para el backend**
    ```
    cd guest-management-back
    npm install

## Ejecucación

### Frontend
    ```
    cd guest-management-front
    ng serve

### Backend
    ```
    cd guest-management-back
    npm start

## Testing

### Frontend
Los tests unitarios para los componentes de Angular (Card, Edit, ConfirmGuest) están implementados con Jasmine.
Para ejecutar los tests:
    ```
    ng test

### Backend
Los tests unitarios para el backend de Express están implementados con Chai, Supertest y Mocha. Para ejecutar los tests:
    ```
    npm test