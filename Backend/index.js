const express = require('express');
const swaggerUi = require('swagger-ui-express');
const openapi = require('./docs/openapi.js');
const app = express();
const port = process.env.PORT || 3000;

// Configuración de Swagger (con el slash inicial corregido)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapi));

// req (request) res (response) 
app.get('/api/saludo', (req, res) => {
  res.json({ message: 'Hola desde mi API' });
});

// --- RETO CLASE: Nivel 1 ---
app.get('/api/yo', (req, res) => {
    res.json({
        nombre: "Harim Jander Saavedra Hidalgo",
        carrera: "Ingeniería de Software con Inteligencia Artificial"
    });
});

// --- RETO CLASE: Nivel 2 ---
app.get('/api/edad/:anio', (req, res) => {
  const anioActual = new Date().getFullYear();
  const anioNacimiento = Number(req.params.anio);

  if (!Number.isInteger(anioNacimiento) || anioNacimiento < 1900 || anioNacimiento > anioActual) {
    return res.status(400).json({ error: `El año debe ser un número entre 1900 y ${anioActual}.` });
  }

  res.json({ anioNacimiento, edadCalculada: anioActual - anioNacimiento });
});

app.get('/', (req, res) => {
  res.json({ message: 'API Lukita funcionando', docs: '/api-docs' });
});

app.listen(port, () => console.log("API Lista"));