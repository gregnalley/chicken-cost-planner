function loadScript(src) {
  return new Promise(function (resolve, reject) {
    const script = document.createElement("script");
    script.src = src;
    script.onload = resolve;
    script.onerror = function () {
      reject(new Error("Failed to load script: " + src));
    };
    document.body.appendChild(script);
  });
}

async function loadSiteScripts() {
  try {
    await loadScript("assets/data/products.js");
    await loadScript("assets/data/collections.js");
    await loadScript("assets/data/messages.js");

    await loadScript("scripts/load-components.js");
    await loadScript("scripts/recommendation-engine.js");
    await loadScript("scripts/feed-crop-recommendation-context.js")
    await loadScript("scripts/product-loader.js");
    await loadScript("scripts/collection-loader.js");
    await loadScript("scripts/message-loader.js");
    await loadScript("scripts/calculator-effects.js");
    await loadScript("scripts/tracking.js");

    if (typeof loadNavigation === "function") loadNavigation();
    if (typeof loadFooter === "function") loadFooter();
    if (typeof loadHealthDisclaimer === "function") loadHealthDisclaimer();
    if (typeof renderCollections === "function") renderCollections();
    if (typeof window.renderProductCards === "function") window.renderProductCards();

   const recommendedProductsContainer =
  document.getElementById(
    "recommended-products"
  );

console.log(
  "Recommendation container:",
  recommendedProductsContainer
);

console.log(
  "Loaded PRD-001:",
  window.BCP_PRODUCTS &&
    window.BCP_PRODUCTS["PRD-001"]
);

console.log(
  "Loaded PRD-002:",
  window.BCP_PRODUCTS &&
    window.BCP_PRODUCTS["PRD-002"]
);

console.log(
  "PRD-002 testMarker:",
  window.BCP_PRODUCTS &&
    window.BCP_PRODUCTS["PRD-002"] &&
    window.BCP_PRODUCTS["PRD-002"].testMarker
);

console.log(
  "PRD-002 recommendationData:",
  window.BCP_PRODUCTS &&
    window.BCP_PRODUCTS["PRD-002"] &&
    window.BCP_PRODUCTS["PRD-002"].recommendationData
);

console.log(
  "Loaded PRD-001 recommendationData:",
  window.BCP_PRODUCTS &&
    window.BCP_PRODUCTS["PRD-001"] &&
    window.BCP_PRODUCTS["PRD-001"]
      .recommendationData
);

console.log(
  "Products with recommendationData:",
  Object.entries(
    window.BCP_PRODUCTS || {}
  )
    .filter(function (entry) {
      const product =
        entry[1];

      return Boolean(
        product &&
        product.recommendationData
      );
    })
    .map(function (entry) {
      return entry[0];
    })
);

if (
  recommendedProductsContainer &&
  typeof window.renderRecommendedProducts ===
    "function"
) {
  const recommendationResults =
    window.renderRecommendedProducts(
      recommendedProductsContainer,
      {
        pageTypes: [
          "best-chicken-feeders"
        ]
      }
    );

  console.log(
    "Recommendation results:",
    recommendationResults
  );
}



  } catch (error) {
    console.error("Site script loading error:", error);
  }
}

loadSiteScripts();