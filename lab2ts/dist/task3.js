"use strict";
class Car {
    constructor(brand, model, year, price) {
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.price = price;
    }
    getYear() {
        return this.year;
    }
}
class BMW extends Car {
    constructor(model, year, price, country) {
        super("BMW", model, year, price);
        this.country = country;
    }
    getCarInfo() {
        console.log(`Brand: ${this.brand}, Model: ${this.model}, Year: ${this.getYear()}, Price: $${this.price}, Country: ${this.country}`);
    }
}
class Toyota extends Car {
    constructor(model, year, price, engineType) {
        super("Toyota", model, year, price);
        this.engineType = engineType;
    }
    getCarInfo() {
        console.log(`Brand: ${this.brand}, Model: ${this.model}, Year: ${this.getYear()}, Price: $${this.price}, Engine: ${this.engineType}`);
    }
}
class Volkswagen extends Car {
    constructor(model, year, price, batteryCapacity) {
        super("Volkswagen", model, year, price);
        this.batteryCapacity = batteryCapacity;
    }
    getCarInfo() {
        console.log(`Brand: ${this.brand}, Model: ${this.model}, Year: ${this.getYear()}, Price: $${this.price}, Battery: ${this.batteryCapacity} kWh`);
    }
}
const bmw1 = new BMW("X5", 2021, 60000, "Germany");
const bmw2 = new BMW("M3", 2023, 75000, "Germany");
const toyota1 = new Toyota("Corolla", 2020, 20000, "Diesel");
const toyota2 = new Toyota("Camry", 2022, 30000, "Petrol");
const volkswagen1 = new Volkswagen("ID4", 2022, 90000, 100);
const volkswagen2 = new Volkswagen("ID Buzz", 2023, 55000, 75);
bmw1.getCarInfo();
bmw2.getCarInfo();
toyota1.getCarInfo();
toyota2.getCarInfo();
volkswagen1.getCarInfo();
volkswagen2.getCarInfo();
//# sourceMappingURL=task3.js.map