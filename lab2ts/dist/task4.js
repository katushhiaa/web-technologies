"use strict";
class Employee {
    constructor(name, age, salary) {
        this.name = name;
        this.age = age;
        this.salary = salary;
    }
}
class Developer extends Employee {
    constructor(name, age, salary) {
        super(name, age, salary);
    }
    getAnnualBonus() {
        return this.salary * 0.1;
    }
    pay() {
        console.log(`${this.name} has been paid $${this.salary}`);
    }
}
class Manager extends Employee {
    constructor(name, age, salary) {
        super(name, age, salary);
    }
    getAnnualBonus() {
        return this.salary * 0.2;
    }
    pay() {
        console.log(`${this.name} has been paid $${this.salary}`);
    }
}
const employees = [
    new Developer("Katya", 20, 1000),
    new Developer("James", 25, 2500),
    new Manager("Lili", 30, 1500),
    new Manager("Peter", 37, 2000)
];
for (const employee of employees) {
    employee.pay();
}
let totalBonus = 0;
for (const employee of employees) {
    totalBonus += employee.getAnnualBonus();
}
console.log(totalBonus);
//# sourceMappingURL=task4.js.map