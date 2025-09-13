const express = require('express');
const sequelize = require('./database');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;
const cors = require('cors');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
require('dotenv').config();

sequelize.sync()
    .then(() => {
        console.log("Modelos Sincronizados.")
    })
    .catch(err => {
        console.error("Error al sincronizar los modelos.", err)
    })

// Conectamos las rutas.
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes'); // <-- Agregado

// Usamos las rutas..
app.use('/users', userRoutes);
app.use('/auth', authRoutes); 

app.get('/', (req, res) => {
    res.send("Hola desde la API de Swappay.")
})

app.listen(port, () => {
    console.log(`Servidor Funcionando en el puerto: ${port}`);
})