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

    "enrichment":
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

    "shade":
      "shadeScore",

    "privacy-screening":
      "privacyScreeningScore",

    "pollinators":
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

  let score = 60;

  if (
    climate.preferredClimateTypes
      ?.includes(climateType)
  ) {
    score = 100;
  } else if (
    climate.suitableClimateTypes
      ?.includes(climateType)
  ) {
    score = 82;
  } else if (
    climate.challengingClimateTypes
      ?.includes(climateType)
  ) {
    score = 40;
  }

  return {
    score,

    reason:
      score >= 90
        ? `${crop.name} is strongly adapted to the selected climate type.`
        : score >= 70
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
        "Space data is unavailable."
    };
  }

  const spaceTypes =
    answers.space
      ?.availableSpaceTypes ||
    [];

  const shape =
    answers.space
      ?.largestAreaShape;

  const totalArea =
    answers.space
      ?.totalGrowingAreaSqFt;

  const plantBehaviorRestrictions =
  answers.space
    ?.plantBehaviorRestrictions ||
  [];

  const overflowOptions =
  answers.space
    ?.overflowOptions ||
  [];

  const typeScores =
    spaceTypes
      .map(spaceType => {
        const key =
          getSpaceTypePlannerKey(
            spaceType
          );

        return convertFivePointToPercent(
          spaceData
            .spaceTypeScores?.[key]
        );
      })
      .filter(Number.isFinite);

  const bestTypeScore =
    typeScores.length > 0
      ? Math.max(...typeScores)
      : null;

  const layoutKey =
    getLayoutPlannerKey(shape);

  const layoutScore =
    convertFivePointToPercent(
      spaceData
        .layoutScores?.[layoutKey]
    );

  let areaScaleScore = null;

  if (Number.isFinite(totalArea)) {
    if (totalArea < 25) {
      areaScaleScore =
        convertFivePointToPercent(
          spaceData.smallSpaceScore
        );
    } else if (totalArea <= 250) {
      areaScaleScore =
        convertFivePointToPercent(
          spaceData.mediumSpaceScore
        );
    } else {
      areaScaleScore =
        convertFivePointToPercent(
          spaceData.largeSpaceScore
        );
    }
  }

  let score =
    weightedAverageKnown([
      {
        value: bestTypeScore,
        weight: 0.45
      },
      {
        value: layoutScore,
        weight: 0.30
      },
      {
        value: areaScaleScore,
        weight: 0.25
      }
    ]);

    if (
  spaceData.vineSpreadRequired === true &&
  plantBehaviorRestrictions.includes(
    "no-vines-outside-bed"
  ) &&
  overflowOptions.length === 0
) {
  score =
    Number.isFinite(score)
      ? score - 35
      : 35;
}

  return {
    score: clampScore(score),

    reason:
  (
    spaceData.vineSpreadRequired === true &&
    plantBehaviorRestrictions.includes(
      "no-vines-outside-bed"
    ) &&
    overflowOptions.length === 0
  )
    ? "This crop requires vine-spread space, but the visitor does not allow vines outside the planting bed."
    : score >= 85
      ? "The crop fits the selected space type, layout, and growing scale well."
      : score >= 60
        ? "The crop can fit, but the available space creates some limitations."
        : "The selected space is a weak fit for this crop."
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

  let penalty = 0;

  const matchedPressures = [];

  pressures.forEach(pressure => {
    const field =
      pressureFieldMap[pressure];

    const riskScore =
      wildlife[field];

    if (Number.isFinite(riskScore)) {
      penalty +=
        riskPenaltyMap[riskScore] ||
        0;

      matchedPressures.push(
        pressure
      );
    }
  });

  return {
    penalty:
      Math.min(30, penalty),

    reason:
      matchedPressures.length > 0
        ? `Reported wildlife pressure affects this crop: ${matchedPressures.join(", ")}.`
        : "No reported wildlife pressure reduced the score."
  };
}

function scoreGenericUsePath(
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

  const productMatch =
    arrayIncludesAny(
      harvestProducts,
      desiredProducts
    );

  if (productMatch) {
    score += 15;

    strengths.push(
      "Matches a desired harvest product."
    );
  } else {
    score -= 8;

    limitations.push(
      "Does not directly match the selected harvest products."
    );
  }

  const automaticallyAcceptedTasks =
    new Set([
      "cut-seed-heads",
      "cut-leaves",
      "pick-produce",
      "harvest-heavy-fruit"
    ]);

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

        return !acceptedProcessing.includes(
          task
        );
      }
    );

  if (
    missingRequiredTasks.length > 0
  ) {
    score -=
      missingRequiredTasks.length * 13;

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
      15;

    limitations.push(
      `Required equipment is unavailable: ${missingRequiredEquipment.join(", ")}.`
    );
  }

  if (
    requiredProcessingTasks.includes(
      "harvest-heavy-fruit"
    ) &&
    !ownedEquipment.includes("cart")
  ) {
    score -= 5;

    limitations.push(
      "Heavy fruit may be harder to move without a cart or assistance."
    );
  }

  if (
    usePath.curingRequired &&
    !acceptedProcessing.includes("cure")
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
      "This storage path needs a suitable cool, dry, ventilated location."
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
    !acceptedProcessing.includes("cook")
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

  if (
    minimalPreparation === "top"
  ) {
    if (
      usePath.preparationEaseScore >= 4
    ) {
      score += 10;

      strengths.push(
        "Strong match for minimal preparation."
      );
    } else {
      score -= 15;

      limitations.push(
        "Requires more preparation than the visitor prefers."
      );
    }
  } else if (
    minimalPreparation === "high" &&
    usePath.preparationEaseScore >= 4
  ) {
    score += 6;
  }

  if (
    usePath.dryingRequired &&
    storageHumidity === "often-humid"
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
    ].includes(rodentProtection)
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
    cropId: crop.id,

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
      }
    ]);

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

    usePathResults,

    bestUsePath
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
      const cropResults =
        eligibleCrops
          .map(crop =>
            scoreGenericCropProfile(
              crop,
              profile
            )
          )
          .sort(
            (a, b) =>
              b.finalScore -
              a.finalScore
          );

      return {
        profileId:
          profile.id,

        profileLabel:
          profile.label,

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