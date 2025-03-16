//Створіть програму, яка використовує конструкцію switch, щоб приймати
// введене користувачем число від 1 до 12 і виводить відповідний місяць року.

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
console.log(getMonthName(monthNum));
