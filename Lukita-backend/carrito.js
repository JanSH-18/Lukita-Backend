const productos = [
    { nombre: "Polo", precio: 35 },
    { nombre: "Gorra", precio: 20 },
];

let total = 0;

for (let i = 0; i < productos.length; i++) {
    total += productos[i].precio;
}

console.log("Total: "+ total);