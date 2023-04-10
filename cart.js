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

    let total = 0;

    cart.forEach((item) => {
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

        const productQuantity = document.createElement('p');
        productQuantity.innerText = `Quantity: ${item.quantity}`;

        cartItem.appendChild(productImage);
        cartItem.appendChild(productNameElem);
        cartItem.appendChild(productPrice);
        cartItem.appendChild(productQuantity);

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
