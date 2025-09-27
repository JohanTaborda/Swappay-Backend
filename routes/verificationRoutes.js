const express = require('express') //Importamos el framework Express para crear rutas HTTP.
const router = express.Router(); //Se crea una instancia de router de Express para definir rutas específicas de usuario.
const userVerification = require("../controllers/userVerification") //Importamos el controlador de usuario, donde están las funciones para manejar las peticiones.

router.post("/verificationToken", userVerification.verificationToken)

module.exports = router;