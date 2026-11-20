import { Router } from 'express'

// Retos de clase (publicos, sin login). Documentados en docs/openapi.js.
export const demoRouter = Router()

demoRouter.get('/saludo', (req, res) => {
  res.json({ message: 'Hola desde mi API' })
})

demoRouter.get('/yo', (req, res) => {
  res.json({
    nombre: 'Harim Jander Saavedra Hidalgo',
    carrera: 'Ingeniería de Software con Inteligencia Artificial',
  })
})

demoRouter.get('/edad/:anio', (req, res) => {
  const anioActual = new Date().getFullYear()
  const anioNacimiento = Number(req.params.anio)

  if (!Number.isInteger(anioNacimiento) || anioNacimiento < 1900 || anioNacimiento > anioActual) {
    return res.status(400).json({ error: `El año debe ser un número entre 1900 y ${anioActual}.` })
  }

  res.json({ anioNacimiento, edadCalculada: anioActual - anioNacimiento })
})
