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
                    createProductCard(imageUrl, productName, price, productType);
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
