abstract class Car {
    public brand: string;
    protected model: string;
    private year: number;
    protected price: number;

    constructor(brand: string, model: string, year: number, price: number ) {
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.price = price;
    }

    abstract getCarInfo(): void;

    protected getYear(): number{
        return this.year;
    }
}

class BMW extends Car {
    private country: string;

    constructor(model: string, year: number, price: number, country: string) {
        super("BMW", model, year, price);
        this.country = country;
    }

    public getCarInfo():void {
        console.log(
            `Brand: ${this.brand}, Model: ${this.model}, Year: ${this.getYear()}, Price: $${this.price}, Country: ${this.country}`
        );
    }
}

class Toyota extends Car {
    private engineType: string;

    constructor(model: string, year: number, price: number, engineType: string) {
        super("Toyota", model, year, price);
        this.engineType = engineType;
    }

    public getCarInfo():void {
        console.log(
            `Brand: ${this.brand}, Model: ${this.model}, Year: ${this.getYear()}, Price: $${this.price}, Engine: ${this.engineType}`
        )
    }
}

class Volkswagen extends Car {
    private batteryCapacity: number;

    constructor(model: string, year: number, price: number, batteryCapacity: number) {
        super("Volkswagen", model, year, price);
        this.batteryCapacity = batteryCapacity;
    }

    public getCarInfo():void {
        console.log(
            `Brand: ${this.brand}, Model: ${this.model}, Year: ${this.getYear()}, Price: $${this.price}, Battery: ${this.batteryCapacity} kWh`
        )
    }
}

const bmw1 = new BMW("X5", 2021, 60000, "Germany");
const bmw2 = new BMW("M3", 2023, 75000, "Germany");

const toyota1 = new Toyota("Corolla", 2020, 20000, "Diesel");
const toyota2 = new Toyota("Camry", 2022, 30000, "Petrol");

const volkswagen1 = new Volkswagen("ID4", 2022, 90000, 100);
const volkswagen2 = new Volkswagen("ID Buzz", 2023, 55000, 75)

bmw1.getCarInfo()
bmw2.getCarInfo()

toyota1.getCarInfo()
toyota2.getCarInfo()

volkswagen1.getCarInfo()
volkswagen2.getCarInfo()