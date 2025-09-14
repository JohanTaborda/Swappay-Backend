const bcrypt = require('bcrypt'); //Importamos la librería bcrypt para encriptar contraseñas.
const User = require("../models/User") //Importamos el modelo User para interactuar con la base de datos.

//Métodos GET. 





//Métodos POST

const createUser = async(req, res) => {
    const { username, city, email, password, rol } = req.body;
    const exist = await User.findOne({ where: { email } });
    if (exist) {
      return res.status(400).json({ message: 'El email ya está registrado' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const newUser = await User.create({
            username,
            city,
            email,
            password: hashedPassword,
            rol
        });

        res.status(201).json({
            username: newUser.username,
            city: newUser.city,
            email: newUser.email,
            rol: newUser.rol,
            message: 'Usuario creado correctamente'
        });
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

//PUT

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, city, email, password, rol } = req.body;

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
      city: city || user.city,
      email: email || user.email,
      password: hashedPassword,
      rol: rol || user.rol
    });

    res.json({
      username: user.username,
      city: user.city,
      email: user.email,
      rol: user.rol,
      message: 'Usuario actualizado correctamente'
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// DELETE

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



module.exports = { 
    createUser,
    updateUser,
    deleteUser // Agrega la exportación
}