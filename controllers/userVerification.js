const User = require("../models/User");
const jwt = require('jsonwebtoken');

const verificationToken = async (req, res) =>{
    const token = req.cookies.access_token;
    if(!token){
        return res.status(401).json({message:'Token no proporcionado'})
    }
    try {
        const verifyToken = jwt.verify(token, process.env.SECRET_JWT_SWAP)

        const user = await User.findOne({where: {id:verifyToken.id}})
        if(!user){
            return res.status(404).json({message:'Usuario no encontrado'})
        }
        res.json({
            username: user.username,
            rol: user.rol,
            country: user.country
        })
    } catch (error) {

        res 
            .status(401).json({message:'Token invalido o expirado'})
            .clearCookie('access_token')
    }
}

module.exports = { 
    verificationToken
}
