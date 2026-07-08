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

    await loadScript("scripts/load-components.js");
    await loadScript("scripts/product-loader.js");
    await loadScript("scripts/collection-loader.js");
    await loadScript("scripts/tracking.js");

    if (typeof loadNavigation === "function") loadNavigation();
    if (typeof loadFooter === "function") loadFooter();
    if (typeof loadHealthDisclaimer === "function") loadHealthDisclaimer();
    if (typeof renderCollections === "function") renderCollections();
    if (typeof window.renderProductCards === "function") window.renderProductCards();

  } catch (error) {
    console.error("Site script loading error:", error);
  }
}

loadSiteScripts();