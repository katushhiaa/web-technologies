interface Shape{
    getArea(): number;
    getPerimeter(): number;
    scale(factor: number): void;
}

class Circle implements Shape{
    radius: number;

    constructor(radius: number){
        this.radius = radius;
    }

    getArea(): number {
        return Math.PI * this.radius * this.radius;
    }

    getPerimeter(): number {
        return 2 * Math.PI * this.radius;
    }

    scale(factor: number): void {
        this.radius *= factor;
    }
}

class Rectangle implements Shape{
    width: number;
    height: number;

    constructor(width: number, height: number){
        this.width = width;
        this.height = height;
    }

    getArea(): number {
        return this.width * this.width;
    }

    getPerimeter(): number {
        return 2 * (this.width + this.width);
    }

    scale(factor: number): void {
        this.width *= factor;
        this.height *= factor;
    }
}

class Triangle implements Shape{
    a: number;
    b: number;
    c: number

    constructor(a: number, b: number, c: number) {
        if (a + b <= c || a + c <= b || b + c <= a) {
            throw new Error("Недопустимі довжини сторін для трикутника.");
        }
        this.a = a;
        this.b = b;
        this.c = c;
    }

    getArea(): number {
        const s = this.getPerimeter() / 2; // напівпериметр
        return Math.sqrt(s * (s - this.a) * (s - this.b) * (s - this.c));
    }

    getPerimeter(): number {
        return this.a + this.b + this.c;
    }

    scale(factor: number): void {
        this.a *= factor;
        this.b *= factor;
        this.c *= factor
    }
}

const shapes: Shape[] = [
    new Circle(5),
    new Rectangle(4,6),
    new Triangle(5,4,3)
]

shapes[0].scale(2)
shapes[1].scale(0.5)

let totalArea = 0;
let totalPerimeter = 0;

for (const shape of shapes) {
    totalArea += shape.getArea();
    totalPerimeter += shape.getPerimeter();
}

console.log("Загальна площа:", totalArea.toFixed(2));
console.log("Загальний периметр:", totalPerimeter.toFixed(2));