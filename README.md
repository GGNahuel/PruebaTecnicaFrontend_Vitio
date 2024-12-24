# To-Do App

## Instrucciones para ejecutar la aplicación

### Herramientas necesarias

Para que los comandos funcionen correctamente, debe tener las siguientes herramientas instaladas en su máquina:

- **Node.js** (versión 16 o superior): [Descargar Node.js](https://nodejs.org/), esto te permitirá ejecutar los comandos *npm*.
- **Git**: [Descargar Git](https://git-scm.com/)

Verifique que las herramientas están correctamente instaladas ejecutando los siguientes comandos:

```bash
node -v   # Debería mostrar la versión de Node.js
npm -v    # Debería mostrar la versión de npm
git --version  # Debería mostrar la versión de Git
```

### 1. Clonar el repositorio
Teniendo esas herramientas se debe clonar el repositorio en el equipo local. Para esto primero verifique que la ruta de la terminal esté ubicada donde quiere alojar el proyecto, luego ya puede clonarlo con el siguiente comando:

```
git clone https://github.com/GGNahuel/PruebaTecnicaFrontend_Vitio.git
```

### 2. Instalar dependencias
Para instalar todas las dependencias necesarias ejecute:

```bash
npm install
```

### 3. Ejecutar la aplicación en modo desarrollo
Una vez que las dependencias estén instaladas, puede ejecutar la aplicación en modo desarrollo utilizando:

```bash
npm run dev
```
Este comando iniciará dos procesos:

Tailwind CSS en modo "watch" para compilar los estilos del proyecto.
Y vite como el servidor de desarrollo.

La aplicación estará disponible en http://localhost:5173. Si prefiere otro puerto, puedes configurarlo en el archivo vite.config.ts dentro de la propiedad ***port***, que está ubicada dentro de ***server***.

#### Una vez seguido estos pasos ya puedes visualizar la aplicación en tu navegador

## Fundamentación

### Acerca del diseño del sitio

Como el objetivo de la aplicación es brindar una herramienta sencilla para que un usuario pueda gestionar distintas tareas, se optó por un diseño cómodo y sencillo para este uso. 

Se buscó una paleta de colores que transmita orden y tranquilidad en su uso. Con colores en botones que varían según su función para hacer la interfaz más agradable.

Cuenta con una barra de navegación lateral (superior en dispositivos móviles) en la que, si se quiere escalar la aplicación, se pueden agregar nuevas vistas. Como ejemplo de esto coloqué enlaces a "Mis grupos de tareas", "Tareas importantes", y "Calendario de tareas" basándome en sitios o aplicaciones con objetivos similares a este.

Las tareas creadas se dividen en dos listas según su estado, sean completadas o pendientes. Si la aplicación escala se agregan más listas según los grupos que se encuentren en memoria.

### Acerca de la arquitectura del código