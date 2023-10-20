const http = require('http'),
      path = require('path'),
      express = require('express'),
      handlebars = require('express-handlebars'),
      socket = require('socket.io');

// Importa la configuración del puerto desde el archivo index.js
const config = require('../index.js');

// Importa los módulos personalizados
const myIo = require('./sockets/io'),
      routes = require('./routes/routes');

const app = express(),
      server = http.Server(app),
      io = socket(server);

// Configura el servidor para escuchar en el puerto definido en config
server.listen(config.port);

// Objeto para mantener el estado de los juegos en el servidor
games = {};

// Inicializa el sistema de comunicación en tiempo real
myIo(io);

// Muestra un mensaje en la consola indicando el puerto en el que se está escuchando
console.log(`Server listening on port ${config.port}`);

// Configuración de Handlebars para renderizar vistas HTML
const Handlebars = handlebars.create({
  extname: '.html', 
  partialsDir: path.join(__dirname, '..', 'front', 'views', 'partials'), 
  defaultLayout: false,
  helpers: {}
});

app.engine('html', Handlebars.engine);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '..', 'front', 'views'));

// Configura la ruta para servir archivos estáticos en la carpeta 'public'
app.use('/public', express.static(path.join(__dirname, '..', 'front', 'public')));

// Configura las rutas de la aplicación
routes(app);
