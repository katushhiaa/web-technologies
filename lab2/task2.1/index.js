function  ifNumberInRange(num, startOfRange, endOfRange){
    return num >= startOfRange && num <= endOfRange;
}

let number = 25;
let start = 1;
let end = 20;
let result = ifNumberInRange(number, start, end);
console.log(result)
document.getElementById("result").innerText = `Число ${number} в діапазоні ${start} - ${end}: ${result}`;;
