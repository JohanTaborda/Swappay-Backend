const bcrypt = require('bcrypt'); //Importamos la librería bcrypt para encriptar contraseñas.
const User = require("../models/User") //Importamos el modelo User para interactuar con la base de datos.

//Métodos GET. 





//Métodos POST

const createUser = async(req, res) => {//Se define la función para crear un usuario (POST).
    
    //Desestructuramos los datos.
    const { username, email, password} = req.body; // Extrae los datos enviados desde el frontend en el cuerpo de la petición.

    const hashedPassword = await bcrypt.hash(password, 10);//Se encripta la contraseña usando bcrypt con 10 valores.

    try {
        const newUser = await User.create({ //Se crea un nuevo usuario en la base de datos con los datos recibidos.
            username,
            username,
            email,
            password: hashedPassword //Guarda la contraseña encriptada.
        })
        res.status(201).json({ // Si la creación es exitosa, responde con el usuario creado y un mensaje.
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            message: 'Usuario creado correctamente'
        });
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}





//Exportamos los modulos. 

module.exports = { 
    createUser // Exporta la función createUser para que pueda ser utilizada en las rutas.
}