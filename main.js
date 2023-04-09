document.querySelector('html').style.scrollBehavior = 'smooth';
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  header.style.backgroundPositionY = `-${window.scrollY / 2}px`;
});


async function loadProducts() {
    try {
        const response = await fetch('https://docs.google.com/spreadsheets/d/{ID}/gviz/tq?tqx=out:csv');
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

    fetch('https://docs.google.com/spreadsheets/d/{ID}/gviz/tq?tqx=out:csv')
        .then(response => response.text())
        .then(data => {
            const lines = data.trim().split(/\r?\n/);

            lines.forEach(line => {
                const [imageUrl, productName, price, productType] = line.split(',');
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
}

loadProducts();
