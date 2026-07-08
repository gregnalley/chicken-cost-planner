function renderCollections() {
  const collectionSlots = document.querySelectorAll("[data-collection]");

  collectionSlots.forEach(function (slot) {
    if (slot.dataset.rendered === "true") return;

    const collectionId = slot.getAttribute("data-collection");
    const collection = BCP_COLLECTIONS[collectionId];

    if (!collection) {
      slot.innerHTML = `
        <p><strong>Collection not found:</strong> ${collectionId}</p>
      `;
      slot.dataset.rendered = "true";
      return;
    }

    const productCards = collection.products
      .map(function (productId) {
        return `<div data-product="${productId}"></div>`;
      })
      .join("");

    slot.innerHTML = `
      <div class="section product-collection" data-collection-id="${collectionId}">
        <h2>${collection.title}</h2>
        <p>${collection.description}</p>
        ${productCards}
      </div>
    `;

    slot.dataset.rendered = "true";
  });

  if (typeof window.renderProductCards === "function") {
    window.renderProductCards();
  }
}