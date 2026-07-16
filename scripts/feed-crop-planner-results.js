"use strict";

/*
  Backyard Chicken Planner
  Feed Crop Planner Public Results Controller

  Results Controller Version: 1.0.0

  Responsibilities:
  - Load the validated questionnaire answer payload
  - Confirm the crop database and shared engine are available
  - Score every ready crop with the shared scoring engine
  - Separate eligible and ineligible crops
  - Respect the requested recommendation format
  - Render a personalized crop-planning report
  - Explain strengths, limitations, harvest path, storage,
    processing, wildlife, and lifecycle considerations
  - Provide print or Save as PDF behavior
  - Handle missing sessions and unavailable recommendations

  This file does not:
  - Define crop scoring
  - Change engine weights
  - Add crop-specific scoring adjustments
  - Modify the questionnaire answer object
  - Generate a downloadable PDF file

  Load this file after:
  - assets/data/feed-crops.js
  - scripts/feed-crop-planner-config.js
  - scripts/feed-crop-planner-data.js
  - scripts/feed-crop-planner-engine.js
  - scripts/feed-crop-planner-questionnaire.js
*/

(function initializeFeedCropPlannerResults(
  global
) {
  const namespace =
    global.BCPFeedCropPlanner =
      global.BCPFeedCropPlanner ||
      {};

  const dataAdapter =
    namespace.data;

  const engine =
    namespace.engine;

  const questionnaire =
    namespace.questionnaire;

  if (
    !dataAdapter ||
    typeof dataAdapter.registerCropCollection !==
      "function" ||
    typeof dataAdapter.getAllUniqueCrops !==
      "function" ||
    typeof dataAdapter.getCropById !==
      "function"
  ) {
    throw new Error(
      "Feed Crop Planner data adapter must load before the public results controller."
    );
  }

  if (
    !engine ||
    typeof engine.scoreGenericCropProfile !==
      "function"
  ) {
    throw new Error(
      "Feed Crop Planner shared scoring engine must load before the public results controller."
    );
  }

  if (
    !questionnaire ||
    !questionnaire.config ||
    !questionnaire.config.resultStorageKey
  ) {
    throw new Error(
      "Feed Crop Planner questionnaire configuration must load before the public results controller."
    );
  }

  const RESULTS_CONTROLLER_VERSION =
    "1.0.0";

  const EXPECTED_RESULT_PAYLOAD_VERSION =
    "1.0.0";

  const PUBLIC_PROFILE_ID =
    "PUBLIC-FEED-CROP-PLANNER";

  const PUBLIC_PROFILE_LABEL =
    "Public Feed Crop Planner Visitor";

  const DEFAULT_QUESTIONNAIRE_URL =
    "feed-crop-planner.html";

  const CATEGORY_DISPLAY_CONFIG =
    Object.freeze({
      climate:
        Object.freeze({
          label:
            "Climate",

          icon:
            "🌦️"
        }),

      sunlight:
        Object.freeze({
          label:
            "Sunlight",

          icon:
            "☀️"
        }),

      space:
        Object.freeze({
          label:
            "Growing Space",

          icon:
            "📐"
        }),

      soil:
        Object.freeze({
          label:
            "Soil",

          icon:
            "🌱"
        }),

      water:
        Object.freeze({
          label:
            "Water",

          icon:
            "💧"
        }),

      labor:
        Object.freeze({
          label:
            "Time and Labor",

          icon:
            "🛠️"
        }),

      goals:
        Object.freeze({
          label:
            "Goals",

          icon:
            "🎯"
        })
    });

  const HARVEST_PRODUCT_LABELS =
    Object.freeze({
      "fresh-greens":
        "Fresh leafy greens",

      "fresh-leaves":
        "Fresh leaves",

      "fresh-forage":
        "Fresh cut forage",

      "living-forage":
        "Living forage",

      "pasture-forage":
        "Pasture or paddock forage",

      "fresh-produce":
        "Fresh produce",

      "fresh-vegetables":
        "Fresh vegetables",

      "tender-pods":
        "Tender pods",

      "fresh-seed-heads":
        "Fresh seed heads",

      "dried-seed-heads":
        "Dried seed heads",

      "dry-seeds":
        "Loose dry seeds",

      "dry-legumes":
        "Dry legumes",

      "whole-storage-vegetables":
        "Whole storage vegetables",

      "winter-storage-produce":
        "Winter-storage produce",

      "pumpkin-squash-flesh":
        "Pumpkin or winter-squash flesh",

      "millet-panicles":
        "Whole millet panicles",

      "whole-millet-panicles":
        "Stored whole millet panicles",

      "millet-grain":
        "Millet grain",

      "loose-millet-grain":
        "Loose threshed millet grain",

      "alfalfa-foliage":
        "Alfalfa foliage",

      "alfalfa-forage":
        "Alfalfa forage",

      "dried-forage":
        "Dried forage",

      "dried-leaves":
        "Dried leaves",

      "fallen-fruit":
        "Naturally fallen fruit",

      mulberries:
        "Mulberries",

      "mulberry-leaves":
        "Mulberry leaves",

      "leafy-branches":
        "Leafy branches",

      "dried-corn-ears":
        "Dried corn ears",

      "whole-corn-ears":
        "Whole corn ears",

      "corn-kernels":
        "Shelled corn kernels",

      "processed-corn":
        "Processed corn",

      "whole-sorghum-heads":
        "Whole sorghum heads",

      "sorghum-panicles":
        "Sorghum panicles",

      "sorghum-grain":
        "Sorghum grain",

      "milo-grain":
        "Milo grain",

      "dry-grain":
        "Dry grain",

      "whole-grain":
        "Whole grain",

      "stored-grain":
        "Stored grain",

      "cracked-grain":
        "Cracked grain"
    });

  const PROCESSING_TASK_LABELS =
    Object.freeze({
      "cut-leaves":
        "Cut or harvest leaves",

      "pick-produce":
        "Pick produce",

      "cut-seed-heads":
        "Cut seed heads or grain panicles",

      "harvest-ears":
        "Harvest corn ears",

      "harvest-heavy-fruit":
        "Harvest and move heavy fruit",

      chop:
        "Chop or break up the harvest",

      dry:
        "Dry the harvest",

      cure:
        "Cure storage produce",

      "shell-beans":
        "Shell beans or cowpeas",

      "shell-corn":
        "Shell corn",

      thresh:
        "Thresh grain or seed",

      winnow:
        "Winnow grain or seed",

      "clean-sort":
        "Clean and sort the harvest",

      "remove-seed":
        "Remove seed from heads or fruit",

      cook:
        "Cook before feeding",

      "crack-grain":
        "Crack or coarsely process grain"
    });

  const FEEDING_METHOD_LABELS =
    Object.freeze({
      "living-grazing":
        "Living grazing",

      "protected-grazing":
        "Protected grazing",

      "cut-and-carry":
        "Cut and carry",

      "whole-produce":
        "Whole produce",

      "whole-seed-heads":
        "Whole seed heads",

      "whole-grain":
        "Whole grain",

      "processed-grain":
        "Processed grain",

      "heat-treated":
        "Heat-treated harvest",

      "dried-forage":
        "Dried forage",

      "winter-storage":
        "Winter storage"
    });

  const GOAL_LABELS =
    Object.freeze({
      "reduce-feed-use":
        "Reduce purchased feed use",

      "high-energy":
        "Produce an energy-rich supplement",

      "protein-oriented":
        "Produce a protein-oriented supplement",

      "fresh-greens":
        "Provide fresh greens",

      "living-forage":
        "Create living forage",

      "winter-storage":
        "Store harvests for winter",

      "fast-value":
        "Produce useful harvests quickly",

      "short-season":
        "Fit a short growing season",

      "cool-season-production":
        "Provide cool-season production",

      "limited-irrigation":
        "Perform with limited irrigation",

      "resilience-feed":
        "Build a resilient backup feed source",

      "self-reliance":
        "Increase household self-reliance",

      "shared-household-food":
        "Produce food for chickens and people",

      enrichment:
        "Provide flock enrichment",

      pollinators:
        "Support pollinators",

      "soil-improvement":
        "Improve the soil",

      "nitrogen-fixation":
        "Add nitrogen through legumes",

      "ground-cover":
        "Create ground cover",

      "erosion-control":
        "Help control erosion",

      "compost-biomass":
        "Produce compost or mulch biomass",

      "seed-saving":
        "Save seed for future planting",

      "use-unused-space":
        "Make productive use of unused space",

      "edible-landscape":
        "Create an edible landscape",

      shade:
        "Provide shade",

      "privacy-screening":
        "Provide privacy or screening"
    });

  let initialized =
    false;

  let currentResultPayload =
    null;

  let currentProfile =
    null;

  let currentReport =
    null;

  const elements = {
    app:
      null,

    loading:
      null,

    error:
      null,

    report:
      null,

    printButton:
      null,

    editButton:
      null,

    restartButton:
      null
  };

  /*
    ==================================================
    General helpers
    ==================================================
  */

  function isPlainObject(
    value
  ) {
    return (
      value !== null &&
      typeof value === "object" &&
      !Array.isArray(value)
    );
  }

  function cloneValue(
    value
  ) {
    return JSON.parse(
      JSON.stringify(value)
    );
  }

  function escapeHTML(
    value
  ) {
    return String(
      value === undefined ||
      value === null
        ? ""
        : value
    )
      .replace(
        /&/g,
        "&amp;"
      )
      .replace(
        /</g,
        "&lt;"
      )
      .replace(
        />/g,
        "&gt;"
      )
      .replace(
        /"/g,
        "&quot;"
      )
      .replace(
        /'/g,
        "&#039;"
      );
  }

  function uniqueStrings(
    values
  ) {
    if (!Array.isArray(values)) {
      return [];
    }

    const normalized =
      values
        .filter(
          value =>
            typeof value === "string" &&
            value.trim() !== ""
        )
        .map(
          value =>
            value.trim()
        );

    return [
      ...new Set(normalized)
    ];
  }

  function firstDefined(
    ...values
  ) {
    return values.find(
      value =>
        value !== undefined &&
        value !== null &&
        value !== ""
    );
  }

  function asArray(
    value
  ) {
    return Array.isArray(value)
      ? value
      : [];
  }

  function formatIdentifier(
    value
  ) {
    if (
      typeof value !== "string" ||
      value.trim() === ""
    ) {
      return "Not specified";
    }

    return value
      .split("-")
      .filter(Boolean)
      .map(
        word =>
          word.charAt(0).toUpperCase() +
          word.slice(1)
      )
      .join(" ");
  }

  function formatPercent(
    value
  ) {
    if (!Number.isFinite(value)) {
      return "Not scored";
    }

    return `${Math.round(value)}%`;
  }

  function formatList(
    values,
    emptyLabel = "None specified"
  ) {
    const cleanValues =
      uniqueStrings(values);

    return cleanValues.length > 0
      ? cleanValues.join(", ")
      : emptyLabel;
  }

  function getQuestionnaireUrl() {
    if (
      elements.app &&
      elements.app.dataset.questionnaireUrl
    ) {
      return elements.app.dataset
        .questionnaireUrl;
    }

    return DEFAULT_QUESTIONNAIRE_URL;
  }

  /*
    ==================================================
    DOM helpers
    ==================================================
  */

  function collectElements() {
    elements.app =
      document.getElementById(
        "feed-crop-results-app"
      );

    elements.loading =
      document.getElementById(
        "feed-crop-results-loading"
      );

    elements.error =
      document.getElementById(
        "feed-crop-results-error"
      );

    elements.report =
      document.getElementById(
        "feed-crop-results-report"
      );

    elements.printButton =
      document.getElementById(
        "feed-crop-results-print"
      );

    elements.editButton =
      document.getElementById(
        "feed-crop-results-edit"
      );

    elements.restartButton =
      document.getElementById(
        "feed-crop-results-restart"
      );
  }

  function getMissingRequiredElements() {
    const requiredElements = [
      [
        "feed-crop-results-app",
        elements.app
      ],

      [
        "feed-crop-results-loading",
        elements.loading
      ],

      [
        "feed-crop-results-error",
        elements.error
      ],

      [
        "feed-crop-results-report",
        elements.report
      ]
    ];

    return requiredElements
      .filter(
        ([, element]) =>
          !element
      )
      .map(
        ([elementId]) =>
          elementId
      );
  }

  function showLoading() {
    if (elements.loading) {
      elements.loading.hidden =
        false;
    }

    if (elements.error) {
      elements.error.hidden =
        true;
    }

    if (elements.report) {
      elements.report.hidden =
        true;
    }
  }

  function hideLoading() {
    if (elements.loading) {
      elements.loading.hidden =
        true;
    }
  }

  function showError(
    title,
    message,
    options = {}
  ) {
    hideLoading();

    if (!elements.error) {
      return;
    }

    elements.error.hidden =
      false;

    elements.report.hidden =
      true;

    const actionUrl =
      options.actionUrl ||
      getQuestionnaireUrl();

    const actionLabel =
      options.actionLabel ||
      "Open the Feed Crop Planner";

    elements.error.innerHTML = `
      <div class="feed-crop-results-error-icon">
        ${escapeHTML(
          options.icon || "🌱"
        )}
      </div>

      <h2>
        ${escapeHTML(title)}
      </h2>

      <p>
        ${escapeHTML(message)}
      </p>

      <a
        class="feed-crop-results-primary-button"
        href="${escapeHTML(actionUrl)}"
      >
        ${escapeHTML(actionLabel)} →
      </a>
    `;
  }

  /*
    ==================================================
    Crop collection registration
    ==================================================
  */

  function registerCropDatabase() {
  if (
    typeof BCP_FEED_CROPS ===
      "undefined" ||
    BCP_FEED_CROPS === null ||
    typeof BCP_FEED_CROPS !==
      "object"
  ) {
    return {
      registered:
        false,

      reason:
        "crop-collection-unavailable"
    };
  }

  try {
    dataAdapter.registerCropCollection(
      BCP_FEED_CROPS
    );

    const registeredCrops =
      dataAdapter.getAllUniqueCrops();

    return {
      registered:
        Array.isArray(
          registeredCrops
        ) &&
        registeredCrops.length > 0,

      cropCount:
        Array.isArray(
          registeredCrops
        )
          ? registeredCrops.length
          : 0,

      reason:
        null
    };
  } catch (error) {
    console.error(
      "Feed Crop Planner crop registration failed:",
      error
    );

    return {
      registered:
        false,

      reason:
        "crop-registration-failed",

      error
    };
  }
}

  /*
    ==================================================
    Result-payload loading
    ==================================================
  */

  function canUseSessionStorage() {
    try {
      const testKey =
        "bcp-feed-crop-results-storage-test";

      global.sessionStorage.setItem(
        testKey,
        "1"
      );

      global.sessionStorage.removeItem(
        testKey
      );

      return true;
    } catch (error) {
      return false;
    }
  }

  function loadResultPayload() {
    if (!canUseSessionStorage()) {
      return {
        loaded:
          false,

        payload:
          null,

        reason:
          "session-storage-unavailable"
      };
    }

    const storedValue =
      global.sessionStorage.getItem(
        questionnaire.config
          .resultStorageKey
      );

    if (!storedValue) {
      return {
        loaded:
          false,

        payload:
          null,

        reason:
          "no-result-payload"
      };
    }

    try {
      const parsedPayload =
        JSON.parse(
          storedValue
        );

      if (!isPlainObject(parsedPayload)) {
        return {
          loaded:
            false,

          payload:
            null,

          reason:
            "invalid-result-payload"
        };
      }

      if (
        parsedPayload.resultPayloadVersion !==
        EXPECTED_RESULT_PAYLOAD_VERSION
      ) {
        return {
          loaded:
            false,

          payload:
            null,

          reason:
            "result-payload-version-mismatch"
        };
      }

      if (
        parsedPayload.questionnaireVersion !==
        questionnaire.version
      ) {
        return {
          loaded:
            false,

          payload:
            null,

          reason:
            "questionnaire-version-mismatch"
        };
      }

      if (
        !isPlainObject(
          parsedPayload.answers
        )
      ) {
        return {
          loaded:
            false,

          payload:
            null,

          reason:
            "answers-unavailable"
        };
      }

      return {
        loaded:
          true,

        payload:
          parsedPayload,

        reason:
          null
      };
    } catch (error) {
      return {
        loaded:
          false,

        payload:
          null,

        reason:
          "result-payload-parse-failed",

        error
      };
    }
  }

  function getPayloadErrorMessage(
    reason
  ) {
    const messages = {
      "session-storage-unavailable":
        "This browser is not allowing the planner to read the answers from your current session.",

      "no-result-payload":
        "No completed Feed Crop Planner questionnaire was found in this browser session.",

      "invalid-result-payload":
        "The saved questionnaire result is not in the expected format.",

      "result-payload-version-mismatch":
        "The saved result was created by a different version of the Feed Crop Planner.",

      "questionnaire-version-mismatch":
        "The questionnaire has changed since these answers were saved.",

      "answers-unavailable":
        "The saved result does not contain a complete answer object.",

      "result-payload-parse-failed":
        "The saved questionnaire result could not be read."
    };

    return (
      messages[reason] ||
      "The saved questionnaire result could not be loaded."
    );
  }

  /*
    ==================================================
    Shared-engine scoring
    ==================================================
  */

  function createPublicProfile(
    answers
  ) {
    return {
      id:
        PUBLIC_PROFILE_ID,

      label:
        PUBLIC_PROFILE_LABEL,

      answers:
        cloneValue(answers)
    };
  }

  function getReadyCrops() {
    return dataAdapter
      .getAllUniqueCrops()
      .filter(crop => (
        crop &&
        crop.plannerData &&
        crop.plannerData
          .developmentStatus ===
          "ready"
      ));
  }

  function isEligibleCropResult(
    result
  ) {
    return Boolean(
      result &&
      result.bestUsePath !== null &&
      result.noEligibleUsePath !== true &&
      result.finalScore > 0
    );
  }

  function scoreAllReadyCrops(
    profile
  ) {
    const readyCrops =
      getReadyCrops();

    const allResults =
      readyCrops.map(crop => {
        const scoreResult =
          engine.scoreGenericCropProfile(
            crop,
            profile
          );

        return {
          ...scoreResult,

          cropRecord:
            crop
        };
      });

    const eligibleResults =
      allResults
        .filter(
          isEligibleCropResult
        )
        .sort(
          (first, second) =>
            second.finalScore -
            first.finalScore
        );

    const ineligibleResults =
      allResults
        .filter(
          result =>
            !isEligibleCropResult(
              result
            )
        )
        .sort(
          (first, second) =>
            second.finalScore -
            first.finalScore
        );

    return {
      readyCropCount:
        readyCrops.length,

      allResults,

      eligibleResults,

      ineligibleResults
    };
  }

  /*
    ==================================================
    Recommendation-format helpers
    ==================================================
  */

  function getRequestedRecommendationCount(
    answers
  ) {
    const format =
      answers.preferences
        ?.desiredRecommendationFormat;

    return format === "single"
      ? 1
      : 3;
  }

  function getDisplayedRecommendations(
    report,
    answers
  ) {
    const requestedCount =
      getRequestedRecommendationCount(
        answers
      );

    return report.eligibleResults.slice(
      0,
      requestedCount
    );
  }

  /*
    ==================================================
    Raw crop and use-path helpers
    ==================================================
  */

  function getRawUsePath(
    result
  ) {
    const usePathId =
      result.bestUsePath
        ?.usePathId;

    if (!usePathId) {
      return null;
    }

    return (
      result.cropRecord
        ?.plannerData
        ?.usePaths
        ?.find(
          usePath =>
            usePath.id === usePathId
        ) ||
      null
    );
  }

  function getCropIdentity(
    result
  ) {
    return (
      result.cropRecord
        ?.plannerData
        ?.identity ||
      {}
    );
  }

  function getCropLifecycle(
    result
  ) {
    return (
      result.cropRecord
        ?.plannerData
        ?.lifecycle ||
      {}
    );
  }

  function getCropGuideUrl(
    result
  ) {
    const identity =
      getCropIdentity(result);

    return firstDefined(
      identity.guideUrl,
      result.cropRecord?.guideUrl,
      "chicken-feed-crops.html"
    );
  }

  function getCropIcon(
    result
  ) {
    const identity =
      getCropIdentity(result);

    return firstDefined(
      identity.icon,
      "🌱"
    );
  }

  function getCropShortLabel(
    result
  ) {
    const identity =
      getCropIdentity(result);

    return firstDefined(
      identity.shortLabel,
      result.cropName,
      "Feed crop"
    );
  }

  /*
    ==================================================
    Strength and limitation extraction
    ==================================================
  */

  function getCategoryStrengths(
    result
  ) {
    return Object.entries(
      result.categoryResults ||
      {}
    )
      .filter(
        ([, categoryResult]) =>
          categoryResult &&
          Number.isFinite(
            categoryResult.score
          ) &&
          categoryResult.score >= 75 &&
          typeof categoryResult.reason ===
            "string"
      )
      .sort(
        (
          [, firstResult],
          [, secondResult]
        ) =>
          secondResult.score -
          firstResult.score
      )
      .map(
        ([, categoryResult]) =>
          categoryResult.reason
      );
  }

  function getCategoryLimitations(
    result
  ) {
    return Object.entries(
      result.categoryResults ||
      {}
    )
      .filter(
        ([, categoryResult]) =>
          categoryResult &&
          Number.isFinite(
            categoryResult.score
          ) &&
          categoryResult.score < 60 &&
          typeof categoryResult.reason ===
            "string"
      )
      .sort(
        (
          [, firstResult],
          [, secondResult]
        ) =>
          firstResult.score -
          secondResult.score
      )
      .map(
        ([, categoryResult]) =>
          categoryResult.reason
      );
  }

  function getRecommendationStrengths(
    result
  ) {
    const usePathStrengths =
      asArray(
        result.bestUsePath
          ?.strengths
      );

    const lifecycleStrengths =
      asArray(
        result.lifecycleAdjustment
          ?.strengths
      );

    return uniqueStrings([
      ...usePathStrengths,
      ...lifecycleStrengths,
      ...getCategoryStrengths(
        result
      )
    ]).slice(0, 6);
  }

  function getRecommendationLimitations(
    result
  ) {
    const usePathLimitations =
      asArray(
        result.bestUsePath
          ?.limitations
      );

    const lifecycleLimitations =
      asArray(
        result.lifecycleAdjustment
          ?.limitations
      );

    const wildlifeReason =
      result.wildlife &&
      result.wildlife.penalty > 0
        ? result.wildlife.reason
        : null;

    return uniqueStrings([
      ...usePathLimitations,
      ...lifecycleLimitations,
      ...getCategoryLimitations(
        result
      ),
      wildlifeReason
    ]).slice(0, 6);
  }

  function getIneligibilityReasons(
    result
  ) {
    const reasons = [];

    if (
      result.lifecycleAdjustment
        ?.hardFailure
    ) {
      reasons.push(
        ...asArray(
          result.lifecycleAdjustment
            .hardFailures
        )
      );
    }

    const usePathFailures =
      asArray(
        result.usePathResults
      )
        .filter(
          usePath =>
            usePath.hardFailure
        )
        .flatMap(
          usePath =>
            asArray(
              usePath.hardFailures
            )
        );

    reasons.push(
      ...usePathFailures
    );

    if (
      result.noEligibleUsePath ===
      true
    ) {
      reasons.push(
        "No harvest and feeding path remained eligible under the selected processing, equipment, storage, and harvest requirements."
      );
    }

    return uniqueStrings(
      reasons
    ).slice(0, 4);
  }

  /*
    ==================================================
    Visitor answer-summary helpers
    ==================================================
  */

  function getPriorityGoals(
    answers
  ) {
    const priorities =
      asArray(
        answers.preferences
          ?.goalPriorities
      );

    return priorities
      .filter(
        priority =>
          priority &&
          typeof priority.goal ===
            "string" &&
          Number.isFinite(
            Number(priority.rank)
          )
      )
      .sort(
        (first, second) =>
          Number(first.rank) -
          Number(second.rank)
      )
      .map(
        priority =>
          GOAL_LABELS[
            priority.goal
          ] ||
          formatIdentifier(
            priority.goal
          )
      );
  }

  function getPlanSummaryItems(
    answers
  ) {
    const spaceTypes =
      asArray(
        answers.space
          ?.availableSpaceTypes
      )
        .map(
          formatIdentifier
        );

    const priorityGoals =
      getPriorityGoals(
        answers
      );

    return [
      {
        icon:
          "🐔",

        label:
          "Flock",

        value:
          `${firstDefined(
            answers.flock?.flockSize,
            "Unknown"
          )} chickens`
      },

      {
        icon:
          "🌦️",

        label:
          "Climate",

        value:
          formatIdentifier(
            answers.climate
              ?.climateType
          )
      },

      {
        icon:
          "📐",

        label:
          "Growing space",

        value:
          `${firstDefined(
            answers.space
              ?.totalGrowingAreaSqFt,
            "Unknown"
          )} sq. ft.`
      },

      {
        icon:
          "🌱",

        label:
          "Available areas",

        value:
          spaceTypes.length > 0
            ? spaceTypes.join(", ")
            : "Not specified"
      },

      {
        icon:
          "☀️",

        label:
          "Direct sunlight",

        value:
          `${firstDefined(
            answers.site
              ?.directSunHoursExact,
            "Unknown"
          )} hours`
      },

      {
        icon:
          "🎯",

        label:
          "Top priorities",

        value:
          priorityGoals.length > 0
            ? priorityGoals.join(
                " • "
              )
            : "Not ranked"
      }
    ];
  }

  /*
    ==================================================
    Score and tier presentation
    ==================================================
  */

  function getScoreClass(
    score
  ) {
    if (!Number.isFinite(score)) {
      return "is-unavailable";
    }

    if (score >= 80) {
      return "is-excellent";
    }

    if (score >= 65) {
      return "is-strong";
    }

    if (score >= 50) {
      return "is-moderate";
    }

    return "is-limited";
  }

  function getScoreMessage(
    score
  ) {
    if (!Number.isFinite(score)) {
      return "Not enough information was available for a dependable score.";
    }

    if (score >= 85) {
      return "An excellent overall match for the conditions and priorities you selected.";
    }

    if (score >= 75) {
      return "A strong match with several practical advantages for your plan.";
    }

    if (score >= 65) {
      return "A good match, although a few limitations deserve attention.";
    }

    if (score >= 50) {
      return "A workable option when its limitations are acceptable.";
    }

    return "A limited match compared with the stronger eligible crops.";
  }

  /*
    ==================================================
    HTML rendering helpers
    ==================================================
  */

  function renderStringList(
    items,
    options = {}
  ) {
    const cleanItems =
      uniqueStrings(items);

    if (cleanItems.length === 0) {
      return `
        <p class="feed-crop-results-empty-note">
          ${escapeHTML(
            options.emptyLabel ||
            "No additional notes were generated."
          )}
        </p>
      `;
    }

    const icon =
      options.icon ||
      "•";

    return `
      <ul class="feed-crop-results-list">
        ${cleanItems
          .map(
            item => `
              <li>
                <span
                  class="feed-crop-results-list-icon"
                  aria-hidden="true"
                >
                  ${escapeHTML(icon)}
                </span>

                <span>
                  ${escapeHTML(item)}
                </span>
              </li>
            `
          )
          .join("")}
      </ul>
    `;
  }

  function renderPillList(
    values,
    labelMap,
    emptyLabel
  ) {
    const items =
      asArray(values);

    if (items.length === 0) {
      return `
        <span class="feed-crop-results-muted">
          ${escapeHTML(
            emptyLabel ||
            "None specified"
          )}
        </span>
      `;
    }

    return `
      <div class="feed-crop-results-pill-list">
        ${items
          .map(value => {
            const label =
              labelMap[value] ||
              formatIdentifier(value);

            return `
              <span class="feed-crop-results-pill">
                ${escapeHTML(label)}
              </span>
            `;
          })
          .join("")}
      </div>
    `;
  }

  function renderCategoryScores(
    result
  ) {
    const entries =
      Object.entries(
        result.categoryResults ||
        {}
      );

    return `
      <div class="feed-crop-category-grid">
        ${entries
          .map(
            ([
              categoryId,
              categoryResult
            ]) => {
              const config =
                CATEGORY_DISPLAY_CONFIG[
                  categoryId
                ] ||
                {
                  label:
                    formatIdentifier(
                      categoryId
                    ),

                  icon:
                    "🌱"
                };

              const score =
                categoryResult
                  ?.score;

              const width =
                Number.isFinite(score)
                  ? Math.max(
                      0,
                      Math.min(
                        100,
                        Math.round(score)
                      )
                    )
                  : 0;

              return `
                <article
                  class="feed-crop-category-card ${getScoreClass(
                    score
                  )}"
                >
                  <div class="feed-crop-category-heading">

                    <span class="feed-crop-category-icon">
                      ${escapeHTML(
                        config.icon
                      )}
                    </span>

                    <strong>
                      ${escapeHTML(
                        config.label
                      )}
                    </strong>

                    <span class="feed-crop-category-score">
                      ${escapeHTML(
                        formatPercent(score)
                      )}
                    </span>

                  </div>

                  <div
                    class="feed-crop-category-track"
                    aria-hidden="true"
                  >
                    <span
                      style="width:${width}%;"
                    ></span>
                  </div>

                  <p>
                    ${escapeHTML(
                      categoryResult
                        ?.reason ||
                      "No category explanation was available."
                    )}
                  </p>

                </article>
              `;
            }
          )
          .join("")}
      </div>
    `;
  }

  function renderPlanSummary(
    answers
  ) {
    const items =
      getPlanSummaryItems(
        answers
      );

    return `
      <section class="feed-crop-results-plan-summary">

        <div class="feed-crop-results-section-heading">

          <span class="feed-crop-results-kicker">
            Your starting point
          </span>

          <h2>
            The Plan We Compared
          </h2>

          <p>
            These are the main conditions and priorities used by the shared recommendation engine.
          </p>

        </div>

        <div class="feed-crop-results-summary-grid">

          ${items
            .map(
              item => `
                <article class="feed-crop-results-summary-card">

                  <span class="feed-crop-results-summary-icon">
                    ${escapeHTML(
                      item.icon
                    )}
                  </span>

                  <span class="feed-crop-results-summary-label">
                    ${escapeHTML(
                      item.label
                    )}
                  </span>

                  <strong>
                    ${escapeHTML(
                      item.value
                    )}
                  </strong>

                </article>
              `
            )
            .join("")}

        </div>

      </section>
    `;
  }

  function renderRecommendationHero(
    result
  ) {
    const identity =
      getCropIdentity(result);

    const usePath =
      getRawUsePath(result);

    const tierLabel =
      result.tier?.label ||
      "Eligible recommendation";

    const confidenceLabel =
      result.confidenceLabel
        ?.label ||
      "Available confidence";

    const harvestProducts =
      usePath?.harvestProducts ||
      [];

    const primaryFeedRole =
      firstDefined(
        usePath?.primaryFeedRole,
        identity.primaryFeedCategory,
        "Supplemental flock crop"
      );

    return `
      <section class="feed-crop-top-recommendation">

        <div class="feed-crop-top-badge">
          <span aria-hidden="true">
            🏆
          </span>

          Best Overall Match
        </div>

        <div class="feed-crop-top-grid">

          <div class="feed-crop-top-main">

            <div class="feed-crop-top-title-row">

              <span class="feed-crop-top-icon">
                ${escapeHTML(
                  getCropIcon(result)
                )}
              </span>

              <div>

                <span class="feed-crop-top-eyebrow">
                  Your strongest eligible crop
                </span>

                <h1>
                  ${escapeHTML(
                    result.cropName
                  )}
                </h1>

              </div>

            </div>

            <p class="feed-crop-top-message">
              ${escapeHTML(
                getScoreMessage(
                  result.finalScore
                )
              )}
            </p>

            <div class="feed-crop-top-meta">

              <span>
                <strong>
                  Best harvest path:
                </strong>

                ${escapeHTML(
                  result.bestUsePath
                    ?.label ||
                  "Eligible use path"
                )}
              </span>

              <span>
                <strong>
                  Primary role:
                </strong>

                ${escapeHTML(
                  formatIdentifier(
                    primaryFeedRole
                  )
                )}
              </span>

            </div>

            <div class="feed-crop-top-harvest">

              <strong>
                Likely harvest from this path
              </strong>

              ${renderPillList(
                harvestProducts,
                HARVEST_PRODUCT_LABELS,
                "Harvest products were not listed."
              )}

            </div>

          </div>

          <aside class="feed-crop-top-score-panel">

            <div
              class="feed-crop-score-ring ${getScoreClass(
                result.finalScore
              )}"
              style="--feed-crop-score:${Math.max(
                0,
                Math.min(
                  100,
                  result.finalScore
                )
              )};"
            >

              <div>

                <strong>
                  ${escapeHTML(
                    formatPercent(
                      result.finalScore
                    )
                  )}
                </strong>

                <span>
                  Overall Match
                </span>

              </div>

            </div>

            <div class="feed-crop-score-detail">

              <span>
                Recommendation
              </span>

              <strong>
                ${escapeHTML(
                  tierLabel
                )}
              </strong>

            </div>

            <div class="feed-crop-score-detail">

              <span>
                Confidence
              </span>

              <strong>
                ${escapeHTML(
                  confidenceLabel
                )}
                ·
                ${escapeHTML(
                  formatPercent(
                    result.confidenceScore
                  )
                )}
              </strong>

            </div>

          </aside>

        </div>

      </section>
    `;
  }

  function renderStrengthsAndLimitations(
    result
  ) {
    const strengths =
      getRecommendationStrengths(
        result
      );

    const limitations =
      getRecommendationLimitations(
        result
      );

    return `
      <section class="feed-crop-results-two-column">

        <article class="feed-crop-results-insight-card is-strength">

          <h2>
            ✅ Why It Fits
          </h2>

          ${renderStringList(
            strengths,
            {
              icon:
                "✓",

              emptyLabel:
                "The crop remained eligible, but no additional strengths were generated."
            }
          )}

        </article>

        <article class="feed-crop-results-insight-card is-limitation">

          <h2>
            ⚠️ What to Plan Around
          </h2>

          ${renderStringList(
            limitations,
            {
              icon:
                "!",

              emptyLabel:
                "No major limitations were identified from the selected answers."
            }
          )}

        </article>

      </section>
    `;
  }

  function renderHarvestPlan(
    result
  ) {
    const usePath =
      getRawUsePath(result);

    if (!usePath) {
      return "";
    }

    const processingTasks =
      usePath.requiredProcessingTasks ||
      [];

    const feedingMethods =
      usePath.suitableFeedingMethods ||
      [];

    const safetyWarnings =
      usePath.safetyWarnings ||
      [];

    const dryingRequired =
      usePath.dryingRequired === true;

    const storageCategory =
      firstDefined(
        usePath.storageDurationCategory,
        "Not specified"
      );

    const preparationEase =
      firstDefined(
        usePath.preparationEaseScore,
        "Not rated"
      );

    return `
      <section class="feed-crop-results-harvest-plan">

        <div class="feed-crop-results-section-heading">

          <span class="feed-crop-results-kicker">
            Recommended use path
          </span>

          <h2>
            🧺 How This Crop Best Fits Your Plan
          </h2>

          <p>
            The recommendation is based on the highest-scoring harvest and feeding path that remained eligible under your answers.
          </p>

        </div>

        <div class="feed-crop-results-harvest-grid">

          <article class="feed-crop-results-detail-card">

            <span class="feed-crop-results-detail-icon">
              🌾
            </span>

            <h3>
              Harvest
            </h3>

            <strong>
              ${escapeHTML(
                result.bestUsePath
                  ?.label ||
                usePath.label ||
                "Recommended harvest path"
              )}
            </strong>

            ${renderPillList(
              usePath.harvestProducts,
              HARVEST_PRODUCT_LABELS,
              "No harvest products listed"
            )}

          </article>

          <article class="feed-crop-results-detail-card">

            <span class="feed-crop-results-detail-icon">
              🐔
            </span>

            <h3>
              Flock Use
            </h3>

            ${renderPillList(
              feedingMethods,
              FEEDING_METHOD_LABELS,
              "No feeding methods listed"
            )}

          </article>

          <article class="feed-crop-results-detail-card">

            <span class="feed-crop-results-detail-icon">
              🛠️
            </span>

            <h3>
              Processing
            </h3>

            ${renderPillList(
              processingTasks,
              PROCESSING_TASK_LABELS,
              "No required processing tasks"
            )}

            <p class="feed-crop-results-detail-note">
              Preparation ease:
              <strong>
                ${escapeHTML(
                  String(
                    preparationEase
                  )
                )}
              </strong>
              out of 5
            </p>

          </article>

          <article class="feed-crop-results-detail-card">

            <span class="feed-crop-results-detail-icon">
              🏠
            </span>

            <h3>
              Drying and Storage
            </h3>

            <p>
              <strong>
                Drying:
              </strong>

              ${dryingRequired
                ? "Required for this path"
                : "Not required for this path"}
            </p>

            <p>
              <strong>
                Storage category:
              </strong>

              ${escapeHTML(
                formatIdentifier(
                  storageCategory
                )
              )}
            </p>

          </article>

        </div>

        ${
          safetyWarnings.length > 0
            ? `
              <aside class="feed-crop-results-safety-box">

                <h3>
                  🛡️ Safety and Feeding Notes
                </h3>

                ${renderStringList(
                  safetyWarnings,
                  {
                    icon:
                      "•"
                  }
                )}

              </aside>
            `
            : ""
        }

      </section>
    `;
  }

  function renderCategoryBreakdown(
    result
  ) {
    return `
      <section class="feed-crop-results-category-section">

        <div class="feed-crop-results-section-heading">

          <span class="feed-crop-results-kicker">
            Why the score landed here
          </span>

          <h2>
            📊 Match Breakdown
          </h2>

          <p>
            Each category comes from the same shared scoring engine used by the planner’s regression profiles.
          </p>

        </div>

        ${renderCategoryScores(
          result
        )}

      </section>
    `;
  }

  function renderAlternativeCard(
    result,
    rankNumber
  ) {
    const identity =
      getCropIdentity(result);

    const usePath =
      getRawUsePath(result);

    const strengths =
      getRecommendationStrengths(
        result
      ).slice(0, 3);

    const limitations =
      getRecommendationLimitations(
        result
      ).slice(0, 2);

    return `
      <article class="feed-crop-alternative-card">

        <div class="feed-crop-alternative-rank">
          #${rankNumber}
        </div>

        <div class="feed-crop-alternative-heading">

          <span class="feed-crop-alternative-icon">
            ${escapeHTML(
              getCropIcon(result)
            )}
          </span>

          <div>

            <h3>
              ${escapeHTML(
                result.cropName
              )}
            </h3>

            <span>
              ${escapeHTML(
                identity.primaryFeedCategory
                  ? formatIdentifier(
                      identity.primaryFeedCategory
                    )
                  : "Supplemental feed crop"
              )}
            </span>

          </div>

          <strong class="feed-crop-alternative-score">
            ${escapeHTML(
              formatPercent(
                result.finalScore
              )
            )}
          </strong>

        </div>

        <p class="feed-crop-alternative-path">

          <strong>
            Best path:
          </strong>

          ${escapeHTML(
            result.bestUsePath
              ?.label ||
            "Eligible use path"
          )}

        </p>

        ${
          usePath
            ? renderPillList(
                usePath.harvestProducts,
                HARVEST_PRODUCT_LABELS,
                "No harvest products listed"
              )
            : ""
        }

        <div class="feed-crop-alternative-insights">

          <div>

            <strong>
              Good fit because:
            </strong>

            ${renderStringList(
              strengths,
              {
                icon:
                  "✓",

                emptyLabel:
                  "It remained one of the strongest eligible crops."
              }
            )}

          </div>

          ${
            limitations.length > 0
              ? `
                <div>

                  <strong>
                    Keep in mind:
                  </strong>

                  ${renderStringList(
                    limitations,
                    {
                      icon:
                        "!"
                    }
                  )}

                </div>
              `
              : ""
          }

        </div>

        <a
          class="feed-crop-results-text-link"
          href="${escapeHTML(
            getCropGuideUrl(result)
          )}"
        >
          Learn about
          ${escapeHTML(
            getCropShortLabel(result)
          )}
          →
        </a>

      </article>
    `;
  }

  function renderAlternatives(
    displayedRecommendations
  ) {
    const alternatives =
      displayedRecommendations.slice(1);

    if (alternatives.length === 0) {
      return "";
    }

    return `
      <section class="feed-crop-results-alternatives">

        <div class="feed-crop-results-section-heading">

          <span class="feed-crop-results-kicker">
            Strong alternatives
          </span>

          <h2>
            🌿 Other Crops Worth Considering
          </h2>

          <p>
            These crops also remained eligible and scored well, but did not match the complete plan as strongly as the leading recommendation.
          </p>

        </div>

        <div class="feed-crop-alternative-grid">

          ${alternatives
            .map(
              (result, index) =>
                renderAlternativeCard(
                  result,
                  index + 2
                )
            )
            .join("")}

        </div>

      </section>
    `;
  }

  function renderGoalComplementTable(
    eligibleResults,
    answers
  ) {
    const selectedPriorities =
      asArray(
        answers.preferences
          ?.goalPriorities
      )
        .filter(
          priority =>
            priority &&
            typeof priority.goal ===
              "string"
        )
        .sort(
          (first, second) =>
            Number(first.rank) -
            Number(second.rank)
        );

    if (
      selectedPriorities.length === 0 ||
      eligibleResults.length === 0
    ) {
      return "";
    }

    const rows =
      selectedPriorities.map(
        priority => {
          const goalFieldName =
            engine.getCropGoalFieldName(
              priority.goal
            );

          const scoredCrops =
            eligibleResults
              .map(result => {
                const rawScore =
                  goalFieldName
                    ? result.cropRecord
                        ?.plannerData
                        ?.goals
                        ?.[
                          goalFieldName
                        ]
                    : null;

                return {
                  result,

                  score:
                    Number.isFinite(
                      rawScore
                    )
                      ? engine
                          .convertFivePointToPercent(
                            rawScore
                          )
                      : null
                };
              })
              .filter(
                item =>
                  Number.isFinite(
                    item.score
                  )
              )
              .sort(
                (first, second) =>
                  second.score -
                  first.score
              );

          const leader =
            scoredCrops[0];

          return `
            <tr>

              <td>
                <span class="feed-crop-goal-rank">
                  #${escapeHTML(
                    String(
                      priority.rank
                    )
                  )}
                </span>

                ${escapeHTML(
                  GOAL_LABELS[
                    priority.goal
                  ] ||
                  formatIdentifier(
                    priority.goal
                  )
                )}
              </td>

              <td>
                ${
                  leader
                    ? `
                      <strong>
                        ${escapeHTML(
                          leader.result
                            .cropName
                        )}
                      </strong>
                    `
                    : "No comparable crop rating"
                }
              </td>

              <td>
                ${
                  leader
                    ? escapeHTML(
                        formatPercent(
                          leader.score
                        )
                      )
                    : "Not scored"
                }
              </td>

            </tr>
          `;
        }
      );

    return `
      <section class="feed-crop-results-goal-section">

        <div class="feed-crop-results-section-heading">

          <span class="feed-crop-results-kicker">
            Your ranked priorities
          </span>

          <h2>
            🎯 Which Eligible Crop Leads Each Goal?
          </h2>

          <p>
            The best overall crop is not always the strongest crop for every individual goal. This table shows which eligible crop has the strongest underlying rating for each of your top priorities.
          </p>

        </div>

        <div class="feed-crop-results-table-wrap">

          <table class="feed-crop-results-table">

            <thead>

              <tr>
                <th>
                  Priority
                </th>

                <th>
                  Strongest Eligible Crop
                </th>

                <th>
                  Goal Rating
                </th>
              </tr>

            </thead>

            <tbody>
              ${rows.join("")}
            </tbody>

          </table>

        </div>

      </section>
    `;
  }

  function renderCombinationPlan(
    eligibleResults,
    answers
  ) {
    const combination =
      eligibleResults.slice(
        0,
        3
      );

    if (combination.length < 2) {
      return "";
    }

    const cards =
      combination.map(
        (result, index) => {
          const usePath =
            getRawUsePath(result);

          const harvestLabel =
            usePath
              ? asArray(
                  usePath.harvestProducts
                )
                  .slice(0, 2)
                  .map(
                    product =>
                      HARVEST_PRODUCT_LABELS[
                        product
                      ] ||
                      formatIdentifier(
                        product
                      )
                  )
                  .join(" and ")
              : "supplemental flock value";

          const seasonRole =
            result.cropRecord
              ?.plannerData
              ?.seasonalRoles;

          const seasonalSummary =
            firstDefined(
              seasonRole
                ?.primarySeasonalRole,
              seasonRole
                ?.bestSeason,
              null
            );

          return `
            <article class="feed-crop-combination-card">

              <span class="feed-crop-combination-number">
                ${index + 1}
              </span>

              <span class="feed-crop-combination-icon">
                ${escapeHTML(
                  getCropIcon(result)
                )}
              </span>

              <h3>
                ${escapeHTML(
                  result.cropName
                )}
              </h3>

              <p>
                Use mainly for
                <strong>
                  ${escapeHTML(
                    harvestLabel
                  )}
                </strong>.
              </p>

              ${
                seasonalSummary
                  ? `
                    <p class="feed-crop-combination-season">
                      ${escapeHTML(
                        formatIdentifier(
                          seasonalSummary
                        )
                      )}
                    </p>
                  `
                  : ""
              }

            </article>
          `;
        }
      );

    const topGoals =
      getPriorityGoals(
        answers
      );

    return `
      <section class="feed-crop-results-combination">

        <div class="feed-crop-results-section-heading">

          <span class="feed-crop-results-kicker">
            A more resilient approach
          </span>

          <h2>
            🌾 Your Three-Crop Combination
          </h2>

          <p>
            One crop rarely provides every benefit. These three eligible leaders can form a more diverse starting system instead of depending on a single harvest.
          </p>

        </div>

        <div class="feed-crop-combination-grid">
          ${cards.join("")}
        </div>

        ${
          topGoals.length > 0
            ? `
              <div class="feed-crop-combination-note">

                <strong>
                  Your plan is trying to balance:
                </strong>

                ${escapeHTML(
                  topGoals.join(
                    ", "
                  )
                )}.

              </div>
            `
            : ""
        }

      </section>
    `;
  }

  function renderIneligibleCrops(
    ineligibleResults
  ) {
    if (
      !Array.isArray(
        ineligibleResults
      ) ||
      ineligibleResults.length === 0
    ) {
      return "";
    }

    return `
      <section class="feed-crop-results-excluded">

        <details>

          <summary>
            See crops that were not eligible for this plan
            <span>
              ${ineligibleResults.length}
            </span>
          </summary>

          <div class="feed-crop-results-excluded-body">

            <p>
              These crops were not included in the recommendation ranking because no eligible harvest path remained, a lifecycle requirement caused a hard incompatibility, or the final score was zero.
            </p>

            <div class="feed-crop-excluded-grid">

              ${ineligibleResults
                .map(result => {
                  const reasons =
                    getIneligibilityReasons(
                      result
                    );

                  return `
                    <article class="feed-crop-excluded-card">

                      <div class="feed-crop-excluded-heading">

                        <span>
                          ${escapeHTML(
                            getCropIcon(
                              result
                            )
                          )}
                        </span>

                        <h3>
                          ${escapeHTML(
                            result.cropName
                          )}
                        </h3>

                      </div>

                      ${renderStringList(
                        reasons,
                        {
                          icon:
                            "×",

                          emptyLabel:
                            "The crop did not retain a positive eligible recommendation score."
                        }
                      )}

                    </article>
                  `;
                })
                .join("")}

            </div>

          </div>

        </details>

      </section>
    `;
  }

  function renderNextSteps(
    topResult
  ) {
    const usePath =
      getRawUsePath(
        topResult
      );

    const tasks =
      asArray(
        usePath
          ?.requiredProcessingTasks
      );

    const dryingRequired =
      usePath
        ?.dryingRequired ===
      true;

    const guideUrl =
      getCropGuideUrl(
        topResult
      );

    const steps = [
      `Read the full ${topResult.cropName} crop guide before purchasing seed or preparing a permanent planting.`,

      "Confirm the planting window, cultivar, and mature plant size for your region.",

      "Measure and mark the actual growing area so the crop does not interfere with paths, fencing, neighboring beds, or required overflow space."
    ];

    if (tasks.length > 0) {
      steps.push(
        `Prepare for the required work: ${tasks
          .map(
            task =>
              PROCESSING_TASK_LABELS[
                task
              ] ||
              formatIdentifier(
                task
              )
          )
          .join(", ")}.`
      );
    }

    if (dryingRequired) {
      steps.push(
        "Prepare a protected drying area before harvest and confirm that airflow, humidity control, and pest protection are adequate."
      );
    }

    steps.push(
      "Continue offering a complete age-appropriate poultry feed and introduce homegrown harvests as supplemental foods rather than assuming they form a balanced ration."
    );

    return `
      <section class="feed-crop-results-next-steps">

        <div class="feed-crop-results-section-heading">

          <span class="feed-crop-results-kicker">
            Turn the result into action
          </span>

          <h2>
            🗺️ Practical Next Steps
          </h2>

        </div>

        <ol class="feed-crop-results-step-list">

          ${steps
            .map(
              step => `
                <li>
                  <span></span>

                  <p>
                    ${escapeHTML(step)}
                  </p>
                </li>
              `
            )
            .join("")}

        </ol>

        <div class="feed-crop-results-action-row">

          <a
            class="feed-crop-results-primary-button"
            href="${escapeHTML(
              guideUrl
            )}"
          >
            Explore
            ${escapeHTML(
              getCropShortLabel(
                topResult
              )
            )}
            →
          </a>

          <button
            type="button"
            class="feed-crop-results-secondary-button"
            data-results-print-button
          >
            🖨️ Print or Save as PDF
          </button>

        </div>

      </section>
    `;
  }

  function renderReport(
    report,
    payload
  ) {
    const answers =
      payload.answers;

    const displayedRecommendations =
      getDisplayedRecommendations(
        report,
        answers
      );

    const topResult =
      displayedRecommendations[0];

    if (!topResult) {
      renderNoEligibleResults(
        report
      );

      return;
    }

    const reportHTML = [
      renderPlanSummary(
        answers
      ),

      renderRecommendationHero(
        topResult
      ),

      renderStrengthsAndLimitations(
        topResult
      ),

      renderHarvestPlan(
        topResult
      ),

      renderCategoryBreakdown(
        topResult
      ),

      renderAlternatives(
        displayedRecommendations
      ),

      renderGoalComplementTable(
        report.eligibleResults,
        answers
      ),

      renderCombinationPlan(
        report.eligibleResults,
        answers
      ),

      renderIneligibleCrops(
        report.ineligibleResults
      ),

      renderNextSteps(
        topResult
      )
    ].join("");

    elements.report.innerHTML =
      reportHTML;

    elements.report.hidden =
      false;

    elements.error.hidden =
      true;

    hideLoading();

    bindDynamicReportEvents();
  }

  function renderNoEligibleResults(
    report
  ) {
    hideLoading();

    elements.report.hidden =
      false;

    elements.error.hidden =
      true;

    elements.report.innerHTML = `
      <section class="feed-crop-results-no-match">

        <div class="feed-crop-results-no-match-icon">
          🌱
        </div>

        <span class="feed-crop-results-kicker">
          No eligible crop remained
        </span>

        <h1>
          Your Requirements Were More Restrictive Than the Current Crop Database
        </h1>

        <p>
          The engine scored
          <strong>
            ${escapeHTML(
              String(
                report.readyCropCount
              )
            )}
          </strong>
          ready crops, but every crop encountered a hard incompatibility or lost all eligible harvest paths.
        </p>

        <p>
          This does not necessarily mean that feed crops are impossible on your property. It means none of the current ten crops could satisfy the complete combination of space, lifecycle, harvest, processing, equipment, and storage requirements selected.
        </p>

        <div class="feed-crop-results-action-row">

          <a
            class="feed-crop-results-primary-button"
            href="${escapeHTML(
              getQuestionnaireUrl()
            )}"
          >
            Review My Answers →
          </a>

        </div>

        ${renderIneligibleCrops(
          report.ineligibleResults
        )}

      </section>
    `;
  }

  /*
    ==================================================
    Interaction handlers
    ==================================================
  */

  function bindStaticEvents() {
    if (elements.printButton) {
      elements.printButton.addEventListener(
        "click",
        printResults
      );
    }

    if (elements.editButton) {
      elements.editButton.addEventListener(
        "click",
        returnToQuestionnaire
      );
    }

    if (elements.restartButton) {
      elements.restartButton.addEventListener(
        "click",
        restartPlanner
      );
    }
  }

  function bindDynamicReportEvents() {
    elements.report
      .querySelectorAll(
        "[data-results-print-button]"
      )
      .forEach(button => {
        button.addEventListener(
          "click",
          printResults
        );
      });
  }

  function printResults() {
    global.print();
  }

  function returnToQuestionnaire() {
    global.location.href =
      getQuestionnaireUrl();
  }

  function restartPlanner() {
    const shouldRestart =
      global.confirm(
        "Start a new Feed Crop Planner questionnaire and clear the current saved answers?"
      );

    if (!shouldRestart) {
      return;
    }

    if (canUseSessionStorage()) {
      global.sessionStorage.removeItem(
        questionnaire.config
          .stateStorageKey
      );

      global.sessionStorage.removeItem(
        questionnaire.config
          .resultStorageKey
      );
    }

    global.location.href =
      getQuestionnaireUrl();
  }

  /*
    ==================================================
    Initialization
    ==================================================
  */

  function initializeResultsPage() {
    if (initialized) {
      return {
        initialized:
          true,

        payload:
          currentResultPayload,

        report:
          currentReport
      };
    }

    collectElements();

    const missingElements =
      getMissingRequiredElements();

    if (missingElements.length > 0) {
      console.error(
        "Feed Crop Planner results page is missing required elements:",
        missingElements
      );

      return {
        initialized:
          false,

        reason:
          "missing-page-elements",

        missingElements
      };
    }

    showLoading();

    bindStaticEvents();

    const registration =
      registerCropDatabase();

    if (!registration.registered) {
      showError(
        "The crop database could not be loaded",
        "The recommendation engine cannot compare crops until the Feed Crop Research Database is available.",
        {
          icon:
            "🌾"
        }
      );

      return {
        initialized:
          false,

        reason:
          registration.reason
      };
    }

    const validation =
      engine.validateRegisteredCrops();

    if (!validation.valid) {
      showError(
        "The crop database did not pass validation",
        "One or more feed-crop records are not ready for public recommendation scoring.",
        {
          icon:
            "🛠️"
        }
      );

      return {
        initialized:
          false,

        reason:
          "crop-validation-failed",

        validation
      };
    }

    const payloadResult =
      loadResultPayload();

    if (!payloadResult.loaded) {
      showError(
        "Complete the planner to see your recommendations",
        getPayloadErrorMessage(
          payloadResult.reason
        ),
        {
          icon:
            "🐔"
        }
      );

      return {
        initialized:
          false,

        reason:
          payloadResult.reason
      };
    }

    currentResultPayload =
      payloadResult.payload;

    currentProfile =
      createPublicProfile(
        currentResultPayload
          .answers
      );

    try {
      currentReport =
        scoreAllReadyCrops(
          currentProfile
        );
    } catch (error) {
      console.error(
        "Feed Crop Planner scoring failed:",
        error
      );

      showError(
        "Your recommendations could not be scored",
        "The shared scoring engine encountered an unexpected problem while comparing the ready crops.",
        {
          icon:
            "⚙️"
        }
      );

      return {
        initialized:
          false,

        reason:
          "public-scoring-failed",

        error
      };
    }

    renderReport(
      currentReport,
      currentResultPayload
    );

    initialized =
      true;

    return {
      initialized:
        true,

      payload:
        cloneValue(
          currentResultPayload
        ),

      profile:
        cloneValue(
          currentProfile
        ),

      report:
        currentReport
    };
  }

  /*
    ==================================================
    Development accessors
    ==================================================
  */

  function getCurrentPayload() {
    return currentResultPayload
      ? cloneValue(
          currentResultPayload
        )
      : null;
  }

  function getCurrentProfile() {
    return currentProfile
      ? cloneValue(
          currentProfile
        )
      : null;
  }

  function getCurrentReport() {
    return currentReport;
  }

  namespace.publicResults =
    Object.freeze({
      version:
        RESULTS_CONTROLLER_VERSION,

      initialize:
        initializeResultsPage,

      loadResultPayload,

      createPublicProfile,

      getReadyCrops,

      isEligibleCropResult,

      scoreAllReadyCrops,

      getCurrentPayload,

      getCurrentProfile,

      getCurrentReport,

      printResults,

      restartPlanner
    });

  document.addEventListener(
    "DOMContentLoaded",
    function handleDOMContentLoaded() {
      const rootElement =
        document.getElementById(
          "feed-crop-results-app"
        );

      if (!rootElement) {
        return;
      }

      if (
        rootElement.dataset
          .autoInitialize ===
        "false"
      ) {
        return;
      }

      initializeResultsPage();
    }
  );

})(window);