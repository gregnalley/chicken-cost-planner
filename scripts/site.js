function loadScript(src) {
  return new Promise(function(resolve, reject) {
    const script = document.createElement("script");
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

async function loadSiteScripts() {
  await loadScript("scripts/load-components.js");

  await loadScript("assets/data/products.js");
  await loadScript("assets/data/collections.js");

  await loadScript("scripts/product-loader.js");
  await loadScript("scripts/collection-loader.js");

  await loadScript("scripts/tracking.js");
}

loadSiteScripts();