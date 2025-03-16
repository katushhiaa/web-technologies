//Створіть стрілкову функцію, яка приймає рядок як аргумент і повертає кількість
// голосних літер у цьому рядку.

const findCountOfVowelLetters = str => {
    const vowels = "аеєиіїоуюяАЕЄИІЇОУЮЯaeiouAEIOU"
    let count = 0

    for( let i = 0, len = str.length ; i < len; i++ ) {
        if(vowels.includes(str[i])){
            count++;
        }
    }

    return count;
}

console.log(findCountOfVowelLetters("Привіт, як справи?"));
console.log(findCountOfVowelLetters("Hello, World!"));

