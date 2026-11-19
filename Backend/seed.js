require("dotenv/config");
const prisma = require("./src/lib/prisma");

async function main() {
  await prisma.prueba.createMany({
    data: [
      { nombre: "Juan",  fecha: new Date("2026-11-19T09:00:00Z") },
      { nombre: "María", fecha: new Date("2026-11-20T10:00:00Z") },
      { nombre: "Pedro", fecha: new Date("2026-11-21T11:00:00Z") },
      { nombre: "Ana",   fecha: new Date("2026-11-22T12:00:00Z") },
      { nombre: "Luis",  fecha: new Date("2026-11-23T13:00:00Z") },
    ],
  });
  console.log("Nombres y fechas insertados correctamente en la tabla Prueba.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());