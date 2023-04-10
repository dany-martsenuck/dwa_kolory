const cartContainer = document.getElementById('cart-container');
const cartTotal = document.getElementById('cart-total');
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCart() {
    cartContainer.innerHTML = '';

    cart.forEach((item, index) => {
        cartContainer.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div>
                    <h3>${item.name}</h3>
                    <p>${item.price} USD</p>
                    <div class="quantity-wrapper">
                        <button class="quantity-btn quantity-decrease" onclick="decreaseQuantity(${index})">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this)">
                        <button class="quantity-btn quantity-increase" onclick="increaseQuantity(${index})">+</button>
                    </div>
                    <button class="delete-item-btn" onclick="deleteItem(${index})">Delete</button>
                </div>
            </div>
        `;
    });

    let total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    cartTotal.innerHTML = `${total.toFixed(2)} USD`;

    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateQuantity(index, input) {
    let newQuantity = parseInt(input.value);
    if (isNaN(newQuantity) || newQuantity <= 0) {
        input.value = cart[index].quantity;
        return;
    }

    cart[index].quantity = newQuantity;
    updateCart();
}

function increaseQuantity(index) {
    cart[index].quantity++;
    updateCart();
}

function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
        updateCart();
    }
}

function deleteItem(index) {
    cart.splice(index, 1);
    updateCart();
}

updateCart();
