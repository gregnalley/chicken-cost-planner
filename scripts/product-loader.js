window.renderProductCards = function (container = document) {
  const productSlots = container.querySelectorAll("[data-product]");

  productSlots.forEach(function (slot) {
    if (slot.dataset.rendered === "true") return;

    const productId = slot.getAttribute("data-product");
    const product = BCP_PRODUCTS[productId];

    if (!product) {
      slot.innerHTML = `
        <div class="affiliate-card">
          <p><strong>Product not found:</strong> ${productId}</p>
        </div>
      `;
      slot.dataset.rendered = "true";
      return;
    }

    const bullets = Array.isArray(product.bullets)
  ? product.bullets
      .map(function (item) {
        return `<li>${item}</li>`;
      })
      .join("")
  : "";

    slot.innerHTML = `
  <div class="affiliate-card"
       data-product-id="${productId}"
       data-product-category="${product.category}">

    ${product.badge ? `
      <span class="affiliate-badge">
        ${product.badge}
      </span>
    ` : ""}

    <h3>${product.title}</h3>

    ${product.description ? `
      <p>${product.description}</p>
    ` : ""}

    ${bullets ? `
      <ul>
        ${bullets}
      </ul>
    ` : ""}

    ${product.url && product.buttonText ? `
      <a class="affiliate-button"
         href="${product.url}"
         target="_blank"
         rel="nofollow sponsored noopener">
        ${product.buttonText}
      </a>
    ` : ""}

    ${product.note ? `
      <p class="affiliate-note">
        ${product.note}
      </p>
    ` : ""}

  </div>
`;

    slot.dataset.rendered = "true";
  });
};

window.renderRecommendedProducts = function (
  container,
  context,
  options = {}
) {
  if (!container) {
    console.warn(
      "Recommended Products: No container was provided."
    );

    return [];
  }

  if (
    !window.BCPRecommendationEngine ||
    typeof window.BCPRecommendationEngine
      .getRecommendationIds !== "function"
  ) {
    console.warn(
      "Recommended Products: Recommendation engine was not found."
    );

    return [];
  }

  const productIds =
    window.BCPRecommendationEngine
      .getRecommendationIds(
        context,
        options
      );

  container.innerHTML = "";

  productIds.forEach(function (productId) {
    const productSlot =
      document.createElement("div");

    productSlot.setAttribute(
      "data-product",
      productId
    );

    container.appendChild(productSlot);
  });

  window.renderProductCards(container);

  return productIds;
};

document.addEventListener("DOMContentLoaded", function () {
  window.renderProductCards();
});