const multer = require('multer'); //Importamos Multer para manejar la subida de archivos.
const path = require('path'); //Importamos path para manejar rutas de archivos.

// Configuración del almacenamiento
const storage = multer.diskStorage({ //Definimos el almacenamiento con disco.
  destination: (req, file, cb) => { //Función para definir la carpeta de destino.
    cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes fotos de perfil
  },
  filename: (req, file, cb) => { //Función para definir el nombre del archivo.
    const ext = path.extname(file.originalname); //Obtenemos la extensión del archivo original.
    const fileName = `user-${Date.now()}${ext}`; //Definimos un nombre único para el archivo.
    cb(null, fileName); // Llamamos al callback con el nombre del archivo.
  }
});

// Filtro para aceptar solo imágenes
const fileFilter = (req, file, cb) => { //Función para filtrar los tipos de archivos permitidos.
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']; //Tipos de archivos permitidos.
  if (allowedTypes.includes(file.mimetype)) { //Si el tipo de archivo es permitido, aceptamos el archivo.
    cb(null, true); // Aceptar el archivo
  } else {
    cb(new Error('Solo se permiten archivos .jpg, .jpeg o .png'), false); // Rechazar el archivo
  }
};

// Middleware listo para usarse en rutas
const upload = multer({ storage, fileFilter }); //Creamos la instancia de Multer con la configuración definida.

module.exports = upload;

//Archivos del foro

