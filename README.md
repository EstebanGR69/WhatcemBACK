Guía de Ejecución del Backend en Local (Windows)

Este documento describe el proceso completo para configurar el entorno de desarrollo del backend en una máquina con sistema operativo Windows.
✅ 1. Instalación de Requisitos Previos

Antes de configurar el proyecto, es necesario instalar las siguientes herramientas de software.
a. Git

Git es esencial para el control de versiones.

    Descarga el instalador desde git-scm.com.

    Ejecuta el instalador y sigue los pasos, aceptando las opciones por defecto. Esto instalará Git Bash, una terminal muy útil para los siguientes pasos.

b. Node.js (v20)

Usaremos nvm-windows para gestionar la versión de Node.js y asegurar que usamos la correcta (v20).

    Descarga el archivo nvm-setup.zip de la última versión desde la página de releases de nvm-windows.

    Extrae y ejecuta el instalador.

    Abre una nueva terminal (PowerShell como Administrador o Git Bash) y ejecuta los siguientes comandos:

    # Instala la versión 20 de Node.js
    nvm install 20

    # Establece la versión 20 como la que se usará
    nvm use 20

c. PostgreSQL (v16+)

PostgreSQL es nuestro motor de base de datos.

    Descarga el instalador interactivo de EDB desde la página oficial de PostgreSQL.

    Ejecuta el instalador. Durante la instalación:

        Crea una contraseña segura para el superusuario postgres. ¡Anótala, la necesitarás!

        Deja el puerto por defecto (5432).

        Al finalizar, permite que se instale Stack Builder.

    pgAdmin, una herramienta gráfica para gestionar la base de datos, se instalará junto con PostgreSQL.

d. Redis

Redis no tiene soporte oficial para Windows. La forma recomendada de ejecutarlo es a través de WSL (Windows Subsystem for Linux).

    Abre PowerShell como Administrador y ejecuta:

    wsl --install

    (Esto instalará Ubuntu por defecto. Puede que necesites reiniciar tu PC).

    Una vez instalado, se abrirá una terminal de Ubuntu. Configura tu usuario y contraseña.

    En la terminal de Ubuntu, instala y ejecuta Redis:

    # Actualiza los paquetes
    sudo apt update
    sudo apt upgrade -y

    # Instala Redis
    sudo apt install redis-server -y

    # Inicia el servicio de Redis
    sudo service redis-server start

Redis ahora se estará ejecutando en segundo plano y será accesible desde tu aplicación en Windows.
⚙️ 2. Configuración de la Base de Datos

Usaremos la herramienta gráfica pgAdmin 4 para crear el usuario y la base de datos.

    Abre pgAdmin 4 desde el menú de inicio.

    Conéctate al servidor local usando la contraseña del superusuario postgres que creaste durante la instalación.

    Crear el Rol (Usuario):

        En el árbol de la izquierda, haz clic derecho sobre Login/Group Roles -> Create -> Login/Group Role....

        Pestaña General: Dale un nombre al rol (ej: mi_app_user).

        Pestaña Definition: Crea una contraseña segura para este usuario.

        Pestaña Privileges: Activa la opción Can login?.

        Haz clic en Save.

    Crear la Base de Datos:

        Haz clic derecho sobre Databases -> Create -> Database....

        Pestaña General: Dale un nombre a la base de datos (ej: mi_app_db) y selecciona el usuario que acabas de crear (mi_app_user) como Owner.

        Haz clic en Save.

    Activar Extensiones:

        En el árbol, selecciona tu nueva base de datos (mi_app_db).

        Ve al menú Tools -> Query Tool.

        Pega y ejecuta (con el ícono de rayo ⚡) las siguientes sentencias SQL, una por una:

        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        CREATE EXTENSION IF NOT EXISTS "unaccent";

¡Tu base de datos ya está lista!
🚀 3. Configuración del Proyecto Backend

Ahora vamos a configurar el código del proyecto.

    Clonar el Repositorio:
    Abre Git Bash, navega a tu carpeta de proyectos y clona el repositorio.

    git clone <URL_DEL_REPOSITORIO_BACKEND>
    cd <CARPETA_DEL_BACKEND>

    Crear Archivo de Entorno:
    Crea un archivo llamado .env en la raíz del proyecto. Este archivo contendrá los secretos y la configuración para conectar a la base de datos. Cópialo desde .env.example si existe, o créalo desde cero con el siguiente contenido:

    # Base de Datos
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=mi_app_user        # El usuario que creaste en pgAdmin
    DB_PASS=tu_contraseña_segura # La contraseña de ese usuario
    DB_NAME=mi_app_db          # El nombre de la base de datos

    # Redis
    REDIS_HOST=localhost
    REDIS_PORT=6379

    # Otras variables de la aplicación...

    Instalar Dependencias:
    Ejecuta los siguientes comandos en la terminal, dentro de la carpeta del proyecto:

    # Limpia instalaciones anteriores por seguridad
    rm -rf node_modules package-lock.json
    npm cache clean --force

    # Instala las dependencias principales
    npm install --force --legacy-peer-deps

    # Instala paquetes específicos
    npm install puppeteer-core --force
    npm i glob
    npm install jimp@^1.6.0

    # Compila el proyecto (si es necesario)
    npm run build

🧬 4. Migración y Llenado de la Base de Datos

Estos comandos prepararán la estructura de la base de datos y la llenarán con datos iniciales.

### Ejecuta las migraciones para crear las tablas
npx sequelize-cli db:migrate

### Ejecuta los seeders para poblar la base de datos con datos iniciales
npx sequelize-cli db:seed:all

(Nota: Si el proyecto usa typeorm u otro ORM, los comandos pueden variar. Revisa los scripts en package.json).
▶️ 5. Ejecutar la Aplicación

Finalmente, inicia el servidor de desarrollo. El comando exacto puede variar, así que revisa la sección de scripts en tu archivo package.json.

### Comando para iniciar en modo desarrollo
npm run start


¡Si todo ha ido bien, tu servidor backend estará corriendo en tu máquina local y conectado a la base de datos!