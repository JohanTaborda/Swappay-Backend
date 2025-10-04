const User = require("../models/User"); //Importamos el modelo User para interactuar con la base de datos.
const jwt = require('jsonwebtoken'); //Importamos la librería jsonwebtoken para manejar tokens JWT.
const bcrypt = require('bcrypt'); //Importamos la librería bcrypt para encriptar contraseñas.

const verificationToken = async (req, res) =>{ //Verificar y validar expiración del Token del usuario.
    const token = req.cookies.access_token; //Obtenemos el token que se almacena en la cookie 
    if(!token){
        return res.status(401).json({message:'Token no proporcionado'}) //Si no hay token, enviamos un error 401 (no autorizado)
    }
    try { //Si hay token, intentamos verificarlo
        const verifyToken = jwt.verify(token, process.env.SECRET_JWT_SWAP) //Verificamos el token con la clave secreta

        const user = await User.findOne({where: {id:verifyToken.id}}) //Buscamos el usuario en la base de datos por su ID
        if(!user){ //Si no encontramos el usuario, enviamos un error 404 (no encontrado)
            return res.status(404).json({message:'Usuario no encontrado'})
        }
        res.json({ //Si todo está bien, enviamos los datos del usuario
            id:user.id,
            username: user.username,
            rol: user.rol,
            country: user.country,
            email: user.email,
            city: user.city,
            phone: user.phone,
            address: user.address,
            gender: user.gender,
            dateBirth: user.dateBirth,
            profileImage: user.profileImage
        })
    } catch (error) {
        res 
            .status(401).json({message:'Token invalido o expirado'}) //Si hay un error en la verificación, enviamos un error 401 (no autorizado)
            .clearCookie('access_token') //Limpiamos la cookie del token
    }
}

const verifyPassword = async(req, res) =>{ //Verificar la contraseña actual del usuario antes de permitir cambios.
    const {id} = req.params //Obtenemos el ID del usuario desde los parámetros de la ruta
    const {password} = req.body; //Obtenemos la contraseña actual desde el cuerpo de la solicitud

    try { //Intentamos verificar la contraseña
        const user = await User.findByPk(id); //Buscamos el usuario por su ID
        if (!user)  return res.status(404).json({ message: 'Usuario no encontrado' }); //Si no encontramos el usuario, enviamos un error 404 (no encontrado)

        const isMatch = await bcrypt.compare(password, user.password); //Comparamos la contraseña proporcionada con la almacenada en la base de datos
        if(!isMatch) return res.status(400).json({message: "Contraseña actual incorrecta."}) //Si no coinciden, enviamos un error 400 (solicitud incorrecta)

        res.json({message: "Contraseña correcta."}) //Si coinciden, enviamos un mensaje de éxito
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

module.exports = { //Exportamos las funciones para usarlas en las rutas
    verificationToken,
    verifyPassword
}
