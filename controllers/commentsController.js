const Comment = require('../models/Comment');
const User = require('../models/User');
const Products = require('../models/Products');

const createComment = async (req, res) => {
  try {
    const { idUser, idProduct, content } = req.body;
    if (!idUser || !idProduct || !content) return res.status(400).json({ error: 'Faltan campos requeridos.' });

    // Opcional: validar existencia de usuario/producto
    const user = await User.findByPk(idUser);
    const product = await Products.findByPk(idProduct);
    if (!user || !product) return res.status(404).json({ error: 'Usuario o producto no encontrado.' });

    const comment = await Comment.create({ idUser, idProduct, content });
    res.status(201).json({ message: 'Comentario creado.', comment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getComments = async (req, res) => {
  try {
    // support optional query by product id
    const { productId } = req.query;
    const where = {};
    if (productId) where.idProduct = productId;

    const comments = await Comment.findAll({ where });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createComment,
  getComments
};
