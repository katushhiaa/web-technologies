//Напишіть функцію, яка приймає два аргументи - числа base та exponent, і
// повертає результат піднесення числа base до степеня exponent

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

console.log(raiseToPower(5,2))
console.log(raiseToPower2(5,2))