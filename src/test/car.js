
class Car {
    constructor(brand, seller){
        this.carBrand = brand;
        this.carSeller = seller;
    };

    async tryIt(){
        console.log(`Try ${this.carBrand}`)
        return `Try ${this.carBrand}`
    }
}



module.exports = Car;