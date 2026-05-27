let cart = [];
let currentCategory = "ALL";

async function loadProducts() {

  const response = await fetch("data/products.json");
  const products = await response.json();

  window.productsData = products;

  renderCategories(products);
  renderProducts(products);

}

function renderCategories(products) {

  const categoriesBox =
    document.getElementById("categories");

  const categories = [
    "ALL",
    ...new Set(products.map(product => product.category))
  ];

  categoriesBox.innerHTML = "";

  categories.forEach(category => {

    categoriesBox.innerHTML += `
      <button onclick="filterCategory('${category}')">
        ${category}
      </button>
    `;

  });

}

function filterCategory(category) {

  currentCategory = category;

  renderProducts(window.productsData);

}

function renderProducts(products) {

  const container =
    document.getElementById("products");

  container.innerHTML = "";

  let filteredProducts = products;

  if (currentCategory !== "ALL") {
    filteredProducts = products.filter(
      product => product.category === currentCategory
    );
  }

  filteredProducts.forEach((product, index) => {

    const realIndex =
      window.productsData.indexOf(product);

    const firstVariant =
      product.variants[0];

    container.innerHTML += `
      <div class="product-card">

        <img src="${product.image}" alt="${product.name}">

        <h3>${product.name}</h3>

        <select id="variant-${realIndex}"
          onchange="updateTotal(${realIndex})">

          ${product.variants.map((variant, i) => `
            <option value="${i}">
              ${variant.size} - €${variant.price}
            </option>
          `).join("")}

        </select>

        <p id="price-${realIndex}">
          Prezzo: €${firstVariant.price}
        </p>

        <p id="total-${realIndex}">
          Totale: €${firstVariant.price}
        </p>

        <div class="qty-box">

          <button onclick="changeQty(${realIndex}, -1)">
            -
          </button>

          <span id="qty-${realIndex}">
            1
          </span>

          <button onclick="changeQty(${realIndex}, 1)">
            +
          </button>

        </div>

        <button onclick="addToCart(${realIndex})">
          ADD TO CART
        </button>

        <button onclick="orderTelegram(${realIndex})">
          ORDER TELEGRAM
        </button>

        <button onclick="orderSignal(${realIndex})">
          CONTACT SIGNAL
        </button>

      </div>
    `;

  });

}

function getVariant(index) {

  const variantIndex =
    document.getElementById(`variant-${index}`).value;

  return window.productsData[index]
    .variants[variantIndex];

}

function updateTotal(index) {

  const variant =
    getVariant(index);

  const qty =
    parseInt(
      document.getElementById(`qty-${index}`).innerText
    );

  const total =
    variant.price * qty;

  document.getElementById(`price-${index}`).innerText =
    `Prezzo: €${variant.price}`;

  document.getElementById(`total-${index}`).innerText =
    `Totale: €${total}`;

}

function changeQty(index, amount) {

  const qtyEl =
    document.getElementById(`qty-${index}`);

  let qty =
    parseInt(qtyEl.innerText);

  qty += amount;

  if (qty < 1) qty = 1;

  qtyEl.innerText = qty;

  updateTotal(index);

}

function addToCart(index) {

  const product =
    window.productsData[index];

  const variant =
    getVariant(index);

  const qty =
    parseInt(
      document.getElementById(`qty-${index}`).innerText
    );

  const total =
    variant.price * qty;

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
        ${item.name} •
        ${item.size} •
        x${item.qty}
        = €${item.total}
      </p>
    `;

  });

  cartTotal.innerText =
    `Totale finale: €${finalTotal}`;

}

function orderTelegram(index) {

  const product =
    window.productsData[index];

  const variant =
    getVariant(index);

  const qty =
    parseInt(
      document.getElementById(`qty-${index}`).innerText
    );

  const total =
    variant.price * qty;

  const text =
`Ciao BPFAM, vorrei info su:

Prodotto: ${product.name}
Formato: ${variant.size}
Quantità: ${qty}
Totale: €${total}`;

  navigator.clipboard.writeText(text);

  alert(
`Ordine copiato.

Ora incollalo nella chat Telegram BPFAM.`
  );

  window.location.href =
    "https://t.me/BPFAMPRIVATE_CLUB";

}

function orderSignal(index) {

  const product =
    window.productsData[index];

  const variant =
    getVariant(index);

  const qty =
    parseInt(
      document.getElementById(`qty-${index}`).innerText
    );

  const total =
    variant.price * qty;

  const text =
`Ciao BPFAM, vorrei info su:

Prodotto: ${product.name}
Formato: ${variant.size}
Quantità: ${qty}
Totale: €${total}`;

  navigator.clipboard.writeText(text);

  alert(
`Ordine copiato.

Ora incollalo nella chat Signal.`
  );

  window.location.href =
    "https://signal.me/#eu/oVw4zH1o2XV7hvoOVNnpQYfUIsUIVJZ-yVfherXcauUzT_aecLxDzL2g7fJsIsxZ";

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

  message +=
`\nTotale finale: €${finalTotal}`;

  navigator.clipboard.writeText(message);

  alert(
`Carrello copiato.

Ora incollalo nella chat Telegram BPFAM.`
  );

  window.location.href =
    "https://t.me/BPFAMPRIVATE_CLUB";

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

  message +=
`\nTotale finale: €${finalTotal}`;

  navigator.clipboard.writeText(message);

  alert(
`Carrello copiato.

Ora incollalo nella chat Signal.`
  );

  window.location.href =
    "https://signal.me/#eu/oVw4zH1o2XV7hvoOVNnpQYfUIsUIVJZ-yVfherXcauUzT_aecLxDzL2g7fJsIsxZ";

}

loadProducts();