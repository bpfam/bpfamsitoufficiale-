async function loadProducts() {
  const response = await fetch("data/products.json");
  const products = await response.json();

  const container = document.getElementById("products");
  container.innerHTML = "";

  products.forEach((product, index) => {
    container.innerHTML += `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="price">${product.price}</p>

        <div class="qty-box">
          <button onclick="changeQty(${index}, -1)">-</button>
          <span id="qty-${index}">1</span>
          <button onclick="changeQty(${index}, 1)">+</button>
        </div>

        <button onclick="orderTelegram('${product.name}', '${product.price}', ${index})">
          ORDER TELEGRAM
        </button>

        <button onclick="orderSignal('${product.name}', '${product.price}', ${index})">
          CONTACT SIGNAL
        </button>
      </div>
    `;
  });
}

function changeQty(index, amount) {
  const qtyElement = document.getElementById(`qty-${index}`);
  let qty = parseInt(qtyElement.innerText);

  qty += amount;

  if (qty < 1) {
    qty = 1;
  }

  qtyElement.innerText = qty;
}

function orderTelegram(productName, price, index) {
  const qty = document.getElementById(`qty-${index}`).innerText;

  const message = `Ciao BPFAM, vorrei info su:
Prodotto: ${productName}
Quantità: ${qty}
Prezzo/Menu: ${price}`;

  const telegramUrl = `https://t.me/BPFAMPRIVATE_CLUB?text=${encodeURIComponent(message)}`;

  window.open(telegramUrl, "_blank");
}

function orderSignal(productName, price, index) {
  const qty = document.getElementById(`qty-${index}`).innerText;

  const message = `Ciao BPFAM, vorrei info su:
Prodotto: ${productName}
Quantità: ${qty}
Prezzo/Menu: ${price}`;

  alert(message);

  window.open("https://signal.me/#eu/oVw4zH1o2XV7hvoOVNnpQYfUIsUIVJZ-yVfherXcauUzT_aecLxDzL2g7fJsIsxZ", "_blank");
}

loadProducts();