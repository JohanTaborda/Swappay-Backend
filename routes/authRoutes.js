const express = require('express'); //Importamos el framework Express para crear rutas HTTP.
const router = express.Router(); //Se crea una instancia de router de Express para definir rutas específicas de autenticación.
const authController = require("../controllers/authController"); //Importamos el controlador de autenticación, donde están las funciones para manejar las peticiones.

router.post('/login', authController.loginUser); //Ruta para iniciar sesión
router.post('/logout', authController.logoutUser); //Ruta para cerrar sesión

module.exports = router;