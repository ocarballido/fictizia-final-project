# Bootstrap 5 Boilerplate
## Descripción
Bootstrap 5 Boilerplate es un simple proyecto basado en bootstrap 5 para comenzar a trabajar 1 minuto más tarde de que te lo descargues.

## ¿Que necesitas?
- [npm](https://www.npmjs.com/get-npm)

## ¿Cómo comenzar?
#### Instala los módulos necesarios
```sh
npm install
```
#### Ve creando ficheros .hbs
- Crea el fichero src/templates/partials/personal.hbs
- Añade el contenido en el fichero. Puede ser un simple código HTML, o puedes basar tu código en handlerbar
- Al final de src/templates/base.hbs añade la condición
```sh
{{#if isPersonal}}
     {{> personal }}
{{/if}}
```
- Crea el fichero src/js/personal.js en en él
  - Escribe el JS que tu documento necesite
  - Añade ficheros externos (jpg, png, svg, scss)
- Si quieres estilos personalizados para esta página, crea el fichero src/scss/personal.scss e impórtalo como hemos indicado en la línea anterior

#### Arrancar el servidor local:
```sh
npm run dev
```

## Construido con
- [Bootstrap 5](https://getbootstrap.com/)
- [Handlebar](https://handlebarsjs.com/)

## Compilar carpeta /dist
Ejecutanto el siguiente comendo, se creará la carpeta dist con toda la estructura de tu web.
```sh
npm run build
```
