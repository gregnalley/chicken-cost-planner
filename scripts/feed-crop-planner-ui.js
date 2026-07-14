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

    renderCropRegistrationReport();
    renderCropValidationReport();

  }

   function renderCropRegistrationReport() {
  const summaryElement =
    document.getElementById(
      "crop-registration-summary"
    );

  const detailsElement =
    document.getElementById(
      "crop-registration-details"
    );

  if (
    !namespace.data ||
    typeof namespace.data
      .getRegistrationReport !== "function"
  ) {
    if (summaryElement) {
      summaryElement.textContent =
        "Crop data adapter is unavailable.";

      summaryElement.className =
        "foundation-status foundation-status-error";
    }

    return;
  }

  const report =
    namespace.data.getRegistrationReport();

  if (summaryElement) {
    summaryElement.textContent =
      report.registered
        ? `${report.uniqueIdCount} unique crop records registered successfully.`
        : "The crop database could not be registered.";

    summaryElement.className =
      report.registered
        ? "foundation-status foundation-status-success"
        : "foundation-status foundation-status-error";
  }

  if (!detailsElement) {
    return;
  }

  detailsElement.innerHTML = `
    <div class="test-card-grid">

      <div class="test-card">
        <strong>Records Received</strong>
        ${report.totalRecordsReceived}
      </div>

      <div class="test-card">
        <strong>Unique Crop IDs</strong>
        ${report.uniqueIdCount}
      </div>

      <div class="test-card">
        <strong>Expected IDs Found</strong>
        ${report.expectedIdsFound.length}
      </div>

      <div class="test-card">
        <strong>Expected IDs Missing</strong>
        ${report.expectedIdsMissing.length}
      </div>

    </div>

    ${
      report.warnings.length > 0
        ? `
          <h3>Registration Warnings</h3>

          <ul>
            ${report.warnings
              .map(
                warning =>
                  `<li>${warning}</li>`
              )
              .join("")}
          </ul>
        `
        : `
          <p>
            No registration warnings were found.
          </p>
        `
    }
  `;
}

function renderCropValidationReport() {
  const summaryElement =
    document.getElementById(
      "crop-validation-summary"
    );

  const resultsElement =
    document.getElementById(
      "crop-validation-results"
    );

  if (
    !namespace.engine ||
    typeof namespace.engine
      .validateRegisteredCrops !== "function"
  ) {
    if (summaryElement) {
      summaryElement.textContent =
        "Crop validator is unavailable.";

      summaryElement.className =
        "foundation-status foundation-status-error";
    }

    return;
  }

  const validation =
    namespace.engine.validateRegisteredCrops();

  if (summaryElement) {
    summaryElement.textContent =
      `${validation.validCrops} of ${validation.totalCrops} crops are currently planner-ready.`;

    /*
      An invalid result is expected during this session,
      so use the warning style rather than implying that
      the development foundation itself has failed.
    */
    summaryElement.className =
      validation.valid
        ? "foundation-status foundation-status-success"
        : "foundation-status";
  }

  if (!resultsElement) {
    return;
  }

  resultsElement.innerHTML =
    validation.results
      .map(result => {
        return `
          <div class="test-card" style="margin-bottom:14px;">

            <strong>
              ${result.cropName || result.cropId}
            </strong>

            <p>
              Crop ID:
              <code>${result.cropId || "Missing"}</code>
            </p>

            <p>
              Planner Status:
              ${
                result.valid
                  ? "✅ Ready"
                  : "⚠ Not Ready"
              }
            </p>

            ${
              result.errors.length > 0
                ? `
                  <h4>Errors</h4>

                  <ul>
                    ${result.errors
                      .map(
                        error =>
                          `<li>${error}</li>`
                      )
                      .join("")}
                  </ul>
                `
                : ""
            }

            ${
              result.warnings.length > 0
                ? `
                  <h4>Warnings</h4>

                  <ul>
                    ${result.warnings
                      .map(
                        warning =>
                          `<li>${warning}</li>`
                      )
                      .join("")}
                  </ul>
                `
                : ""
            }

          </div>
        `;
      })
      .join("");
}

  namespace.ui = Object.freeze({
    initializeDevelopmentPage,
    renderCropRegistrationReport,
    renderCropValidationReport
  });

})(window);