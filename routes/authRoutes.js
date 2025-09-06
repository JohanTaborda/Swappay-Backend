const express = require('express');
const router = express.Router();
const authController = require("../controllers/authController"); // <-- Cambia aquí

router.post('/login', authController.loginUser); // <-- Cambia aquí también
module.exports = router;