### LOGIN-NOTES
App de notas, incluye login, basado en [este video de fazt][video de fazt]
***

### Tecnologías usadas
- express
- express-handlebars (motor de plantilla html)
- express-session (guardado de inicio de sesion)
- method-override (Envio put y delete desde fomularios)
- moongoose (adaptador para Mongdb)
- passport (para autenticacion de usuarios)
- passport-local (para autenticacion de usuarios)
- bcryptjs (encriptacion de contraseñas)
- connect-flash (enviar mensajes entre vistas)
- nodemon (ejecucion continua de node)
- Boostrap  (estilos css)
- Fontawesome  (iconon)


*** 
### Por menores del proyecto
En general el proyecto consiste en un sistema de notas personales, con dos elementos principales, su título y descripción.
Cada nota tiene las siguientes operaciones, editar y borrar.

Para el acceso a las notas el usuario previamente debe de crear una cuenta de usuario y luego loguearse, lo que implica que solo podrá ver sus propias notas.

***
### Base de datos
En este proyecto se está usando una base de datos local con mongodb, se usan dos modelos, el modelo `user` y el modelo `notes`

***
### Sistema de logueo
Se usó `express-session` `session` y `passport` de todos los elementos de codigos trabajados, estos definitivamente fueron los mas compeljos de comprender así que los debo estudiar mejor

***
### Vistas html
La renderizacion de los documentos html se hizo con el uso del motor de plantillas `express-handlebars` el cual permite generar dinamicamente html desde el backend, ademas de poder usar estructura de lógica dentro del html para la renderización de componentes de forma dimámica
En este caso la carpeta view es la findamental y con ella las carpetas
- layouts: Donde está el elemento html principal que se repite de pantalla en pantalla (como un menú o un footer)
- partials: Es la carpeta que contiene los elementos que complementan el layout, es decir, para no tenet todo el codigo en el main del layout, este se puede separar el partials, la manera de incorporar estos partials en el layou principal es con la sintáxis `{{>elemento-partial}}`

Las otras carpetas con el nombre que se quiera poner contienen las otrás páginas, en este caso la página de notas o de logueo etc.
***
### Mensajes globales
Para los mesnsajes de errores o de otro tipo, se usó `connect-flash` el cual es otro elemento que también requiere un poco mas de estudio para su entendimiento e implementación.

***
### Mejoras futuras
- Implementar base de datos en la nube
- Realizar despliegue a producción
- Arreglar elementos visuales (distancia entre inputs de formularios y similares)
- Hacer responsive la app
- Realizar captura de datos no deseados en el input de datos

***
### Maolink software
Version. 1.0.0

Noviembre 2021



[video de fazt]:<https://youtu.be/-bI0diefasA>