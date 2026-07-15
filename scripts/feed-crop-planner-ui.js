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
    renderSunflowerSampleTests();
    renderSampleProfileList();
    renderMultiCropSampleTests();

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

function renderSunflowerSampleTests() {
  const summaryElement =
    document.getElementById(
      "sunflower-test-summary"
    );

  const resultsElement =
    document.getElementById(
      "sunflower-test-results"
    );

  if (
    !namespace.engine ||
    typeof namespace.engine
      .runSunflowerSampleTests !==
      "function"
  ) {
    if (summaryElement) {
      summaryElement.textContent =
        "Sunflower test engine is unavailable.";

      summaryElement.className =
        "foundation-status foundation-status-error";
    }

    return;
  }

  const testRun =
    namespace.engine
      .runSunflowerSampleTests();

  if (!testRun.success) {
    if (summaryElement) {
      summaryElement.textContent =
        testRun.error ||
        "Sunflower tests could not run.";

      summaryElement.className =
        "foundation-status foundation-status-error";
    }

    return;
  }

  if (summaryElement) {
    summaryElement.textContent =
      `${testRun.profileCount} Sunflower profile tests completed successfully.`;

    summaryElement.className =
      "foundation-status foundation-status-success";
  }

  if (!resultsElement) {
    return;
  }

  resultsElement.innerHTML =
    testRun.results
      .map(result => {
        const categoryChips =
          Object.entries(
            result.categoryResults
          )
            .map(
              ([category, categoryResult]) => {
                const score =
                  Number.isFinite(
                    categoryResult.score
                  )
                    ? Math.round(
                        categoryResult.score
                      )
                    : "N/A";

                return `
                  <span class="test-score-chip">
                    ${category}: ${score}
                  </span>
                `;
              }
            )
            .join("");

        const usePaths =
          result.usePathResults
            .map(usePath => {
              const failureClass =
                usePath.hardFailure
                  ? " use-path-failure"
                  : "";

              return `
                <div class="use-path-test-card${failureClass}">

                  <strong>
                    ${usePath.label}
                  </strong>

                  <p>
                    Score:
                    ${Math.round(usePath.score)}
                  </p>

                  <p>
                    Status:
                    ${
                      usePath.hardFailure
                        ? "❌ Hard Failure"
                        : "✅ Eligible"
                    }
                  </p>

                  ${
                    usePath.strengths.length > 0
                      ? `
                        <p>
                          <strong>Strengths:</strong>
                          ${usePath.strengths.join(" ")}
                        </p>
                      `
                      : ""
                  }

                  ${
                    usePath.limitations.length > 0
                      ? `
                        <p>
                          <strong>Limitations:</strong>
                          ${usePath.limitations.join(" ")}
                        </p>
                      `
                      : ""
                  }

                  ${
                    usePath.hardFailures.length > 0
                      ? `
                        <p>
                          <strong>Failures:</strong>
                          ${usePath.hardFailures.join(" ")}
                        </p>
                      `
                      : ""
                  }

                </div>
              `;
            })
            .join("");

        return `
          <article class="sunflower-test-result">

            <h3>
              ${result.profileLabel}
            </h3>

            <p>
              <strong>Overall Sunflower Score:</strong>
              ${result.finalScore}%
            </p>

            <p>
              <strong>Tier:</strong>
              ${
                result.tier?.label ||
                "Unavailable"
              }
            </p>

            <p>
              <strong>Confidence:</strong>
              ${
                result.confidenceLabel
                  ?.label ||
                "Unavailable"
              }
              (${result.confidenceScore}%)
            </p>

            <p>
              <strong>Best Use Path:</strong>
              ${
                result.bestUsePath
                  ?.label ||
                "No eligible use path"
              }
            </p>

            <div class="test-score-row">
              ${categoryChips}
            </div>

            <p>
              <strong>Wildlife Penalty:</strong>
              ${result.wildlife.penalty} points
            </p>

            <h4>Use-Path Results</h4>

            ${usePaths}

          </article>
        `;
      })
      .join("");
}

function renderMultiCropSampleTests() {
  const summaryElement =
    document.getElementById(
      "multi-crop-test-summary"
    );

  const resultsElement =
    document.getElementById(
      "multi-crop-test-results"
    );

  if (
    !namespace.engine ||
    typeof namespace.engine
      .runMultiCropSampleTests !==
      "function"
  ) {
    if (summaryElement) {
      summaryElement.textContent =
        "Multi-crop test engine is unavailable.";

      summaryElement.className =
        "foundation-status foundation-status-error";
    }

    return;
  }

  const testRun =
    namespace.engine
      .runMultiCropSampleTests();

  if (!testRun.success) {
    if (summaryElement) {
      summaryElement.textContent =
        testRun.error ||
        "Multi-crop tests could not run.";

      summaryElement.className =
        "foundation-status foundation-status-error";
    }

    return;
  }

  if (summaryElement) {
    summaryElement.textContent =
      `${testRun.cropCount} crops were compared across ${testRun.profileCount} sample profiles.`;

    summaryElement.className =
      "foundation-status foundation-status-success";
  }

  if (!resultsElement) {
    return;
  }

  resultsElement.innerHTML =
    testRun.results
      .map(profileResult => {
        const cropCards =
          profileResult.cropResults
            .map(
              (cropResult, index) => {
                const bestUsePath =
                  cropResult.bestUsePath
                    ?.label ||
                  "No eligible use path";

                const tierLabel =
                  cropResult.tier
                    ?.label ||
                  "Unavailable";

                const categoryChips =
                  Object.entries(
                    cropResult
                      .categoryResults
                  )
                    .map(
                      ([
                        category,
                        result
                      ]) => {
                        const score =
                          Number.isFinite(
                            result.score
                          )
                            ? Math.round(
                                result.score
                              )
                            : "N/A";

                        return `
                          <span class="test-score-chip">
                            ${category}: ${score}
                          </span>
                        `;
                      }
                    )
                    .join("");

                return `
                  <div class="multi-crop-card">

                    <h4>
                      #${index + 1}
                      ${cropResult.cropName}
                    </h4>

                    <p>
                      <strong>Overall Score:</strong>
                      ${cropResult.finalScore}%
                    </p>

                    <p>
                      <strong>Tier:</strong>
                      ${tierLabel}
                    </p>

                    <p>
                      <strong>Best Use Path:</strong>
                      ${bestUsePath}
                    </p>

                    <p>
                      <strong>Wildlife Penalty:</strong>
                      ${cropResult.wildlife.penalty}
                    </p>

                    <div class="test-score-row">
                      ${categoryChips}
                    </div>

                  </div>
                `;
              }
            )
            .join("");

        return `
          <article class="multi-profile-result">

            <h3>
              ${profileResult.profileLabel}
            </h3>

            <div class="multi-crop-ranking">
              ${cropCards}
            </div>

          </article>
        `;
      })
      .join("");
}

function renderSampleProfileList() {
  const summaryElement =
    document.getElementById(
      "sample-profile-summary"
    );

  const listElement =
    document.getElementById(
      "sample-profile-list"
    );

  const profiles =
    namespace.config
      ?.testing
      ?.sampleUserProfiles ||
    [];

  if (summaryElement) {
    summaryElement.textContent =
      `${profiles.length} sample profiles are currently loaded.`;

    summaryElement.className =
      profiles.length === 13
        ? "foundation-status foundation-status-success"
        : "foundation-status";
  }

  if (!listElement) {
    return;
  }

  if (profiles.length === 0) {
    listElement.innerHTML =
      "<p>No sample profiles were found.</p>";

    return;
  }

  listElement.innerHTML = `
    <ol>
      ${profiles
        .map(profile => {
          return `
            <li>
              <strong>
                ${profile.label || "Unnamed profile"}
              </strong>
              <br>
              <code>
                ${profile.id || "Missing ID"}
              </code>
            </li>
          `;
        })
        .join("")}
    </ol>
  `;
}

  namespace.ui = Object.freeze({
    initializeDevelopmentPage,
    renderCropRegistrationReport,
    renderCropValidationReport,
    renderSunflowerSampleTests,
    renderSampleProfileList,
    renderMultiCropSampleTests
  });

})(window);