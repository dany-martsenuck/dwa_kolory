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
    let total = 0;

    cart.forEach((item, index) => {
        total += parseFloat(item.price) * item.quantity;

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

        const decreaseButton = document.createElement('button');
        decreaseButton.innerText = '-';
        decreaseButton.classList.add('quantity-btn', 'quantity-decrease');
        decreaseButton.onclick = () => decreaseQuantity(index);

        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.value = item.quantity;
        quantityInput.min = 1;
        quantityInput.classList.add('quantity-input');
        quantityInput.onchange = (e) => updateQuantity(index, e.target);

        const increaseButton = document.createElement('button');
        increaseButton.innerText = '+';
        increaseButton.classList.add('quantity-btn', 'quantity-increase');
        increaseButton.onclick = () => increaseQuantity(index);

        quantityWrapper.appendChild(decreaseButton);
        quantityWrapper.appendChild(quantityInput);
        quantityWrapper.appendChild(increaseButton);

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.classList.add('delete-item-btn');
        deleteButton.onclick = () => deleteItem(index);

        cartItem.appendChild(productImage);
        cartItem.appendChild(productNameElem);
        cartItem.appendChild(productPrice);
        cartItem.appendChild(quantityWrapper);
        cartItem.appendChild(deleteButton);

        cartContainer.appendChild(cartItem);
    });

    document.getElementById('cart-total-value').innerText = total.toFixed(2);
}

function decreaseQuantity(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
}

function increaseQuantity(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity++;
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
}

function updateQuantity(index, input) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity = parseInt(input.value, 10);
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
