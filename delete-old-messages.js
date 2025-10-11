// Script para eliminar mensajes de chat con más de 1 hora de antigüedad
// Ejecuta este script manualmente o con node-cron desde index.js

const { Op } = require('sequelize');
const sequelize = require('./database');
const Message = require('./models/Message');

async function borrarMensajesAntiguos() {
  try {
    // Mensajes con más de 1 hora
    const limite = new Date(Date.now() - 1 * 60 * 60 * 1000); // 1 hora
    const eliminados = await Message.destroy({
      where: {
        createdAt: { [Op.lt]: limite }
      }
    });
    console.log(`Mensajes eliminados: ${eliminados}`);
  } catch (err) {
    console.error('Error eliminando mensajes:', err);
  } finally {
    await sequelize.close();
  }
}

borrarMensajesAntiguos();
