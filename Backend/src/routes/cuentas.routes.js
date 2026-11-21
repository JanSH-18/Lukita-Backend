import { Router } from 'express'
import { z } from 'zod'
import { prisma } from '../lib/prisma.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { getOwnedPerfil } from '../lib/ownership.js'
import { HttpError } from '../utils/httpError.js'

export const cuentasRouter = Router({ mergeParams: true })

const crearCuentaSchema = z.object({
  nombre: z.string().trim().min(1).max(80),
  tipo: z.enum(['efectivo', 'banco', 'tarjeta']),
  saldoInicial: z.number().finite().default(0),
})

async function getOwnedCuenta(perfilId, cuentaId) {
  const cuenta = await prisma.cuenta.findUnique({ where: { id: cuentaId } })
  if (!cuenta || cuenta.perfilId !== perfilId) throw new HttpError(404, 'Cuenta no encontrada')
  return cuenta
}

cuentasRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const perfilId = BigInt(req.params.perfilId)
    await getOwnedPerfil(perfilId, req.usuarioId)

    const cuentas = await prisma.cuenta.findMany({
      where: { perfilId },
      orderBy: { creadoEn: 'asc' },
    })
    res.json(cuentas)
  }),
)

cuentasRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    const perfilId = BigInt(req.params.perfilId)
    await getOwnedPerfil(perfilId, req.usuarioId)

    const { nombre, tipo, saldoInicial } = crearCuentaSchema.parse(req.body)
    const cuenta = await prisma.cuenta.create({
      data: { perfilId, nombre, tipo, saldoInicial },
    })
    res.status(201).json(cuenta)
  }),
)

cuentasRouter.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const perfilId = BigInt(req.params.perfilId)
    await getOwnedPerfil(perfilId, req.usuarioId)
    await getOwnedCuenta(perfilId, BigInt(req.params.id))

    const { nombre, tipo, saldoInicial } = crearCuentaSchema.parse(req.body)
    const cuenta = await prisma.cuenta.update({
      where: { id: BigInt(req.params.id) },
      data: { nombre, tipo, saldoInicial },
    })
    res.json(cuenta)
  }),
)

cuentasRouter.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const perfilId = BigInt(req.params.perfilId)
    await getOwnedPerfil(perfilId, req.usuarioId)
    const cuentaId = BigInt(req.params.id)
    await getOwnedCuenta(perfilId, cuentaId)

    const [movimientos, recurrentes] = await Promise.all([
      prisma.transaccion.count({ where: { cuentaId } }),
      prisma.pagoRecurrente.count({ where: { cuentaId } }),
    ])
    if (movimientos || recurrentes) {
      throw new HttpError(400, 'No puedes eliminar una cuenta con movimientos o pagos recurrentes asociados')
    }

    await prisma.cuenta.delete({ where: { id: cuentaId } })
    res.status(204).end()
  }),
)
