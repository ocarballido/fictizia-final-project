# Party budget with friends
## Descripción
Calcular presupuesto de una actividad, dependiendo de la cantidad de invitados y los gastos asociados.
- Añade usuario/invitados
- Añade gastos
- Calcula que usuarios deben aportar dinero, y a que usuarios en concreto

## Tecnologías
- [Webpack](https://webpack.js.org/)
- [Bootstrap 5](https://getbootstrap.com/)
- [Handlebar](https://handlebarsjs.com/)

## Instalación
- [npm](https://www.npmjs.com/get-npm)

```sh
$ cd ../folder
$ npm install
$ npm run dev
```

## Como usar
Estructura del proyecto:
```sh
app
├── src
│   ├── assets
│   ├── js
│   │   ├── classes
│   │   │   ├── Guest.js
│   │   │   ├── IdGenerator.js
│   │   │   └── Product.js
│   │   ├── ApiServices.js
│   │   ├── controller.js
│   │   ├── index.js
│   │   ├── Model.js
│   │   └── View.js
│   ├── scss
│   │   ├── index.scss
│   │   └── theme.js
│   └── templates
│       └── index.html
└── index.js
```

## Compilar carpeta /dist
Se creará la carpeta dist con toda la estructura de la app.
```sh
$ npm run build
```
