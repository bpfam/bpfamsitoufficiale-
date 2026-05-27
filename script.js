async function loadProducts() {
  const response = await fetch("data/products.json");
  const products = await response.json();

  const container = document.getElementById("products");
  container.innerHTML = "";

  products.forEach((product, index) => {
    const firstVariant = product.variants[0];

    container.innerHTML += `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}">

        <h3>${product.name}</h3>

        <label>Formato:</label>
        <select id="variant-${index}" onchange="updateTotal(${index})">
          ${product.variants.map((v, i) => `
            <option value="${i}">
              ${v.size} - €${v.price}
            </option>
          `).join("")}
        </select>

        <p id="price-${index}">Prezzo: €${firstVariant.price}</p>
        <p id="total-${index}">Totale: €${firstVariant.price}</p>

        <div class="qty-box">
          <button onclick="changeQty(${index}, -1)">-</button>
          <span id="qty-${index}">1</span>
          <button onclick="changeQty(${index}, 1)">+</button>
        </div>

        <button onclick="orderTelegram(${index})">ORDER TELEGRAM</button>
        <button onclick="orderSignal(${index})">CONTACT SIGNAL</button>
      </div>
    `;
  });

  window.productsData = products;
}

function getSelectedVariant(index) {
  const product = window.productsData[index];
  const variantIndex = document.getElementById(`variant-${index}`).value;
  return product.variants[variantIndex];
}

function updateTotal(index) {
  const variant = getSelectedVariant(index);
  const qty = parseInt(document.getElementById(`qty-${index}`).innerText);
  const total = variant.price * qty;

  document.getElementById(`price-${index}`).innerText = `Prezzo: €${variant.price}`;
  document.getElementById(`total-${index}`).innerText = `Totale: €${total}`;
}

function changeQty(index, amount) {
  const qtyEl = document.getElementById(`qty-${index}`);
  let qty = parseInt(qtyEl.innerText);

  qty += amount;
  if (qty < 1) qty = 1;

  qtyEl.innerText = qty;
  updateTotal(index);
}

function orderTelegram(index) {
  const product = window.productsData[index];
  const variant = getSelectedVariant(index);
  const qty = parseInt(document.getElementById(`qty-${index}`).innerText);
  const total = variant.price * qty;

  const message = `Ciao BPFAM, vorrei info su:
Prodotto: ${product.name}
Formato: ${variant.size}
Quantità: ${qty}
Totale: €${total}`;

  window.open(`https://t.me/BPFAMPRIVATE_CLUB?text=${encodeURIComponent(message)}`, "_blank");
}

function orderSignal(index) {
  const product = window.productsData[index];
  const variant = getSelectedVariant(index);
  const qty = parseInt(document.getElementById(`qty-${index}`).innerText);
  const total = variant.price * qty;

  const message = `Ciao BPFAM, vorrei info su:
Prodotto: ${product.name}
Formato: ${variant.size}
Quantità: ${qty}
Totale: €${total}`;

  alert(message);

  window.open("https://signal.me/#eu/oVw4zH1o2XV7hvoOVNnpQYfUIsUIVJZ-yVfherXcauUzT_aecLxDzL2g7fJsIsxZ", "_blank");
}

loadProducts();