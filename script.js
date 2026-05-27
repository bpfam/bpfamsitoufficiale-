async function loadProducts() {
  const response = await fetch("data/products.json");
  const products = await response.json();

  const container = document.getElementById("products");
  container.innerHTML = "";

  products.forEach((product, index) => {
    container.innerHTML += `
      <div class="product-card">
        <img src="${product.image}">
        <h3>${product.name}</h3>
        <p>Formato: ${product.size}</p>
        <p>Prezzo: €${product.price}</p>
        <p id="total-${index}">Totale: €${product.price}</p>

        <div class="qty-box">
          <button onclick="changeQty(${index}, -1, ${product.price})">-</button>
          <span id="qty-${index}">1</span>
          <button onclick="changeQty(${index}, 1, ${product.price})">+</button>
        </div>
      </div>
    `;
  });
}

function changeQty(index, amount, price) {
  const qtyEl = document.getElementById(`qty-${index}`);
  const totalEl = document.getElementById(`total-${index}`);

  let qty = parseInt(qtyEl.innerText);
  qty = qty + amount;

  if (qty < 1) qty = 1;

  qtyEl.innerText = qty;
  totalEl.innerText = `Totale: €${qty * price}`;
}

loadProducts();