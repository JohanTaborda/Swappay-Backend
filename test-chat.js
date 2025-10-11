// Script de prueba para chat privado usando socket.io-client
// Simula un usuario que se conecta, se une a una sala y envía/recibe mensajes

const io = require('socket.io-client');

// Configura la URL del backend y el chatRoomId
const SERVER_URL = 'http://localhost:3000';
const chatRoomId = 1; // Cambia este valor para probar otras salas
const senderId = Math.floor(Math.random() * 3) + 1; // Simula un id de usuario aleatorio entre 1 y 3

const socket = io(SERVER_URL, { withCredentials: true });

socket.on('connect', () => {
  console.log('Conectado como usuario', senderId);
  // Unirse a la sala de chat
  socket.emit('joinRoom', { chatRoomId });

    // Permitir enviar mensajes manualmente desde la terminal
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });

    function promptMessage() {
      readline.question('Escribe tu mensaje: ', (text) => {
        if (text.trim().length === 0) {
          promptMessage();
          return;
        }
        socket.emit('sendMessage', {
          chatRoomId,
          senderId,
          content: text
        });
        promptMessage();
      });
    }

    promptMessage();
});

// Recibir mensajes nuevos
socket.on('newMessage', (msg) => {
  console.log('Nuevo mensaje recibido:', msg);
});

// Para salir del chat manualmente, presiona Ctrl+C
socket.on('disconnect', () => {
  console.log('Desconectado');
  process.exit(0);
});
