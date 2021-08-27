# Prueba técnica para DudyFit

## Configuración del proyecto
```
npm install
```

### Compilación y reproducción en modo local
```
npm run serve
```

### Compilación de los archivos para producción, crea o actualiza la carpeta dist que es dónde tendremos los archivos necesarios
```
npm run build
```

### Otros comandos de internos para subir a servidor de pruebas (Raúl)
```
npm run bad
```

### Backup automático sin comentarios en el git
```
npm run git
```


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
=======
# README #

### Antes de comenzar ###

Necesitaremos una versión mínima de **node** la cual será de 12.14.1. A fecha de 13-Agosto-2021 hay una versión estable 14.17 que es posible que no produzca conflicto (en caso de no lanzar correctamente los comandos de la sección ¿Cómo pongo en marcha la aplicación? probar con una versión próxima a la 12.14). 
### ¿Descripción de los directorios? ###

En este directorio raíz contamos con los archivos de configuración .json, los tradicionales package y otros relativos a la configuración de openapi y firebase (estos últimos se pueden ignorar completamente).

Directorio /src: Contiene los archivos editables sobre los que se fundamenta la aplicación VUE
* /assets: Contiene los archivos multimeda así como los css
* /components: Componentes a los que llamarán luego las vistas
* /router: Configuración de rutas de la aplicación VUE
* /services: Alimentación de las funciones para el uso de las API's y conexiones con el backend
* App.vue - main.js: archivos principales de la aplicación VUE

### ¿Cómo pongo en marcha la aplicación? ###

Una vez descargado los archivos, lanzaremos el comando **npm run install**, el cual instalará las dependecias dentro de la carpeta node_modules. Tras esto podremos ejecutar el comando **npm run serve** para lanzar el servidor en local, o bien el comando **npm run build** para compilar los archivos a subir a otro servidor (comprimidos y optimizados) que se encontrarán dentro del directorio **/dist**

### Datos e información de que usa la aplicación ###

Actualmente la aplicación solo tira de datos locales incluidos en los archivos /assets o introducidos a mano a excepción de los alojamientos de /parati. Estos datos son servidos por una llamada a través de una api a un json en firebase, en el futuro vendrá todo servido a través de las llamadas al back, toda esta configuración irá manipulada a través de los archivos en **/src/services**

### Who do I talk to? ###

* raulmsanchez@gmail.com
>>>>>>> 
