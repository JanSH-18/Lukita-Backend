-- CreateTable
CREATE TABLE "Prueba" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Prueba_pkey" PRIMARY KEY ("id")
);
