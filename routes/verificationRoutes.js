const express = require('express') //Importamos el framework Express para crear rutas HTTP.
const router = express.Router(); //Se crea una instancia de router de Express para definir rutas específicas de usuario.
const userVerification = require("../controllers/userVerification") //Importamos el controlador de usuario, donde están las funciones para manejar las peticiones.

router.post("/verificationToken", userVerification.verificationToken) //Ruta para verificar la expedición del token
router.post("/:id/validatePassword", userVerification.verifyPassword); //Ruta para validar la contraseña del usuario.

module.exports = router; //Exportamos el router para usarlo en la aplicación principal.