
function getSeason (month){
    if (month >= 1 && month <= 12) {
        if (month === 12 || month <= 2) {
            return 'Зима';
        } else if (month >= 3 && month <= 5) {
            return 'Весна';
        } else if (month >= 6 && month <= 8) {
            return 'Літо';
        } else {
            return "Осінь";
        }
    } else {
            return "Такого місяця не існує"
    }
}


/* ?
const getSeason = (month) =>
    month < 1 || month > 12 ? "Некоректний номер місяця" :
        month === 12 || month <= 2 ? 'Зима' :
        month >= 3 && month <= 5 ? 'Весна':
        month >= 6 && month <= 8 ? 'Літо':
             "Осінь";
*/

console.log(getSeason(2))
console.log(getSeason(12))
console.log(getSeason(6))
console.log(getSeason(5))
console.log(getSeason(11))