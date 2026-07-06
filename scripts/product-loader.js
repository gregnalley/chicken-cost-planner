document.addEventListener("DOMContentLoaded", function () {
  const productSlots = document.querySelectorAll("[data-product]");

  productSlots.forEach(function (slot) {
    const productId = slot.getAttribute("data-product");
    const product = BCP_PRODUCTS[productId];

    if (!product) {
      slot.innerHTML = `
        <div class="affiliate-card">
          <p><strong>Product not found:</strong> ${productId}</p>
        </div>
      `;
      return;
    }

    const bullets = product.bullets
      .map(function (item) {
        return `<li>${item}</li>`;
      })
      .join("");

    slot.innerHTML = `
      <div class="affiliate-card" data-product-id="${productId}" data-product-category="${product.category}">
        <span class="affiliate-badge">${product.badge}</span>

        <h3>${product.title}</h3>

        <p>${product.description}</p>

        <ul>
          ${bullets}
        </ul>

        <a class="affiliate-button"
           href="${product.url}"
           target="_blank"
           rel="nofollow sponsored noopener">
          ${product.buttonText}
        </a>

        <p class="affiliate-note">${product.note}</p>
      </div>
    `;
  });
});