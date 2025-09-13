const express = require('express');
const router = express.Router();
const authController = require("../controllers/authController");

router.post('/login', authController.loginUser);
router.post('/logout', (req, res) => {res.json({ message: 'Sesión cerrada exitosamente' });});

module.exports = router;