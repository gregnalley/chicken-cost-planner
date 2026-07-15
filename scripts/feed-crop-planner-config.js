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

const HARVEST_FREQUENCY_CATEGORIES =
  Object.freeze([
    "daily",
    "several-weekly",
    "weekly",
    "every-few-weeks",
    "seasonal",
    "once-twice",
    "continuous",
    "not-applicable"
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
    "basket",
    "cooking-equipment",

    "corn-sheller",
    "grain-thresher",
    "grain-mill",
    "feed-grinder",
    "moisture-meter",

    "food-safe-bucket",
    "food-safe-container",
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

  const SAMPLE_USER_PROFILES = Object.freeze([
  Object.freeze({
    id: "PROFILE-BEGINNER-RAISED-BED",

    label:
      "Beginner with a Sunny 4-by-8 Raised Bed",

    description:
      "Six laying hens, reliable water, minimal processing, and a strong interest in enrichment and pollinators.",

    answers: {
      climate: {
        climateType: "temperate",
        frostFreeSeasonRange: "150-179"
      },

      flock: {
        flockSize: 6,
        primaryFlockPurpose: "eggs",
        forageAccess: "none"
      },

      space: {
        totalGrowingAreaSqFt: 32,
        availableSpaceTypes: [
          "raised-bed"
        ],
        largestAreaShape:
          "wide-rectangle"
      },

      site: {
        directSunHoursExact: 8,
        windExposure: "moderate"
      },

      soil: {
        primaryGrowingMedium:
          "raised-bed-mix",
        soilTexture: "loam",
        soilDrainage: "well-drained"
      },

      water: {
        waterReliability:
          "very-reliable",
        wateringFrequencyPreference:
          "every-2-3-days",
        waterConservationPriority:
          "moderate"
      },

      labor: {
        gardeningExperience:
          "beginner",
        weeklyCropTime:
          "1-2-hours",
        acceptedProcessingTasks: [
          "dry"
        ],
        dryingCapability:
          "small-racks"
      },

      harvestStorage: {
        desiredHarvestProducts: [
          "fresh-seed-heads",
          "dried-seed-heads"
        ],
        harvestPatternPreference:
          "several",
        minimalPreparationPriority:
          "high",
        dryStorageLocations: [
          "garage"
        ],
        rodentProtection:
          "partial"
      },

      preferences: {
        plannerGoals: [
          "enrichment",
          "pollinators",
          "shared-household-food"
        ],
        goalPriorities: [
          {
            goal: "enrichment",
            rank: 1
          },
          {
            goal: "pollinators",
            rank: 2
          },
          {
            goal:
              "shared-household-food",
            rank: 3
          }
        ],
        preferredNutritionalRole:
          "enrichment",
        beginnerFriendlinessPriority:
          "high",
        wildlifePestPressure: [
          "wild-birds"
        ],
        desiredRecommendationFormat:
          "top-three"
      }
    }
  }),

  Object.freeze({
    id: "PROFILE-HOT-DRY",

    label:
      "Hot and Dry with Limited Irrigation",

    description:
      "A larger in-ground plot, strong heat, restricted watering, and a desire for resilient supplemental crops.",

    answers: {
      climate: {
        climateType: "hot-dry",
        frostFreeSeasonRange:
          "180-209"
      },

      flock: {
        flockSize: 12,
        primaryFlockPurpose:
          "homestead",
        forageAccess:
          "limited-weekly"
      },

      space: {
        totalGrowingAreaSqFt: 300,
        availableSpaceTypes: [
          "in-ground"
        ],
        largestAreaShape:
          "long-strip"
      },

      site: {
        directSunHoursExact: 9,
        windExposure: "high"
      },

      soil: {
        primaryGrowingMedium:
          "native-soil",
        soilTexture:
          "sandy-loam",
        soilDrainage:
          "very-fast"
      },

      water: {
        waterReliability:
          "frequently-limited",
        wateringFrequencyPreference:
          "weekly",
        waterConservationPriority:
          "top-priority",
        criticalStageWaterAvailability:
          "occasional"
      },

      labor: {
        gardeningExperience:
          "intermediate",
        weeklyCropTime:
          "1-2-hours",
        acceptedProcessingTasks: [
          "dry",
          "clean-sort"
        ],
        dryingCapability:
          "large-covered"
      },

      harvestStorage: {
        desiredHarvestProducts: [
          "dried-seed-heads",
          "dry-seeds"
        ],
        harvestPatternPreference:
          "major",
        minimalPreparationPriority:
          "moderate",
        dryStorageLocations: [
          "barn-shed"
        ],
        rodentProtection:
          "rodent-proof-containers"
      },

      preferences: {
        plannerGoals: [
          "resilience-feed",
          "high-energy",
          "winter-storage"
        ],
        goalPriorities: [
          {
            goal: "resilience-feed",
            rank: 1
          },
          {
            goal: "high-energy",
            rank: 2
          },
          {
            goal: "winter-storage",
            rank: 3
          }
        ],
        preferredNutritionalRole:
          "energy",
        beginnerFriendlinessPriority:
          "moderate",
        wildlifePestPressure: [
          "wild-birds",
          "deer"
        ],
        desiredRecommendationFormat:
          "top-three"
      }
    }
  }),

  Object.freeze({
    id: "PROFILE-HUMID-SOUTHERN",

    label:
      "Humid Southern Homestead",

    description:
      "Long growing season, high humidity, reliable hose water, strong bird pressure, and concern about drying grain safely.",

    answers: {
      climate: {
        climateType: "hot-humid",
        frostFreeSeasonRange:
          "210-plus"
      },

      flock: {
        flockSize: 18,
        primaryFlockPurpose:
          "mixed",
        forageAccess:
          "occasional"
      },

      space: {
        totalGrowingAreaSqFt: 500,
        availableSpaceTypes: [
          "in-ground",
          "fence-line"
        ],
        largestAreaShape:
          "wide-rectangle"
      },

      site: {
        directSunHoursExact: 8,
        windExposure: "moderate"
      },

      soil: {
        primaryGrowingMedium:
          "native-soil",
        soilTexture:
          "clay-loam",
        soilDrainage:
          "well-drained"
      },

      water: {
        waterReliability:
          "very-reliable",
        wateringFrequencyPreference:
          "twice-weekly",
        waterConservationPriority:
          "low"
      },

      labor: {
        gardeningExperience:
          "experienced",
        weeklyCropTime:
          "3-5-hours",
        acceptedProcessingTasks: [
          "dry",
          "remove-seed",
          "clean-sort"
        ],
        dryingCapability:
          "small-racks",
        dryingFacilities: [
          "covered-rack",
          "fans"
        ]
      },

      harvestStorage: {
        desiredHarvestProducts: [
          "fresh-seed-heads",
          "dried-seed-heads",
          "dry-seeds"
        ],
        harvestPatternPreference:
          "mixed",
        minimalPreparationPriority:
          "moderate",
        dryStorageLocations: [
          "garage"
        ],
        storageHumidity:
          "often-humid",
        rodentProtection:
          "rodent-proof-containers"
      },

      preferences: {
        plannerGoals: [
          "enrichment",
          "winter-storage",
          "pollinators"
        ],
        goalPriorities: [
          {
            goal: "winter-storage",
            rank: 1
          },
          {
            goal: "enrichment",
            rank: 2
          },
          {
            goal: "pollinators",
            rank: 3
          }
        ],
        preferredNutritionalRole:
          "diversified",
        beginnerFriendlinessPriority:
          "low",
        wildlifePestPressure: [
          "wild-birds",
          "squirrels",
          "disease"
        ],
        desiredRecommendationFormat:
          "top-three"
      }
    }
  }),

  Object.freeze({
    id: "PROFILE-CONTAINER-RENTAL",

    label:
      "Container-Only Rental Property",

    description:
      "A renter with four containers, no permanent planting, limited storage, and a preference for simple crops.",

    answers: {
      climate: {
        climateType: "temperate",
        frostFreeSeasonRange:
          "150-179"
      },

      flock: {
        flockSize: 4,
        primaryFlockPurpose:
          "pets-enrichment",
        forageAccess: "none"
      },

      space: {
        totalGrowingAreaSqFt: 20,
        availableSpaceTypes: [
          "containers"
        ],
        largestAreaShape:
          "small-beds",
        containerCount: 4,
        permanentContainersAllowed:
          false
      },

      site: {
        directSunHoursExact: 7,
        windExposure: "moderate"
      },

      soil: {
        primaryGrowingMedium:
          "commercial-mix",
        soilTexture:
          "commercial-mix",
        soilDrainage:
          "well-drained"
      },

      water: {
        waterReliability:
          "usually-reliable",
        wateringFrequencyPreference:
          "every-2-3-days",
        waterConservationPriority:
          "moderate"
      },

      labor: {
        gardeningExperience:
          "beginner",
        weeklyCropTime:
          "30-60-min",
        acceptedProcessingTasks: [],
        dryingCapability:
          "none"
      },

      harvestStorage: {
        desiredHarvestProducts: [
          "fresh-seed-heads"
        ],
        harvestPatternPreference:
          "several",
        minimalPreparationPriority:
          "top",
        dryStorageLocations: [],
        rodentProtection:
          "none"
      },

      preferences: {
        plannerGoals: [
          "enrichment",
          "pollinators",
          "edible-landscape"
        ],
        goalPriorities: [
          {
            goal: "enrichment",
            rank: 1
          },
          {
            goal: "edible-landscape",
            rank: 2
          },
          {
            goal: "pollinators",
            rank: 3
          }
        ],
        preferredNutritionalRole:
          "enrichment",
        beginnerFriendlinessPriority:
          "essential",
        annualPerennialPreference:
          "annual-only",
        reversibilityRequirement:
          "one-season",
        wildlifePestPressure: [
          "wild-birds"
        ],
        desiredRecommendationFormat:
          "single"
      }
    }
  }),

  Object.freeze({
    id: "PROFILE-WINTER-STORAGE",

    label:
      "Experienced Winter-Storage Grower",

    description:
      "An experienced gardener with protected drying and rodent-proof storage who wants shelf-stable chicken supplements.",

    answers: {
      climate: {
        climateType: "temperate",
        frostFreeSeasonRange:
          "180-209"
      },

      flock: {
        flockSize: 10,
        primaryFlockPurpose:
          "eggs",
        forageAccess:
          "rotational-paddock"
      },

      space: {
        totalGrowingAreaSqFt: 250,
        availableSpaceTypes: [
          "in-ground",
          "fence-line"
        ],
        largestAreaShape:
          "long-strip"
      },

      site: {
        directSunHoursExact: 8,
        windExposure: "low"
      },

      soil: {
        primaryGrowingMedium:
          "improved-garden",
        soilTexture: "loam",
        soilDrainage:
          "well-drained"
      },

      water: {
        waterReliability:
          "usually-reliable",
        wateringFrequencyPreference:
          "weekly",
        waterConservationPriority:
          "moderate",
        criticalStageWaterAvailability:
          "reliable"
      },

      labor: {
        gardeningExperience:
          "experienced",
        weeklyCropTime:
          "3-5-hours",
        acceptedProcessingTasks: [
          "dry",
          "remove-seed",
          "clean-sort",
          "winnow"
        ],
        dryingCapability:
          "grain-moisture-skilled",
        dryingFacilities: [
          "barn-shed",
          "fans",
          "screens-trays",
          "rodent-proof"
        ]
      },

      harvestStorage: {
        desiredHarvestProducts: [
          "dried-seed-heads",
          "dry-seeds"
        ],
        harvestPatternPreference:
          "major",
        desiredStorageDuration:
          "6-12-months",
        minimalPreparationPriority:
          "none",
        dryStorageLocations: [
          "climate-controlled"
        ],
        storageHumidity:
          "consistently-dry",
        dryCropContainerType:
          "airtight-food-safe",
        rodentProtection:
          "rodent-proof-containers"
      },

      preferences: {
        plannerGoals: [
          "winter-storage",
          "high-energy",
          "self-reliance",
          "seed-saving"
        ],
        goalPriorities: [
          {
            goal: "winter-storage",
            rank: 1
          },
          {
            goal: "self-reliance",
            rank: 2
          },
          {
            goal: "high-energy",
            rank: 3
          }
        ],
        preferredNutritionalRole:
          "energy",
        beginnerFriendlinessPriority:
          "not-needed",
        wildlifePestPressure: [
          "wild-birds",
          "rodents"
        ],
        desiredRecommendationFormat:
          "top-three"
      }
    }
  }),

  Object.freeze({
    id: "PROFILE-SUMMER-PROTEIN-GREENS",

    label:
      "Summer Protein-Oriented Greens Grower",

    description:
      "A beginner with a sunny garden who wants fresh greens, tender produce, soil improvement, and minimal processing.",

    answers: {
      climate: {
        climateType: "hot-humid",
        frostFreeSeasonRange:
          "180-209"
      },

      flock: {
        flockSize: 8,
        primaryFlockPurpose:
          "eggs",
        forageAccess: "none"
      },

      space: {
        totalGrowingAreaSqFt: 80,

        availableSpaceTypes: [
          "in-ground",
          "raised-bed"
        ],

        largestAreaShape:
          "wide-rectangle"
      },

      site: {
        directSunHoursExact: 8,
        windExposure: "moderate"
      },

      soil: {
        primaryGrowingMedium:
          "improved-garden",

        soilTexture:
          "sandy-loam",

        soilDrainage:
          "well-drained"
      },

      water: {
        waterReliability:
          "usually-reliable",

        wateringFrequencyPreference:
          "twice-weekly",

        waterConservationPriority:
          "moderate",

        criticalStageWaterAvailability:
          "reliable"
      },

      labor: {
        gardeningExperience:
          "beginner",

        weeklyCropTime:
          "1-2-hours",

        acceptedProcessingTasks: [
          "cut-leaves",
          "pick-produce",
          "chop"
        ],

        dryingCapability:
          "none"
      },

      harvestStorage: {
        desiredHarvestProducts: [
          "fresh-greens",
          "tender-pods",
          "fresh-vegetables"
        ],

        harvestPatternPreference:
          "continuous",

        minimalPreparationPriority:
          "top",

        dryStorageLocations: [],

        rodentProtection:
          "none"
      },

      preferences: {
        plannerGoals: [
          "protein-oriented",
          "fresh-greens",
          "soil-improvement",
          "nitrogen-fixation",
          "shared-household-food"
        ],

        goalPriorities: [
          {
            goal: "protein-oriented",
            rank: 1
          },
          {
            goal: "fresh-greens",
            rank: 2
          },
          {
            goal: "soil-improvement",
            rank: 3
          }
        ],

        preferredNutritionalRole:
          "protein-oriented",

        beginnerFriendlinessPriority:
          "essential",

        wildlifePestPressure: [
          "deer",
          "rabbits"
        ],

        desiredRecommendationFormat:
          "top-three"
      }
    }
  }),

  Object.freeze({
    id: "PROFILE-DRY-LEGUME-STORAGE",

    label:
      "Experienced Dry-Legume Storage Grower",

    description:
      "An experienced grower who accepts drying, shelling, cooking, and protected storage for a protein-oriented winter supplement.",

    answers: {
      climate: {
        climateType: "hot-dry",
        frostFreeSeasonRange:
          "210-plus"
      },

      flock: {
        flockSize: 16,
        primaryFlockPurpose:
          "homestead",
        forageAccess:
          "limited-weekly"
      },

      space: {
        totalGrowingAreaSqFt: 400,

        availableSpaceTypes: [
          "in-ground",
          "open-field"
        ],

        largestAreaShape:
          "wide-rectangle"
      },

      site: {
        directSunHoursExact: 9,
        windExposure: "moderate"
      },

      soil: {
        primaryGrowingMedium:
          "native-soil",

        soilTexture:
          "sandy-loam",

        soilDrainage:
          "well-drained"
      },

      water: {
        waterReliability:
          "occasionally-limited",

        wateringFrequencyPreference:
          "weekly",

        waterConservationPriority:
          "high",

        criticalStageWaterAvailability:
          "reliable"
      },

      labor: {
        gardeningExperience:
          "experienced",

        weeklyCropTime:
          "3-5-hours",

        acceptedProcessingTasks: [
          "pick-produce",
          "dry",
          "shell-beans",
          "clean-sort",
          "cook",
          "chop"
        ],

        dryingCapability:
          "large-covered",

        dryingFacilities: [
          "barn-shed",
          "fans",
          "screens-trays",
          "rodent-proof"
        ]
      },

      harvestStorage: {
        desiredHarvestProducts: [
          "dry-legumes"
        ],

        harvestPatternPreference:
          "major",

        desiredStorageDuration:
          "6-12-months",

        minimalPreparationPriority:
          "none",

        dryStorageLocations: [
          "barn-shed"
        ],

        storageHumidity:
          "consistently-dry",

        dryCropContainerType:
          "airtight-food-safe",

        rodentProtection:
          "rodent-proof-containers"
      },

      preferences: {
        plannerGoals: [
          "protein-oriented",
          "winter-storage",
          "self-reliance",
          "seed-saving",
          "resilience-feed"
        ],

        goalPriorities: [
          {
            goal: "protein-oriented",
            rank: 1
          },
          {
            goal: "winter-storage",
            rank: 2
          },
          {
            goal: "self-reliance",
            rank: 3
          }
        ],

        preferredNutritionalRole:
          "protein-oriented",

        beginnerFriendlinessPriority:
          "not-needed",

        wildlifePestPressure: [
          "deer",
          "rodents",
          "insects"
        ],

        desiredRecommendationFormat:
          "top-three"
      }
    }
  })
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
      harvestFrequencyCategories: HARVEST_FREQUENCY_CATEGORIES,

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
    }),
    testing: Object.freeze({
  sampleUserProfiles:
    SAMPLE_USER_PROFILES
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