const User = require('./User'); //Importamos el modelo User.
const Products = require('./Products'); //Importamos el modelo Products.

//Asociaciones.
User.hasMany(Products, { foreignKey: 'idUser', as: 'products' }); //Un usuario puede tener muchos productos.
Products.belongsTo(User, { foreignKey: 'idUser', as: 'user', onDelete: "CASCADE" }); //Un producto pertenece a un usuario.

module.exports = { User, Products }; //Exportamos los modelos y sus asociaciones para usarlos en otras partes de la aplicación.