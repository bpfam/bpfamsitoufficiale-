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

        <p class="price">Prezzo: €${product.price}</p>
        <p class="total" id="total-${index}">Totale: €${product.price}</p>

        <div class="qty-box">
          <button onclick="changeQty(${index}, -1, ${product.price})">-</button>
          <span id="qty-${index}">1</span>
          <button onclick="changeQty(${index}, 1, ${product.price})">+</button>
        </div>

        <button onclick="orderTelegram('${product.name}', ${product.price}, ${index})">
          ORDER TELEGRAM
        </button>

        <button onclick="orderSignal('${product.name}', ${product.price}, ${index})">
          CONTACT SIGNAL
        </button>
      </div>
    `;
  });
}

function changeQty(index, amount, price) {
  const qtyElement = document.getElementById(`qty-${index}`);
  const totalElement = document.getElementById(`total-${index}`);

  let qty = parseInt(qtyElement.innerText);
  qty += amount;

  if (qty < 1) qty = 1;

  qtyElement.innerText = qty;
  totalElement.innerText = `Totale: €${qty * price}`;
}

function orderTelegram(productName, price, index) {
  const qty = document.getElementById(`qty-${index}`).innerText;
  const total = qty * price;

  const message = `Ciao BPFAM, vorrei info su:
Prodotto: ${productName}
Quantità: ${qty}
Totale: €${total}`;

  window.open(`https://t.me/BPFAMPRIVATE_CLUB?text=${encodeURIComponent(message)}`, "_blank");
}

function orderSignal(productName, price, index) {
  const qty = document.getElementById(`qty-${index}`).innerText;
  const total = qty * price;

  const message = `Ciao BPFAM, vorrei info su:
Prodotto: ${productName}
Quantità: ${qty}
Totale: €${total}`;

  alert(message);

  window.open("https://signal.me/#eu/oVw4zH1o2XV7hvoOVNnpQYfUIsUIVJZ-yVfherXcauUzT_aecLxDzL2g7fJsIsxZ", "_blank");
}

loadProducts();