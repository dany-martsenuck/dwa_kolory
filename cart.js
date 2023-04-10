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
        quantityWrapper.classList.add('quantity-controls');

        const decreaseBtn = document.createElement('button');
        decreaseBtn.classList.add('quantity-button');
        decreaseBtn.innerText = '-';
        decreaseBtn.onclick = () => decreaseQuantity(index);

        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.classList.add('quantity-input');
        quantityInput.value = item.quantity;
        quantityInput.min = 1;
        quantityInput.onchange = (event) => updateQuantity(index, event.target);

        const increaseBtn = document.createElement('button');
        increaseBtn.classList.add('quantity-button');
        increaseBtn.innerText = '+';
        increaseBtn.onclick = () => increaseQuantity(index);

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('remove-item-btn');
        deleteBtn.innerText = 'Remove';
        deleteBtn.onclick = () => deleteItem(index);

        quantityWrapper.appendChild(decreaseBtn);
        quantityWrapper.appendChild(quantityInput);
        quantityWrapper.appendChild(increaseBtn);

        cartItem.appendChild(productImage);
        cartItem.appendChild(productNameElem);
        cartItem.appendChild(productPrice);
        cartItem.appendChild(quantityWrapper);
        cartItem.appendChild(deleteBtn);

        cartContainer.appendChild(cartItem);
    });

    document.getElementById('cart-total-value').innerText = total.toFixed(2);

    const checkoutBtn = document.getElementById('checkout-btn');
    checkoutBtn.addEventListener('click', () => {
        alert('Thank you for your purchase!');
        localStorage.removeItem('cart');
        location.reload();
    });
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
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const newValue = parseInt(input.value, 10);
    if (newValue >= 1) {
        cart[index].quantity = newValue;
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
    } else {
        input.value = cart[index].quantity;
    }
}

function deleteItem(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
}
