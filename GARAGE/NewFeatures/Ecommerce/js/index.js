fetch('/products')
  .then(response => response.json())
  .then(products => {
    const productsContainer = document.getElementById('products-container');

    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'product-card';

      const image = document.createElement('img');
      image.src = product.imageURL;
      productCard.appendChild(image);

      const title = document.createElement('h2');
      title.textContent = product.title;
      productCard.appendChild(title);

      const description = document.createElement('p');
      description.textContent = product.description;
      productCard.appendChild(description);

      productsContainer.appendChild(productCard);
    });
  })
  .catch(error => {
    console.error('Error fetching products:', error);
  });