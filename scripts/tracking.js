document.addEventListener("click", function (event) {
  const affiliateLink = event.target.closest(".affiliate-button");

  if (!affiliateLink) return;

  const productCard = affiliateLink.closest(".affiliate-card");
  const collection = affiliateLink.closest("[data-collection-id]");

  const productId = productCard ? productCard.getAttribute("data-product-id") : "unknown";
  const productCategory = productCard ? productCard.getAttribute("data-product-category") : "unknown";
  const collectionId = collection ? collection.getAttribute("data-collection-id") : "none";
  const productTitle = productCard ? productCard.querySelector("h3")?.innerText : affiliateLink.innerText;

  if (typeof gtag === "function") {
    gtag("event", "affiliate_click", {
      product_id: productId,
      product_category: productCategory,
      product_title: productTitle,
      collection_id: collectionId,
      page_location: window.location.href,
      link_url: affiliateLink.href
    });
  }

  console.log("Affiliate click tracked:", {
    productId,
    productCategory,
    productTitle,
    collectionId
  });
});

document.addEventListener("click", function (event) {
  const internalLink = event.target.closest("a");

  if (!internalLink) return;
  if (internalLink.classList.contains("affiliate-button")) return;
  if (internalLink.hostname !== window.location.hostname) return;

  if (typeof gtag === "function") {
    gtag("event", "internal_link_click", {
      link_text: internalLink.innerText,
      link_url: internalLink.href,
      page_location: window.location.href
    });
  }

  console.log("Internal link tracked:", {
    text: internalLink.innerText,
    url: internalLink.href
  });
});

document.addEventListener("click", function (event) {
  const button = event.target.closest(".card a, .affiliate-button");

  if (!button) return;

  if (typeof gtag === "function") {
    gtag("event", "cta_click", {
      link_text: button.innerText,
      link_url: button.href,
      page_location: window.location.href
    });
  }

  console.log("CTA click tracked:", {
    text: button.innerText,
    url: button.href
  });
});

let scrollTracked = {
  25: false,
  50: false,
  75: false,
  90: false
};

window.addEventListener("scroll", function () {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;

  if (docHeight <= 0) return;

  const scrollPercent = Math.round((scrollTop / docHeight) * 100);

  [25, 50, 75, 90].forEach(function (mark) {
    if (scrollPercent >= mark && !scrollTracked[mark]) {
      scrollTracked[mark] = true;

      if (typeof gtag === "function") {
        gtag("event", "scroll_depth", {
          scroll_percent: mark,
          page_location: window.location.href
        });
      }

      console.log("Scroll depth tracked:", mark + "%");
    }
  });
});