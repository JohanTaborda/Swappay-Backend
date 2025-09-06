const bcrypt = require('bcrypt'); //Importamos la librería bcrypt para encriptar contraseñas.
const User = require("../models/User") //Importamos el modelo User para interactuar con la base de datos.

// ...existing code...

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }
    // Verifica que la contraseña sea exactamente igual
    const bcrypt = require('bcrypt');
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }
    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      message: 'Autenticación exitosa'
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ...existing code...

module.exports = { 
    loginUser // Exporta la función de login
}