
// ======================= IMPORTS =======================
const express = require('express');
const sequelize = require('./database');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const cron = require('node-cron');
const { Op } = require('sequelize');

// ======================= MODELOS =======================
require('./models/Comment');
require('./models/Cart');
require('./models/CartItem');
require('./models/ChatRoom');
require('./models/Message');

// ======================= INICIALIZACIÓN APP =======================
const app = express();
const port = 3000;

require('dotenv').config();
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));
app.use(morgan('dev'));
app.use(express.json());

// ======================= SINCRONIZAR BASE DE DATOS =======================
sequelize.sync()
    .then(() => {
        console.log("Modelos Sincronizados.");
    })
    .catch(err => {
        console.error("Error al sincronizar los modelos.", err);
    });

// ======================= RUTAS =======================
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const verificationRoutes = require('./routes/verificationRoutes');
const productRoutes = require('./routes/productsRoutes');
const commentsRoutes = require('./routes/commentsRoutes');
const cartRoutes = require('./routes/cartRoutes');

app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/verification', verificationRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/products', productRoutes);
app.use('/comentarios', commentsRoutes);
app.use('/carrito', cartRoutes);

app.get('/', (req, res) => {
    res.send("Hola desde la API de Swappay.");
});

// ======================= SOCKET.IO CHAT =======================
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, { cors: { origin: true, credentials: true } });

io.on('connection', (socket) => {
    console.log('Usuario conectado:', socket.id);

    // Unirse a una sala de chat privada
    socket.on('joinRoom', ({ chatRoomId }) => {
        socket.join(`chat_${chatRoomId}`);
        console.log(`Socket ${socket.id} se unió a sala chat_${chatRoomId}`);
    });

    // Enviar mensaje a la sala
    socket.on('sendMessage', async ({ chatRoomId, senderId, content }) => {
        const Message = require('./models/Message');
        await Message.create({ chatRoomId, senderId, content });
        io.to(`chat_${chatRoomId}`).emit('newMessage', { chatRoomId, senderId, content });
    });
});

// ======================= TAREA PROGRAMADA: BORRAR MENSAJES VIEJOS =======================
const Message = require('./models/Message');
cron.schedule('0 * * * *', async () => {
    try {
        const limite = new Date(Date.now() - 1 * 60 * 60 * 1000); // 1 hora
        const eliminados = await Message.destroy({
            where: {
                createdAt: { [Op.lt]: limite }
            }
        });
        if (eliminados > 0) {
            console.log(`Mensajes eliminados automáticamente: ${eliminados}`);
        }
    } catch (err) {
        console.error('Error eliminando mensajes automáticamente:', err);
    }
});

// ======================= INICIAR SERVIDOR =======================
httpServer.listen(port, () => {
    console.log(`Servidor y Socket.IO funcionando en puerto ${port}`);
});