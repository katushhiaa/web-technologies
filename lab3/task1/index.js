//Напишіть програму, яка використовує цикл while, щоб знайти суму перших 50
// натуральних чисел.

function findSum(){
    let i = 1;
    let sum = 0;
    while(i <= 50){
        sum += i;
        i++;
    }
    return sum;
}

console.log(findSum());