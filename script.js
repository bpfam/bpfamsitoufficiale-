async function loadProducts() {
  const response = await fetch("data/products.json");
  const products = await response.json();

  const container = document.getElementById("products");
  container.innerHTML = "";

  products.forEach(product => {
    container.innerHTML += `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.price}</p>
        <button>ORDER</button>
      </div>
    `;
  });
}

loadProducts();