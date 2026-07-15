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
    renderProfileMatrix();
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

function renderProfileMatrix() {
  const summaryElement =
    document.getElementById(
      "profile-matrix-summary"
    );

  const bodyElement =
    document.getElementById(
      "profile-matrix-body"
    );

  if (
    !summaryElement ||
    !bodyElement
  ) {
    return;
  }

  const expectations =
    namespace.config
      ?.testing
      ?.profileMatrixExpectations ||
    {};

  if (
    !namespace.engine ||
    typeof namespace.engine
      .runMultiCropSampleTests !==
      "function"
  ) {
    summaryElement.textContent =
      "The shared multi-crop test engine is unavailable.";

    summaryElement.className =
      "foundation-status foundation-status-error";

    bodyElement.innerHTML = `
      <tr>
        <td colspan="7">
          Profile matrix could not run.
        </td>
      </tr>
    `;

    return;
  }

  const testRun =
    namespace.engine
      .runMultiCropSampleTests();

    // ==================================================
// Temporary Profile 4 Diagnostic
// ==================================================

const containerRentalDebug =
  testRun.results?.find(
    profileResult =>
      profileResult.profileId ===
      "PROFILE-CONTAINER-RENTAL"
  );

if (containerRentalDebug) {
  console.group(
    "PROFILE-CONTAINER-RENTAL DIAGNOSTIC"
  );

  console.table(
    containerRentalDebug.cropResults.map(
      result => ({
        crop:
          result.cropName,

        finalScore:
          result.finalScore,

        climate:
          result.categoryResults
            ?.climate?.score,

        sunlight:
          result.categoryResults
            ?.sunlight?.score,

        space:
          result.categoryResults
            ?.space?.score,

        soil:
          result.categoryResults
            ?.soil?.score,

        water:
          result.categoryResults
            ?.water?.score,

        labor:
          result.categoryResults
            ?.labor?.score,

        goals:
          result.categoryResults
            ?.goals?.score,

        lifecycleAdjustment:
          result.lifecycleAdjustment
            ?.adjustment,

        wildlifePenalty:
          result.wildlife
            ?.penalty,

        bestUsePath:
          result.bestUsePath
            ?.label ||
          "None",

        usePathScore:
          result.bestUsePath
            ?.score,

        noEligibleUsePath:
          result.noEligibleUsePath
      })
    )
  );

  const kaleDebug =
    containerRentalDebug.cropResults.find(
      result =>
        result.cropId ===
        "CROP-KALE-COLLARDS"
    );

  const sunflowerDebug =
    containerRentalDebug.cropResults.find(
      result =>
        result.cropId ===
        "CROP-SUNFLOWER"
    );

  console.log(
    "FULL KALE RESULT:",
    kaleDebug
  );

  console.log(
    "FULL SUNFLOWER RESULT:",
    sunflowerDebug
  );

  console.groupEnd();
}  

  if (!testRun.success) {
    summaryElement.textContent =
      testRun.error ||
      "Profile matrix tests could not run.";

    summaryElement.className =
      "foundation-status foundation-status-error";

    bodyElement.innerHTML = `
      <tr>
        <td colspan="7">
          Profile matrix could not run.
        </td>
      </tr>
    `;

    return;
  }

  const cropNameById = {};

  testRun.results.forEach(
    profileResult => {
      profileResult.cropResults
        .forEach(cropResult => {
          cropNameById[
            cropResult.cropId
          ] = cropResult.cropName;
        });
    }
  );

  let passCount = 0;
  let reviewCount = 0;
  let unavailableCount = 0;

  const rows =
    testRun.results
      .map(profileResult => {
        const expectation =
          expectations[
            profileResult.profileId
          ];

        const eligibleCropResults =
  profileResult.cropResults
    .filter(cropResult => {
      return (
        cropResult.finalScore > 0 &&
        cropResult.bestUsePath !== null &&
        cropResult.noEligibleUsePath !== true
      );
    });

const actualLeader =
  eligibleCropResults[0] ||
  null;

        if (!expectation) {
          unavailableCount += 1;

          return `
            <tr>

              <td>—</td>

              <td>
                <strong>
                  ${profileResult.profileLabel}
                </strong>

                <br>

                <code>
                  ${profileResult.profileId}
                </code>
              </td>

              <td class="profile-purpose">
                No matrix expectation has been defined.
              </td>

              <td class="profile-expected">
                Not configured
              </td>

              <td class="profile-actual">
                ${
                  actualLeader
                    ? `${actualLeader.cropName} (${actualLeader.finalScore}%)`
                    : "No eligible recommendation"
                }
              </td>

              <td>
                ${
                  actualLeader
                    ?.bestUsePath
                    ?.label ||
                  "Unavailable"
                }
              </td>

              <td class="profile-matrix-na">
                Not Configured
              </td>

            </tr>
          `;
        }

        const expectedTopCropIds =
          expectation
            .expectedTopCropIds ||
          [];

        const expectedTopThreeCropIds =
          expectation
            .expectedTopThreeCropIds ||
          [];

        const actualLeaderId =
          actualLeader?.cropId ||
          null;

        const actualTopThreeIds =
  eligibleCropResults
    .slice(0, 3)
    .map(result =>
      result.cropId
    );

        const leaderPasses =
          actualLeaderId &&
          expectedTopCropIds.includes(
            actualLeaderId
          );

        const expectedTopThreePresent =
          expectedTopThreeCropIds
            .filter(cropId =>
              testRun.testedCropIds
                .includes(cropId)
            )
            .every(cropId =>
              actualTopThreeIds
                .includes(cropId)
            );

        let statusLabel;
        let statusClass;

        if (leaderPasses) {
          passCount += 1;

          statusLabel =
            expectedTopThreePresent
              ? "Pass"
              : "Leader Pass";

          statusClass =
            "profile-matrix-pass";
        } else {
          reviewCount += 1;

          statusLabel =
            "Review";

          statusClass =
            "profile-matrix-review";
        }

        const expectedNames =
          expectedTopCropIds
            .map(cropId => {
              return (
                cropNameById[cropId] ||
                cropId
              );
            })
            .join(" or ");

        return `
          <tr>

            <td>
              ${expectation.profileNumber}
            </td>

            <td>
              <strong>
                ${profileResult.profileLabel}
              </strong>

              <br>

              <code>
                ${profileResult.profileId}
              </code>
            </td>

            <td class="profile-purpose">
              ${expectation.purpose}

              ${
                expectation.notes
                  ? `
                    <p>
                      <small>
                        ${expectation.notes}
                      </small>
                    </p>
                  `
                  : ""
              }
            </td>

            <td class="profile-expected">
              ${expectedNames}
            </td>

            <td class="profile-actual">
              ${
                actualLeader
                  ? `
                    <strong>
                      ${actualLeader.cropName}
                    </strong>

                    <br>

                    ${actualLeader.finalScore}%

                    <br>

                    ${
                      actualLeader
                        .tier
                        ?.label ||
                      "No tier"
                    }
                  `
                  : "Unavailable"
              }
            </td>

            <td>
              ${
                actualLeader
                  ?.bestUsePath
                  ?.label ||
                "No eligible use path"
              }
            </td>

            <td class="${statusClass}">
              ${statusLabel}
            </td>

          </tr>
        `;
      })
      .join("");

  bodyElement.innerHTML = rows;

  const totalConfigured =
    passCount + reviewCount;

  summaryElement.textContent =
    `${passCount} of ${totalConfigured} configured profile expectations currently pass. ${reviewCount} require review. ${unavailableCount} have no matrix expectation.`;

  summaryElement.className =
    reviewCount === 0 &&
    unavailableCount === 0
      ? "foundation-status foundation-status-success"
      : "foundation-status";
}

  namespace.ui = Object.freeze({
    initializeDevelopmentPage,
    renderCropRegistrationReport,
    renderCropValidationReport,
    renderSunflowerSampleTests,
    renderSampleProfileList,
    renderProfileMatrix,
    renderMultiCropSampleTests
  });

})(window);