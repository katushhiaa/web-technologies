interface Animal {
    name: string;
    age: number;
    canFly?: boolean;
    canWalk?: boolean;
    canSwim?: boolean

    move(): void;
    makeSound(): void;
}

class Cat implements Animal {
    name: string;
    age: number;
    canWalk = true;

    constructor(name: string, age: number, canFly = true) {
        this.name = name;
        this.age = age;
    }

    move(): void {
        console.log(`${this.name} walks.`);
    }

    makeSound(): void {
        console.log(`${this.name} says: "Meow".`);
    }
}

class Bird implements Animal {
    name: string;
    age: number;
    canFly = true;

    constructor(name: string, age: number, canFly = true) {
        this.name = name;
        this.age = age;
    }
    move(): void {
        console.log(`${this.name} flies in the sky.`);
    }

    makeSound(): void {
        console.log(`${this.name} says: Цвірінь!.`);
    }
}

class Fish implements Animal {
    name: string;
    age: number;
    canSwim = true;

    constructor(name: string, age: number, canFly = true) {
        this.name = name;
        this.age = age;
    }

    move(): void {
        console.log(`${this.name} swim in the sea.`);
    }

    makeSound(): void {
        console.log(`${this.name} makes bubbles`)
    }
}

const cat = new Cat("Льолік",5,true)
cat.move()
cat.makeSound();

const bird = new Bird("Parrot",1,true)
bird.move()
bird.makeSound();

const fish = new Fish("Nemo",2,true)
fish.makeSound();
fish.move()