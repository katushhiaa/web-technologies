//Напишіть функцію, яка приймає масив чисел і повертає суму всіх парних чисел
// у цьому масиві

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
console.log(finSumOfEvenNum(arr));