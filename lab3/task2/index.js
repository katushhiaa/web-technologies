// Напишіть програму, яка використовує цикл for, щоб обчислити факторіал будьякого введеного користувачем числа.

let factNum = parseInt(prompt("Введіть число, факторіал якого ви хочете знайти "));

function findFactorial(factNum){
    if (factNum < 0) return "Факторіал не визначений для від’ємних чисел";
    let factorial = 1;
    for (let i = 1; i <= factNum; i++) {
        factorial *= i
    }
    return factorial;

}

console.log(findFactorial(factNum));

