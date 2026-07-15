"use strict";

/*
  Backyard Chicken Planner
  Chicken Feed Crop Planner Configuration

  Purpose:
  - Stores shared rating scales
  - Stores valid enum values
  - Stores preliminary scoring weights
  - Stores recommendation tiers
  - Provides immutable planner configuration

  Important:
  This file does not score crops and does not modify feed-crops.js.
*/

(function initializeFeedCropPlannerConfig(global) {

  const SUITABILITY_SCALE = Object.freeze({
    VERY_POOR: 1,
    POOR: 2,
    MODERATE: 3,
    GOOD: 4,
    EXCELLENT: 5
  });

  const RISK_SCALE = Object.freeze({
    VERY_LOW: 1,
    LOW: 2,
    MODERATE: 3,
    HIGH: 4,
    VERY_HIGH: 5
  });

  const WORKLOAD_LEVELS = Object.freeze([
    "very-low",
    "low",
    "moderate",
    "high",
    "very-high"
  ]);

  const COST_LEVELS = Object.freeze([
    "very-low",
    "low",
    "moderate",
    "high",
    "very-high"
  ]);

  const EVIDENCE_STATUSES = Object.freeze([
    "verified",
    "supported-generalization",
    "derived",
    "uncertain",
    "missing"
  ]);

  const PLANNER_DATA_STATUSES = Object.freeze([
  "skeleton",
  "research-in-progress",
  "testing",
  "ready"
]);

  const GROWTH_CYCLES = Object.freeze([
    "annual",
    "biennial",
    "short-lived-perennial",
    "perennial",
    "tree"
  ]);

  const CROP_CATEGORIES = Object.freeze([
    "grain",
    "oilseed",
    "legume",
    "leafy-green",
    "living-forage",
    "storage-vegetable",
    "tree-shrub"
  ]);

  const PRIMARY_FEED_CATEGORIES = Object.freeze([
    "energy",
    "protein-oriented",
    "fresh-green",
    "living-forage",
    "storage-produce",
    "fruit",
    "multipurpose"
  ]);

  const STORAGE_DURATION_CATEGORIES = Object.freeze([
    "immediate",
    "very-short",
    "short",
    "medium",
    "medium-long",
    "long"
  ]);

  const HARVEST_PATTERNS = Object.freeze([
    "continuous",
    "several",
    "major",
    "mixed"
  ]);

  const PLANTING_TASK_IDS = Object.freeze([
    "prepare-seedbed",
    "broadcast-small-seed",
    "plant-large-seed",
    "start-indoors",
    "transplant",
    "thin-seedlings",
    "inoculate-legume-seed",
    "plant-tree",
    "install-irrigation"
  ]);

  const MAINTENANCE_TASK_IDS = Object.freeze([
    "hand-weed",
    "cultivate",
    "mulch",
    "trellis",
    "stake",
    "protect-from-wildlife",
    "mow-clip",
    "rotate-grazing",
    "prune",
    "protect-trunk-crown"
  ]);

  const HARVEST_TASK_IDS = Object.freeze([
    "cut-leaves",
    "pick-produce",
    "cut-seed-heads",
    "harvest-heavy-fruit",
    "cut-forage",
    "shake-fruit",
    "collect-fallen-fruit"
  ]);

  const PROCESSING_TASK_IDS = Object.freeze([
    "shell-beans",
    "shell-corn",
    "thresh",
    "winnow",
    "dry",
    "cure",
    "cook",
    "grind",
    "chop",
    "sprout",
    "clean-sort",
    "remove-seed"
  ]);

  const STORAGE_TASK_IDS = Object.freeze([
    "inspect-moisture",
    "inspect-insects",
    "inspect-mold",
    "rotate-stored-produce",
    "refrigerate",
    "freeze",
    "seal-container"
  ]);

  const EQUIPMENT_IDS = Object.freeze([
    "shovel",
    "garden-fork",
    "hoe",
    "rake",
    "cart",
    "hand-pruners",
    "pruning-saw",

    "hose",
    "watering-wand",
    "drip-irrigation",
    "soaker-hose",
    "timer",

    "trellis",
    "stakes",
    "cattle-panel",
    "fencing",
    "bird-netting",
    "row-cover",
    "forage-frame",
    "tree-guard",

    "drying-rack",
    "drying-screen",
    "fan",
    "dehydrator",

    "corn-sheller",
    "grain-thresher",
    "grain-mill",
    "feed-grinder",
    "moisture-meter",

    "food-safe-bucket",
    "metal-grain-can",
    "rodent-proof-room",
    "refrigerator",
    "freezer",
    "cool-storage"
  ]);

  /*
    These are preliminary weights.

    They will not be considered final until:
    - Sunflower is completed
    - Cowpea is completed
    - Multiple test profiles have been evaluated
  */
  const BASE_CATEGORY_WEIGHTS = Object.freeze({
    climateFit: 14,
    siteFit: 10,
    soilFit: 11,
    waterFit: 10,
    spaceFit: 12,
    flockFit: 9,
    laborFit: 10,
    harvestStorageFit: 10,
    goalFit: 10,
    budgetFit: 4
  });

  const RECOMMENDATION_TIERS = Object.freeze([
    Object.freeze({
      id: "excellent",
      minimumScore: 85,
      label: "Excellent Match"
    }),

    Object.freeze({
      id: "strong",
      minimumScore: 75,
      label: "Strong Match"
    }),

    Object.freeze({
      id: "good",
      minimumScore: 65,
      label: "Good Match"
    }),

    Object.freeze({
      id: "conditional",
      minimumScore: 50,
      label: "Conditional Match"
    }),

    Object.freeze({
      id: "poor",
      minimumScore: 0,
      label: "Poor Match"
    })
  ]);

  const PENALTY_VALUES = Object.freeze({
    minor: 3,
    moderate: 8,
    major: 15,
    severe: 25
  });

  const BONUS_VALUES = Object.freeze({
    small: 2,
    moderate: 4,
    strong: 7,
    maximumTotal: 10
  });

  const CONFIDENCE_LABELS = Object.freeze([
    Object.freeze({
      id: "very-strong",
      minimumScore: 85,
      label: "Very Strong"
    }),

    Object.freeze({
      id: "strong",
      minimumScore: 70,
      label: "Strong"
    }),

    Object.freeze({
      id: "moderate",
      minimumScore: 50,
      label: "Moderate"
    }),

    Object.freeze({
      id: "limited",
      minimumScore: 0,
      label: "Limited"
    })
  ]);

  const EXPECTED_CROP_IDS = Object.freeze([
    "CROP-SUNFLOWER",
    "CROP-COWPEA",
    "CROP-PROSO-MILLET",
    "CROP-PUMPKIN-WINTER-SQUASH",
    "CROP-KALE-COLLARDS",
    "CROP-WHITE-CLOVER",
    "CROP-ALFALFA",
    "CROP-MULBERRY",
    "CROP-FIELD-CORN",
    "CROP-GRAIN-SORGHUM"
  ]);

  const PLANNER_CONFIG = Object.freeze({
    plannerVersion: "1.0.0",
    cropSchemaVersion: "1.0.0",

    scales: Object.freeze({
      suitability: SUITABILITY_SCALE,
      risk: RISK_SCALE
    }),

    enums: Object.freeze({
      workloadLevels: WORKLOAD_LEVELS,
      costLevels: COST_LEVELS,
      evidenceStatuses: EVIDENCE_STATUSES,
      plannerDataStatuses: PLANNER_DATA_STATUSES,
      growthCycles: GROWTH_CYCLES,
      cropCategories: CROP_CATEGORIES,
      primaryFeedCategories: PRIMARY_FEED_CATEGORIES,
      storageDurationCategories: STORAGE_DURATION_CATEGORIES,
      harvestPatterns: HARVEST_PATTERNS,

      plantingTaskIds: PLANTING_TASK_IDS,
      maintenanceTaskIds: MAINTENANCE_TASK_IDS,
      harvestTaskIds: HARVEST_TASK_IDS,
      processingTaskIds: PROCESSING_TASK_IDS,
      storageTaskIds: STORAGE_TASK_IDS,
      equipmentIds: EQUIPMENT_IDS
    }),

    scoring: Object.freeze({
      baseCategoryWeights: BASE_CATEGORY_WEIGHTS,
      recommendationTiers: RECOMMENDATION_TIERS,
      confidenceLabels: CONFIDENCE_LABELS,
      penalties: PENALTY_VALUES,
      bonuses: BONUS_VALUES
    }),

    crops: Object.freeze({
      expectedCropIds: EXPECTED_CROP_IDS
    })
  });

  /*
    Expose one protected planner namespace.

    Future planner files will add their own properties to this
    namespace without creating many unrelated global variables.
  */
  global.BCPFeedCropPlanner =
    global.BCPFeedCropPlanner || {};

  global.BCPFeedCropPlanner.config = PLANNER_CONFIG;

})(window);