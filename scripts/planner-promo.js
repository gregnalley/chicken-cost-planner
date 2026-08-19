"use strict";

(function initializePlannerPromo() {

  const STORAGE_KEY =
    "bcpPlannerPromoClosedUntil";

  const DISMISS_DAYS =
    30;

  const PLANNER_PAGE =
    "printable-backyard-chicken-planner.html";

  const PROMO_IMAGE =
    "assets/images/backyard-chicken-planner-floating-promo.webp";

  const currentPage =
    window.location.pathname
      .split("/")
      .pop()
      .toLowerCase();

  if (
    currentPage ===
    PLANNER_PAGE.toLowerCase()
  ) {
    return;
  }

  const closedUntil =
    Number(
      localStorage.getItem(
        STORAGE_KEY
      )
    );

  if (
    closedUntil &&
    Date.now() < closedUntil
  ) {
    return;
  }

  const promo =
    document.createElement(
      "div"
    );

  promo.className =
    "bcp-planner-promo";

  promo.innerHTML = `
    <a
      class="bcp-planner-promo__link"
      href="${PLANNER_PAGE}"
      aria-label="View the 92-page Backyard Chicken Planner"
    >
      <img
        class="bcp-planner-promo__image"
        src="${PROMO_IMAGE}"
        alt="92-page Backyard Chicken Planner for $9.99"
      >
    </a>

    <button
      class="bcp-planner-promo__close"
      type="button"
      aria-label="Close planner promotion"
    >
      ×
    </button>
  `;

  document.body.appendChild(
    promo
  );

  const closeButton =
    promo.querySelector(
      ".bcp-planner-promo__close"
    );

  closeButton?.addEventListener(
    "click",
    function () {

      const closeUntil =
        Date.now() +
        (
          DISMISS_DAYS *
          24 *
          60 *
          60 *
          1000
        );

      localStorage.setItem(
        STORAGE_KEY,
        String(
          closeUntil
        )
      );

      promo.remove();

    }
  );

})();