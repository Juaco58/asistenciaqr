# asistencia-qr

App para registrar Asistencia a Reuniones.
Esta App permite que cada Usuario se registre en una determinada Reunión, seleccionando una foto que deben tomar previamente a un QR plano con el texto de dicha Reunión (generado con https://qrcode.tec-it.com/es, o en su defecto con https://me-qr.com, pero este último genera un ID con texto en formato de enlace).

El código está alojado en Git Hub pages y vinculado sincrónicamente a versel.
Si el usuario (DNI) no estuviese registrado en la Base de Usuarios, es rechazado. De lo contrario, es aceptado y se agrega a la tabla de asistencias a esa reunión.
Si se equivocase de Usuario (DNI) puede editarlo para corregir el error.

Los asistentes a la reunión pueden revisarse en tiempo real desde el Excel correspondiente, que está en la misma carpeta de la PC.

Los datos están en tres Tablas (Usuarios, Asistencia y Reuniones), que están alojadas en SUPABASE.

Sólo el Administrador puede cargar la base de Usuarios.

A partir de este momento, cada vez que se haga una mejora en tu aplicación y se decida lanzar una nueva versión (como por ej. la 1.2), el proceso que debe repetirse es sumamente sencillo: En service-worker.js: Cambiá el nombre a const CACHE_NAME = 'asist-pro-root-v1.2'; y poné ?v=1.2 en los archivos de la lista ASSETS. En manifest.json: Cambiá el parámetro del icono enmascarable a ?v=1.2. En index.html: Cambiá la vinculación a <link rel="manifest" href="/manifest.json?v=1.2">. 
Se cargan los tres nuevos reemplazando los viejos en GIT HUB, y éstos se actualizarán solos en Vercel y la app se encargará del resto, avisando a los usuarios con el cartel de confirmación de actualización.

El maskable icon de 512x512 se hizo con Affinity y se ajustó con Progressier.com
Ahora hay una bandera de aviso si se valida registro de asistencia de más de un DNI desde el mismo dispositivo.
De ahora en más, el proceso de administración de asistencias a reuniones se reduce a esto:
•	Abrís el Excel "Libro de Asistencia CON CONTROL".
•	Vas a la pestaña Datos y tocás Actualizar todo.
•	El sistema viaja solo a internet, se trae los datos de Supabase, te acomoda el horario de Argentina y te pinta de rojo las alertas de un dispositivo compartido, si las hubiese.
Cuando Avise Git Hub o supabase hay que entrar al sitio. Para restrablecer automáticamente Git Hub, o despausar Supabase.

