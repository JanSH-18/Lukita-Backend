/*
const productos = [
  {nombre: "Polo", precio: 35},
  {nombre: "Gorra", precio: 20}
];

let total = 0;


//Problema, error
for (let i = 0; i <= productos.length; i++) {
  total += productos[i].precio;
}


//Solucion 1
for (let i = 0; i <= productos.length - 1; i++) {
  total += productos[i].precio;
}


//Solucion 2
for (let i = 0; i < productos.length; i++) {
  total += productos[i].precio;
}
console.log("total: " + total)
*/

// ==========================================
// Ejercicio other: Carrito de 4 productos
// ==========================================
const product = [
  { nombre: "Teclado Mecánico", precio: 180 },
  { nombre: "Mouse Gamer", precio: 95 },
  { nombre: "Audífonos Inalámbricos", precio: 220 },
  { nombre: "Mousepad XXL", precio: 45 }
];

// 1. Mostrar cuántos productos hay
console.log("Hay: ", product.length, "Productos");

// 2. Muestra el primer y último producto (usando length - 1 para que sea dinámico)
console.log("Primero: ", product[0], "\nUltimo: ", product[product.length - 1]);

// 3. Calcular el total usando for
let total1 = 0;
for (let i = 0; i < product.length; i++) {
  total1 += product[i].precio;
}

console.log("total:", total1);