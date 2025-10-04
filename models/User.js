const {DataTypes} = require('sequelize'); //Importamos los tipos de datos de Sequelize.
const sequelize = require('../database'); //Importamos la instancia de Sequelize configurada en database.js

const User = sequelize.define('User', { //Definimos el modelo User con sus atributos y tipos de datos.
    username: { //Nombre de usuario
        type: DataTypes.STRING,
        allowNull: false
    },
    country: { //País del usuario
        type: DataTypes.STRING,
        allowNull: false
    },
    email: { //Correo electrónico del usuario
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: { //Contraseña del usuario (almacenada de forma segura con hashing)
        type: DataTypes.STRING,
        allowNull: false
    },
    rol: { //Rol del usuario (puede ser 'user' o 'admin')
        type: DataTypes.ENUM('user', 'admin'),
        allowNull: false,
        defaultValue: 'user'
    },
    city: { //Ciudad del usuario
        type: DataTypes.STRING,
        allowNull: true
    },
    phone: { //Número de teléfono del usuario
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    address: { //Dirección del usuario
        type: DataTypes.STRING,
        allowNull: true
    },
    gender: { //Género del usuario
        type: DataTypes.STRING,
        allowNull: true
    },
    dateBirth: { //Fecha de nacimiento del usuario
        type: DataTypes.STRING,
        allowNull: true,
    },
    profileImage:{ //Imagen de perfil del usuario (ruta al archivo almacenado)
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'users', //Nombre de la tabla en la base de datos
    timestamps: false //No usamos timestamps automáticos (createdAt, updatedAt)
});

User.associate = (models) => { //Definimos la relación entre User y Products (un usuario puede tener muchos productos)
    User.hasMany(models.Products, { //Relación uno a muchos con el modelo Products
        foreignKey: 'idUser', //Clave foránea en la tabla Products que referencia al usuario
        as: 'products' //Alias para la relación
    });
};

module.exports = User;