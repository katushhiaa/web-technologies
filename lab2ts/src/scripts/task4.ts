abstract class Employee {
    public name: string;
    public age: number;
    protected salary: number;

    constructor(name: string, age: number, salary: number) {
        this.name = name;
        this.age = age;
        this.salary = salary;
    }

    abstract getAnnualBonus(): number;
}

interface Payable {
    pay(): void
}

class Developer extends Employee implements Payable {
    constructor(name: string, age: number, salary: number) {
        super(name, age, salary);
    }


    public getAnnualBonus(): number {
        return this.salary * 0.1;
    }

    public pay(): void{
        console.log(`${this.name} has been paid $${this.salary}`);
    }
}

class Manager extends Employee implements Payable {
    constructor(name: string, age: number, salary: number) {
        super(name, age, salary);
    }

    public getAnnualBonus(): number {
        return this.salary * 0.2;
    }

    public pay(): void{
        console.log(`${this.name} has been paid $${this.salary}`);
    }
}

const employees: (Employee & Payable) [] = [
    new Developer("Katya", 20,1000),
    new Developer("James", 25,2500),
    new Manager("Lili",30,1500),
    new Manager("Peter",37,2000)
];

for (const employee of employees) {
    (employee as Payable).pay();
}

let totalBonus = 0;
for (const employee of employees) {
    totalBonus += employee.getAnnualBonus();
}

console.log(totalBonus);