// 1
function findSum(){
    let i = 1;
    let sum = 0;
    while(i <= 50){
        sum += i;
        i++;
    }
    return sum;
}

console.log("1) ", findSum());

//2
let factNum = parseInt(prompt("Введіть число, факторіал якого ви хочете знайти "));

function findFactorial(factNum){
    if (factNum < 0) return "Факторіал не визначений для від’ємних чисел";
    let factorial = 1;
    for (let i = 1; i <= factNum; i++) {
        factorial *= i
    }
    return factorial;

}

console.log("2) ",findFactorial(factNum));

//3
function getMonthName(monthNum) {
    switch (monthNum) {
        case 1:
            return "Січень";
        case 2:
            return "Лютий";
        case 3:
            return "Березень";
        case 4:
            return "Квітень";
        case 5:
            return "Травень";
        case 6:
            return "Червень";
        case 7:
            return "Липень";
        case 8:
            return "Серпень";
        case 9:
            return "Вересень";
        case 10:
            return "Жовтень";
        case 11:
            return "Листопад";
        case 12:
            return "Грудень";
        default:
            return "Такого місяця не існує";
    }
}

let monthNum = parseInt(prompt("Введіть номер місяця:"), 10);
console.log("3) ",getMonthName(monthNum));

//4
function finSumOfEvenNum(array){
    let sum = 0;

    for(let i = 0; i < array.length; i++){
        if(array[i] % 2 === 0){
            sum += array[i];
        }
    }
    return sum;
}

let arr = [2,6,8,9,11,63,64,25,36]
console.log("4) ",finSumOfEvenNum(arr));

//5
const findCountOfVowelLetters = str => {
    const vowels = "аеєиіїоуюяАЕЄИІЇОУЮЯaeiouAEIOU"
    let count = 0

    for( let i = 0; i < str.length; i++ ) {
        if(vowels.includes(str[i])){
            count++;
        }
    }

    return count;
}

console.log("5) ",findCountOfVowelLetters("Привіт, як справи?"));
console.log("5) ",findCountOfVowelLetters("Hello, World!"));

//6
function raiseToPower(base, exponent){
    return Math.pow(base, exponent);
}

function raiseToPower2(base, exponent){
    let result = 1;
    for(let i = 0; i < exponent; i++){
        result *= base
    }
    return result;
}

console.log("6) ",raiseToPower(5,2))
console.log("6) ",raiseToPower2(5,2))