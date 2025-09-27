const bcrypt = require('bcrypt');
const User = require("../models/User");
const jwt = require('jsonwebtoken');

require('dotenv').config();
const SECRET_JWT_SWAP = process.env.SECRET_JWT_SWAP;

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }
 
    const token = jwt.sign(
      { id: user.id, email: user.email, rol: user.rol },
      SECRET_JWT_SWAP,
      { expiresIn: '5m' }
    );
    res
      .cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000*60*5
      })
      .json({
        username: user.username,
        message: 'Autenticación exitosa'
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = { 
    loginUser
}