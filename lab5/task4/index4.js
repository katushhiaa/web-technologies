const products = new Map();
let productId = 1;

const orders = new Set()

const changeHistory = new WeakMap;

const users = new WeakSet

function addProduct(name, price, quantity){
    const product = {id : productId++, name, price, quantity};
    products.set(product.id, product);
    changeHistory.set(product, [`Створено: ${new Date().toLocaleString()}`]);
    log(`Продукт додано: ${name}`);
}

function removeProduct(id) {
    if (products.has(id)) {
        const product = products.get(id);
        products.delete(id);
        log(`Продукт видалено: ${product.name}`);
    } else {
        log(`Продукт з ID ${id} не знайдено`);
    }
}

function updateProduct(id, price, quantity) {
    if (products.has(id)) {
        const product = products.get(id);
        product.price = price;
        product.quantity = quantity;
        changeHistory.get(product).push(`Оновлено: ${new Date().toLocaleString()}`);
        log(`Продукт оновлено: ${product.name}`);
    } else{
        log(`Продукт з ID ${id} не знайдено`);
    }
}

function searchProduct(name) {
    for (let product of products.values()) {
        if (product.name.toLowerCase() === name.toLowerCase()) {
            log(`Знайдено: ${product.name}, Ціна: ${product.price}, Кількість: ${product.quantity}`);
            return;
        }
    }
    log(`Продукт "${name}" не знайдено`);
}

function placeOrder(productId, quantity, user) {
    if (products.has(productId)) {
        const product = products.get(productId);
        if (product.quantity >= quantity) {
            product.quantity -= quantity;
            orders.add({ user, productId, quantity, date: new Date() });
            log(`Замовлення оформлено на ${quantity} шт. продукту "${product.name}"`);
        } else {
            log(`Недостатньо товару на складі`);
        }
    } else {
        log(`Продукт з ID ${productId} не знайдено`);
    }
    users.add(user);
}

function showChangeHistory(id) {
    if (products.has(id)) {
        const product = products.get(id);
        log(`Історія продукту "${product.name}":\n` + changeHistory.get(product).join('\n'));
    }
}

function showUsers() {
    log(`Кількість користувачів (псевдо): ${users.size || 'Неможливо отримати (WeakSet)'}`);
}

function log(text) {
    document.getElementById('output').textContent += text + '\n';
}

const user1 = { name: "Катерина" };
const user2 = { name: "Олексій" };

addProduct("Ноутбук", 25000, 10);
addProduct("Телефон", 15000, 20);
updateProduct(1, 24000, 8);
searchProduct("Ноутбук");
placeOrder(1, 2, user1);
placeOrder(2, 1, user2);
removeProduct(2);
showChangeHistory(1);