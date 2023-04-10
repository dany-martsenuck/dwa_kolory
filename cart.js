document.addEventListener('DOMContentLoaded', () => {
    displayCartItems();
});

function displayCartItems() {
    const cartContainer = document.getElementById('cart-container');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cartContainer.innerHTML = '';

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        const productImage = document.createElement('img');
        productImage.src = item.imageUrl;
        productImage.alt = item.productName;
        productImage.classList.add('product-image');

        const productNameElem = document.createElement('h2');
        productNameElem.innerText = item.productName;

        const productPrice = document.createElement('p');
        productPrice.innerText = `$${item.price}`;

        const quantityWrapper = document.createElement('div');
        quantityWrapper.classList.add('quantity-wrapper');

        const decreaseBtn = document.createElement('button');
        decreaseBtn.innerText = '-';
        decreaseBtn.classList.add('quantity-btn', 'quantity-decrease');
        decreaseBtn.onclick = () => decreaseQuantity(index);

        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.value = item.quantity;
        quantityInput.min = 1;
        quantityInput.classList.add('quantity-input');
        quantityInput.onchange = () => updateQuantity(index, quantityInput);

        const increaseBtn = document.createElement('button');
        increaseBtn.innerText = '+';
        increaseBtn.classList.add('quantity-btn', 'quantity-increase');
        increaseBtn.onclick = () => increaseQuantity(index);

        quantityWrapper.appendChild(decreaseBtn);
        quantityWrapper.appendChild(quantityInput);
        quantityWrapper.appendChild(increaseBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Delete';
        deleteBtn.classList.add('delete-item-btn');
        deleteBtn.onclick = () => deleteItem(index);

        cartItem.appendChild(productImage);
        cartItem.appendChild(productNameElem);
        cartItem.appendChild(productPrice);
        cartItem.appendChild(quantityWrapper);
        cartItem.appendChild(deleteBtn);

        cartContainer.appendChild(cartItem);
    });

    updateCartTotal();
}

function updateCartTotal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;

    cart.forEach(item => {
        total += parseFloat(item.price) * item.quantity;
    });

    document.getElementById('cart-total-value').innerText = total.toFixed(2);
}

function decreaseQuantity(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart[index].quantity > 1) {
        cart[index].quantity--;
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
    }
}

function increaseQuantity(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart[index].quantity++;
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
}

function updateQuantity(index, input) {
    const newQuantity = parseInt(input.value);
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (newQuantity > 0) {
        cart[index].quantity = newQuantity;
    } else {
        input.value = cart[index].quantity;
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
}

function deleteItem(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
}

const checkoutBtn = document.getElementById('checkout-btn');
checkoutBtn.addEventListener('click', () => {
    alert('Thank you for your purchase!');
    localStorage.removeItem('cart');
    location.reload();
});
