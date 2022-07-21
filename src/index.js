const express       = require('express');
const path          = require('path');
const bodyParser    = require('body-parser');
const methodOverride= require('method-override');
const session       = require('express-session');
const userNavBarLog = require('./middlewares/userNavBarLog');
const cookies       = require('cookie-parser');

// Inicializando express
const app = express();

// Configuraciones
// aca configuramos que tome el server que tenga la pc definida, caso de no tener toma el 4000
app.set('port', process.env.PORT || 4000);

// Sessions
app.use(session({
  secret:             '53cr3t0',
  resave:             false,
  saveUninitialized:  false
}));

// cookies
app.use(cookies())

// middleware de login
app.use(userNavBarLog);

// aca se configura las vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// se setea para soportar el body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
})); 
app.use(methodOverride('_method'));

// Rutas
app.use("/",        require ("./routes/index.routes"));
app.use("/admin",   require ("./routes/backoffice/admin.routes"));

// Publico
app.use(express.static(path.join(__dirname, 'public')))

// Levantar el server
app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
})