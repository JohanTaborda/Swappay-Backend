const express = require('express') //Importamos el framework Express para crear rutas HTTP.
const router = express.Router(); //Se crea una instancia de router de Express para definir rutas específicas de usuario.
const userController = require("../controllers/userController") //Importamos el controlador de usuario, donde están las funciones para manejar las peticiones.

// Crear un nuevo usuario.
router.post('/', userController.createUser); // Define la ruta POST en '/' que llama a la función createUser del controlador cuando se recibe una petición.

module.exports = router; // Exporta el router para que pueda ser usado en index.js