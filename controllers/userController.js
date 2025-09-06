const bcrypt = require('bcrypt'); //Importamos la librería bcrypt para encriptar contraseñas.
const User = require("../models/User") //Importamos el modelo User para interactuar con la base de datos.

//Métodos GET. 





//Métodos POST

const createUser = async(req, res) => {//Se define la función para crear un usuario (POST).
    
    //Desestructuramos los datos.
    const { username,lastname,city, email, password} = req.body; // Extrae los datos enviados desde el frontend en el cuerpo de la petición.
    const exist = await User.findOne({ where: { email } });
    if (exist) {
      return res.status(400).json({ message: 'El email ya está registrado' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);//Se encripta la contraseña usando bcrypt con 10 valores.

    try {
        const newUser = await User.create({ //Se crea un nuevo usuario en la base de datos con los datos recibidos.
            username,
            lastname,
            city,
            email,
            password: hashedPassword //Guarda la contraseña encriptada.
        })
        res.status(201).json({ // Si la creación es exitosa, responde con el usuario creado y un mensaje.
            id: newUser.id,
            username: newUser.username,
            lastname: newUser.lastname,
            city: newUser.city,
            email: newUser.email,
            message: 'Usuario creado correctamente'
        });
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

//PUT

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, lastname, city, email, password } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Si el email cambia, verificar que no exista en otro usuario
    if (email && email !== user.email) {
      const exist = await User.findOne({ where: { email } });
      if (exist) {
        return res.status(400).json({ message: 'El email ya está registrado en otro usuario' });
      }
    }

    // Si viene una contraseña nueva, encriptarla
    let hashedPassword = user.password;
    if (password) {
      const bcrypt = require('bcrypt');
      hashedPassword = await bcrypt.hash(password, 10);
    }

    await user.update({
      username: username || user.username,
      lastname: lastname || user.lastname,
      city: city || user.city,
      email: email || user.email,
      password: hashedPassword
    });

    res.json({
      id: user.id,
      username: user.username,
      lastname: user.lastname,
      city: user.city,
      email: user.email,
      message: 'Usuario actualizado correctamente'
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// DELETE

// ...existing code...

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    await user.destroy();
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ...existing code...

module.exports = { 
    createUser,
    updateUser,
    deleteUser // Agrega la exportación
}