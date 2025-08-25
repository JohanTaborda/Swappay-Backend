const express = require('express'); //Importamos el framework Express para crear el servidor y las rutas.
const sequelize = require('./database');//Importamos la configuración de la base de datos (usando Sequelize).

const app = express(); //Creamos la aplicación.
const port = 3000; //Definimos el puerto 3000 para el servidor.

app.use(express.json()); //Usamos el express.json

sequelize.sync() //Sincronizamos sequelize, si sincroniza modelos, se imprime el then, si no, el catch.
    .then(() => {
        console.log("Modelos Sincronizados.")
    })
    .catch(err => {
        console.error("Error al sincronizar los modelos.", err)
    })

//Conectamos las rutas. 
const userRoutes = require('./routes/userRoutes');


//Usamos las rutas. 
app.use('/users', userRoutes); //Asociamos las rutas de usuario al endpoint /users.

//Ruta de prueba
app.get('/', (req, res) => { //Creamos un metodo get, que esta en la raiz y responde el send...
    res.send("Hola desde la API de Swappay.")
})

//Servidor escuchando
app.listen(port, () => { //La aplicación escuchara por el puerto 3000 y cuando funcione imprime el mensaje.
    console.log(`Servidor Funcionando en el puerto: ${port}`);
})