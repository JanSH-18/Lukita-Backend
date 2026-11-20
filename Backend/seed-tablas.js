require("dotenv/config");
const prisma = require("./src/lib/prisma");

async function main() {
  // Limpiar primero (de hijos a padres) para poder repetir el seed sin duplicados
  await prisma.pedido.deleteMany();
  await prisma.producto.deleteMany();
  await prisma.cliente.deleteMany();
  await prisma.categoria.deleteMany();

  // Categorías con sus productos
  await prisma.categoria.create({
    data: {
      nombre: "Bebidas",
      productos: {
        create: [
          { nombre: "Agua mineral", precio: 2.5 },
          { nombre: "Jugo de naranja", precio: 4.0 },
          { nombre: "Gaseosa", precio: 3.5 },
        ],
      },
    },
  });

  await prisma.categoria.create({
    data: {
      nombre: "Snacks",
      productos: {
        create: [
          { nombre: "Papas fritas", precio: 3.0 },
          { nombre: "Galletas", precio: 2.0 },
        ],
      },
    },
  });

  await prisma.categoria.create({
    data: {
      nombre: "Limpieza",
      productos: {
        create: [
          { nombre: "Detergente", precio: 12.9 },
          { nombre: "Jabón líquido", precio: 8.5 },
        ],
      },
    },
  });

  await prisma.categoria.create({
    data: { nombre: "Sin productos aún" },
  });

  // Clientes con sus pedidos
  await prisma.cliente.create({
    data: {
      nombre: "Juan Pérez",
      correo: "juan@correo.com",
      pedidos: {
        create: [
          { total: 25.5, fecha: new Date("2026-11-15T10:00:00Z") },
          { total: 12.0, fecha: new Date("2026-11-17T15:30:00Z") },
        ],
      },
    },
  });

  await prisma.cliente.create({
    data: {
      nombre: "María López",
      correo: "maria@correo.com",
      pedidos: {
        create: [{ total: 48.9, fecha: new Date("2026-11-18T09:15:00Z") }],
      },
    },
  });

  await prisma.cliente.create({
    data: {
      nombre: "Pedro Gómez",
      correo: "pedro@correo.com",
      pedidos: {
        create: [
          { total: 7.5, fecha: new Date("2026-11-16T12:00:00Z") },
          { total: 33.0, fecha: new Date("2026-11-19T08:45:00Z") },
          { total: 19.9, fecha: new Date("2026-11-19T18:20:00Z") },
        ],
      },
    },
  });

  await prisma.cliente.create({
    data: { nombre: "Ana Torres", correo: "ana@correo.com" },
  });

  console.log("Datos insertados en Categoria, Producto, Cliente y Pedido.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());