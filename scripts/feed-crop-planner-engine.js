"use strict";

/*
  Backyard Chicken Planner
  Chicken Feed Crop Planner Engine

  Work Session 1:
  - Confirms the planner configuration is available
  - Provides basic utility functions
  - Provides a temporary foundation-status test
  - Does not score crops yet
  - Does not modify feed-crops.js
*/

(function initializeFeedCropPlannerEngine(global) {

  const namespace =
    global.BCPFeedCropPlanner =
      global.BCPFeedCropPlanner || {};

  function getConfig() {
    return namespace.config || null;
  }

  function isConfigLoaded() {
    const config = getConfig();

    return Boolean(
      config &&
      config.plannerVersion &&
      config.cropSchemaVersion &&
      config.scoring &&
      config.enums
    );
  }

  function isValidFivePointScore(value) {
    return (
      value === null ||
      (
        Number.isInteger(value) &&
        value >= 1 &&
        value <= 5
      )
    );
  }

  function isPlainObject(value) {
    return Boolean(
      value &&
      typeof value === "object" &&
      !Array.isArray(value)
    );
  }

  function getRecommendationTier(score) {
    const config = getConfig();

    if (
      !config ||
      !Number.isFinite(score)
    ) {
      return null;
    }

    const boundedScore =
      Math.max(0, Math.min(100, score));

    return (
      config.scoring.recommendationTiers.find(
        tier => boundedScore >= tier.minimumScore
      ) || null
    );
  }

  function getConfidenceLabel(score) {
    const config = getConfig();

    if (
      !config ||
      !Number.isFinite(score)
    ) {
      return null;
    }

    const boundedScore =
      Math.max(0, Math.min(100, score));

    return (
      config.scoring.confidenceLabels.find(
        level => boundedScore >= level.minimumScore
      ) || null
    );
  }

  function weightedAverageKnown(factors) {
    if (!Array.isArray(factors)) {
      return null;
    }

    const knownFactors = factors.filter(factor => {
      return (
        isPlainObject(factor) &&
        Number.isFinite(factor.value) &&
        Number.isFinite(factor.weight) &&
        factor.weight > 0
      );
    });

    if (knownFactors.length === 0) {
      return null;
    }

    const totalWeight = knownFactors.reduce(
      (sum, factor) => sum + factor.weight,
      0
    );

    if (totalWeight <= 0) {
      return null;
    }

    return knownFactors.reduce(
      (sum, factor) => {
        const normalizedWeight =
          factor.weight / totalWeight;

        return (
          sum +
          factor.value * normalizedWeight
        );
      },
      0
    );
  }

  function getFoundationStatus() {
    const config = getConfig();

    const checks = [
      {
        id: "namespace",
        label: "Planner namespace created",
        passed: Boolean(namespace)
      },

      {
        id: "config",
        label: "Planner configuration loaded",
        passed: isConfigLoaded()
      },

      {
        id: "version",
        label: "Planner version available",
        passed: Boolean(
          config &&
          config.plannerVersion === "1.0.0"
        )
      },

      {
        id: "weights",
        label: "Base scoring weights available",
        passed: Boolean(
          config &&
          config.scoring &&
          config.scoring.baseCategoryWeights
        )
      },

      {
        id: "crop-ids",
        label: "Expected crop IDs available",
        passed: Boolean(
          config &&
          config.crops &&
          Array.isArray(
            config.crops.expectedCropIds
          ) &&
          config.crops.expectedCropIds.length === 10
        )
      },

      {
        id: "utilities",
        label: "Engine utility functions available",
        passed: true
      },

      {
  id: "utilities",
  label: "Engine utility functions available",
  passed: true
},

{
  id: "data-adapter",
  label: "Planner data adapter available",
  passed: Boolean(
    namespace.data &&
    typeof namespace.data
      .registerCropCollection === "function" &&
    typeof namespace.data
      .getCropById === "function"
  )
},

{
  id: "crop-database-registered",
  label: "Feed crop database registered",
  passed: Boolean(
    namespace.data &&
    namespace.data
      .isCropCollectionRegistered()
  )
},

{
  id: "crop-count",
  label: "Ten unique crop records detected",
  passed: Boolean(
    namespace.data &&
    namespace.data
      .getAllUniqueCrops()
      .length === 10
  )
}

    ];

    return {
      ready: checks.every(check => check.passed),
      checks,
      plannerVersion:
        config?.plannerVersion || null,
      cropSchemaVersion:
        config?.cropSchemaVersion || null
    };
  }

  function validateCropPlannerData(cropRecord) {
  const errors = [];
  const warnings = [];

  if (!isPlainObject(cropRecord)) {
    return {
      cropId: null,
      cropName: null,
      valid: false,
      errors: [
        "Crop record is not a valid object."
      ],
      warnings: []
    };
  }

  const cropId =
    typeof cropRecord.id === "string"
      ? cropRecord.id.trim()
      : null;

  const cropName =
    typeof cropRecord.name === "string"
      ? cropRecord.name.trim()
      : cropId;

  if (!cropId) {
    errors.push(
      "Crop record is missing a valid ID."
    );
  }

  if (!cropName) {
    warnings.push(
      "Crop record is missing a readable name."
    );
  }

  /*
    During Work Session 2, all existing crops are expected
    to be missing plannerData.

    That is reported as an error because the crop cannot
    yet participate in planner scoring.
  */
  if (!isPlainObject(cropRecord.plannerData)) {
    errors.push(
      "Missing plannerData object."
    );

    return {
      cropId,
      cropName,
      valid: false,
      errors,
      warnings
    };
  }

  const plannerData =
    cropRecord.plannerData;

  if (
    typeof plannerData.schemaVersion !== "string" ||
    plannerData.schemaVersion.trim() === ""
  ) {
    errors.push(
      "plannerData.schemaVersion is missing."
    );
  }

  const allowedPlannerDataStatuses =
  namespace.config?.enums?.plannerDataStatuses ||
  [];

if (
  typeof plannerData.developmentStatus !== "string" ||
  !allowedPlannerDataStatuses.includes(
    plannerData.developmentStatus
  )
) {
  errors.push(
    "plannerData.developmentStatus is missing or invalid."
  );
} else if (
  plannerData.developmentStatus !== "ready"
) {
  errors.push(
    `Planner development status is "${plannerData.developmentStatus}", not "ready".`
  );
}

  const requiredSections = [
    "identity",
    "lifecycle",
    "climate",
    "site",
    "soil",
    "water",
    "space",
    "flock",
    "labor",
    "cost",
    "goals",
    "risks",
    "seasonalRoles",
    "dataQuality"
  ];

  requiredSections.forEach(sectionName => {
    if (!isPlainObject(plannerData[sectionName])) {
      errors.push(
        `plannerData.${sectionName} must be an object.`
      );
    }
  });

  if (isPlainObject(plannerData.identity)) {
  const requiredIdentityFields = [
    "plannerName",
    "shortLabel",
    "icon",
    "cropCategory",
    "primaryFeedCategory",
    "guideUrl"
  ];

  requiredIdentityFields.forEach(fieldName => {
    const value =
      plannerData.identity[fieldName];

    if (
      typeof value !== "string" ||
      value.trim() === ""
    ) {
      errors.push(
        `plannerData.identity.${fieldName} is missing.`
      );
    }
  });
}

if (isPlainObject(plannerData.lifecycle)) {
  const lifecycle =
    plannerData.lifecycle;

  if (
    typeof lifecycle.growthCycle !== "string" ||
    !namespace.config.enums.growthCycles.includes(
      lifecycle.growthCycle
    )
  ) {
    errors.push(
      "plannerData.lifecycle.growthCycle is missing or invalid."
    );
  }

  const requiredLifecycleBooleans = [
    "isAnnual",
    "isBiennial",
    "isPerennial",
    "isTreeOrShrub",
    "regrowsAfterHarvest",
    "permanentPlantingRequired",
    "reversibleAfterOneSeason"
  ];

  requiredLifecycleBooleans.forEach(
    fieldName => {
      if (
        typeof lifecycle[fieldName] !==
        "boolean"
      ) {
        errors.push(
          `plannerData.lifecycle.${fieldName} must be true or false.`
        );
      }
    }
  );
}

if (!Array.isArray(plannerData.usePaths)) {
  errors.push(
    "plannerData.usePaths must be an array."
  );
} else if (plannerData.usePaths.length === 0) {
  errors.push(
    "plannerData.usePaths must contain at least one use path."
  );
} else {
  const usePathIds = new Set();

  plannerData.usePaths.forEach(
    (usePath, index) => {

      if (!isPlainObject(usePath)) {
        errors.push(
          `Use path at index ${index} must be an object.`
        );

        return;
      }

      if (
        typeof usePath.id !== "string" ||
        usePath.id.trim() === ""
      ) {
        errors.push(
          `Use path at index ${index} is missing an ID.`
        );
      } else if (
        usePathIds.has(usePath.id)
      ) {
        errors.push(
          `Duplicate use-path ID: ${usePath.id}`
        );
      } else {
        usePathIds.add(usePath.id);
      }

      if (
        typeof usePath.label !== "string" ||
        usePath.label.trim() === ""
      ) {
        errors.push(
          `Use path at index ${index} is missing a label.`
        );
      }

      if (
        !Array.isArray(
          usePath.harvestProducts
        )
      ) {
        errors.push(
          `Use path "${usePath.id || index}" must include a harvestProducts array.`
        );
      }

      if (
        !Array.isArray(
          usePath.suitableFeedingMethods
        )
      ) {
        errors.push(
          `Use path "${usePath.id || index}" must include a suitableFeedingMethods array.`
        );
      }

      if (
        !Array.isArray(
          usePath.requiredProcessingTasks
        )
      ) {
        errors.push(
          `Use path "${usePath.id || index}" must include a requiredProcessingTasks array.`
        );
      }

      if (
        !Array.isArray(
          usePath.safetyWarnings
        )
      ) {
        errors.push(
          `Use path "${usePath.id || index}" must include a safetyWarnings array.`
        );
      }
    }
  );
}

  return {
    cropId,
    cropName,
    valid: errors.length === 0,
    errors,
    warnings
  };
}

function validateRegisteredCrops() {
  if (
    !namespace.data ||
    typeof namespace.data
      .getAllUniqueCrops !== "function"
  ) {
    return {
      valid: false,
      totalCrops: 0,
      validCrops: 0,
      invalidCrops: 0,
      results: [],
      errors: [
        "Planner data adapter is unavailable."
      ]
    };
  }

  const crops =
    namespace.data.getAllUniqueCrops();

  const results =
    crops.map(validateCropPlannerData);

  return {
    valid:
      results.length > 0 &&
      results.every(result => result.valid),

    totalCrops: results.length,

    validCrops:
      results.filter(result => result.valid)
        .length,

    invalidCrops:
      results.filter(result => !result.valid)
        .length,

    totalErrors:
      results.reduce(
        (sum, result) =>
          sum + result.errors.length,
        0
      ),

    totalWarnings:
      results.reduce(
        (sum, result) =>
          sum + result.warnings.length,
        0
      ),

    results,
    errors: []
  };
}

namespace.engine = Object.freeze({
  getConfig,
  isConfigLoaded,
  isValidFivePointScore,
  isPlainObject,
  getRecommendationTier,
  getConfidenceLabel,
  weightedAverageKnown,
  getFoundationStatus,

  validateCropPlannerData,
  validateRegisteredCrops
});

})(window);