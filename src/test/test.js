const Sex = require('./car')

let car = new Sex('Ford', 'Oswald');
console.log(car.carBrand);
car.carBrand = "Chevrolet";
console.log(car.carBrand);

async function aa() {
    console.log(await car.tryIt())
}

aa();