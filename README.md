# Prueba técnica para DudyFit

## Configuración del proyecto
```
npm install
```

### Compilación y reproducción en modo local
```
npm run start
```

### Compilación de los archivos para producción, crea o actualiza la carpeta dist que es dónde tendremos los archivos necesarios, para ello entraremos en la carpeta frontend y lanzaremos el siguiente comando
```
npm run build
```



### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
=======
# README #

### Información de Github y Heroku ###

El respositorio dónde se encuentra el código actualizado es -> https://github.com/ffs0ciety/dudyfit

Se ha utilizado como sandbox Heroku y se puede vistar la página en -> https://dudy-fit.herokuapp.com/

### Descripción de los archivos y directorios ###

El código consta de los archivos de los archivos de configuración en la carpeta raiz junto con el archivo principal de la aplicación app.js

En la carpeta /frontend podemos encontrar todo el codigo relativo a la aplicación desarrolada en VUE 3
    - Esta carpeta consta a su vez con todos los archivos necesarios para continuar el desarrollo sin depender del nuestro back o archivos principales de la carpeta raíz. Es posible trabajar con ella en otro entorno ya que contiene su propio package.json.
    - En su carpeta /dist se encuentra el codigo compilado para llevar a producción en Node, es la carpeta a la que accede nuestra aplicación principal para obtener los archivos que se van a enviar como vistas.
    - La carpeta /public es la carpeta que contiene el .html principal desarrolando en vue
    - /src contiene todos los archivos con los que se construye la aplicación.
      - Archivos principales de la aplicación y carpetas descritas por su propio nombre

Dentro de /backend la aplicación se ha separado en:
    -apiServices: Tradicionalmente la carpeta iría separada por servicios separados, pero al tener solo uno, encontramos directamente tanto el controlladro del servicio como su archivo de rutas.
    -data: El archivo database.json actúa como base de datos de nuestra aplicación, se puede cambiar el json por otro equivalente conservando el mismo nombre. Para que la aplicación trabajar con otros Entrenadores por defecto o otros clientes solo habría que añadirlos.
    -microservices: Servicios generales de la aplicación como el acceso a base de datos.
    -routes: Contiene el archivo index.js que se encarga del manejo de rutas general, ahora mismo solo contiene hacia la ruta /api


### ¿Cómo pongo en marcha la aplicación? ###

Una vez descargado los archivos, lanzaremos el comando **npm run install**, el cual instalará las dependecias dentro de la carpeta node_modules. Tras esto podremos ejecutar el comando **npm run start** para lanzar el servidor en local. En el caso de que querramos editar la parte del front, deberemos ejecutar **npm run build** dentro de la carpeta /frontend para que se compilen los archivos que va a leer la aplicación de Node.

### Datos e información de que usa la aplicación ###

La aplicación actualmente simula una base de datos estilo MongoDB, accediendo a los datos almacenados en el archivo /datab/database.json . Se pueden modificar dichos datos añadiendo nuevos entrenadores o clientes siempre y cuando siga el mismo formato. Posteriormente se podría cambiar la fuente modificando las funciones de /microservices/FileManager.js para que provengan de una base de datos real o de llamadas a alguna api externa.

### Who do I talk to? ###
Cualquier duda sobre el código o decisiones de diseño pueden contacterme en ->
* raulmsanchez@gmail.com
>>>>>>> 
