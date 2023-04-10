document.querySelector('html').style.scrollBehavior = 'smooth';
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  header.style.backgroundPositionY = `-${window.scrollY / 2}px`;
});

async function loadProducts() {
    try {
        const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vQ4uRg4A0Qssyeek5pTJgWgSGN8Fe4jWTm94oLFlKzfhfF53OcHCvJ-WEDLWYTMp28swx7tS2Tc6juD/pub?output=csv');
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
}

function renderProducts(selectedType) {
    const container = document.getElementById('product-container');
    container.innerHTML = '';

    fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vQ4uRg4A0Qssyeek5pTJgWgSGN8Fe4jWTm94oLFlKzfhfF53OcHCvJ-WEDLWYTMp28swx7tS2Tc6juD/pub?output=csv')
        .then(response => response.text())
        .then(data => {
            const lines = data.trim().split(/\r?\n/);
            const products = lines.slice(1); // Remove the first line (column headers)

            products.forEach(product => {
                const [imageUrl, productName, price, productType] = product.split(',');
                if (selectedType === 'all' || selectedType === productType) {
                    createProductCard(imageUrl, productName, price, productType);
                }
            });
        });
}

function createProductCard(imageUrl, productName, price, productType) {
    const container = document.getElementById('product-container');
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    const productImage = document.createElement('img');
    productImage.src = imageUrl;
    productImage.alt = productName;
    productImage.classList.add('product-image');

    const productNameElem = document.createElement('h2');
    productNameElem.innerText = productName;

    const productPrice = document.createElement('p');
    productPrice.innerText = `$${price}`;

    productCard.appendChild(productImage);
    productCard.appendChild(productNameElem);
    productCard.appendChild(productPrice);

    container.appendChild(productCard);

    const addToCartButton = document.createElement('button');
    addToCartButton.innerText = 'Add to Cart';
    addToCartButton.classList.add('add-to-cart-button');
    addToCartButton.addEventListener('click', () => {
        const cartItem = {
            imageUrl,
            productName,
            price,
            productType
        };
        addToCart(cartItem);
    });

    productCard.appendChild(addToCartButton);
    container.appendChild(productCard);
}

function addToCart(item) {
    let cart = localStorage.getItem('cart');
    cart = cart ? JSON.parse(cart) : [];

    const existingItem = cart.find((cartItem) => cartItem.productName === item.productName);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        item.quantity = 1;
        cart.push(item);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}


loadProducts();
