"use strict";

/*
  Backyard Chicken Planner
  Product Card Renderer

  Version: 2.1.0

  Display modes:
  - full: Standard product card used in guides and reviews
  - tile: Small recommendation tile used in planner results
*/


window.renderProductCards = function (
  container = document,
  options = {}
) {
  const defaultDisplayMode =
    options.displayMode === "tile"
      ? "tile"
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

    const slotDisplayMode =
      slot.getAttribute(
        "data-product-display"
      );

    const displayMode =
      slotDisplayMode === "tile"
        ? "tile"
        : defaultDisplayMode;

    const isTile =
      displayMode === "tile";

    const bullets =
      Array.isArray(product.bullets)
        ? product.bullets
            .map(function (item) {
              return `<li>${item}</li>`;
            })
            .join("")
        : "";

    const cardClass =
      isTile
        ? "affiliate-card affiliate-card--tile"
        : "affiliate-card affiliate-card--full";

    const displayedBadge =
      isTile
        ? product.tileBadge ||
          "🐔 Recommended"
        : product.badge;

    const displayedDescription =
      isTile
        ? product.shortDescription ||
          product.description
        : product.description;

    const displayedButtonText =
      isTile
        ? product.tileButtonText ||
          "View Product →"
        : product.buttonText;

    slot.innerHTML = `
      <div
        class="${cardClass}"
        data-product-id="${productId}"
        data-product-category="${product.category || ""}"
        data-product-display="${displayMode}"
      >

        ${
          displayedBadge
            ? `
              <span class="affiliate-badge">
                ${displayedBadge}
              </span>
            `
            : ""
        }

        <h3>
          ${product.title || "Recommended Product"}
        </h3>

        ${
          displayedDescription
            ? `
              <p class="affiliate-description">
                ${displayedDescription}
              </p>
            `
            : ""
        }

        ${
          !isTile && bullets
            ? `
              <ul>
                ${bullets}
              </ul>
            `
            : ""
        }

        ${
          product.url
            ? `
              <a
                class="affiliate-button"
                href="${product.url}"
                target="_blank"
                rel="nofollow sponsored noopener"
              >
                ${displayedButtonText}
              </a>
            `
            : ""
        }

        ${
          !isTile && product.note
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
        "tile"
      );

    container.appendChild(
      productSlot
    );
  });

  window.renderProductCards(
    container,
    {
      displayMode: "tile"
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