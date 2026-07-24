"use strict";

/*
  Backyard Chicken Planner
  Product Card Renderer

  Version: 2.0.0

  Display modes:
  - full: Standard product card used in guides and reviews
  - compact: Smaller card used in recommendation results
*/


window.renderProductCards = function (
  container = document,
  options = {}
) {
  const defaultDisplayMode =
    options.displayMode === "compact"
      ? "compact"
      : "full";

  const productSlots =
    container.querySelectorAll(
      "[data-product]"
    );

  productSlots.forEach(function (slot) {
    if (slot.dataset.rendered === "true") {
      return;
    }

    const productId =
      slot.getAttribute("data-product");

    const product =
      window.BCP_PRODUCTS &&
      window.BCP_PRODUCTS[productId];

    if (!product) {
      slot.innerHTML = `
        <div class="affiliate-card">
          <p>
            <strong>Product not found:</strong>
            ${productId}
          </p>
        </div>
      `;

      slot.dataset.rendered = "true";
      return;
    }

    /*
      A slot may choose its own display mode.

      Example:
      <div
        data-product="PRD-001"
        data-product-display="compact">
      </div>
    */

    const slotDisplayMode =
      slot.getAttribute(
        "data-product-display"
      );

    const displayMode =
      slotDisplayMode === "compact"
        ? "compact"
        : defaultDisplayMode;

    const isCompact =
      displayMode === "compact";

    const bullets =
      Array.isArray(product.bullets)
        ? product.bullets
            .map(function (item) {
              return `<li>${item}</li>`;
            })
            .join("")
        : "";

    const cardClass =
      isCompact
        ? "affiliate-card affiliate-card--compact"
        : "affiliate-card affiliate-card--full";

    slot.innerHTML = `
      <div class="${cardClass}"
           data-product-id="${productId}"
           data-product-category="${product.category || ""}"
           data-product-display="${displayMode}">

        ${product.badge ? `
          <span class="affiliate-badge">
            ${product.badge}
          </span>
        ` : ""}

        <h3>${product.title || "Recommended Product"}</h3>

        ${product.description ? `
          <p class="affiliate-description">
            ${product.description}
          </p>
        ` : ""}

        ${
          !isCompact && bullets
            ? `
              <ul>
                ${bullets}
              </ul>
            `
            : ""
        }

        ${
          product.url &&
          product.buttonText
            ? `
              <a class="affiliate-button"
                 href="${product.url}"
                 target="_blank"
                 rel="nofollow sponsored noopener">
                ${product.buttonText}
              </a>
            `
            : ""
        }

        ${
          !isCompact && product.note
            ? `
              <p class="affiliate-note">
                ${product.note}
              </p>
            `
            : ""
        }

      </div>
    `;

    slot.dataset.rendered = "true";
  });
};


window.createProductSlot = function (
  productId,
  displayMode = "full"
) {
  const slot =
    document.createElement("div");

  slot.setAttribute(
    "data-product",
    productId
  );

  slot.setAttribute(
    "data-product-display",
    displayMode
  );

  return slot;
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

  container.classList.add(
    "recommended-product-grid"
  );

  productIds.forEach(function (productId) {
    const productSlot =
      window.createProductSlot(
        productId,
        "compact"
      );

    container.appendChild(
      productSlot
    );
  });

  window.renderProductCards(
    container,
    {
      displayMode: "compact"
    }
  );

  return productIds;
};


document.addEventListener(
  "DOMContentLoaded",
  function () {
    window.renderProductCards();
  }
);