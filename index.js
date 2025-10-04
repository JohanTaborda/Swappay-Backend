const express = require('express'); //Importamos el framework Express para crear la aplicación web.
const sequelize = require('./database'); //Importamos la configuración de la base de datos.
const morgan = require('morgan'); //Importamos Morgan para registrar las solicitudes HTTP en la consola.
const jwt = require('jsonwebtoken'); //Importamos la librería jsonwebtoken para manejar tokens JWT.
const app = express(); //Creamos una instancia de la aplicación Express.
const port = 3000; //Definimos el puerto en el que se ejecutará el servidor.
const path = require('path'); //Módulo path para manejar rutas de archivos y directorios.
const cors = require('cors'); //Importamos CORS para manejar solicitudes entre diferentes dominios.
const cookieParser = require('cookie-parser'); //Importamos cookie-parser para manejar cookies en las solicitudes HTTP.

app.use(cookieParser()); //Usamos el middleware cookie-parser para parsear las cookies en las solicitudes.
app.use(cors({ //Configuramos CORS para permitir solicitudes desde el frontend.
  origin: true, 
  credentials: true
}));
app.use(morgan('dev')); //Usamos Morgan en modo 'dev' para registrar las solicitudes HTTP en la consola.
app.use(express.json()); //Usamos el middleware integrado de Express para parsear JSON en las solicitudes.
require('dotenv').config(); //Cargamos las variables de entorno desde el archivo .env

sequelize.sync() //Sincronizamos los modelos con la base de datos.
    .then(() => { // Si la sincronización es exitosa, imprimimos un mensaje en la consola.
        console.log("Modelos Sincronizados.")
    })
    .catch(err => { // Si hay un error durante la sincronización, lo imprimimos en la consola.
        console.error("Error al sincronizar los modelos.", err)
    })

// Conectamos las rutas.
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const verificationRoutes = require('./routes/verificationRoutes');
const productRoutes = require('./routes/productsRoutes')

// Usamos las rutas..
app.use('/users', userRoutes); // Rutas para gestión de usuarios
app.use('/auth', authRoutes); // Rutas para autenticación
app.use('/verification', verificationRoutes); // Rutas para verificación de token
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Servimos archivos estáticos desde la carpeta 'uploads'
app.use('/products', productRoutes) // Rutas para productos

app.get('/', (req, res) => { //Ruta raíz para verificar que el servidor está funcionando.
    res.send("Hola desde la API de Swappay.")
})

app.listen(port, () => { //Iniciamos el servidor en el puerto definido.
    console.log(`Servidor Funcionando en el puerto: ${port}`);
})