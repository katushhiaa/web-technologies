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

function renderProduct(list) {
    productList.innerHTML = '';

    if (list.length === 0) {
        emptyMessage.style.display = 'block';
        renderFilters(list);
        updateTotalPrice(list);
        return;
    }

    emptyMessage.style.display = 'none';

    list.forEach((product, index) => {
        const card = document.createElement('div');
        card.className = 'product';
        card.innerHTML = `
          <p><strong>ID:</strong> ${product.id}</p>
          <p><strong>Назва:</strong> ${product.name}</p>
          <p><strong>Ціна:</strong> ${product.price} грн</p>
          <p><strong>Категорія:</strong> ${product.category}</p>
          <img src="${product.image}" alt="${product.name}" />
          <div class="actions">
            <button onclick="editProduct(${index})">Редагувати</button>
            <button onclick="deleteProduct(${index})">Видалити</button>
          </div>
        `;
        productList.appendChild(card);
    });

    renderFilters(list);
    updateTotalPrice(list);
}

productForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const editedIndex = productForm.dataset.editIndex;
    const now = new Date();
    const product = {
        id: editedIndex !== undefined ? products[editedIndex].id : Date.now(),
        name: productForm.name.value.trim(),
        price: parseFloat(productForm.price.value),
        category: productForm.category.value.trim(),
        image: productForm.image.value.trim(),
        createdAt: editedIndex !== undefined ? products[editedIndex].createdAt : now,
        updatedAt: now
    };


    if (editedIndex !== undefined) {
        products[editedIndex] = product;
        showToast(`Оновлено товар ID ${product.id}: ${product.name}`);
        delete productForm.dataset.editIndex;
    } else {
        products.push(product);
        showToast(`Додано новий товар: ${product.name}`);
    }

    closeModalWindow();
    renderProduct(products);
});

function deleteProduct(index) {
    const card = productList.children[index];
    if (!card) return;

    card.classList.add('fade-out');

    setTimeout(() => {
        const deleted = products.splice(index, 1)[0];
        renderProduct(products);
        showToast(`Товар "${deleted.name}" видалено`);
    }, 300);
}

function editProduct(id) {
    const product = products[id];
    productForm.name.value = product.name;
    productForm.price.value = parseFloat(product.price);
    productForm.category.value = product.category;
    productForm.image.value = product.image;
    productForm.dataset.editIndex = id;
    modalWindow.style.display = 'flex';
    updateTotalPrice();
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

function updateTotalPrice(list) {
    const total = list.reduce((sum, p) => sum + p.price, 0);
    document.getElementById('total-price').textContent = `Загальна вартість: ${total} грн`;
}

function renderFilters(list) {
    const filtersContainer = document.getElementById('filters');
    const categories = [...new Set(list.map(p => p.category))];

    if (categories.length === 0) {
        filtersContainer.innerHTML = '';
        return;
    }

    filtersContainer.innerHTML = categories
        .map(cat => `<button onclick="filterByCategory('${cat}')">${cat}</button>`)
        .join('') + `<button onclick="clearFilter()">Скинути фільтр</button>`;
}

function filterByCategory(category) {
    const filtered = products.filter(p => p.category === category);
    renderFilteredProducts(filtered);
}

function renderFilteredProducts(list) {
    productList.innerHTML = '';

    if (list.length === 0) {
        productList.innerHTML = '<p class="empty">Немає товарів у цій категорії</p>';
        return;
    }

    list.forEach((product, index) => {
        const card = document.createElement('div');
        card.className = 'product';
        card.innerHTML = `
      <p><strong>ID:</strong> ${product.id}</p>
      <p><strong>Назва:</strong> ${product.name}</p>
      <p><strong>Ціна:</strong> ${product.price} грн</p>
      <p><strong>Категорія:</strong> ${product.category}</p>
      <img src="${product.image}" alt="${product.name}" />
      <div class="actions">
        <button onclick="editProduct(${index})">Редагувати</button>
        <button onclick="deleteProduct(${index})">Видалити</button>
      </div>
    `;
        productList.appendChild(card);
    });
}

function clearFilter() {
    renderProduct(products);
}

function sortByPrice(){
    products.sort((a, b) => a.price - b.price);
    renderProduct(products)
}

function sortByCreated(){
    products.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    renderProduct(products);
}

function sortByUpdated(){
    products.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
    renderProduct(products);
}

function resetSort() {
    products.sort((a, b) => a.id - b.id);
    renderProduct(products);
}
