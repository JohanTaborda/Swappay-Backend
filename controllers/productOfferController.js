const ProductOffer = require("../models/ProductOffer");
const fs = require('fs');
const path = require('path');

const createProductOffer = async (req, res) => {
  const {
    idUser, title, description, specs, category, amount,
    priceOriginal, discount, priceSwapcoins, availability
  } = req.body;


  // Obtén las rutas de las imágenes subidas en uploads/productOffer
  const img1 = req.files?.img1 ? `/uploads/productOffer/${req.files.img1[0].filename}` : null;
  const img2 = req.files?.img2 ? `/uploads/productOffer/${req.files.img2[0].filename}` : null;
  const img3 = req.files?.img3 ? `/uploads/productOffer/${req.files.img3[0].filename}` : null;

  if (!img1) return res.status(400).json({ error: "La imagen principal (img1) es obligatoria." });
  if (!title || title.length < 5) return res.status(400).json({ error: "El título debe tener al menos 5 caracteres." });
  if (!description || description.length < 10) return res.status(400).json({ error: "La descripción debe tener al menos 10 caracteres." });

  try {
    // Calcular el precio con descuento
    const priceDiscount = priceOriginal - (priceOriginal * (discount / 100));
    await ProductOffer.create({
      idUser, title, description, specs, category, amount,
      priceOriginal, discount, priceDiscount, priceSwapcoins, availability,
      img1, img2, img3
    });
    res.status(201).json({ message: "Oferta de producto creada exitosamente." });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const getAllProductOffers = async (req, res) => {
  try {
    const offers = await ProductOffer.findAll();
    // Solo mostrar los campos seleccionados
    const result = offers.map(offer => ({
      id: offer.id,
      title: offer.title,
      description: offer.description,
      specs: offer.specs,
      category: offer.category,
      amount: offer.amount,
      priceOriginal: offer.priceOriginal,
      discount: offer.discount,
      priceDiscount: offer.priceDiscount,
      priceSwapcoins: offer.priceSwapcoins,
      availability: offer.availability,
      img1: offer.img1,
      img2: offer.img2,
      img3: offer.img3
    }));
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProductOffersByUser = async (req, res) => {
  const { id } = req.params;
  try {
    const offers = await ProductOffer.findAll({ where: { idUser: id } });
    if (!offers) return res.status(404).json({ error: "No se encontraron ofertas." });
    // Solo mostrar los campos seleccionados
    const result = offers.map(offer => ({
      id: offer.id,
      title: offer.title,
      description: offer.description,
      specs: offer.specs,
      category: offer.category,
      amount: offer.amount,
      priceOriginal: offer.priceOriginal,
      discount: offer.discount,
      priceDiscount: offer.priceDiscount,
      priceSwapcoins: offer.priceSwapcoins,
      availability: offer.availability,
      img1: offer.img1,
      img2: offer.img2,
      img3: offer.img3
    }));
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProductOffer = async (req, res) => {
  const { id } = req.params;
  try {
    const offer = await ProductOffer.findByPk(id);
    if (!offer) return res.status(404).json({ message: "Oferta no encontrada." });
    // Elimina las imágenes si existen
      [offer.img1, offer.img2, offer.img3].forEach(img => {
        if (img) {
          const fileName = path.basename(img);
          const imgPath = path.join(__dirname, '..', 'uploads', 'productOffer', fileName);
          try {
            if (fs.existsSync(imgPath)) {
              fs.unlinkSync(imgPath);
            }
          } catch (err) {
            console.log(err);
          }
        }
      });
    await offer.destroy();
    res.status(200).json({ message: "Oferta eliminada correctamente." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createProductOffer,
  getAllProductOffers,
  getProductOffersByUser,
  deleteProductOffer
};
