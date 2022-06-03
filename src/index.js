const express   = require('express');
const morgan    = require('morgan');
const {engine}  = require('express-handlebars');
const path      = require('path');

// Inicializando express
const app = express();

// Configuraciones
// aca configuramos que tome el server que tenga la pc definida, caso de no tener toma el 4000
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({
    defaultLayout:  'main',
    layoutsDir:     path.join(app.get('views'), 'layouts'),
    partialsDir:    path.join(app.get('views'), 'partials'),
    extname:        '.hbs',
    helpers:        require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Variables Globales
app.use((req, res, next) => {

    next();
});

// Rutas
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/products',    require('./routes/products'));
app.use('/register',    require('./routes/register'));
app.use('/aboutus',     require('./routes/aboutus'));
app.use('/contact',     require('./routes/contact'));
app.use('/cart',        require('./routes/cart'));


// Publico
app.use(express.static(path.join(__dirname, 'public')))


// Levantar el server
app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
})