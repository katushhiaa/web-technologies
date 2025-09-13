function icecreamPriceCount():number {
    const smallSize: number = 10;
    const bigSize: number = 25;

    const chocolate: number = 5;
    const caramel: number = 6;
    const berries: number = 10;
    const marshmallow:number = 5;

    let price: number = 0;

    const size = prompt("Оберіть розмір: 1 - Малий (10 грн), 2 - Великий (25 грн)");
    switch (size){
        case "1":
            price+=smallSize;
            break
        case "2":
            price+=bigSize;
            break
        default:
            console.log("Невірний вибір розміру!");
            return 0
    }

    const toppings = prompt("Оберіть начинки (мінімум одну). 1 - шоколад, 2 - карамель, 3 - ягоди. Введіть через кому:");
    if (!toppings) {
        alert("Потрібно вибрати хоча б одну начинку!");
        return 0;
    }

    for (const t of toppings) {
        switch (t.trim()){
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

    const marshmallows = prompt("Додати маршмелоу? (y/n)");
    if (marshmallows?.toLowerCase() === "y") {
        price += marshmallow;
    }

    return price
}

const total = icecreamPriceCount();
alert("Вартість: " + total);