const products = [];
const productList = document.getElementById('product-list');
const emptyMessage = document.getElementById('empty-message');
const modalWindow = document.getElementById('modal-window');
const productForm = document.getElementById('product-form');

document.getElementById("add-product-btn").addEventListener('click', (e) => {
    modalWindow.style.display = 'flex';
})

function closeModalWindow(){
    modalWindow.style.display = 'none';
    productForm.reset()
}

function renderProduct(){
    productList.innerHTML = '';

    if(products.length === 0){
        emptyMessage.style.display = 'block';
        return
    }

    emptyMessage.style.display = 'none';

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product'
        card.innerHTML = `
        <strong>ID:</strong> ${product.id}<br>
        <strong>Назва:</strong> ${product.name}<br>
        <strong>Ціна:</strong> ${product.price} грн<br>
        <strong>Категорія:</strong> ${product.category}<br>
        <img src="${product.image}" alt="${product.name}" width="100%">
      `;
        productList.appendChild(card);
    });
}

productForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const product = {
        id: Date.now(),
        name: productForm.name.value.trim(),
        price: parseFloat(productForm.price.value),
        category: productForm.category.value.trim(),
        image: productForm.image.value.trim()
    };

    products.push(product);
    closeModalWindow();
    renderProduct();
})
