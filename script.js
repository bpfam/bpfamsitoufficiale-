let cart = [];

async function loadProducts() {

  const response = await fetch("data/products.json");
  const products = await response.json();

  window.productsData = products;

  const container = document.getElementById("products");

  container.innerHTML = "";

  products.forEach((product, index) => {

    const firstVariant = product.variants[0];

    container.innerHTML += `
      <div class="product-card">

        <img src="${product.image}" alt="${product.name}">

        <h3>${product.name}</h3>

        <select id="variant-${index}" onchange="updateTotal(${index})">

          ${product.variants.map((variant, i) => `
            <option value="${i}">
              ${variant.size} - €${variant.price}
            </option>
          `).join("")}

        </select>

        <p id="price-${index}">
          Prezzo: €${firstVariant.price}
        </p>

        <p id="total-${index}">
          Totale: €${firstVariant.price}
        </p>

        <div class="qty-box">

          <button onclick="changeQty(${index}, -1)">
            -
          </button>

          <span id="qty-${index}">
            1
          </span>

          <button onclick="changeQty(${index}, 1)">
            +
          </button>

        </div>

        <button onclick="addToCart(${index})">
          ADD TO CART
        </button>

      </div>
    `;

  });

}

function getVariant(index) {

  const variantIndex =
    document.getElementById(`variant-${index}`).value;

  return window.productsData[index].variants[variantIndex];

}

function updateTotal(index) {

  const variant = getVariant(index);

  const qty =
    parseInt(document.getElementById(`qty-${index}`).innerText);

  const total = variant.price * qty;

  document.getElementById(`price-${index}`).innerText =
    `Prezzo: €${variant.price}`;

  document.getElementById(`total-${index}`).innerText =
    `Totale: €${total}`;

}

function changeQty(index, amount) {

  const qtyEl =
    document.getElementById(`qty-${index}`);

  let qty = parseInt(qtyEl.innerText);

  qty += amount;

  if (qty < 1) qty = 1;

  qtyEl.innerText = qty;

  updateTotal(index);

}

function addToCart(index) {

  const product = window.productsData[index];

  const variant = getVariant(index);

  const qty =
    parseInt(document.getElementById(`qty-${index}`).innerText);

  const total = variant.price * qty;

  cart.push({
    name: product.name,
    size: variant.size,
    qty: qty,
    total: total
  });

  renderCart();

}

function renderCart() {

  const cartItems =
    document.getElementById("cart-items");

  const cartTotal =
    document.getElementById("cart-total");

  cartItems.innerHTML = "";

  let finalTotal = 0;

  cart.forEach(item => {

    finalTotal += item.total;

    cartItems.innerHTML += `
      <p>
        ${item.name} • ${item.size} • x${item.qty}
        = €${item.total}
      </p>
    `;

  });

  cartTotal.innerText =
    `Totale finale: €${finalTotal}`;

}

function checkoutTelegram() {

  let message =
`Ciao BPFAM, vorrei info su:\n\n`;

  let finalTotal = 0;

  cart.forEach(item => {

    finalTotal += item.total;

    message +=
`${item.name} • ${item.size} • x${item.qty} = €${item.total}\n`;

  });

  message += `\nTotale finale: €${finalTotal}`;

  const url =
`https://t.me/share/url?url=&text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");

}

function checkoutSignal() {

  let message =
`Ciao BPFAM, vorrei info su:\n\n`;

  let finalTotal = 0;

  cart.forEach(item => {

    finalTotal += item.total;

    message +=
`${item.name} • ${item.size} • x${item.qty} = €${item.total}\n`;

  });

  message += `\nTotale finale: €${finalTotal}`;

  alert(message);

  window.open(
    "https://signal.me/#eu/oVw4zH1o2XV7hvoOVNnpQYfUIsUIVJZ-yVfherXcauUzT_aecLxDzL2g7fJsIsxZ",
    "_blank"
  );

}

loadProducts();