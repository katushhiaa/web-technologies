"use strict";
class Cat {
    constructor(name, age, canFly = true) {
        this.canWalk = true;
        this.name = name;
        this.age = age;
    }
    move() {
        console.log(`${this.name} walks.`);
    }
    makeSound() {
        console.log(`${this.name} says: "Meow".`);
    }
}
class Bird {
    constructor(name, age, canFly = true) {
        this.canFly = true;
        this.name = name;
        this.age = age;
    }
    move() {
        console.log(`${this.name} flies in the sky.`);
    }
    makeSound() {
        console.log(`${this.name} says: Цвірінь!.`);
    }
}
class Fish {
    constructor(name, age, canFly = true) {
        this.canSwim = true;
        this.name = name;
        this.age = age;
    }
    move() {
        console.log(`${this.name} swim in the sea.`);
    }
    makeSound() {
        console.log(`${this.name} makes bubbles`);
    }
}
const cat = new Cat("Льолік", 5, true);
cat.move();
cat.makeSound();
const bird = new Bird("Parrot", 1, true);
bird.move();
bird.makeSound();
const fish = new Fish("Nemo", 2, true);
fish.makeSound();
fish.move();
//# sourceMappingURL=task1.js.map