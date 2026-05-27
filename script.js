async function loadProducts() {
  const response = await fetch("data/products.json");
  const products = await response.json();

  const container = document.getElementById("products");
  container.innerHTML = "";
  window.productsData = products;

  products.forEach((product, index) => {
    const firstVariant = product.variants[0];

    container.innerHTML += `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>

        <select id="variant-${index}" onchange="updateTotal(${index})">
          ${product.variants.map((v, i) => `
            <option value="${i}">${v.size} - €${v.price}</option>
          `).join("")}
        </select>

        <p id="price-${index}">Prezzo: €${firstVariant.price}</p>
        <p id="total-${index}">Totale: €${firstVariant.price}</p>

        <div class="qty-box">
          <button onclick="changeQty(${index}, -1)">-</button>
          <span id="qty-${index}">1</span>
          <button onclick="changeQty(${index}, 1)">+</button>
        </div>
      </div>
    `;
  });
}

function getSelectedVariant(index) {
  const variantIndex = document.getElementById(`variant-${index}`).value;
  return window.productsData[index].variants[variantIndex];
}

function updateTotal(index) {
  const variant = getSelectedVariant(index);
  const qty = parseInt(document.getElementById(`qty-${index}`).innerText);
  document.getElementById(`price-${index}`).innerText = `Prezzo: €${variant.price}`;
  document.getElementById(`total-${index}`).innerText = `Totale: €${variant.price * qty}`;
}

function changeQty(index, amount) {
  const qtyEl = document.getElementById(`qty-${index}`);
  let qty = parseInt(qtyEl.innerText) + amount;
  if (qty < 1) qty = 1;
  qtyEl.innerText = qty;
  updateTotal(index);
}

loadProducts();