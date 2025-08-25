const {DataTypes} = require('sequelize'); //Importamos los tipos de datos de Sequelize para definir los campos del modelo.
const sequelize = require('../database'); //Importamos la instancia de Sequelize configurada para conectar con la base de datos.

//Definimos el modelo de usuario. 

//El método define es lo mismo que "Create Table"
const User = sequelize.define('User', {// Define el modelo 'User' y sus campos.

    username:{ //Restricciones o valores que tendra username
        type: DataTypes.STRING, //Solo con string el lo crea como un varchar.
        allowNull: false
    },
    email:{
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'users'//Se especifica el nombre de la tabla en la base de datos.
})

module.exports = User; //Exportamos el modelo user.