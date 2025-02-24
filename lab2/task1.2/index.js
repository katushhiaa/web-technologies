function compareObjects(obj1, obj2) {
    const object1 = Object.keys(obj1);
    const object2 = Object.keys(obj2);

    if (object1.length !== object2.length) {
        return false;
    }

    for(let key of object1) {
        if (obj1[key] !== obj2[key]) {
            return false;
        }
    }
    return true;

}

const objA = { name: "Анна", age: 25 };
const objB = { name: "Анна", age: 25 };
const objC = { name: "Карина", age: 30 };

console.log(compareObjects(objA, objB));
console.log(compareObjects(objA, objC));