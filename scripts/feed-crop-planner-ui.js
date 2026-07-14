"use strict";

/*
  Backyard Chicken Planner
  Chicken Feed Crop Planner User Interface

  Work Session 1:
  - Creates the UI namespace
  - Provides a small development initialization function
  - Does not create the public questionnaire yet
*/

(function initializeFeedCropPlannerUI(global) {

  const namespace =
    global.BCPFeedCropPlanner =
      global.BCPFeedCropPlanner || {};

  function initializeDevelopmentPage() {
    const statusElement =
      document.getElementById(
        "planner-foundation-status"
      );

    const detailsElement =
      document.getElementById(
        "planner-foundation-details"
      );

    if (
      !namespace.engine ||
      typeof namespace.engine
        .getFoundationStatus !== "function"
    ) {
      if (statusElement) {
        statusElement.textContent =
          "Planner engine was not loaded.";
        statusElement.className =
          "foundation-status foundation-status-error";
      }

      return;
    }

    const status =
      namespace.engine.getFoundationStatus();

    if (statusElement) {
      statusElement.textContent =
        status.ready
          ? "Planner development foundation loaded successfully."
          : "Planner foundation has one or more problems.";

      statusElement.className =
        status.ready
          ? "foundation-status foundation-status-success"
          : "foundation-status foundation-status-error";
    }

    if (detailsElement) {
      detailsElement.innerHTML =
        status.checks
          .map(check => {
            const icon =
              check.passed ? "✅" : "❌";

            return `
              <li>
                ${icon} ${check.label}
              </li>
            `;
          })
          .join("");
    }

    const versionElement =
      document.getElementById(
        "planner-version"
      );

    if (versionElement) {
      versionElement.textContent =
        status.plannerVersion || "Unavailable";
    }

    const schemaElement =
      document.getElementById(
        "planner-schema-version"
      );

    if (schemaElement) {
      schemaElement.textContent =
        status.cropSchemaVersion ||
        "Unavailable";
    }
  }

  namespace.ui = Object.freeze({
    initializeDevelopmentPage
  });

})(window);