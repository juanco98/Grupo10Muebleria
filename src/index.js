const express   = require('express');
const path      = require('path');

// Inicializando express
const app = express();

// Configuraciones
// aca configuramos que tome el server que tenga la pc definida, caso de no tener toma el 4000
app.set('port', process.env.PORT || 4000);

// aca se configura las vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Rutas
app.use("/", require ("./routes/index.routes"));

// Publico
app.use(express.static(path.join(__dirname, 'public')))


// Levantar el server
app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
})