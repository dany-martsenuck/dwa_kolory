// This script loads the products from the CSV file and renders them on the page.

const loadProducts = async () => {
    try {
        const response = await fetch('products.csv');
        const data = await response.text();
        const lines = data.trim().split(/\r?\n/);
        const productTypes = new Set();

        lines.forEach(line => {
            const [imageUrl, productName, price, productType] = line.split(',');
            productTypes.add(productType);
        });

        // Add product types to the filter dropdown
        const filter = document.getElementById('product-type-filter');
        productTypes.forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            option.innerText = type;
            filter.appendChild(option);
        });

        filter.addEventListener('change', () => {
            const selectedType = filter.value;
            renderProducts(selectedType);
        });

        renderProducts('all');
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

// This function renders the product cards on the page.

const renderProducts = (selectedType) => {
    const container = document.getElementById('product-container');
    container.innerHTML = '';

    fetch('products.csv')
        .then(response => response.text())
        .then(data => {
            const lines = data.trim().split(/\r?\n/);

            lines.forEach(line => {
                const [imageUrl, productName, price, productType] = line.split(',');
                if (selectedType === 'all' || selectedType === productType) {
                    const productCard = createProductCard(imageUrl, productName, price, productType);

                    const quantityInput = document.createElement('input');
                    quantityInput.type = 'number';
                    quantityInput.min = 1;
                    quantityInput.value = 1;

                    productCard.appendChild(quantityInput);
                }
            });
        });
};

// This function creates a product card.

const createProductCard = (imageUrl, productName, price, productType) => {
    const container = document.getElementById('product-container');
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    const productImage = document.createElement('img');
    productImage.src = imageUrl;
    productImage.alt = productName;
    productImage.classList.add('product-image');

    const productNameElem = document.createElement('h2');
    productNameElem.innerText = productName;

    const priceElem = document.createElement('p');
    priceElem.innerText = `$${price}`;

    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.min = 1;
    quantityInput.value = 1;

    productCard.appendChild(productImage);
    productCard.appendChild(productNameElem);
    productCard.appendChild(priceElem);
    productCard.appendChild(quantityInput);

    return productCard;
};

// This function adds the product to the cart.

const addProductToCart = (productCard) => {
    const quantityInput = productCard.querySelector('input');
    const quantity = quantityInput.value;

    const product = {
        name: productCard.querySelector('h2').innerText,
        price: productCard.querySelector('p').innerText,
        quantity: quantity,
    };

    const cartItems = document.getElementById('cart-items');
    const cartItem = document.createElement('li');
    cartItem.innerText = `${product.name} (${product.quantity})`;

    cartItems.appendChild(cartItem);
};

// This function handles the click event on the product card.

const handleProductCardClick = (event) => {
    const productCard = event.target;
    addProductToCart(productCard);
};

// This function initializes the cart.

const initCart = () => {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
};

document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    initCart();

    // Add event listeners to the product cards.
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(productCard => {
        productCard.addEventListener('click', handleProductCardClick);
    });
});
