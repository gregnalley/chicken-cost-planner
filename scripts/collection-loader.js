document.addEventListener("DOMContentLoaded", function () {
  const collectionSlots = document.querySelectorAll("[data-collection]");

  collectionSlots.forEach(function (slot) {
    const collectionId = slot.getAttribute("data-collection");
    const collection = BCP_COLLECTIONS[collectionId];

    if (!collection) {
      slot.innerHTML = `
        <p><strong>Collection not found:</strong> ${collectionId}</p>
      `;
      return;
    }

    const productCards = collection.products
      .map(function (productId) {
        return `<div data-product="${productId}"></div>`;
      })
      .join("");

    slot.innerHTML = `
      <h2>${collection.title}</h2>
      <p>${collection.description}</p>
      ${productCards}
    `;
  });

  setTimeout(function () {
    if (typeof window.renderProductCards === "function") {
      window.renderProductCards();
    }
  }, 50);
});