"use strict";
function icecreamPriceCount() {
    var smallSize = 10;
    var bigSize = 25;
    var chocolate = 5;
    var caramel = 6;
    var berries = 10;
    var marshmallow = 5;
    var price = 0;
    var size = prompt("Оберіть розмір: 1 - Малий (10 грн), 2 - Великий (25 грн)");
    switch (size) {
        case "1":
            price += smallSize;
            break;
        case "2":
            price += bigSize;
            break;
        default:
            console.log("Невірний вибір розміру!");
            return 0;
    }
    var toppings = prompt("Оберіть начинки (мінімум одну). 1 - шоколад, 2 - карамель, 3 - ягоди. Введіть через кому:");
    if (!toppings) {
        alert("Потрібно вибрати хоча б одну начинку!");
        return 0;
    }
    for (var _i = 0, toppings_1 = toppings; _i < toppings_1.length; _i++) {
        var t = toppings_1[_i];
        switch (t.trim()) {
            case "1":
                price += chocolate;
                break;
            case "2":
                price += caramel;
                break;
            case "3":
                price += berries;
                break;
            default:
        }
    }
    var marshmallows = prompt("Додати маршмелоу? (y/n)");
    if ((marshmallows === null || marshmallows === void 0 ? void 0 : marshmallows.toLowerCase()) === "y") {
        price += marshmallow;
    }
    return price;
}
var total = icecreamPriceCount();
alert("Вартість: " + total);
//# sourceMappingURL=task4.js.map