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
          config.crops.expectedCropIds.length > 0
        )
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
  label: "Expected unique crop records detected",
  passed: Boolean(
    namespace.data &&
    config &&
    Array.isArray(
      config.crops?.expectedCropIds
    ) &&
    namespace.data
      .getAllUniqueCrops()
      .length ===
        config.crops.expectedCropIds.length
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

function clampScore(score) {
  if (!Number.isFinite(score)) {
    return null;
  }

  return Math.max(
    0,
    Math.min(100, score)
  );
}

function convertFivePointToPercent(score) {
  if (!isValidFivePointScore(score)) {
    return null;
  }

  if (score === null) {
    return null;
  }

  return (score - 1) * 25;
}

function arrayIncludesAny(source, targetValues) {
  if (
    !Array.isArray(source) ||
    !Array.isArray(targetValues)
  ) {
    return false;
  }

  return targetValues.some(
    value => source.includes(value)
  );
}

function scoreSunlightFit(crop, answers) {
  const sunHours =
    answers.site?.directSunHoursExact;

  const preferred =
    crop.plannerData.site
      .preferredSunHours;

  const productiveMinimum =
    crop.plannerData.site
      .productiveMinimumSunHours;

  if (!Number.isFinite(sunHours)) {
    return {
      score: null,
      reason:
        "Direct sunlight was not provided."
    };
  }

  if (
    Number.isFinite(preferred) &&
    sunHours >= preferred
  ) {
    return {
      score: 100,
      reason:
        `${sunHours} hours of direct sun meets Sunflower's preferred light level.`
    };
  }

  if (
    Number.isFinite(productiveMinimum) &&
    sunHours >= productiveMinimum
  ) {
    return {
      score: 80,
      reason:
        `${sunHours} hours of direct sun should support useful Sunflower production, although more light may improve strength and seed-head development.`
    };
  }

  if (sunHours >= 4) {
    return {
      score: 40,
      reason:
        `${sunHours} hours of direct sun is below the productive target for dependable seed-head production.`
    };
  }

  return {
    score: 10,
    reason:
      "The selected area is too shaded for dependable Sunflower seed production."
  };
}

function scoreSunflowerSpaceFit(
  crop,
  answers
) {
  const availableTypes =
    answers.space?.availableSpaceTypes ||
    [];

  const totalArea =
    answers.space?.totalGrowingAreaSqFt;

  const shape =
    answers.space?.largestAreaShape;

  const typeScores =
    crop.plannerData.space
      .spaceTypeScores;

  const layoutScores =
    crop.plannerData.space
      .layoutScores;

  const typeFactors =
    availableTypes
      .map(type => {
        const keyMap = {
          "in-ground": "inGround",
          "raised-bed": "raisedBed",
          "containers": "container",
          "fence-line": "fenceLine",
          "building-edge": "buildingEdge",
          "unused-lawn": "unusedLawn",
          "open-field": "openField",
          "orchard": "orchard",
          "forage-frame": "forageFrame",
          "rotational-paddock":
            "rotationalPaddock",
          "greenhouse": "greenhouse",
          "hedgerow": "hedgerow"
        };

        const score =
          typeScores[keyMap[type]];

        return convertFivePointToPercent(
          score
        );
      })
      .filter(Number.isFinite);

  const shapeMap = {
    "square-block": "squareBlock",
    "wide-rectangle": "wideRectangle",
    "long-strip": "longStrip",
    "irregular": "irregular",
    "small-beds": "smallBeds",
    "open-field": "openField"
  };

  const layoutScore =
    convertFivePointToPercent(
      layoutScores[shapeMap[shape]]
    );

  const typeScore =
    typeFactors.length > 0
      ? Math.max(...typeFactors)
      : null;

  let areaScore = null;

  if (Number.isFinite(totalArea)) {
    if (totalArea < 25) {
      areaScore = 55;
    } else if (totalArea < 50) {
      areaScore = 75;
    } else {
      areaScore = 90;
    }
  }

  const score = weightedAverageKnown([
    {
      value: typeScore,
      weight: 0.45
    },
    {
      value: layoutScore,
      weight: 0.30
    },
    {
      value: areaScore,
      weight: 0.25
    }
  ]);

  let reason =
    "Sunflower fits several common backyard layouts.";

  if (
    availableTypes.includes(
      "containers"
    )
  ) {
    reason =
      "Container-grown Sunflowers are possible, but feed-producing usefulness is limited compared with in-ground or fence-line planting.";
  } else if (
    availableTypes.includes(
      "fence-line"
    )
  ) {
    reason =
      "A sunny fence line is an especially strong Sunflower layout.";
  } else if (
    shape === "long-strip"
  ) {
    reason =
      "Sunflowers work well in a sunny linear strip because they do not require block pollination.";
  }

  return {
    score: clampScore(score),
    reason
  };
}

function scoreSunflowerSoilFit(
  crop,
  answers
) {
  const soilTexture =
    answers.soil?.soilTexture;

  const drainage =
    answers.soil?.soilDrainage;

  const textureMap = {
    "heavy-clay": "heavyClay",
    "clay-loam": "clayLoam",
    "loam": "loam",
    "sandy-loam": "sandyLoam",
    "very-sandy": "verySandy",
    "rocky": "rocky",
    "commercial-mix": null
  };

  let textureScore = null;

  if (soilTexture === "commercial-mix") {
    textureScore = 80;
  } else {
    textureScore =
      convertFivePointToPercent(
        crop.plannerData.soil
          .textureScores[
            textureMap[soilTexture]
          ]
      );
  }

  const drainageScores = {
    "very-fast": 70,
    "well-drained": 100,
    "moist": 75,
    "slow": 40,
    "waterlogged": 10,
    "standing-water": 0
  };

  const drainageScore =
    drainageScores[drainage] ??
    null;

  const score = weightedAverageKnown([
    {
      value: textureScore,
      weight: 0.40
    },
    {
      value: drainageScore,
      weight: 0.60
    }
  ]);

  return {
    score: clampScore(score),

    reason:
      drainage === "well-drained"
        ? "The selected soil drains well, which strongly supports Sunflower roots."
        : drainage === "very-fast"
          ? "The soil drains rapidly and may require more dependable watering."
          : "Slow or saturated drainage lowers Sunflower suitability."
  };
}

function scoreSunflowerWaterFit(
  crop,
  answers
) {
  const reliability =
    answers.water?.waterReliability;

  const frequency =
    answers.water
      ?.wateringFrequencyPreference;

  const criticalWater =
    answers.water
      ?.criticalStageWaterAvailability;

  const reliabilityScores = {
    "very-reliable": 100,
    "usually-reliable": 85,
    "occasionally-limited": 70,
    "frequently-limited": 55,
    "emergency-only": 35,
    "rainfall-only": 50,
    "unknown": null
  };

  const frequencyScores = {
    "daily": 100,
    "every-2-3-days": 95,
    "twice-weekly": 90,
    "weekly": 75,
    "drought-only": 55,
    "establishment-only": 60,
    "rainfall-dependent": 50
  };

  const criticalScores = {
    "reliable": 100,
    "occasional": 75,
    "emergency": 45,
    "none": 25,
    "needs-guidance": 60
  };

  const score = weightedAverageKnown([
    {
      value:
        reliabilityScores[reliability] ??
        null,
      weight: 0.45
    },
    {
      value:
        frequencyScores[frequency] ??
        null,
      weight: 0.30
    },
    {
      value:
        criticalScores[criticalWater] ??
        null,
      weight: 0.25
    }
  ]);

  return {
    score: clampScore(score),

    reason:
      reliability ===
      "frequently-limited"
        ? "Sunflower tolerates dry periods, but limited water may reduce head and seed production."
        : "The available watering system should support Sunflower establishment and seed development."
  };
}

function scoreSunflowerLaborFit(
  crop,
  answers
) {
  const experience =
    answers.labor
      ?.gardeningExperience;

  const weeklyTime =
    answers.labor?.weeklyCropTime;

  const experienceScores = {
    none: 65,
    beginner: 85,
    intermediate: 95,
    experienced: 100,
    advanced: 100
  };

  const weeklyTimeScores = {
    "under-30-min": 55,
    "30-60-min": 75,
    "1-2-hours": 90,
    "3-5-hours": 100,
    "6-10-hours": 100,
    "over-10-hours": 100,
    seasonal: 90
  };

  const score = weightedAverageKnown([
    {
      value:
        experienceScores[experience] ??
        null,
      weight: 0.45
    },
    {
      value:
        weeklyTimeScores[weeklyTime] ??
        null,
      weight: 0.55
    }
  ]);

  return {
    score: clampScore(score),

    reason:
      experience === "beginner"
        ? "Sunflowers are beginner-friendly to plant, although bird protection and drying may add work."
        : "The selected experience and available time are compatible with Sunflower management."
  };
}

function getSunflowerGoalScore(
  crop,
  answers
) {
  const goals =
    answers.preferences?.plannerGoals ||
    [];

  const goalScoreMap = {
    "reduce-feed-use":
      crop.plannerData.goals
        .feedReductionScore,

    "high-energy":
      crop.plannerData.goals
        .energyProductionScore,

    "protein-oriented":
      crop.plannerData.goals
        .proteinOrientedScore,

    "fresh-greens":
      crop.plannerData.goals
        .freshGreensScore,

    "living-forage":
      crop.plannerData.goals
        .livingForageScore,

    "winter-storage":
      crop.plannerData.goals
        .winterStorageScore,

    enrichment:
      crop.plannerData.goals
        .enrichmentScore,

    "resilience-feed":
      crop.plannerData.goals
        .resilienceScore,

    pollinators:
      crop.plannerData.goals
        .pollinatorSupportScore,

    "shared-household-food":
      crop.plannerData.goals
        .householdFoodScore,

    "self-reliance":
      crop.plannerData.goals
        .selfRelianceScore,

    "seed-saving":
      crop.plannerData.goals
        .seedSavingScore,

    "privacy-screening":
      crop.plannerData.goals
        .privacyScreeningScore,

    "edible-landscape":
      crop.plannerData.goals
        .visualAppealScore
  };

  const selectedScores =
    goals
      .map(goal =>
        convertFivePointToPercent(
          goalScoreMap[goal]
        )
      )
      .filter(Number.isFinite);

  const score =
    selectedScores.length > 0
      ? selectedScores.reduce(
          (sum, value) =>
            sum + value,
          0
        ) / selectedScores.length
      : null;

  return {
    score: clampScore(score),

    reason:
      selectedScores.length > 0
        ? "Sunflower was compared with the visitor's selected crop goals."
        : "No compatible goal information was available."
  };
}

function scoreSunflowerWildlifeRisk(
  crop,
  answers
) {
  const pressures =
    answers.preferences
      ?.wildlifePestPressure ||
    [];

  let penalty = 0;
  const reasons = [];

  const riskMap = {
    "wild-birds":
      crop.plannerData.risks
        .wildlife.wildBirds,

    deer:
      crop.plannerData.risks
        .wildlife.deer,

    squirrels:
      crop.plannerData.risks
        .wildlife.squirrels,

    rodents:
      crop.plannerData.risks
        .wildlife.rodents
  };

  Object.entries(riskMap)
    .forEach(([pressure, riskScore]) => {
      if (
        pressures.includes(pressure) &&
        Number.isFinite(riskScore)
      ) {
        const riskPenaltyMap = {
          1: 0,
          2: 3,
          3: 7,
          4: 12,
          5: 18
        };

        penalty +=
          riskPenaltyMap[riskScore] || 0;

        reasons.push(pressure);
      }
    });

  return {
    penalty:
      Math.min(30, penalty),

    reason:
      reasons.length > 0
        ? `Wildlife pressure lowers the result: ${reasons.join(", ")}.`
        : "No major reported wildlife pressure reduced the score."
  };
}

function scoreSunflowerUsePath(
  crop,
  usePath,
  answers
) {
  let score = 70;

  const strengths = [];
  const limitations = [];
  const hardFailures = [];

  const desiredProducts =
    answers.harvestStorage
      ?.desiredHarvestProducts ||
    [];

  const acceptedProcessing =
    answers.labor
      ?.acceptedProcessingTasks ||
    [];

  const dryingCapability =
    answers.labor?.dryingCapability;

  const minimalPreparation =
    answers.harvestStorage
      ?.minimalPreparationPriority;

  const productMatch =
    arrayIncludesAny(
      usePath.harvestProducts,
      desiredProducts
    );

  if (productMatch) {
    score += 15;

    strengths.push(
      "Matches a desired harvest product."
    );
  } else {
    score -= 10;

    limitations.push(
      "Does not directly match the selected harvest products."
    );
  }

  const missingRequiredTasks =
    usePath.requiredProcessingTasks
      .filter(task => {
        if (task === "cut-seed-heads") {
          return false;
        }

        return !acceptedProcessing
          .includes(task);
      });

  if (missingRequiredTasks.length > 0) {
    score -=
      missingRequiredTasks.length * 15;

    limitations.push(
      `Required work was not selected: ${missingRequiredTasks.join(", ")}.`
    );
  }

  if (
    usePath.dryingRequired &&
    dryingCapability === "none"
  ) {
    hardFailures.push(
      "This use path requires drying, but no drying capability was selected."
    );
  }

  if (
    minimalPreparation === "top" &&
    usePath.preparationEaseScore >= 4
  ) {
    score += 10;

    strengths.push(
      "Fits the top-priority request for minimal preparation."
    );
  }

  if (
    minimalPreparation === "top" &&
    usePath.preparationEaseScore <= 3
  ) {
    score -= 15;

    limitations.push(
      "Requires more preparation than the visitor wants."
    );
  }

  if (
    minimalPreparation === "high" &&
    usePath.preparationEaseScore >= 4
  ) {
    score += 6;
  }

  const storageHumidity =
    answers.harvestStorage
      ?.storageHumidity;

  if (
    usePath.dryingRequired &&
    storageHumidity === "often-humid"
  ) {
    score -= 15;

    limitations.push(
      "Humid storage conditions increase drying and mold risk."
    );
  }

  const rodentProtection =
    answers.harvestStorage
      ?.rodentProtection;

  if (
    usePath.rodentRiskScore >= 4 &&
    ["none", "common-problem"]
      .includes(rodentProtection)
  ) {
    score -= 15;

    limitations.push(
      "Rodent protection is weak for this stored-seed path."
    );
  }

  if (
    usePath.id ===
      "fresh-mature-seed-head" &&
    dryingCapability === "none"
  ) {
    score += 8;

    strengths.push(
      "Provides a valid no-drying harvest option."
    );
  }

  const finalScore =
    hardFailures.length > 0
      ? 0
      : clampScore(score);

  return {
    usePathId: usePath.id,
    label: usePath.label,
    score: finalScore,
    hardFailure:
      hardFailures.length > 0,
    hardFailures,
    strengths,
    limitations
  };
}

function scoreSunflowerProfile(
  crop,
  profile
) {
  const answers =
    profile?.answers || {};

  const categoryResults = {
    sunlight:
      scoreSunlightFit(
        crop,
        answers
      ),

    space:
      scoreSunflowerSpaceFit(
        crop,
        answers
      ),

    soil:
      scoreSunflowerSoilFit(
        crop,
        answers
      ),

    water:
      scoreSunflowerWaterFit(
        crop,
        answers
      ),

    labor:
      scoreSunflowerLaborFit(
        crop,
        answers
      ),

    goals:
      getSunflowerGoalScore(
        crop,
        answers
      )
  };

  const baseScore =
    weightedAverageKnown([
      {
        value:
          categoryResults.sunlight.score,
        weight: 0.20
      },
      {
        value:
          categoryResults.space.score,
        weight: 0.18
      },
      {
        value:
          categoryResults.soil.score,
        weight: 0.14
      },
      {
        value:
          categoryResults.water.score,
        weight: 0.16
      },
      {
        value:
          categoryResults.labor.score,
        weight: 0.14
      },
      {
        value:
          categoryResults.goals.score,
        weight: 0.18
      }
    ]);

  const wildlife =
    scoreSunflowerWildlifeRisk(
      crop,
      answers
    );

  const usePathResults =
    crop.plannerData.usePaths
      .map(usePath =>
        scoreSunflowerUsePath(
          crop,
          usePath,
          answers
        )
      )
      .sort(
        (a, b) =>
          b.score - a.score
      );

  const bestUsePath =
    usePathResults.find(
      result => !result.hardFailure
    ) || null;

  const usePathModifier =
    bestUsePath
      ? (
          bestUsePath.score - 70
        ) * 0.20
      : -25;

  const finalScore =
    clampScore(
      baseScore -
      wildlife.penalty +
      usePathModifier
    );

  const tier =
    getRecommendationTier(
      finalScore
    );

  const knownCategoryCount =
    Object.values(categoryResults)
      .filter(
        result =>
          Number.isFinite(result.score)
      )
      .length;

  const confidenceScore =
    clampScore(
      50 +
      knownCategoryCount * 7
    );

  return {
    profileId: profile.id,
    profileLabel: profile.label,

    cropId: crop.id,
    cropName: crop.name,

    finalScore:
      Math.round(finalScore),

    tier,

    confidenceScore:
      Math.round(confidenceScore),

    confidenceLabel:
      getConfidenceLabel(
        confidenceScore
      ),

    categoryResults,

    wildlife,

    usePathResults,

    bestUsePath,

    strengths: [
      categoryResults.sunlight.reason,
      categoryResults.space.reason,
      categoryResults.goals.reason
    ],

    limitations: [
      categoryResults.water.reason,
      wildlife.reason
    ]
  };
}

function runSunflowerSampleTests() {
  const profiles =
    namespace.config
      ?.testing
      ?.sampleUserProfiles ||
    [];

  const sunflower =
    namespace.data?.getCropById(
      "CROP-SUNFLOWER"
    );

  if (!sunflower) {
    return {
      success: false,
      error:
        "Sunflower was not found in the registered crop database.",
      results: []
    };
  }

  const allowedTestStatuses = [
    "testing",
    "ready"
  ];

  if (
    !sunflower.plannerData ||
    !allowedTestStatuses.includes(
      sunflower.plannerData
        .developmentStatus
    )
  ) {
    return {
      success: false,
      error:
        "Sunflower plannerData must be in testing or ready status before sample tests can run.",
      results: []
    };
  }

  const results =
    profiles.map(profile =>
      scoreSunflowerProfile(
        sunflower,
        profile
      )
    );

  return {
    success: true,
    cropId: sunflower.id,
    profileCount:
      profiles.length,
    results
  };
}

function normalizePlannerText(value) {
  return String(value || "")
    .trim()
    .toLowerCase();
}

function getFrostFreeSeasonMaximumDays(
  frostFreeSeasonRange
) {
  const rangeMaximumMap = {
    "under-60": 59,
    "60-89": 89,
    "90-119": 119,
    "120-149": 149,
    "150-179": 179,
    "180-209": 209,
    "210-plus": 240
  };

  return (
    rangeMaximumMap[
      frostFreeSeasonRange
    ] ?? null
  );
}

function scoreGenericShortSeasonFit(
  crop,
  answers
) {
  const selectedGoals =
    answers.preferences
      ?.plannerGoals ||
    [];

  if (
    !selectedGoals.includes(
      "short-season"
    )
  ) {
    return {
      score: null,

      reason:
        "Short-season production was not selected as a goal."
    };
  }

  const climate =
    crop.plannerData?.climate ||
    {};

  const availableDays =
    getFrostFreeSeasonMaximumDays(
      answers.climate
        ?.frostFreeSeasonRange
    );

  const minimumMaturityDays =
    climate.daysToMaturityMinimum;

  const maximumMaturityDays =
    climate.daysToMaturityMaximum;

  if (
    !Number.isFinite(availableDays) ||
    (
      !Number.isFinite(
        minimumMaturityDays
      ) &&
      !Number.isFinite(
        maximumMaturityDays
      )
    )
  ) {
    return {
      score: null,

      reason:
        "Comparable maturity information is unavailable."
    };
  }

  let score;

  if (
    Number.isFinite(
      maximumMaturityDays
    ) &&
    maximumMaturityDays <=
      availableDays - 14
  ) {
    score = 100;
  } else if (
    Number.isFinite(
      maximumMaturityDays
    ) &&
    maximumMaturityDays <=
      availableDays
  ) {
    score = 88;
  } else if (
    Number.isFinite(
      minimumMaturityDays
    ) &&
    minimumMaturityDays <=
      availableDays
  ) {
    score = 68;
  } else {
    score = 25;
  }

  return {
    score,

    reason:
      score >= 88
        ? `${crop.name} has a maturity range that fits the selected frost-free season well.`
        : score >= 60
          ? `${crop.name} may fit only with an early variety or favorable conditions.`
          : `${crop.name} is unlikely to complete its intended harvest reliably within the selected season.`
  };
}

function scoreGenericLimitedIrrigationFit(
  crop,
  answers
) {
  const selectedGoals =
    answers.preferences
      ?.plannerGoals ||
    [];

  if (
    !selectedGoals.includes(
      "limited-irrigation"
    )
  ) {
    return {
      score: null,

      reason:
        "Limited irrigation was not selected as a goal."
    };
  }

  const water =
    crop.plannerData?.water ||
    {};

  const limitedIrrigationScore =
    convertFivePointToPercent(
      water
        .suitableForLimitedIrrigationScore
    );

  const droughtYieldScore =
    convertFivePointToPercent(
      water.droughtYieldRetentionScore
    );

  const score =
    weightedAverageKnown([
      {
        value:
          limitedIrrigationScore,

        weight: 0.65
      },
      {
        value:
          droughtYieldScore,

        weight: 0.35
      }
    ]);

  return {
    score: clampScore(score),

    reason:
      Number.isFinite(score)
        ? `${crop.name} was scored using its limited-irrigation suitability and drought-yield retention.`
        : "Comparable limited-irrigation information is unavailable."
  };
}

function getStorageDurationLevel(
  duration
) {
  const durationMap = {
    immediate: 0,
    "very-short": 0,
    short: 1,
    "1-4-weeks": 1,
    medium: 2,
    "medium-term": 2,
    "1-3-months": 2,
    "medium-to-long": 3,
    "3-6-months": 3,
    long: 4,
    "6-12-months": 4,
    "over-12-months": 5
  };

  return (
    durationMap[duration] ??
    null
  );
}

function scoreUsePathStorageFit(
  usePath,
  answers
) {
  const desiredDuration =
    answers.harvestStorage
      ?.desiredStorageDuration;

  if (!desiredDuration) {
    return {
      score: null,
      reason:
        "No specific storage duration was requested."
    };
  }

  const desiredLevel =
    getStorageDurationLevel(
      desiredDuration
    );

  const pathLevel =
    getStorageDurationLevel(
      usePath.storageDurationCategory
    );

  if (
    !Number.isFinite(desiredLevel) ||
    !Number.isFinite(pathLevel)
  ) {
    return {
      score: null,
      reason:
        "Storage-duration information is incomplete."
    };
  }

  const difference =
    pathLevel - desiredLevel;

  let score;

  if (difference >= 0) {
    score = 100;
  } else if (difference === -1) {
    score = 60;
  } else if (difference === -2) {
    score = 25;
  } else {
    score = 0;
  }

  return {
    score,

    reason:
      score === 100
        ? "The use path can meet or exceed the requested storage period."
        : score >= 50
          ? "The use path falls somewhat short of the requested storage period."
          : "The use path cannot reasonably meet the requested storage period."
  };
}

function getNutritionalRoleTerms(
  crop,
  usePath
) {
  const terms =
    new Set();

  const addTerm = value => {
    const normalized =
      normalizePlannerText(value);

    if (normalized) {
      terms.add(normalized);
    }
  };

  /*
   * Nutritional matching should describe the
   * selected use path, not every possible use
   * of the crop.
   *
   * Example:
   * A grain crop may have one enrichment path,
   * one whole-grain path, and one fresh-forage
   * path. Those paths should not automatically
   * inherit the same nutritional role merely
   * because they belong to the same crop.
   */

  const usePathPrimaryRole =
    usePath?.primaryFeedRole;

  if (usePathPrimaryRole) {
    addTerm(
      usePathPrimaryRole
    );
  } else {
    /*
     * Crop-level information remains a fallback
     * for older or incomplete use paths that do
     * not yet define their own primary role.
     */

    addTerm(
      crop.plannerData
        ?.identity
        ?.primaryFeedCategory
    );

    (
      crop.plannerData
        ?.flock
        ?.directFacts
        ?.nutritionalOrientation ||
      []
    ).forEach(addTerm);
  }

  return Array.from(terms);
}

function scoreUsePathNutritionalFit(
  crop,
  usePath,
  answers
) {
  const preferredRole =
    normalizePlannerText(
      answers.preferences
        ?.preferredNutritionalRole
    );

  if (
    !preferredRole ||
    preferredRole === "diversified"
  ) {
    return {
      score: null,

      reason:
        "No single nutritional role was required."
    };
  }

  const roleTerms =
    getNutritionalRoleTerms(
      crop,
      usePath
    );

  const roleAliases = {
    energy: [
      "energy",
      "grain",
      "high-energy"
    ],

    "protein-oriented": [
      "protein-oriented",
      "protein"
    ],

    "fresh-green": [
      "fresh-green",
      "fresh-greens",
      "fresh-forage",
      "living-forage"
    ],

    "storage-produce": [
      "storage-produce",
      "winter-storage-produce",
      "whole-produce"
    ],

    enrichment: [
      "enrichment",
      "grain-enrichment",
      "whole-produce-enrichment"
    ]
  };

  const acceptedTerms =
    roleAliases[preferredRole] ||
    [preferredRole];

  const matches =
    roleTerms.some(term => {
      return acceptedTerms.some(
        acceptedTerm =>
          term.includes(
            acceptedTerm
          ) ||
          acceptedTerm.includes(
            term
          )
      );
    });

  return {
    score: matches ? 100 : 25,

    reason:
      matches
        ? "The use path matches the visitor's preferred nutritional role."
        : "The use path does not closely match the visitor's preferred nutritional role."
  };
}

function getCropGoalFieldName(goalId) {
  const goalFieldMap = {
    "reduce-feed-use":
      "feedReductionScore",

    "high-energy":
      "energyProductionScore",

    "protein-oriented":
      "proteinOrientedScore",

    "fresh-greens":
      "freshGreensScore",

    "living-forage":
      "livingForageScore",

    "winter-storage":
      "winterStorageScore",

    "fast-value":
      "fastestValueScore",

    "cool-season-production":
      "productionReliabilityScore",

    enrichment:
      "enrichmentScore",

    "resilience-feed":
      "resilienceScore",

    "soil-improvement":
      "soilImprovementScore",

    "nitrogen-fixation":
      "nitrogenFixationScore",

    "ground-cover":
      "groundCoverScore",

    "erosion-control":
      "erosionControlScore",

    shade:
      "shadeScore",

    "privacy-screening":
      "privacyScreeningScore",

    pollinators:
      "pollinatorSupportScore",

    "compost-biomass":
      "compostBiomassScore",

    "shared-household-food":
      "householdFoodScore",

    "seed-saving":
      "seedSavingScore",

    "self-reliance":
      "selfRelianceScore",

    "edible-landscape":
      "visualAppealScore",

    "use-unused-space":
      "multipurposeValueScore"
  };

  return goalFieldMap[goalId] || null;
}

function scoreGenericGoalFit(
  crop,
  answers
) {
  const selectedGoals =
    answers.preferences?.plannerGoals ||
    [];

  const priorities =
    answers.preferences
      ?.goalPriorities ||
    [];

  const goalData =
    crop.plannerData?.goals || {};

  const priorityWeights = {
    1: 1,
    2: 0.7,
    3: 0.45
  };

  const factors = [];

  selectedGoals.forEach(goalId => {
    const fieldName =
      getCropGoalFieldName(goalId);

    if (!fieldName) {
      return;
    }

    const cropScore =
      convertFivePointToPercent(
        goalData[fieldName]
      );

    if (!Number.isFinite(cropScore)) {
      return;
    }

    const priorityRecord =
      priorities.find(
        record =>
          record.goal === goalId
      );

    const weight =
      priorityRecord
        ? priorityWeights[
            priorityRecord.rank
          ] || 0.2
        : 0.2;

    factors.push({
      value: cropScore,
      weight
    });
  });

  const score =
    weightedAverageKnown(factors);

  return {
    score: clampScore(score),

    reason:
      factors.length > 0
        ? "The crop was scored against the visitor's selected and ranked goals."
        : "No compatible crop-goal ratings were available."
  };
}

function scoreGenericClimateFit(
  crop,
  answers
) {
  const climateType =
    answers.climate?.climateType;

  const climate =
    crop.plannerData?.climate;

  if (!climate) {
    return {
      score: null,
      reason:
        "Climate data is unavailable."
    };
  }

  let categoryScore = 60;

  if (
    climate.preferredClimateTypes
      ?.includes(climateType)
  ) {
    categoryScore = 100;
  } else if (
    climate.suitableClimateTypes
      ?.includes(climateType)
  ) {
    categoryScore = 82;
  } else if (
    climate.challengingClimateTypes
      ?.includes(climateType)
  ) {
    categoryScore = 40;
  }

  let traitScore = null;

  if (climateType === "hot-dry") {
    traitScore =
      weightedAverageKnown([
        {
          value:
            convertFivePointToPercent(
              climate.heatToleranceScore
            ),
          weight: 0.50
        },
        {
          value:
            convertFivePointToPercent(
              climate
                .droughtClimateToleranceScore
            ),
          weight: 0.50
        }
      ]);
  } else if (
    climateType === "hot-humid"
  ) {
    traitScore =
      weightedAverageKnown([
        {
          value:
            convertFivePointToPercent(
              climate.heatToleranceScore
            ),
          weight: 0.50
        },
        {
          value:
            convertFivePointToPercent(
              climate.humidityToleranceScore
            ),
          weight: 0.50
        }
      ]);
  } else if (
    [
      "cold-short-summer",
      "cool-moderate-summer",
      "high-elevation"
    ].includes(climateType)
  ) {
    traitScore =
      convertFivePointToPercent(
        climate.coolSummerToleranceScore
      );
  }

  const finalScore =
    weightedAverageKnown([
      {
        value: categoryScore,
        weight: 0.60
      },
      {
        value: traitScore,
        weight: 0.40
      }
    ]);

  return {
    score:
      clampScore(finalScore),

    reason:
      Number.isFinite(traitScore)
        ? `${crop.name} was evaluated using both its general climate classification and its crop-specific climate tolerance ratings.`
        : categoryScore >= 90
          ? `${crop.name} is strongly adapted to the selected climate type.`
          : categoryScore >= 70
            ? `${crop.name} is generally suitable for the selected climate.`
            : `${crop.name} may face climate limitations under the selected conditions.`
  };
}

function scoreGenericSunlightFit(
  crop,
  answers
) {
  const sunHours =
    answers.site?.directSunHoursExact;

  const site =
    crop.plannerData?.site;

  if (
    !site ||
    !Number.isFinite(sunHours)
  ) {
    return {
      score: null,
      reason:
        "Direct sunlight information is incomplete."
    };
  }

  if (
    Number.isFinite(
      site.preferredSunHours
    ) &&
    sunHours >= site.preferredSunHours
  ) {
    return {
      score: 100,
      reason:
        `${sunHours} hours of direct sun meets the crop's preferred light level.`
    };
  }

  if (
    Number.isFinite(
      site.productiveMinimumSunHours
    ) &&
    sunHours >=
      site.productiveMinimumSunHours
  ) {
    return {
      score: 80,
      reason:
        `${sunHours} hours of direct sunlight should support useful production.`
    };
  }

  if (sunHours >= 4) {
    return {
      score: 40,
      reason:
        "Sunlight is below the crop's productive target."
    };
  }

  return {
    score: 10,
    reason:
      "The site is too shaded for dependable production."
  };
}

function getSpaceTypePlannerKey(
  spaceType
) {
  const map = {
    "in-ground": "inGround",
    "raised-bed": "raisedBed",
    "containers": "container",
    "fence-line": "fenceLine",
    "building-edge": "buildingEdge",
    "unused-lawn": "unusedLawn",
    "open-field": "openField",
    "orchard": "orchard",
    "forage-frame": "forageFrame",

    "rotational-paddock":
      "rotationalPaddock",

    "greenhouse": "greenhouse",
    "hedgerow": "hedgerow"
  };

  return map[spaceType] || null;
}

function getLayoutPlannerKey(shape) {
  const map = {
    "square-block": "squareBlock",

    "wide-rectangle":
      "wideRectangle",

    "long-strip": "longStrip",

    "irregular": "irregular",

    "small-beds": "smallBeds",

    "open-field": "openField"
  };

  return map[shape] || null;
}

function scoreGenericSpaceFit(
  crop,
  answers
) {
  const spaceData =
    crop.plannerData?.space;

  if (!spaceData) {
    return {
      score: null,

      reason:
        "Space data is unavailable.",

      adjustments: [],
      limitations: []
    };
  }

  const answerSpace =
    answers.space || {};

  const spaceTypes =
    answerSpace
      .availableSpaceTypes ||
    [];

  const shape =
    answerSpace
      .largestAreaShape;

  const totalArea =
    answerSpace
      .totalGrowingAreaSqFt;

  const plantBehaviorRestrictions =
    answerSpace
      .plantBehaviorRestrictions ||
    [];

  const overflowOptions =
    answerSpace
      .overflowOptions ||
    [];

  const blockPlantingAvailable =
    answerSpace
      .blockPlantingAvailable;

  const availableBlockRows =
    answerSpace
      .availableBlockRows;

  const minimumUsefulArea =
    spaceData
      .minimumUsefulAreaSqFt;

  const heightCategory =
    spaceData
      .heightCategory;

  const adjustments = [];
  const limitations = [];

  const scoredSpaceTypes =
    spaceTypes
      .map(spaceType => {
        const key =
          getSpaceTypePlannerKey(
            spaceType
          );

        const rawScore =
          spaceData
            .spaceTypeScores?.[key];

        return {
          spaceType,
          key,

          rawScore,

          percentScore:
            convertFivePointToPercent(
              rawScore
            )
        };
      })
      .filter(result =>
        Number.isFinite(
          result.percentScore
        )
      );

  const bestTypeScore =
    scoredSpaceTypes.length > 0
      ? Math.max(
          ...scoredSpaceTypes.map(
            result =>
              result.percentScore
          )
        )
      : null;

  const averageTypeScore =
    scoredSpaceTypes.length > 0
      ? scoredSpaceTypes.reduce(
          (
            total,
            result
          ) =>
            total +
            result.percentScore,
          0
        ) /
        scoredSpaceTypes.length
      : null;

  const layoutKey =
    getLayoutPlannerKey(
      shape
    );

  const layoutScore =
    convertFivePointToPercent(
      spaceData
        .layoutScores?.[
          layoutKey
        ]
    );

  let areaScaleScore = null;

  if (
    Number.isFinite(
      totalArea
    )
  ) {
    if (totalArea < 25) {
      areaScaleScore =
        convertFivePointToPercent(
          spaceData
            .smallSpaceScore
        );
    } else if (
      totalArea <= 250
    ) {
      areaScaleScore =
        convertFivePointToPercent(
          spaceData
            .mediumSpaceScore
        );
    } else {
      areaScaleScore =
        convertFivePointToPercent(
          spaceData
            .largeSpaceScore
        );
    }
  }

  let score =
    weightedAverageKnown([
      {
        value:
          bestTypeScore,

        weight: 0.25
      },
      {
        value:
          averageTypeScore,

        weight: 0.25
      },
      {
        value:
          layoutScore,

        weight: 0.25
      },
      {
        value:
          areaScaleScore,

        weight: 0.25
      }
    ]);

  if (
    !Number.isFinite(score)
  ) {
    score = 50;
  }

  const containsContainers =
    spaceTypes.includes(
      "containers"
    );

  const containsRaisedBed =
    spaceTypes.includes(
      "raised-bed"
    );

  const containsInGround =
    spaceTypes.includes(
      "in-ground"
    );

  const containsOpenField =
    spaceTypes.includes(
      "open-field"
    );

  const containsOrchard =
    spaceTypes.includes(
      "orchard"
    );

  const containsForageFrame =
    spaceTypes.includes(
      "forage-frame"
    );

  const containsRotationalPaddock =
    spaceTypes.includes(
      "rotational-paddock"
    );

  const containerOnly =
    containsContainers &&
    !containsInGround &&
    !containsOpenField &&
    !containsOrchard &&
    !containsRotationalPaddock;

  const raisedBedOrContainerOnly =
    (
      containsContainers ||
      containsRaisedBed
    ) &&
    spaceTypes.every(
      type =>
        [
          "containers",
          "raised-bed",
          "small-beds"
        ].includes(type)
    );

  const containerPlannerScore =
    spaceData
      .spaceTypeScores
      ?.container;

  if (
    containerOnly &&
    Number.isFinite(
      containerPlannerScore
    )
  ) {
    if (
      containerPlannerScore <= 1
    ) {
      score -= 35;

      limitations.push(
        "The visitor has container-only growing space, but this crop is poorly suited to meaningful container production."
      );
    } else if (
      containerPlannerScore === 2
    ) {
      score -= 18;

      limitations.push(
        "Containers significantly limit this crop's useful production."
      );
    } else if (
      containerPlannerScore >= 4
    ) {
      score += 8;

      adjustments.push(
        "The crop is well suited to container production."
      );
    }
  }

  const raisedBedPlannerScore =
    spaceData
      .spaceTypeScores
      ?.raisedBed;

  if (
    raisedBedOrContainerOnly &&
    containsRaisedBed &&
    Number.isFinite(
      raisedBedPlannerScore
    )
  ) {
    if (
      raisedBedPlannerScore <= 1
    ) {
      score -= 28;

      limitations.push(
        "The available raised-bed space is a very poor fit for this crop."
      );
    } else if (
      raisedBedPlannerScore === 2
    ) {
      score -= 14;

      limitations.push(
        "Raised-bed production is possible only with substantial limitations."
      );
    } else if (
      raisedBedPlannerScore >= 4
    ) {
      score += 6;

      adjustments.push(
        "The crop is strongly suited to raised-bed production."
      );
    }
  }

  if (
    Number.isFinite(
      minimumUsefulArea
    ) &&
    Number.isFinite(
      totalArea
    ) &&
    totalArea <
      minimumUsefulArea
  ) {
    const areaRatio =
      totalArea /
      minimumUsefulArea;

    let areaPenalty = 0;

    if (areaRatio < 0.25) {
      areaPenalty = 35;
    } else if (
      areaRatio < 0.5
    ) {
      areaPenalty = 24;
    } else if (
      areaRatio < 0.75
    ) {
      areaPenalty = 14;
    } else {
      areaPenalty = 7;
    }

    score -= areaPenalty;

    limitations.push(
      `The available ${totalArea}-square-foot area is below this crop's approximate ${minimumUsefulArea}-square-foot useful-production threshold.`
    );
  }

  if (
    spaceData
      .blockPlantingRequired ===
      true
  ) {
    const minimumBlockRows =
      Number.isFinite(
        spaceData
          .minimumBlockRows
      )
        ? spaceData
            .minimumBlockRows
        : 4;

    if (
      blockPlantingAvailable ===
        false ||
      (
        Number.isFinite(
          availableBlockRows
        ) &&
        availableBlockRows <
          minimumBlockRows
      ) ||
      plantBehaviorRestrictions
        .includes(
          "no-block-planting"
        )
    ) {
      score -= 40;

      limitations.push(
        `This crop requires a compact planting block of approximately ${minimumBlockRows} or more rows, but the available layout does not provide it.`
      );
    } else if (
      blockPlantingAvailable ===
        true &&
      Number.isFinite(
        availableBlockRows
      ) &&
      availableBlockRows >=
        minimumBlockRows
    ) {
      score += 10;

      adjustments.push(
        "The available layout satisfies the crop's block-planting requirement."
      );
    }
  }

  if (
    spaceData
      .vineSpreadRequired ===
      true &&
    plantBehaviorRestrictions
      .includes(
        "no-vines-outside-bed"
      ) &&
    overflowOptions.length === 0
  ) {
    score -= 40;

    limitations.push(
      "This crop requires vine-spread space, but the visitor does not allow vines outside the planting bed."
    );
  }

  const isTallCrop =
    [
      "tall",
      "very-tall",
      "tree"
    ].includes(
      heightCategory
    );

  if (
    isTallCrop &&
    plantBehaviorRestrictions
      .includes(
        "no-tall-screening"
      )
  ) {
    score -= 24;

    limitations.push(
      "The crop's mature height conflicts with the visitor's height restriction."
    );
  }

  if (
    isTallCrop &&
    plantBehaviorRestrictions
      .includes(
        "must-remain-small"
      )
  ) {
    score -= 20;

    limitations.push(
      "The crop is too tall or large for a space that must remain compact."
    );
  }

  if (
    plantBehaviorRestrictions
      .includes("no-trees") &&
    heightCategory === "tree"
  ) {
    score -= 45;

    limitations.push(
      "Trees are prohibited in the available growing space."
    );
  }

  if (
    containsForageFrame
  ) {
    const forageFrameScore =
      spaceData
        .spaceTypeScores
        ?.forageFrame;

    if (
      Number.isFinite(
        forageFrameScore
      )
    ) {
      if (
        forageFrameScore >= 4
      ) {
        score += 12;

        adjustments.push(
          "The crop is strongly suited to protected forage-frame production."
        );
      } else if (
        forageFrameScore <= 2
      ) {
        score -= 20;

        limitations.push(
          "The crop is poorly suited to the selected protected forage-frame system."
        );
      }
    }
  }

  if (
    containsRotationalPaddock
  ) {
    const paddockScore =
      spaceData
        .spaceTypeScores
        ?.rotationalPaddock;

    if (
      Number.isFinite(
        paddockScore
      )
    ) {
      if (
        paddockScore >= 4
      ) {
        score += 8;

        adjustments.push(
          "The crop is well suited to rotational-paddock production."
        );
      } else if (
        paddockScore <= 2
      ) {
        score -= 12;

        limitations.push(
          "The crop is a weak fit for rotational-paddock use."
        );
      }
    }
  }

  if (
    containsOrchard
  ) {
    const orchardScore =
      spaceData
        .spaceTypeScores
        ?.orchard;

    if (
      Number.isFinite(
        orchardScore
      )
    ) {
      if (
        orchardScore >= 4
      ) {
        score += 8;

        adjustments.push(
          "The crop is strongly suited to orchard integration."
        );
      } else if (
        orchardScore <= 2
      ) {
        score -= 12;

        limitations.push(
          "The crop is poorly suited to orchard integration."
        );
      }
    }
  }

  const finalScore =
    clampScore(score);

  let reason =
    "The crop was scored against the available space types, layout, area, and physical growing restrictions.";

  if (
    limitations.length > 0
  ) {
    reason =
      limitations.join(" ");
  } else if (
    finalScore >= 85
  ) {
    reason =
      "The crop fits the selected space types, layout, and growing scale very well.";
  } else if (
    finalScore >= 60
  ) {
    reason =
      "The crop can fit the available space, although some limitations remain.";
  } else {
    reason =
      "The selected growing space is a weak fit for this crop.";
  }

  return {
    score:
      finalScore,

    reason,

    adjustments,
    limitations,

    diagnostics: {
      bestTypeScore,
      averageTypeScore,
      layoutScore,
      areaScaleScore,
      minimumUsefulArea,
      totalArea,
      containerOnly,
      raisedBedOrContainerOnly
    }
  };
}

function getSoilTexturePlannerKey(
  soilTexture
) {
  const map = {
    "heavy-clay": "heavyClay",
    "clay-loam": "clayLoam",
    "loam": "loam",
    "sandy-loam": "sandyLoam",
    "very-sandy": "verySandy",
    "rocky": "rocky"
  };

  return map[soilTexture] || null;
}

function scoreGenericSoilFit(
  crop,
  answers
) {
  const soilData =
    crop.plannerData?.soil;

  if (!soilData) {
    return {
      score: null,
      reason:
        "Soil data is unavailable."
    };
  }

  const soilTexture =
    answers.soil?.soilTexture;

  const drainage =
    answers.soil?.soilDrainage;

  let textureScore = null;

  if (
    soilTexture ===
      "commercial-mix" ||
    soilTexture ===
      "raised-bed-mix"
  ) {
    textureScore = 80;
  } else {
    const textureKey =
      getSoilTexturePlannerKey(
        soilTexture
      );

    textureScore =
      convertFivePointToPercent(
        soilData
          .textureScores?.[
            textureKey
          ]
      );
  }

  const drainageScores = {
    "very-fast": 70,
    "well-drained": 100,
    "moist": 75,
    "slow": 40,
    "waterlogged": 10,
    "standing-water": 0
  };

  const drainageScore =
    drainageScores[drainage] ??
    null;

  const score =
    weightedAverageKnown([
      {
        value: textureScore,
        weight: 0.40
      },
      {
        value: drainageScore,
        weight: 0.60
      }
    ]);

  return {
    score: clampScore(score),

    reason:
      drainage === "well-drained"
        ? "The selected soil has favorable drainage."
        : drainage === "very-fast"
          ? "Rapid drainage may require more dependable moisture management."
          : "Slow or saturated drainage lowers crop suitability."
  };
}

function scoreGenericWaterFit(
  crop,
  answers
) {
  const waterData =
    crop.plannerData?.water;

  if (!waterData) {
    return {
      score: null,
      reason:
        "Water data is unavailable."
    };
  }

  const reliability =
    answers.water?.waterReliability;

  const frequency =
    answers.water
      ?.wateringFrequencyPreference;

  const criticalWater =
    answers.water
      ?.criticalStageWaterAvailability;

  const reliabilityScores = {
    "very-reliable": 100,
    "usually-reliable": 85,

    "occasionally-limited":
      70,

    "frequently-limited":
      50,

    "emergency-only": 30,
    "rainfall-only": 50,
    "unknown": null
  };

  const frequencyScores = {
    "daily": 100,
    "every-2-3-days": 95,
    "twice-weekly": 90,
    "weekly": 72,
    "drought-only": 50,
    "establishment-only": 55,

    "rainfall-dependent":
      45
  };

  const criticalScores = {
    "reliable": 100,
    "occasional": 72,
    "emergency": 40,
    "none": 20,

    "needs-guidance":
      55
  };

  let capabilityScore =
    weightedAverageKnown([
      {
        value:
          reliabilityScores[
            reliability
          ] ?? null,

        weight: 0.45
      },
      {
        value:
          frequencyScores[
            frequency
          ] ?? null,

        weight: 0.30
      },
      {
        value:
          criticalScores[
            criticalWater
          ] ?? null,

        weight: 0.25
      }
    ]);

  const limitedWaterSuitability =
    convertFivePointToPercent(
      waterData
        .suitableForLimitedIrrigationScore
    );

  if (
    [
      "occasionally-limited",
      "frequently-limited",
      "rainfall-only"
    ].includes(reliability)
  ) {
    capabilityScore =
      weightedAverageKnown([
        {
          value: capabilityScore,
          weight: 0.60
        },
        {
          value:
            limitedWaterSuitability,
          weight: 0.40
        }
      ]);
  }

  return {
    score:
      clampScore(capabilityScore),

    reason:
      reliability ===
        "frequently-limited"
        ? `${crop.name} was adjusted for limited water and its crop-specific drought suitability.`
        : "The watering setup was compared with the crop's moisture needs."
  };
}

function scoreGenericLaborFit(
  crop,
  answers
) {
  const laborData =
    crop.plannerData?.labor;

  if (!laborData) {
    return {
      score: null,
      reason:
        "Labor data is unavailable."
    };
  }

  const experience =
    answers.labor
      ?.gardeningExperience;

  const weeklyTime =
    answers.labor?.weeklyCropTime;

  const experienceScores = {
    none: 55,
    beginner: 75,
    intermediate: 90,
    experienced: 100,
    advanced: 100
  };

  const weeklyTimeScores = {
    "under-30-min": 45,
    "30-60-min": 65,
    "1-2-hours": 85,
    "3-5-hours": 100,
    "6-10-hours": 100,
    "over-10-hours": 100,
    seasonal: 85
  };

  const beginnerFit =
    convertFivePointToPercent(
      laborData
        .beginnerFriendlinessScore
    );

  const lowTimeFit =
    convertFivePointToPercent(
      laborData
        .suitableForLowTimeUsersScore
    );

  const score =
    weightedAverageKnown([
      {
        value:
          experienceScores[
            experience
          ] ?? null,

        weight: 0.25
      },
      {
        value:
          weeklyTimeScores[
            weeklyTime
          ] ?? null,

        weight: 0.25
      },
      {
        value: beginnerFit,
        weight: 0.25
      },
      {
        value: lowTimeFit,
        weight: 0.25
      }
    ]);

  return {
    score: clampScore(score),

    reason:
      "The crop's beginner friendliness and workload were compared with the visitor's experience and available time."
  };
}

function getGenericWildlifePenalty(
  crop,
  answers
) {
  const pressures =
    answers.preferences
      ?.wildlifePestPressure ||
    [];

  const wildlife =
    crop.plannerData
      ?.risks?.wildlife ||
    {};

  const ownedEquipment =
    answers.labor
      ?.ownedEquipment ||
    [];

  const purchaseWillingness =
    answers.labor
      ?.equipmentPurchaseWillingness ||
    [];

  const dryingFacilities =
    answers.labor
      ?.dryingFacilities ||
    [];

  const rodentProtection =
    answers.harvestStorage
      ?.rodentProtection;

  const availableProtection =
    new Set([
      ...ownedEquipment,
      ...purchaseWillingness,
      ...dryingFacilities
    ]);

  const pressureFieldMap = {
    "wild-birds": "wildBirds",
    deer: "deer",
    raccoons: "raccoons",
    squirrels: "squirrels",
    rabbits: "rabbits",
    rodents: "rodents",
    groundhogs: "groundhogs"
  };

  const riskPenaltyMap = {
    1: 0,
    2: 3,
    3: 7,
    4: 12,
    5: 18
  };

  const mitigationMap = {
    "wild-birds": [
      "bird-netting",
      "row-cover"
    ],

    deer: [
      "fencing",
      "protected-bed",
      "row-cover"
    ],

    rabbits: [
      "fencing",
      "protected-bed",
      "row-cover",
      "forage-frame"
    ],

    groundhogs: [
      "fencing",
      "protected-bed"
    ],

    raccoons: [
      "fencing",
      "protected-storage"
    ],

    squirrels: [
      "bird-netting",
      "protected-storage"
    ],

    rodents: [
      "rodent-proof",
      "food-safe-bucket",
      "metal-grain-can",
      "protected-storage"
    ]
  };

  let penalty = 0;

  const matchedPressures = [];
  const mitigatedPressures = [];

  pressures.forEach(pressure => {
    const field =
      pressureFieldMap[pressure];

    const riskScore =
      wildlife[field];

    if (!Number.isFinite(riskScore)) {
      return;
    }

    let pressurePenalty =
      riskPenaltyMap[riskScore] ||
      0;

    const mitigationOptions =
      mitigationMap[pressure] ||
      [];

    const hasEquipmentMitigation =
      mitigationOptions.some(
        option =>
          availableProtection.has(
            option
          )
      );

    const hasRodentMitigation =
      pressure === "rodents" &&
      [
        "rodent-proof-containers",
        "rodent-proof-room"
      ].includes(
        rodentProtection
      );

    if (
      hasEquipmentMitigation ||
      hasRodentMitigation
    ) {
      pressurePenalty *= 0.35;

      mitigatedPressures.push(
        pressure
      );
    }

    penalty += pressurePenalty;

    matchedPressures.push(
      pressure
    );
  });

  const roundedPenalty =
    Math.round(
      Math.min(30, penalty)
    );

  return {
    penalty:
      roundedPenalty,

    matchedPressures,

    mitigatedPressures,

    reason:
      matchedPressures.length === 0
        ? "No reported wildlife pressure reduced the score."
        : mitigatedPressures.length > 0
          ? `Reported wildlife pressure affects this crop, but selected protection reduces part of the penalty. Mitigated: ${mitigatedPressures.join(", ")}.`
          : `Reported wildlife pressure affects this crop: ${matchedPressures.join(", ")}.`
  };
}

function analyzeHarvestProductMatch(
  usePathProducts,
  desiredProducts
) {
  const safeUsePathProducts =
    Array.isArray(usePathProducts)
      ? usePathProducts
      : [];

  const safeDesiredProducts =
    Array.isArray(desiredProducts)
      ? desiredProducts
      : [];

  /*
   * Broad questionnaire categories are allowed
   * to match multiple crop-specific product IDs.
   *
   * Crop records should remain precise. The
   * engine is responsible for translating broad
   * visitor requests into compatible crop
   * products.
   */
  const productAliasGroups = {
    "fresh-greens": [
      "fresh-greens",
      "young-leaves",
      "young-cowpea-leaves",
      "tender-leaves",
      "tender-vine-tips",
      "tender-cowpea-vine-tips",
      "young-shoots",
      "soft-young-stems",
      "fresh-green-forage",
      "fresh-legume-forage",
      "seasonal-green-enrichment",
      "living-cowpea-leaves"
    ],

    "fresh-forage": [
      "fresh-forage",
      "fresh-green-forage",
      "fresh-legume-forage",
      "young-vegetative-forage",
      "living-cowpea-leaves",
      "tender-vine-growth",
      "young-shoots",
      "cut-and-carry-forage"
    ],

    "tender-pods": [
      "tender-pods",
      "tender-immature-pods",
      "immature-pods",
      "young-cowpea-pods",
      "fresh-green-pods",
      "edible-immature-pods"
    ],

    "fresh-vegetables": [
      "fresh-vegetables",
      "tender-immature-pods",
      "immature-pods",
      "fresh-green-pods",
      "fresh-green-cowpea-seeds",
      "immature-shelled-cowpeas",
      "fresh-shell-peas",
      "fresh-immature-peas"
    ],

    "fresh-produce": [
      "fresh-produce",
      "fresh-fruit",
      "fresh-vegetables",
      "tender-immature-pods",
      "immature-pods",
      "fresh-green-cowpea-seeds",
      "immature-shelled-cowpeas",
      "fresh-shell-peas"
    ],

    "dry-legumes": [
      "dry-legumes",
      "mature-dry-cowpea-seed",
      "cleaned-whole-cowpeas",
      "heat-treated-whole-cowpeas",
      "heat-treated-cracked-cowpeas",
      "heat-treated-ground-cowpea-meal",
      "processed-legume-feed-ingredient"
    ],

    "dry-seeds": [
      "dry-seeds",
      "mature-dry-cowpea-seed",
      "cleaned-whole-cowpeas",
      "whole-dry-seed",
      "stored-dry-seed"
    ],

    "dry-grain": [
      "dry-grain",
      "whole-grain",
      "stored-grain",
      "mature-dry-seed",
      "cleaned-whole-seed",
      "mature-dry-cowpea-seed"
    ],

    "whole-grain": [
      "whole-grain",
      "dry-grain",
      "stored-grain",
      "whole-dry-seed",
      "mature-dry-cowpea-seed",
      "cleaned-whole-cowpeas"
    ],

    "stored-grain": [
      "stored-grain",
      "whole-grain",
      "dry-grain",
      "whole-dry-seed",
      "mature-dry-cowpea-seed",
      "cleaned-whole-cowpeas"
    ],

    "cracked-grain": [
      "cracked-grain",
      "cracked-seed",
      "heat-treated-cracked-cowpeas"
    ],

    "ground-grain": [
      "ground-grain",
      "ground-seed",
      "ground-meal",
      "heat-treated-ground-cowpea-meal"
    ],

        "millet-grain": [
  "millet-grain",
  "loose-millet-grain",
  "proso-millet-grain",
  "mature-proso-millet-grain",
  "cleaned-proso-millet-grain",
  "whole-proso-millet-grain",
  "dried-proso-millet-grain",
  "mature-whole-proso-millet-grain",
  "cleaned-whole-proso-millet-grain",
  "dry-grain",
  "whole-grain",
  "stored-grain"
],

    "millet-panicles": [
  "millet-panicles",
  "whole-millet-panicles",
  "proso-millet-panicles",
  "mature-proso-millet-panicles",
  "dried-proso-millet-panicles",
  "whole-mature-proso-millet-panicles",
  "whole-dried-proso-millet-panicles",
  "seed-bearing-panicles",
  "whole-seed-heads",
  "fresh-seed-heads",
  "dried-seed-heads"
],

    "fresh-seed-heads": [
      "fresh-seed-heads",
      "fresh-mature-seed-heads",
      "fresh-mature-seed-head",
      "mature-seed-heads",
      "whole-mature-panicles",
      "whole-mature-proso-millet-panicles",
      "seed-bearing-panicles"
    ],

    "dried-seed-heads": [
      "dried-seed-heads",
      "whole-dried-seed-heads",
      "dried-whole-seed-heads",
      "whole-dried-panicles",
      "whole-dried-proso-millet-panicles",
      "dried-seed-bearing-panicles"
    ],

    "whole-seed-heads": [
      "whole-seed-heads",
      "fresh-seed-heads",
      "dried-seed-heads",
      "fresh-mature-seed-heads",
      "fresh-mature-seed-head",
      "whole-dried-seed-heads",
      "dried-whole-seed-heads",
      "whole-mature-panicles",
      "whole-dried-panicles",
      "whole-mature-proso-millet-panicles",
      "whole-dried-proso-millet-panicles",
      "seed-bearing-panicles"
    ],

    "dried-forage": [
      "dried-forage",
      "dried-leaves",
      "leaf-meal",
      "dried-leaf-meal",
      "hay"
    ],

    "dried-leaves": [
      "dried-leaves",
      "leaf-meal",
      "dried-leaf-meal",
      "dried-forage"
    ],

    "fresh-fruit": [
      "fresh-fruit",
      "whole-fruit",
      "ripe-fruit",
      "fallen-fruit"
    ],

    "fallen-fruit": [
      "fallen-fruit",
      "ripe-fallen-fruit",
      "windfall-fruit"
    ],

    "stored-enrichment": [
      "stored-enrichment",
      "dried-seed-heads",
      "whole-seed-heads",
      "stored-grain",
      "whole-dried-produce"
    ]
  };

  const genericProductIds =
    new Set(
      Object.keys(
        productAliasGroups
      )
    );

    function productMatches(
    desiredProduct,
    usePathProduct
  ) {
    if (
      desiredProduct ===
      usePathProduct
    ) {
      return true;
    }

    /*
     * A requested product and a crop product
     * are compatible when both appear anywhere
     * within the same alias group.
     *
     * Neither value has to be the alias-group
     * key. This supports older questionnaire IDs
     * such as "loose-millet-grain" and
     * "whole-millet-panicles".
     */
    return Object.entries(
      productAliasGroups
    ).some(
      ([
        canonicalProduct,
        aliases
      ]) => {
        const completeGroup =
          new Set([
            canonicalProduct,
            ...aliases
          ]);

        return (
          completeGroup.has(
            desiredProduct
          ) &&
          completeGroup.has(
            usePathProduct
          )
        );
      }
    );
  }

  const matchedDesiredProducts =
    safeDesiredProducts.filter(
      desiredProduct => {
        return safeUsePathProducts.some(
          usePathProduct => {
            return productMatches(
              desiredProduct,
              usePathProduct
            );
          }
        );
      }
    );

  const specificDesiredProducts =
    safeDesiredProducts.filter(
      productId => {
        return !genericProductIds.has(
          productId
        );
      }
    );

  const specificMatches =
    specificDesiredProducts.filter(
      desiredProduct => {
        return safeUsePathProducts.some(
          usePathProduct => {
            return productMatches(
              desiredProduct,
              usePathProduct
            );
          }
        );
      }
    );

  const genericMatches =
    matchedDesiredProducts.filter(
      productId => {
        return genericProductIds.has(
          productId
        );
      }
    );

  return {
    hasAnyDesiredProducts:
      safeDesiredProducts.length > 0,

    hasSpecificDesiredProducts:
      specificDesiredProducts.length >
      0,

    hasAnyMatch:
      matchedDesiredProducts.length > 0,

    hasSpecificMatch:
      specificMatches.length > 0,

    allMatches:
      matchedDesiredProducts,

    specificMatches,

    genericMatches,

    specificDesiredProducts
  };
}

function getUsePathCapabilityGate(
  usePath,
  answers,
  productMatchAnalysis
) {
  const hardFailures = [];
  const limitations = [];
  const strengths = [];

  const harvestStorage =
    answers.harvestStorage || {};

  const desiredStorageDuration =
    harvestStorage
      .desiredStorageDuration;

  const harvestPatternPreference =
    harvestStorage
      .harvestPatternPreference;

  const frequency =
    usePath
      .harvestFrequencyCategory;

  /*
   * CAPABILITY GATE 1
   *
   * When the visitor requests one or more
   * crop-specific harvest products, a use
   * path that produces none of them cannot
   * become the winning path merely through
   * generic space, climate, or goal scores.
   */
  if (
    productMatchAnalysis
      .hasSpecificDesiredProducts &&
    !productMatchAnalysis
      .hasSpecificMatch
  ) {
    hardFailures.push(
      `This use path cannot produce any of the requested specific harvest products: ${productMatchAnalysis.specificDesiredProducts.join(", ")}.`
    );
  }

  /*
 * CAPABILITY GATE 1B
 *
 * When the visitor has selected one or more
 * desired harvest products, a use path that
 * produces none of those products is not an
 * eligible recommendation path.
 *
 * This applies to general products as well as
 * crop-specific products. It prevents unrelated
 * paths, such as leafy forage, from winning when
 * the visitor explicitly requested seed heads
 * or dry grain.
 */
if (
  productMatchAnalysis
    .hasAnyDesiredProducts &&
  !productMatchAnalysis
    .hasAnyMatch
) {
  hardFailures.push(
    "This use path does not produce any of the visitor's selected harvest products."
  );
}

  /*
   * CAPABILITY GATE 2
   *
   * A visitor asking for continuous,
   * immediate production should not receive
   * a once-per-season mature grain or major
   * storage harvest as the leading use path.
   */
  const immediateContinuousUseRequested =
    desiredStorageDuration ===
      "immediate" &&
    harvestPatternPreference ===
      "continuous";

  const seasonalHarvestFrequencies =
    new Set([
      "single-seasonal",
      "major",
      "annual-major",
      "once-per-season",
      "process-in-small-batches"
    ]);

  if (
    immediateContinuousUseRequested &&
    seasonalHarvestFrequencies.has(
      frequency
    )
  ) {
    hardFailures.push(
      "The visitor wants continuous immediate production, but this use path depends on a mature seasonal harvest."
    );
  }

  /*
   * A less explicit immediate-use request
   * receives a strong penalty rather than a
   * hard failure.
   */
  const immediateUseRequested =
    desiredStorageDuration ===
      "immediate";

  if (
    immediateUseRequested &&
    !immediateContinuousUseRequested &&
    seasonalHarvestFrequencies.has(
      frequency
    )
  ) {
    limitations.push(
      "This use path provides a seasonal mature harvest rather than frequent immediate production."
    );
  }

  if (
    productMatchAnalysis
      .hasSpecificMatch
  ) {
    strengths.push(
      "This use path produces at least one specifically requested harvest product."
    );
  }

  return {
    hardFailure:
      hardFailures.length > 0,

    hardFailures,
    limitations,
    strengths
  };
}

function scoreGenericUsePath(
  crop,
  usePath,
  answers
) {
  let score = 55;

  const strengths = [];
  const limitations = [];
  const hardFailures = [];

  const desiredProducts =
    answers.harvestStorage
      ?.desiredHarvestProducts ||
    [];

  const acceptedProcessing =
    answers.labor
      ?.acceptedProcessingTasks ||
    [];

  const dryingCapability =
    answers.labor
      ?.dryingCapability;

  const ownedEquipment =
    answers.labor
      ?.ownedEquipment ||
    [];

  const purchaseWillingness =
    answers.labor
      ?.equipmentPurchaseWillingness ||
    [];

  const minimalPreparation =
    answers.harvestStorage
      ?.minimalPreparationPriority;

  const storageHumidity =
    answers.harvestStorage
      ?.storageHumidity;

  const rodentProtection =
    answers.harvestStorage
      ?.rodentProtection;

  const dryStorageLocations =
    answers.harvestStorage
      ?.dryStorageLocations ||
    [];

  const requiredProcessingTasks =
    usePath.requiredProcessingTasks ||
    [];

  const requiredEquipment =
    usePath.requiredEquipment ||
    [];

  const storageMethods =
    usePath.storageMethods ||
    [];

  const harvestProducts =
    usePath.harvestProducts ||
    [];

    const cropSpaceData =
    crop.plannerData
      ?.space ||
    {};

  const plantBehaviorRestrictions =
    answers.space
      ?.plantBehaviorRestrictions ||
    [];

  const overflowOptions =
    answers.space
      ?.overflowOptions ||
    [];

  if (
    cropSpaceData
      .vineSpreadRequired === true &&
    plantBehaviorRestrictions.includes(
      "no-vines-outside-bed"
    ) &&
    overflowOptions.length === 0
  ) {
    hardFailures.push(
      "This crop requires vine-spread space, but the visitor prohibits vines outside the planting bed and has no overflow area."
    );
  }

    const productMatchAnalysis =
    analyzeHarvestProductMatch(
      harvestProducts,
      desiredProducts
    );

      const capabilityGate =
    getUsePathCapabilityGate(
      usePath,
      answers,
      productMatchAnalysis
    );

  capabilityGate
    .hardFailures
    .forEach(message => {
      hardFailures.push(
        message
      );
    });

  capabilityGate
    .limitations
    .forEach(message => {
      score -= 18;

      limitations.push(
        message
      );
    });

  capabilityGate
    .strengths
    .forEach(message => {
      strengths.push(
        message
      );
    });

  if (
    !productMatchAnalysis
      .hasAnyDesiredProducts
  ) {
    limitations.push(
      "The visitor did not select a specific harvest product."
    );
  } else if (
    productMatchAnalysis
      .hasSpecificDesiredProducts
  ) {
    if (
      productMatchAnalysis
        .hasSpecificMatch
    ) {
      const specificMatchBonus =
        Math.min(
          32,
          22 +
            (
              productMatchAnalysis
                .specificMatches
                .length -
              1
            ) *
            5
        );

      score +=
        specificMatchBonus;

      strengths.push(
        `Directly matches the requested crop-specific products: ${productMatchAnalysis.specificMatches.join(", ")}.`
      );
    } else if (
      productMatchAnalysis
        .hasAnyMatch
    ) {
      score -= 12;

      limitations.push(
        "Matches only a broad product category, not the visitor's crop-specific harvest products."
      );
    } else {
      score -= 30;

      limitations.push(
        `Does not produce the requested specific harvest products: ${productMatchAnalysis.specificDesiredProducts.join(", ")}.`
      );
    }
  } else if (
    productMatchAnalysis
      .hasAnyMatch
  ) {
    score += 12;

    strengths.push(
      `Matches the requested general harvest products: ${productMatchAnalysis.allMatches.join(", ")}.`
    );
  } else {
    score -= 14;

    limitations.push(
      "Does not directly match the selected harvest products."
    );
  }

    /*
   * Version 2 crop records use precise task IDs,
   * while the questionnaire uses broader visitor-
   * facing processing choices.
   *
   * Routine inspection, sorting, and safety steps
   * should not be treated as processing choices
   * the visitor declined.
   */
  const automaticallyAcceptedTasks =
    new Set([
      "cut-seed-heads",
      "cut-leaves",
      "pick-produce",
      "harvest-heavy-fruit",

      "inspect-panicle-maturity",
      "inspect-before-storage",
      "inspect-before-feeding",
      "remove-damaged-panicles"
    ]);

  const processingTaskAliases = {
    "cut-mature-panicles":
      "cut-seed-heads",

    "dry-under-cover":
      "dry"
  };

  const missingRequiredTasks =
    requiredProcessingTasks.filter(
      task => {
        if (
          automaticallyAcceptedTasks.has(
            task
          )
        ) {
          return false;
        }

        const questionnaireTask =
          processingTaskAliases[task] ||
          task;

        return !acceptedProcessing.includes(
          questionnaireTask
        );
      }
    );

  if (
    missingRequiredTasks.length > 0
  ) {
    score -=
      missingRequiredTasks.length * 12;

    limitations.push(
      `Required tasks were not accepted: ${missingRequiredTasks.join(", ")}.`
    );
  }

  const missingRequiredEquipment =
    requiredEquipment.filter(
      equipmentId => {
        return (
          !ownedEquipment.includes(
            equipmentId
          ) &&
          !purchaseWillingness.includes(
            equipmentId
          )
        );
      }
    );

  if (
    missingRequiredEquipment.length > 0
  ) {
    score -=
      missingRequiredEquipment.length *
      14;

    limitations.push(
      `Required equipment is unavailable: ${missingRequiredEquipment.join(", ")}.`
    );
  }

  if (
    requiredProcessingTasks.includes(
      "harvest-heavy-fruit"
    ) &&
    !ownedEquipment.includes(
      "cart"
    )
  ) {
    score -= 5;

    limitations.push(
      "Heavy fruit may be harder to move without a cart or assistance."
    );
  }

  if (
    usePath.curingRequired &&
    !acceptedProcessing.includes(
      "cure"
    )
  ) {
    score -= 18;

    limitations.push(
      "This use path requires curing, but curing was not selected."
    );
  }

  if (
    usePath.curingRequired &&
    storageMethods.includes(
      "cool-dry-ventilated"
    ) &&
    dryStorageLocations.length === 0
  ) {
    score -= 18;

    limitations.push(
      "This path requires a suitable cool, dry, ventilated storage location."
    );
  }

  if (
    usePath.dryingRequired &&
    dryingCapability === "none"
  ) {
    hardFailures.push(
      "This use path requires drying, but no drying capability was selected."
    );
  }

  if (
    usePath.cookingRequired &&
    !acceptedProcessing.includes(
      "cook"
    )
  ) {
    hardFailures.push(
      "This use path requires cooking, but cooking was not accepted."
    );
  }

  if (
    usePath.shellingRequired &&
    !acceptedProcessing.includes(
      "shell-beans"
    ) &&
    !acceptedProcessing.includes(
      "shell-corn"
    )
  ) {
    hardFailures.push(
      "This use path requires shelling, but shelling was not accepted."
    );
  }

  if (
    usePath.threshingRequired &&
    !acceptedProcessing.includes(
      "thresh"
    )
  ) {
    hardFailures.push(
      "This use path requires threshing, but threshing was not accepted."
    );
  }

  const storageFit =
    scoreUsePathStorageFit(
      usePath,
      answers
    );

  if (
    Number.isFinite(
      storageFit.score
    )
  ) {
    if (storageFit.score >= 90) {
      score += 15;

      strengths.push(
        storageFit.reason
      );
    } else if (
      storageFit.score >= 50
    ) {
      score -= 8;

      limitations.push(
        storageFit.reason
      );
    } else {
      score -= 30;

      limitations.push(
        storageFit.reason
      );
    }
  }

  const nutritionalFit =
    scoreUsePathNutritionalFit(
      crop,
      usePath,
      answers
    );

  if (
    Number.isFinite(
      nutritionalFit.score
    )
  ) {
    if (
      nutritionalFit.score >= 90
    ) {
      score += 15;

      strengths.push(
        nutritionalFit.reason
      );
    } else {
      score -= 18;

      limitations.push(
        nutritionalFit.reason
      );
    }
  }

  if (
    minimalPreparation === "top"
  ) {
    if (
      usePath
        .preparationEaseScore >= 4
    ) {
      score += 8;

      strengths.push(
        "Strong match for minimal preparation."
      );
    } else {
      score -= 12;

      limitations.push(
        "Requires more preparation than the visitor prefers."
      );
    }
  } else if (
    minimalPreparation === "high" &&
    usePath.preparationEaseScore >= 4
  ) {
    score += 5;
  }

  if (
    usePath.dryingRequired &&
    storageHumidity ===
      "often-humid"
  ) {
    score -= 15;

    limitations.push(
      "Humid storage conditions increase drying and mold risk."
    );
  }

  if (
    usePath.rodentRiskScore >= 4 &&
    [
      "none",
      "common-problem"
    ].includes(
      rodentProtection
    )
  ) {
    score -= 15;

    limitations.push(
      "Rodent protection is weak for this storage path."
    );
  }

  const finalScore =
    hardFailures.length > 0
      ? 0
      : clampScore(score);

 return {
  cropId:
    crop.id,

  usePathId:
    usePath.id,

  label:
    usePath.label,

  score:
    finalScore,

  productMatch:
    productMatchAnalysis
      .hasAnyMatch,

  productMatchAnalysis,

  capabilityGate,

  storageFit,

  nutritionalFit,

    hardFailure:
      hardFailures.length > 0,

    hardFailures,
    strengths,
    limitations
  };
}

function getGenericLifecycleAdjustment(
  crop,
  answers
) {
  const lifecycle =
    crop.plannerData
      ?.lifecycle ||
    {};

  const goals =
    answers.preferences
      ?.plannerGoals ||
    [];

  const annualPerennialPreference =
    answers.preferences
      ?.annualPerennialPreference;

  const reversibilityRequirement =
    answers.preferences
      ?.reversibilityRequirement;

  const desiredStorageDuration =
    answers.harvestStorage
      ?.desiredStorageDuration;

  const plantBehaviorRestrictions =
    answers.space
      ?.plantBehaviorRestrictions ||
    [];

  const yearsToFirstUsefulHarvest =
    Number.isFinite(
      lifecycle.yearsToFirstUsefulHarvest
    )
      ? lifecycle
          .yearsToFirstUsefulHarvest
      : null;

  const isAnnual =
    lifecycle.isAnnual === true;

  const isPerennial =
    lifecycle.isPerennial === true;

  const permanentPlantingRequired =
    lifecycle
      .permanentPlantingRequired ===
    true;

  let adjustment = 0;

  const strengths = [];
  const limitations = [];
  const hardFailures = [];

  const permanentPlantingRejected =
    reversibilityRequirement ===
      "one-season" ||
    annualPerennialPreference ===
      "annual-only" ||
    plantBehaviorRestrictions.includes(
      "no-permanent-plantings"
    ) ||
    plantBehaviorRestrictions.includes(
      "no-trees"
    );

  if (
    permanentPlantingRequired &&
    permanentPlantingRejected
  ) {
    adjustment -= 38;

    limitations.push(
      "This crop requires a permanent planting, but the visitor requires a temporary or one-season crop."
    );
  }

  if (
    permanentPlantingRequired &&
    plantBehaviorRestrictions.includes(
      "must-remain-small"
    )
  ) {
    adjustment -= 12;

    limitations.push(
      "The crop's permanent mature footprint conflicts with the requirement to remain small."
    );
  }

  if (
    annualPerennialPreference ===
      "annual-preferred"
  ) {
    if (isAnnual) {
      adjustment += 6;

      strengths.push(
        "Matches the visitor's preference for an annual crop."
      );
    } else if (isPerennial) {
      adjustment -= 10;

      limitations.push(
        "The visitor prefers an annual crop, but this crop is perennial."
      );
    }
  }

  if (
    annualPerennialPreference ===
      "perennial-preferred"
  ) {
    if (isPerennial) {
      adjustment += 10;

      strengths.push(
        "Matches the visitor's preference for a perennial crop."
      );
    } else if (isAnnual) {
      adjustment -= 5;

      limitations.push(
        "The visitor prefers a perennial crop, but this crop must be replanted."
      );
    }
  }

  if (
    reversibilityRequirement ===
      "permanent-planting-allowed" &&
    isPerennial
  ) {
    adjustment += 4;

    strengths.push(
      "The visitor allows a permanent planting."
    );
  }

  const fastValueRequested =
    goals.includes("fast-value") ||
    goals.includes("short-season");

  if (
    fastValueRequested &&
    yearsToFirstUsefulHarvest !== null &&
    yearsToFirstUsefulHarvest > 0
  ) {
    const delayPenalty =
      Math.min(
        28,
        yearsToFirstUsefulHarvest *
          14
      );

    adjustment -= delayPenalty;

    limitations.push(
      `The visitor wants fast value, but this crop may require approximately ${yearsToFirstUsefulHarvest} year${yearsToFirstUsefulHarvest === 1 ? "" : "s"} before its first useful harvest.`
    );
  }

  const immediateProductionRequested =
    desiredStorageDuration ===
      "immediate";

  const longTermPlantingAccepted =
    reversibilityRequirement ===
      "permanent-planting-allowed" ||
    annualPerennialPreference ===
      "perennial-preferred";

  if (
    immediateProductionRequested &&
    !longTermPlantingAccepted &&
    yearsToFirstUsefulHarvest !== null &&
    yearsToFirstUsefulHarvest > 0
  ) {
    const immediateUsePenalty =
      Math.min(
        20,
        yearsToFirstUsefulHarvest *
          10
      );

    adjustment -=
      immediateUsePenalty;

    limitations.push(
      "The visitor wants immediate production, but this crop has an establishment delay."
    );
  }

  if (
    yearsToFirstUsefulHarvest === 0 &&
    fastValueRequested
  ) {
    adjustment += 6;

    strengths.push(
      "Can provide useful production during the planting year."
    );
  }

  return {
    adjustment,

    hardFailure:
      hardFailures.length > 0,

    hardFailures,
    strengths,
    limitations
  };
}

function scoreGenericCropProfile(
  crop,
  profile
) {
  const answers =
    profile?.answers || {};

  const categoryResults = {
    climate:
      scoreGenericClimateFit(
        crop,
        answers
      ),

    sunlight:
      scoreGenericSunlightFit(
        crop,
        answers
      ),

    space:
      scoreGenericSpaceFit(
        crop,
        answers
      ),

    soil:
      scoreGenericSoilFit(
        crop,
        answers
      ),

    water:
      scoreGenericWaterFit(
        crop,
        answers
      ),

    labor:
      scoreGenericLaborFit(
        crop,
        answers
      ),

        goals:
      scoreGenericGoalFit(
        crop,
        answers
      ),

    shortSeason:
      scoreGenericShortSeasonFit(
        crop,
        answers
      ),

    limitedIrrigation:
      scoreGenericLimitedIrrigationFit(
        crop,
        answers
      )
  };

  const baseScore =
    weightedAverageKnown([
      {
        value:
          categoryResults
            .climate.score,

        weight: 0.16
      },
      {
        value:
          categoryResults
            .sunlight.score,

        weight: 0.14
      },
      {
        value:
          categoryResults
            .space.score,

        weight: 0.16
      },
      {
        value:
          categoryResults
            .soil.score,

        weight: 0.12
      },
      {
        value:
          categoryResults
            .water.score,

        weight: 0.14
      },
      {
        value:
          categoryResults
            .labor.score,

        weight: 0.12
      },
            {
        value:
          categoryResults
            .goals.score,

        weight: 0.16
      },

      {
        value:
          categoryResults
            .shortSeason.score,

        weight: 0.18
      },

      {
        value:
          categoryResults
            .limitedIrrigation.score,

        weight: 0.18
      }
    ]);

  const lifecycleAdjustment =
    getGenericLifecycleAdjustment(
      crop,
      answers
    );

     const wildlife =
    getGenericWildlifePenalty(
      crop,
      answers
    ); 

  const usePathResults =
    crop.plannerData.usePaths
      .map(usePath =>
        scoreGenericUsePath(
          crop,
          usePath,
          answers
        )
      )
      .sort(
        (a, b) =>
          b.score - a.score
      );
 

  const bestUsePath =
    usePathResults.find(
      result =>
        !result.hardFailure
    ) || null;

    const usePathScore =
    Number.isFinite(
      bestUsePath?.score
    )
      ? bestUsePath.score
      : null;

  const lifecycleFailure =
  lifecycleAdjustment
    .hardFailure === true;

const noEligibleUsePath =
  bestUsePath === null;

const finalScore =
  (
    lifecycleFailure ||
    noEligibleUsePath
  )
    ? 0
    : clampScore(
        (
          baseScore * 0.70
        ) +
        (
          usePathScore * 0.30
        ) -
        wildlife.penalty +
        lifecycleAdjustment.adjustment
      );

     if (
    profile.id ===
      "PROFILE-MILLET-SHORT-SEASON-DRY" &&
    [
      "CROP-WHEAT",
      "CROP-PROSO-MILLET"
    ].includes(crop.id)
  ) {
    console.log(
      `Profile 12 — ${crop.name}`,
      {
        baseScore:
          Number.isFinite(baseScore)
            ? Number(
                baseScore.toFixed(2)
              )
            : null,

        usePathScore:
          Number.isFinite(
            usePathScore
          )
            ? usePathScore
            : null,

        wildlifePenalty:
          wildlife.penalty,

        lifecycleAdjustment:
          lifecycleAdjustment
            .adjustment,

        finalScore:
          Number.isFinite(
            finalScore
          )
            ? Number(
                finalScore.toFixed(2)
              )
            : null,

        bestUsePath:
          bestUsePath?.usePathId ||
          null,

        usePathLimitations:
          bestUsePath?.limitations ||
          []
      }
    );
  }   

  const knownCategoryCount =
    Object.values(categoryResults)
      .filter(result =>
        Number.isFinite(
          result.score
        )
      )
      .length;

  const confidenceScore =
    clampScore(
      45 +
      knownCategoryCount * 7
    );

return {
  profileId:
    profile.id,

  profileLabel:
    profile.label,

  cropId:
    crop.id,

  cropName:
    crop.name,

  finalScore:
    Math.round(finalScore),

  rawFinalScore:
    Number.isFinite(finalScore)
      ? Number(finalScore.toFixed(2))
      : null,

  baseScore:
    Number.isFinite(baseScore)
      ? Number(baseScore.toFixed(2))
      : null,

    usePathModifier:
    Number.isFinite(usePathScore)
      ? Number(
          (
            usePathScore * 0.30
          ).toFixed(2)
        )
      : null,

  wildlifePenalty:
    Number.isFinite(wildlife?.penalty)
      ? wildlife.penalty
      : 0,

  lifecycleModifier:
    Number.isFinite(
      lifecycleAdjustment?.adjustment
    )
      ? lifecycleAdjustment.adjustment
      : 0,

  tier:
    getRecommendationTier(
      finalScore
    ),

  confidenceScore:
    Math.round(
      confidenceScore
    ),

  confidenceLabel:
    getConfidenceLabel(
      confidenceScore
    ),

  categoryResults,

  wildlife,

  lifecycleAdjustment,

  usePathResults,

  bestUsePath,

  noEligibleUsePath,

  diagnostics: {
    baseScore:
      Number.isFinite(baseScore)
        ? Number(baseScore.toFixed(2))
        : null,

    wildlifePenalty:
      Number.isFinite(wildlife?.penalty)
        ? wildlife.penalty
        : 0,

    usePathScore:
      Number.isFinite(
        bestUsePath?.score
      )
        ? bestUsePath.score
        : null,

        usePathModifier:
      Number.isFinite(usePathScore)
        ? Number(
            (
              usePathScore * 0.30
            ).toFixed(2)
          )
        : null,

    lifecycleModifier:
      Number.isFinite(
        lifecycleAdjustment?.adjustment
      )
        ? lifecycleAdjustment.adjustment
        : 0,

    rawFinalScore:
      Number.isFinite(finalScore)
        ? Number(
            finalScore.toFixed(2)
          )
        : null
  }
};
}

function runMultiCropSampleTests() {
  const profiles =
    namespace.config
      ?.testing
      ?.sampleUserProfiles ||
    [];

  const eligibleStatuses =
    new Set([
      "testing",
      "ready"
    ]);

  const eligibleCrops =
    namespace.data
      ?.getAllUniqueCrops()
      ?.filter(crop => {
        return (
          crop.plannerData &&
          eligibleStatuses.has(
            crop.plannerData
              .developmentStatus
          )
        );
      }) || [];

  if (eligibleCrops.length === 0) {
    return {
      success: false,

      error:
        "No testing or ready crops are available.",

      results: []
    };
  }

  const profileResults =
    profiles.map(profile => {
      const allCropResults =
        eligibleCrops.map(crop =>
          scoreGenericCropProfile(
            crop,
            profile
          )
        );

      const eligibleCropResults =
        allCropResults
          .filter(result => {
            return (
              result.bestUsePath !== null &&
              result.noEligibleUsePath !== true &&
              result.finalScore > 0
            );
          })
          .sort(
            (a, b) =>
              b.finalScore -
              a.finalScore
          );

      const ineligibleCropResults =
        allCropResults
          .filter(result => {
            return (
              result.bestUsePath === null ||
              result.noEligibleUsePath === true ||
              result.finalScore <= 0
            );
          })
          .sort(
            (a, b) =>
              b.finalScore -
              a.finalScore
          );

      const cropResults = [
        ...eligibleCropResults,
        ...ineligibleCropResults
      ];

      return {
        profileId:
          profile.id,

        profileLabel:
          profile.label,

        eligibleCropCount:
          eligibleCropResults.length,

        ineligibleCropCount:
          ineligibleCropResults.length,

        hasEligibleLeader:
          eligibleCropResults.length > 0,

        cropResults
      };
    });

  return {
    success: true,

    cropCount:
      eligibleCrops.length,

    profileCount:
      profiles.length,

    testedCropIds:
      eligibleCrops.map(
        crop => crop.id
      ),

    results:
      profileResults
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
  validateRegisteredCrops,
    clampScore,
  convertFivePointToPercent,

  scoreSunflowerUsePath,
  scoreSunflowerProfile,
  runSunflowerSampleTests,

  getCropGoalFieldName,

  scoreGenericGoalFit,
  scoreGenericClimateFit,
  scoreGenericSunlightFit,
  scoreGenericSpaceFit,
  scoreGenericSoilFit,
  scoreGenericWaterFit,
  scoreGenericLaborFit,

  getGenericWildlifePenalty,

  scoreGenericUsePath,
  scoreGenericCropProfile,
  runMultiCropSampleTests
});

})(window);