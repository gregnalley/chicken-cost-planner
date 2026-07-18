"use strict";

/*
  Backyard Chicken Planner
  Chicken Feed Crop Planner User Interface

  This file controls the development dashboard used to:
  - Confirm that the planner files loaded correctly
  - Display crop registration and validation reports
  - Run sample-profile tests
  - Display the profile expectation matrix
  - Show detailed crop-ranking diagnostics
*/

(function initializeFeedCropPlannerUI(global) {

  /*
    Create or reuse the shared Feed Crop Planner namespace.
  */
  const namespace =
    global.BCPFeedCropPlanner =
      global.BCPFeedCropPlanner || {};


  /*
    ============================================================
    1. INITIALIZATION
    ============================================================
  */


  // Initializes every section of the development dashboard.
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
              check.passed
                ? "✅"
                : "❌";

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
        status.plannerVersion ||
        "Unavailable";
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


  /*
    ============================================================
    2. DASHBOARD REPORT RENDERERS
    ============================================================
  */


  // Displays the crop-registration totals and registration warnings.

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


// Displays planner-readiness errors and warnings for every registered crop.

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

// Displays detailed Sunflower scoring results for every sample profile.

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

// Displays the full crop ranking for each sample user profile.

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
          <article
          class="multi-profile-result"
          data-profile-result="${profileResult.profileId}"
          >

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

  // Displays the sample profiles currently available to the test engine.

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

  /*
    ============================================================
    3. SHARED FORMATTING HELPERS
    ============================================================
  */


  // Converts stored answer IDs into readable title-case labels.

function formatProfileValue(value) {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "";
  }

  return String(value)
    .replace(/-/g, " ")
    .replace(/\b\w/g, letter =>
      letter.toUpperCase()
    );
}

  /*
    ============================================================
    4. PROFILE SUMMARY HELPERS
    ============================================================
  */


  // Converts exact sunlight hours into a short readable sunlight summary.

function getSunlightSummary(hours) {
  if (!Number.isFinite(hours)) {
    return null;
  }

  if (hours >= 8) {
    return {
      icon: "☀️",
      label: "Full Sun"
    };
  }

  if (hours >= 6) {
    return {
      icon: "🌤️",
      label: "Good Sun"
    };
  }

  if (hours >= 4) {
    return {
      icon: "⛅",
      label: "Partial Sun"
    };
  }

  return {
    icon: "🌥️",
    label: "Low Sun"
  };
}

  // Converts water reliability and conservation priority into a short summary.

function getWaterSummary(
  waterReliability,
  conservationPriority
) {
  const limitedValues = [
    "frequently-limited",
    "occasionally-limited",
    "limited",
    "rainfall-only"
  ];

  const highConservationValues = [
    "high",
    "very-high",
    "top-priority"
  ];

  if (
    limitedValues.includes(
      waterReliability
    ) ||
    highConservationValues.includes(
      conservationPriority
    )
  ) {
    return {
      icon: "💧",
      label: "Limited Water"
    };
  }

  if (
    waterReliability ===
      "very-reliable" ||
    waterReliability ===
      "usually-reliable"
  ) {
    return {
      icon: "🚿",
      label: "Reliable Water"
    };
  }

  return null;
}

// Converts the requested storage duration into a short storage summary.

function getStorageSummary(
  harvestStorage
) {
  const storageDuration =
    harvestStorage
      ?.desiredStorageDuration;

  if (
    storageDuration ===
      "6-12-months" ||
    storageDuration ===
      "long-term"
  ) {
    return {
      icon: "🏺",
      label: "Long Storage"
    };
  }

  if (
    storageDuration ===
      "3-6-months" ||
    storageDuration ===
      "medium-term"
  ) {
    return {
      icon: "📦",
      label: "Seasonal Storage"
    };
  }

  if (
    storageDuration ===
      "immediate"
  ) {
    return {
      icon: "🥬",
      label: "Use Fresh"
    };
  }

  return null;
}

// Selects the most useful harvest-product label for the profile summary.

function getPrimaryHarvestSummary(
  desiredHarvestProducts
) {
  const products =
    Array.isArray(
      desiredHarvestProducts
    )
      ? desiredHarvestProducts
      : [];

  const productChecks = [
    {
      matches: [
        "dried-seed-heads",
        "fresh-seed-heads",
        "millet-panicles",
        "whole-millet-panicles"
      ],
      icon: "🌾",
      label: "Whole Seed Heads"
    },

    {
      matches: [
        "dry-seeds",
        "dry-grain",
        "stored-grain",
        "whole-grain",
        "corn-kernels",
        "millet-grain",
        "loose-millet-grain"
      ],
      icon: "🪣",
      label: "Dry Grain"
    },

    {
      matches: [
        "fresh-greens",
        "fresh-leaves",
        "fresh-forage",
        "alfalfa-foliage"
      ],
      icon: "🥬",
      label: "Fresh Greens"
    },

    {
      matches: [
        "living-forage",
        "pasture-forage"
      ],
      icon: "🌱",
      label: "Living Forage"
    },

    {
      matches: [
        "whole-storage-vegetables",
        "winter-storage-produce",
        "pumpkin-squash-flesh"
      ],
      icon: "🎃",
      label: "Storage Produce"
    },

    {
      matches: [
        "dry-legumes"
      ],
      icon: "🫘",
      label: "Dry Legumes"
    },

    {
      matches: [
        "fallen-fruit",
        "mulberries"
      ],
      icon: "🫐",
      label: "Fresh Fruit"
    },

    {
      matches: [
        "dried-forage",
        "dried-leaves",
        "alfalfa-forage"
      ],
      icon: "🌿",
      label: "Dried Forage"
    }
  ];

  return (
    productChecks.find(check =>
      check.matches.some(product =>
        products.includes(product)
      )
    ) ||
    null
  );
}

// Converts the profile’s highest-priority goals into readable summary items.

function getGoalSummaryItems(
  preferences
) {
  const priorities =
    Array.isArray(
      preferences?.goalPriorities
    )
      ? [...preferences.goalPriorities]
      : [];

  const goals =
    priorities.length > 0
      ? priorities
          .sort(
            (a, b) =>
              a.rank - b.rank
          )
          .map(item => item.goal)
      : (
          Array.isArray(
            preferences?.plannerGoals
          )
            ? preferences.plannerGoals
            : []
        );

  const goalLabels = {
    "enrichment": {
      icon: "🐔",
      label: "Enrichment"
    },

    "pollinators": {
      icon: "🌼",
      label: "Pollinators"
    },

    "winter-storage": {
      icon: "❄️",
      label: "Winter Storage"
    },

    "high-energy": {
      icon: "⚡",
      label: "High Energy"
    },

    "protein-oriented": {
      icon: "🫘",
      label: "Protein"
    },

    "fresh-greens": {
      icon: "🥬",
      label: "Fresh Greens"
    },

    "living-forage": {
      icon: "🌱",
      label: "Living Forage"
    },

    "soil-improvement": {
      icon: "🌍",
      label: "Soil Improvement"
    },

    "nitrogen-fixation": {
      icon: "♻️",
      label: "Nitrogen Fixing"
    },

    "self-reliance": {
      icon: "🏡",
      label: "Self-Reliance"
    },

    "shared-household-food": {
      icon: "🍽️",
      label: "Shared Food"
    },

    "fast-value": {
      icon: "⏱️",
      label: "Fast Value"
    },

    "limited-irrigation": {
      icon: "💧",
      label: "Low Water"
    },

    "short-season": {
      icon: "📅",
      label: "Short Season"
    },

    "ground-cover": {
      icon: "🍀",
      label: "Ground Cover"
    },

    "shade": {
      icon: "🌳",
      label: "Shade"
    },

    "edible-landscape": {
      icon: "🌿",
      label: "Edible Landscape"
    },

    "reduce-feed-use": {
      icon: "📉",
      label: "Reduce Feed Use"
    }
  };

  return goals
    .slice(0, 3)
    .map(goal => {
      return (
        goalLabels[goal] || {
          icon: "✓",
          label:
            formatProfileValue(goal)
        }
      );
    });
}

 // Builds the final deduplicated list of summary items for one profile.

function buildProfileSummaryItems(
  profile
) {
  const answers =
    profile?.answers || {};

  const items = [];

  const sunlight =
    getSunlightSummary(
      answers.site
        ?.directSunHoursExact
    );

  if (sunlight) {
    items.push(sunlight);
  }

  const spaceTypes =
    answers.space
      ?.availableSpaceTypes || [];

  if (spaceTypes.length > 0) {
    items.push({
      icon: "🪴",
      label:
        formatProfileValue(
          spaceTypes[0]
        )
    });
  }

  const experience =
    answers.labor
      ?.gardeningExperience;

  if (experience) {
    items.push({
      icon: "👤",
      label:
        formatProfileValue(
          experience
        )
    });
  }

  const harvest =
    getPrimaryHarvestSummary(
      answers.harvestStorage
        ?.desiredHarvestProducts
    );

  if (harvest) {
    items.push(harvest);
  }

  const storage =
    getStorageSummary(
      answers.harvestStorage
    );

  if (storage) {
    items.push(storage);
  }

  const water =
    getWaterSummary(
      answers.water
        ?.waterReliability,

      answers.water
        ?.waterConservationPriority
    );

  if (water) {
    items.push(water);
  }

  items.push(
    ...getGoalSummaryItems(
      answers.preferences
    )
  );

  const uniqueItems = [];

  items.forEach(item => {
    const alreadyExists =
      uniqueItems.some(
        existingItem =>
          existingItem.label ===
          item.label
      );

    if (!alreadyExists) {
      uniqueItems.push(item);
    }
  });

  return uniqueItems.slice(0, 7);
}

// Converts a profile’s summary items into the Profile Summary HTML list.

function renderProfileSummary(
  profile
) {
  const items =
    buildProfileSummaryItems(
      profile
    );

  if (items.length === 0) {
    return `
      <span class="profile-summary-empty">
        No structured summary available
      </span>
    `;
  }

  return `
    <ul class="profile-summary-list">
      ${items
        .map(item => {
          return `
            <li>
              <span
                class="profile-summary-icon"
                aria-hidden="true"
              >
                ${item.icon}
              </span>

              <span>
                ${item.label}
              </span>
            </li>
          `;
        })
        .join("")}
    </ul>
  `;
}

  /*
    ============================================================
    5. RANKING EXPLANATION HELPERS
    ============================================================
  */


  // Converts a crop result’s category scores into sorted ranking details.

function getRankingFactorDetails(
  cropResult
) {
  const categoryLabels = {
    climate: {
      icon: "🌡️",
      label: "Climate"
    },

    sunlight: {
      icon: "☀️",
      label: "Sunlight"
    },

    space: {
      icon: "📐",
      label: "Space"
    },

    soil: {
      icon: "🌱",
      label: "Soil"
    },

    water: {
      icon: "💧",
      label: "Water"
    },

    labor: {
      icon: "🛠️",
      label: "Labor"
    },

    goals: {
      icon: "🎯",
      label: "Goals"
    }
  };

  const categoryResults =
    cropResult?.categoryResults ||
    {};

  return Object.entries(
    categoryResults
  )
    .filter(([, result]) => {
      return Number.isFinite(
        result?.score
      );
    })
    .map(([categoryId, result]) => {
      const category =
        categoryLabels[categoryId] ||
        {
          icon: "✓",
          label:
            formatProfileValue(
              categoryId
            )
        };

      return {
        id: categoryId,
        icon: category.icon,
        label: category.label,
        score:
          Math.round(
            result.score
          ),
        reason:
          result.reason || ""
      };
    })
    .sort((a, b) => {
      return b.score - a.score;
    });
}

// Selects the strongest scoring categories for one crop result.

function getRankingStrengths(
  cropResult,
  maximumItems = 3
) {
  return getRankingFactorDetails(
    cropResult
  )
    .filter(item => {
      return item.score >= 70;
    })
    .slice(0, maximumItems);
}

  // Converts a crop’s strongest categories into a compact HTML list.

function renderRankingStrengths(
  cropResult
) {
  const strengths =
    getRankingStrengths(
      cropResult,
      3
    );

  if (strengths.length === 0) {
    return `
      <span class="ranking-factor-empty">
        No strong category advantages
      </span>
    `;
  }

  return `
    <ul class="ranking-factor-list">
      ${strengths
        .map(strength => {
          return `
            <li
              title="${strength.reason}"
            >
              <span
                class="ranking-factor-icon"
                aria-hidden="true"
              >
                ${strength.icon}
              </span>

              <span>
                ${strength.label}
              </span>

              <span class="ranking-factor-score">
                ${strength.score}
              </span>
            </li>
          `;
        })
        .join("")}
    </ul>
  `;
}

// Renders the top three eligible crops with their strongest ranking factors.

function renderTopThreeRankings(
  eligibleCropResults
) {
  const topThree =
    eligibleCropResults.slice(
      0,
      3
    );

  if (topThree.length === 0) {
    return `
      <span class="ranking-factor-empty">
        No eligible rankings
      </span>
    `;
  }

  return `
    <ol class="top-ranking-list">
      ${topThree
        .map((cropResult, index) => {
          return `
            <li class="top-ranking-item">

              <div class="top-ranking-heading">

                <span class="top-ranking-position">
                  ${index + 1}.
                </span>

                <strong>
                  ${cropResult.cropName}
                </strong>

                <span class="top-ranking-score">
                  ${cropResult.finalScore}%
                </span>

              </div>

              ${renderRankingStrengths(
                cropResult
              )}

            </li>
          `;
        })
        .join("")}
    </ol>
  `;
}

  /*
    ============================================================
    6. PROFILE MATRIX
    ============================================================
  */


  // Builds the profile expectation matrix and attaches its Analyze buttons.

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

    const sampleProfiles =
  namespace.config
    ?.testing
    ?.sampleUserProfiles ||
  [];

const profileById =
  Object.fromEntries(
    sampleProfiles.map(profile => [
      profile.id,
      profile
    ])
  );

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
        <td colspan="8">
          Profile matrix could not run.
        </td>
      </tr>
    `;

    return;
  }

  const testRun =
    namespace.engine
      .runMultiCropSampleTests();  

  if (!testRun.success) {
    summaryElement.textContent =
      testRun.error ||
      "Profile matrix tests could not run.";

    summaryElement.className =
      "foundation-status foundation-status-error";

    bodyElement.innerHTML = `
      <tr>
        <td colspan="8">
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
        const sampleProfile =
  profileById[
    profileResult.profileId
  ];

const profileSummaryMarkup =
  sampleProfile
    ? renderProfileSummary(
        sampleProfile
      )
    : `
        <span class="profile-summary-empty">
          Profile data unavailable
        </span>
      `;
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

  const topThreeRankingsMarkup =
  renderTopThreeRankings(
    eligibleCropResults
  );

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
  ${profileSummaryMarkup}
</td>

              <td class="profile-expected">
                Not configured
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

        <small>
          <strong>Use:</strong>
          ${
            actualLeader
              .bestUsePath
              ?.label ||
            "Unavailable"
          }
        </small>
      `
      : "No eligible recommendation"
  }
</td>

<td class="profile-top-three">
  ${topThreeRankingsMarkup}
</td>


<td class="profile-matrix-na">
  Not Configured
</td>

<td class="profile-diagnostics">
  <button
    type="button"
    class="profile-analyze-button"
    data-analyze-profile="${profileResult.profileId}"
  >
    Analyze
  </button>
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

    const actualTopThreeResults =
  eligibleCropResults
    .slice(0, 3);

const topThreeMarkup =
  actualTopThreeResults.length > 0
    ? `
      <ol class="profile-top-three-list">
        ${actualTopThreeResults
          .map(result => {
            return `
              <li>
                <strong>
                  ${result.cropName}
                </strong>

                — ${result.finalScore}%

                ${
                  result.bestUsePath?.label
                    ? `
                      <br>
                      <small>
                        ${result.bestUsePath.label}
                      </small>
                    `
                    : ""
                }
              </li>
            `;
          })
          .join("")}
      </ol>
    `
    : "No eligible recommendations";

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
  ${profileSummaryMarkup}
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

        <br>

        <small>
          <strong>Use:</strong>
          ${
            actualLeader
              .bestUsePath
              ?.label ||
            "No eligible use path"
          }
        </small>
      `
      : "Unavailable"
  }
</td>

<td class="profile-top-three">
  ${topThreeMarkup}
</td>


<td class="${statusClass}">
  ${statusLabel}
</td>

<td class="profile-diagnostics">
  <button
    type="button"
    class="profile-analyze-button"
    data-analyze-profile="${profileResult.profileId}"
  >
    Analyze
  </button>
</td>
        `;
      })
      .join("");

  bodyElement.innerHTML = rows;

  bodyElement
  .querySelectorAll(
    "[data-analyze-profile]"
  )
  .forEach(button => {

    button.addEventListener(
      "click",
      function () {

        const profileId =
          button.dataset
            .analyzeProfile;

        const comparisonSection =
          document.getElementById(
            "multi-crop-comparison"
          );

        const profileResultElement =
          document.querySelector(
            `[data-profile-result="${profileId}"]`
          );

        if (comparisonSection) {
          comparisonSection.open = true;
        }

        if (!profileResultElement) {
          return;
        }

        profileResultElement
          .classList.remove(
            "profile-analysis-highlight"
          );

        /*
          Force the browser to recognize the
          removed class before adding it again.
          This allows the animation to replay.
        */
        void profileResultElement.offsetWidth;

        profileResultElement
          .classList.add(
            "profile-analysis-highlight"
          );

        profileResultElement
          .scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
      }
    );

  });

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
    renderMultiCropSampleTests,
    renderProfileMatrix
    
  });

})(window);