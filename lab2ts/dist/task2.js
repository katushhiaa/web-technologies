"use strict";
class Circle {
    constructor(radius) {
        this.radius = radius;
    }
    getArea() {
        return Math.PI * this.radius * this.radius;
    }
    getPerimeter() {
        return 2 * Math.PI * this.radius;
    }
    scale(factor) {
        this.radius *= factor;
    }
}
class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    getArea() {
        return this.width * this.width;
    }
    getPerimeter() {
        return 2 * (this.width + this.width);
    }
    scale(factor) {
        this.width *= factor;
        this.height *= factor;
    }
}
class Triangle {
    constructor(a, b, c) {
        if (a + b <= c || a + c <= b || b + c <= a) {
            throw new Error("Недопустимі довжини сторін для трикутника.");
        }
        this.a = a;
        this.b = b;
        this.c = c;
    }
    getArea() {
        const s = this.getPerimeter() / 2; // напівпериметр
        return Math.sqrt(s * (s - this.a) * (s - this.b) * (s - this.c));
    }
    getPerimeter() {
        return this.a + this.b + this.c;
    }
    scale(factor) {
        this.a *= factor;
        this.b *= factor;
        this.c *= factor;
    }
}
const shapes = [
    new Circle(5),
    new Rectangle(4, 6),
    new Triangle(5, 4, 3)
];
shapes[0].scale(2);
shapes[1].scale(0.5);
let totalArea = 0;
let totalPerimeter = 0;
for (const shape of shapes) {
    totalArea += shape.getArea();
    totalPerimeter += shape.getPerimeter();
}
console.log("Загальна площа:", totalArea.toFixed(2));
console.log("Загальний периметр:", totalPerimeter.toFixed(2));
//# sourceMappingURL=task2.js.map