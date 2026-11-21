import { Router } from 'express'
import { z } from 'zod'
import { prisma } from '../lib/prisma.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { getOwnedPerfil } from '../lib/ownership.js'
import { HttpError } from '../utils/httpError.js'

export const transaccionesRouter = Router({ mergeParams: true })

const crearTransaccionSchema = z.object({
  cuentaId: z.coerce.bigint(),
  categoriaId: z.coerce.bigint(),
  tipo: z.enum(['ingreso', 'gasto']),
  monto: z.number().positive(),
  fecha: z.coerce.date(),
  descripcion: z.string().trim().max(200).optional(),
  esExtra: z.boolean().default(false),
})

transaccionesRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const perfilId = BigInt(req.params.perfilId)
    await getOwnedPerfil(perfilId, req.usuarioId)

    const transacciones = await prisma.transaccion.findMany({
      where: { perfilId },
      orderBy: { fecha: 'desc' },
      include: { cuenta: true, categoria: true },
    })
    res.json(transacciones)
  }),
)

async function validarCuentaYCategoria(perfilId, cuentaId, categoriaId) {
  const [cuenta, categoria] = await Promise.all([
    prisma.cuenta.findUnique({ where: { id: cuentaId } }),
    prisma.categoria.findUnique({ where: { id: categoriaId } }),
  ])
  if (!cuenta || cuenta.perfilId !== perfilId) throw new HttpError(400, 'Cuenta invalida para este perfil')
  if (!categoria || categoria.perfilId !== perfilId) {
    throw new HttpError(400, 'Categoria invalida para este perfil')
  }
}

async function getOwnedTransaccion(perfilId, transaccionId) {
  const transaccion = await prisma.transaccion.findUnique({ where: { id: transaccionId } })
  if (!transaccion || transaccion.perfilId !== perfilId) {
    throw new HttpError(404, 'Transaccion no encontrada')
  }
  return transaccion
}

transaccionesRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    const perfilId = BigInt(req.params.perfilId)
    await getOwnedPerfil(perfilId, req.usuarioId)

    const datos = crearTransaccionSchema.parse(req.body)
    await validarCuentaYCategoria(perfilId, datos.cuentaId, datos.categoriaId)

    const transaccion = await prisma.transaccion.create({
      data: { ...datos, perfilId },
      include: { cuenta: true, categoria: true },
    })
    res.status(201).json(transaccion)
  }),
)

transaccionesRouter.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const perfilId = BigInt(req.params.perfilId)
    await getOwnedPerfil(perfilId, req.usuarioId)
    await getOwnedTransaccion(perfilId, BigInt(req.params.id))

    const datos = crearTransaccionSchema.parse(req.body)
    await validarCuentaYCategoria(perfilId, datos.cuentaId, datos.categoriaId)

    const transaccion = await prisma.transaccion.update({
      where: { id: BigInt(req.params.id) },
      data: datos,
      include: { cuenta: true, categoria: true },
    })
    res.json(transaccion)
  }),
)

transaccionesRouter.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const perfilId = BigInt(req.params.perfilId)
    await getOwnedPerfil(perfilId, req.usuarioId)
    await getOwnedTransaccion(perfilId, BigInt(req.params.id))

    await prisma.transaccion.delete({ where: { id: BigInt(req.params.id) } })
    res.status(204).end()
  }),
)
