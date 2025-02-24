function findMinMax(arr) {
    let min = arr[0];
    let max = arr[0];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
        if (arr[i] < min) {
            min = arr[i];
        }
    }
    return {min, max};
}

let numArray = [1, 2, 3, 6, 10, 23];
let result = findMinMax(numArray);

console.log("Максимальне: ", result.max);
console.log("Мінімальне: ", result.min);

document.getElementById("max").innerHTML = result.max;
document.getElementById("min").innerHTML = result.min;
