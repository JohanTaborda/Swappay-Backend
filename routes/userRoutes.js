const express = require('express') //Importamos el framework Express para crear rutas HTTP.
const router = express.Router(); //Se crea una instancia de router de Express para definir rutas específicas de usuario.
const userController = require("../controllers/userController") //Importamos el controlador de usuario, donde están las funciones para manejar las peticiones.
const upload = require('../middlewares/uploadMiddlewares') //Importamos el middleware para manejar la subida de archivos.

// Crear un nuevo usuario.
router.post('/', userController.createUser); // Define la ruta POST en '/' que llama a la función createUser del controlador cuando se recibe una petición.
router.put('/:id', userController.updateUser); // Define la ruta PUT en '/:id' que llama a la función updateUser del controlador cuando se recibe una petición con un ID de usuario.
router.delete('/:id', userController.deleteUser); // Define la ruta DELETE en '/:id' que llama a la función deleteUser del controlador cuando se recibe una petición con un ID de usuario.

//Actualizar contraseña. 
router.put('/:id/changePassword', userController.updatePassword); 

//Obtener paises
router.get('/countries', userController.countries);

//Actualizar imagen de perfil.
// Define la ruta PUT en '/:id/profile-image' que utiliza el middleware de subida de archivos y llama a la función uploadProfileImage del controlador cuando se recibe una petición con un ID de usuario.
router.put('/:id/profile-image', upload.single('profileImage'), userController.uploadProfileImage); 

// Eliminar imagen de perfil
router.delete('/:id/profile-image', userController.deleteProfileImage);

module.exports = router; //Exportamos el router para usarlo en otros archivos, como en index.js.
