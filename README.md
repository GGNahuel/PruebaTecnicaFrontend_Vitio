# To-Do App

## Instrucciones para ejecutar la aplicación

### 1. Clonar el repositorio
Primero se debe clonar el repositorio en el equipo local. Para esto primero asegúrate que la ruta de la terminal sea donde quieres alojar el proyecto, luego puedes clonarlo con el siguiente comando:

```
git clone https://github.com/GGNahuel/PruebaTecnicaFrontend_Vitio.git
```

### 2. Instalar dependencias
Ejecuta el siguiente comando para instalar todas las dependencias necesarias:

```bash
npm install
```

### 3. Ejecutar la aplicación en modo desarrollo
Una vez que las dependencias estén instaladas, puedes ejecutar la aplicación en modo desarrollo utilizando el siguiente comando:

```bash
npm run dev
```
Este comando iniciará dos procesos:

Tailwind CSS en modo "watch" para compilar los estilos de tu proyecto.
Y vite como el servidor de desarrollo.

La aplicación estará disponible en http://localhost:5173. Si prefieres otro puerto, puedes configurarlo en el archivo vite.config.ts dentro de la propiedad ***port*** dentro de ***server***.

#### Una vez seguido estos pasos ya puedes visualizar la aplicación en tu navegador

## Fundamentación