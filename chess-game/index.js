

require('dotenv').config();
const path = require('path');
const port = 3000; // Define el puerto directamente aquí

const serverPath = path.join(__dirname, 'server', 'server.js');
require(serverPath);

// Exportar
module.exports = {
    port: port
};
