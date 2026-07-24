"use strict";

/*
  Backyard Chicken Planner
  Feed Crop Recommendation Context Builder

  Version: 1.0.0

  Purpose:
  Translate Feed Crop Planner answers and crop results into
  the shared site-wide recommendation context format.

  This file does not:
  - Score crops
  - Change Feed Crop Planner results
  - Select affiliate products
  - Render recommendation cards
  - Modify questionnaire answers

  Load this file after:
  - scripts/recommendation-engine.js

  Load this file before:
  - scripts/feed-crop-planner-results.js
*/


(function initializeFeedCropRecommendationContext(
  global
) {
  const namespace =
    global.BCPFeedCropPlanner =
      global.BCPFeedCropPlanner ||
      {};

  const CONTEXT_BUILDER_VERSION =
    "1.0.0";


  /*
    ==================================================
    Basic helpers
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


  function asArray(
    value
  ) {
    return Array.isArray(value)
      ? value
      : [];
  }


    function normalizeIdentifier(
    value
  ) {
    if (
      value === null ||
      value === undefined
    ) {
      return "";
    }

    return String(value)
      .trim()
      .toLowerCase()
      .replace(
        /[_\s]+/g,
        "-"
      )
      .replace(
        /[^a-z0-9-]/g,
        ""
      )
      .replace(
        /-+/g,
        "-"
      )
      .replace(
        /^|-$/g,
        ""
      );
  }


  function uniqueIdentifiers(
    values
  ) {
    return [
      ...new Set(
        asArray(values)
          .map(
            normalizeIdentifier
          )
          .filter(Boolean)
      )
    ];
  }


  function addIdentifier(
    collection,
    value
  ) {
    const normalized =
      normalizeIdentifier(
        value
      );

    if (normalized) {
      collection.add(
        normalized
      );
    }
  }


  function addIdentifiers(
    collection,
    values
  ) {
    asArray(values)
      .forEach(
        value =>
          addIdentifier(
            collection,
            value
          )
      );
  }


  function getNestedValue(
    source,
    path
  ) {
    if (
      !source ||
      typeof path !== "string" ||
      !path
    ) {
      return undefined;
    }

    return path
      .split(".")
      .reduce(
        (
          current,
          key
        ) => {
          if (
            current === null ||
            current === undefined
          ) {
            return undefined;
          }

          return current[key];
        },
        source
      );
  }


  function getFirstDefinedValue(
    source,
    paths
  ) {
    for (
      const path of paths
    ) {
      const value =
        getNestedValue(
          source,
          path
        );

      if (
        value !== undefined &&
        value !== null &&
        value !== ""
      ) {
        return value;
      }
    }

    return undefined;
  }


  /*
    ==================================================
    Crop-result helpers
    ==================================================
  */


  function getResultCropId(
    result
  ) {
    return (
      result?.cropId ||
      result?.cropRecord?.id ||
      result?.cropRecord
        ?.plannerData
        ?.identity
        ?.id ||
      result?.cropRecord
        ?.identity
        ?.id ||
      null
    );
  }


  function getResultBestUsePathId(
    result
  ) {
    return (
      result?.bestUsePath
        ?.usePathId ||
      result?.bestUsePath
        ?.id ||
      result?.final
        ?.bestUsePath
        ?.id ||
      null
    );
  }


  function getRawBestUsePath(
    result
  ) {
    const usePathId =
      getResultBestUsePathId(
        result
      );

    if (!usePathId) {
      return null;
    }

    const usePaths =
      result?.cropRecord
        ?.plannerData
        ?.usePaths;

    if (
      !Array.isArray(
        usePaths
      )
    ) {
      return null;
    }

    return (
      usePaths.find(
        usePath =>
          usePath &&
          usePath.id ===
            usePathId
      ) ||
      null
    );
  }


  /*
    ==================================================
    Audience translation
    ==================================================
  */


  function getFlockSize(
    answers
  ) {
    const possibleValue =
      getFirstDefinedValue(
        answers,
        [
          "flock.flockSize",
          "flock.currentFlockSize",
          "flock.numberOfChickens",
          "flock.chickenCount",
          "flockSize"
        ]
      );

    const numericValue =
      Number(
        possibleValue
      );

    return Number.isFinite(
      numericValue
    )
      ? numericValue
      : null;
  }


  function addFlockSizeAudience(
    audiences,
    flockSize
  ) {
    if (
      !Number.isFinite(
        flockSize
      ) ||
      flockSize <= 0
    ) {
      return;
    }

    if (flockSize <= 6) {
      audiences.add(
        "small-flock"
      );

      return;
    }

    if (flockSize <= 20) {
      audiences.add(
        "medium-flock"
      );

      return;
    }

    audiences.add(
      "large-flock"
    );
  }


  function addExperienceAudiences(
    audiences,
    answers
  ) {
    const experience =
      getFirstDefinedValue(
        answers,
        [
          "flock.experienceLevel",
          "preferences.experienceLevel",
          "experience.level",
          "experienceLevel"
        ]
      );

    const normalized =
      normalizeIdentifier(
        experience
      );

    if (!normalized) {
      return;
    }

    if (
      [
        "beginner",
        "new",
        "first-time",
        "first-year"
      ].includes(
        normalized
      )
    ) {
      audiences.add(
        "beginner"
      );

      return;
    }

    if (
      [
        "intermediate",
        "experienced",
        "advanced"
      ].includes(
        normalized
      )
    ) {
      audiences.add(
        normalized
      );
    }
  }


  /*
    ==================================================
    Questionnaire-answer translation
    ==================================================
  */


  function addGoalTags(
    tags,
    answers
  ) {
    const selectedGoals =
      getFirstDefinedValue(
        answers,
        [
          "preferences.selectedGoals",
          "preferences.goals",
          "goals.selectedGoals",
          "goals.primaryGoals"
        ]
      );

    addIdentifiers(
      tags,
      selectedGoals
    );

    const goalPriorities =
      asArray(
        answers?.preferences
          ?.goalPriorities
      );

    goalPriorities.forEach(
      priority => {
        if (
          typeof priority ===
            "string"
        ) {
          addIdentifier(
            tags,
            priority
          );

          return;
        }

        if (
          isPlainObject(
            priority
          )
        ) {
          addIdentifier(
            tags,
            priority.value ||
            priority.goal ||
            priority.id
          );
        }
      }
    );
  }


  function addWildlifeTags(
    tags,
    answers
  ) {
    const wildlifePressures =
      getFirstDefinedValue(
        answers,
        [
          "preferences.wildlifePestPressure",
          "risks.wildlifePestPressure",
          "site.wildlifePestPressure"
        ]
      );

    addIdentifiers(
      tags,
      wildlifePressures
    );

    const normalizedPressures =
      uniqueIdentifiers(
        wildlifePressures
      );

    const rodentValues =
      new Set([
        "rodents",
        "rodent",
        "rats",
        "mice",
        "mouse"
      ]);

    if (
      normalizedPressures.some(
        pressure =>
          rodentValues.has(
            pressure
          )
      )
    ) {
      tags.add(
        "rodent-control"
      );
    }

    if (
      normalizedPressures.some(
        pressure =>
          [
            "wild-birds",
            "birds",
            "bird-pressure"
          ].includes(
            pressure
          )
      )
    ) {
      tags.add(
        "bird-control"
      );
    }

    if (
      normalizedPressures.some(
        pressure =>
          [
            "deer",
            "deer-pressure"
          ].includes(
            pressure
          )
      )
    ) {
      tags.add(
        "deer-control"
      );
    }
  }


  function addHarvestStorageTags(
    tags,
    answers
  ) {
    const harvestStorage =
      answers?.harvestStorage ||
      {};

    addIdentifiers(
      tags,
      harvestStorage
        .desiredHarvestProducts
    );

    addIdentifier(
      tags,
      harvestStorage
        .desiredStorageDuration
    );

    addIdentifier(
      tags,
      harvestStorage
        .harvestPatternPreference
    );

    addIdentifier(
      tags,
      harvestStorage
        .storageHumidity
    );

    addIdentifiers(
      tags,
      harvestStorage
        .dryStorageLocations
    );

    if (
      harvestStorage
        .minimalPreparationPriority ===
        true
    ) {
      tags.add(
        "minimal-processing"
      );
    }

    if (
      harvestStorage
        .rodentProtection ===
        true
    ) {
      tags.add(
        "rodent-resistant-storage"
      );
    }

    if (
      harvestStorage
        .desiredStorageDuration &&
      harvestStorage
        .desiredStorageDuration !==
        "immediate"
    ) {
      tags.add(
        "feed-storage"
      );
    }
  }


  function addLaborTags(
    tags,
    answers
  ) {
    const labor =
      answers?.labor ||
      {};

    addIdentifiers(
      tags,
      labor.acceptedProcessingTasks
    );

    addIdentifiers(
      tags,
      labor.ownedEquipment
    );

    addIdentifiers(
      tags,
      labor
        .equipmentPurchaseWillingness
    );

    addIdentifier(
      tags,
      labor.dryingCapability
    );

    if (
      asArray(
        labor.acceptedProcessingTasks
      ).length === 0
    ) {
      tags.add(
        "low-processing"
      );
    }

    if (
      labor.dryingCapability ===
        false ||
      labor.dryingCapability ===
        "none"
    ) {
      tags.add(
        "no-drying-capability"
      );
    }
  }


  function addSpaceTags(
    tags,
    answers
  ) {
    const space =
      answers?.space ||
      {};

    addIdentifier(
      tags,
      space.spaceType
    );

    addIdentifier(
      tags,
      space.layoutType
    );

    addIdentifiers(
      tags,
      space.plantBehaviorRestrictions
    );

    const availableArea =
      Number(
        getFirstDefinedValue(
          answers,
          [
            "space.availableAreaSqFt",
            "space.growingAreaSqFt",
            "space.totalAreaSqFt"
          ]
        )
      );

    if (
      Number.isFinite(
        availableArea
      )
    ) {
      if (availableArea < 100) {
        tags.add(
          "limited-space"
        );
      } else if (
        availableArea >= 1000
      ) {
        tags.add(
          "large-growing-area"
        );
      }
    }
  }


  function addSiteAndClimateTags(
    tags,
    answers
  ) {
    const climate =
      answers?.climate ||
      {};

    const site =
      answers?.site ||
      {};

    const soil =
      answers?.soil ||
      {};

    const water =
      answers?.water ||
      {};

    addIdentifier(
      tags,
      climate.usdaHardinessZone
    );

    addIdentifier(
      tags,
      climate.growingSeasonLength
    );

    addIdentifier(
      tags,
      climate.climateType
    );

    addIdentifier(
      tags,
      site.sunExposure
    );

    addIdentifier(
      tags,
      site.drainage
    );

    addIdentifier(
      tags,
      soil.soilType
    );

    addIdentifier(
      tags,
      soil.soilFertility
    );

    addIdentifier(
      tags,
      water.irrigationAvailability
    );

    addIdentifier(
      tags,
      water.waterAvailability
    );
  }


  /*
    ==================================================
    Crop-result translation
    ==================================================
  */


  function addCropResultContext(
    result,
    crops,
    tags,
    signals
  ) {
    if (
      !result ||
      typeof result !==
        "object"
    ) {
      return;
    }

    const cropId =
      getResultCropId(
        result
      );

    addIdentifier(
      crops,
      cropId
    );

    addSignal(
      signals,
      "crop",
       cropId,
        100,
         "top-recommendation"
    );

    const bestUsePathId =
      getResultBestUsePathId(
        result
      );

    addIdentifier(
      tags,
      bestUsePathId
    );

    const rawUsePath =
      getRawBestUsePath(
        result
      );

    if (!rawUsePath) {
      return;
    }

    addIdentifiers(
      tags,
      rawUsePath
        .harvestProducts
    );

    addIdentifiers(
      tags,
      rawUsePath
        .requiredProcessingTasks
    );

    addIdentifiers(
      tags,
      rawUsePath
        .requiredEquipment
    );

    addIdentifiers(
      tags,
      rawUsePath
        .storageMethods
    );

    addIdentifier(
      tags,
      rawUsePath
        .feedingMethod
    );

    addIdentifier(
      tags,
      rawUsePath
        .harvestFrequencyCategory
    );

    if (
      rawUsePath.dryingRequired ===
        true
    ) {
      tags.add(
        "drying-required"
      );
    }

    if (
      asArray(
        rawUsePath
          .storageMethods
      ).length > 0
    ) {
      tags.add(
        "feed-storage"
      );
    }

    if (
      asArray(
        rawUsePath
          .requiredProcessingTasks
      ).length > 0
    ) {
      tags.add(
        "crop-processing"
      );
    }
  }


  /*
    ==================================================
    Public context builder
    ==================================================
  */


  function buildContext(
    answers,
    displayedRecommendations,
    options = {}
  ) {
    const safeAnswers =
      isPlainObject(
        answers
      )
        ? answers
        : {};

    const safeResults =
      asArray(
        displayedRecommendations
      );

    const crops =
      new Set();

    const planners =
      new Set([
        "feed-crop-planner"
      ]);

    const calculators =
      new Set();

    const pageTypes =
      new Set([
        "feed-crop-planner-results"
      ]);

    const tags =
      new Set([
        "feeding",
        "feed-crops",
        "homegrown-feed"
      ]);

    const audiences =
      new Set();

    const signals = [];  


    addGoalTags(
      tags,
      safeAnswers
    );

    addWildlifeTags(
      tags,
      safeAnswers
    );

    addHarvestStorageTags(
      tags,
      safeAnswers
    );

    addLaborTags(
      tags,
      safeAnswers
    );

    addSpaceTags(
      tags,
      safeAnswers
    );

    addSiteAndClimateTags(
      tags,
      safeAnswers
    );


    const flockSize =
      getFlockSize(
        safeAnswers
      );

    addFlockSizeAudience(
      audiences,
      flockSize
    );

    addExperienceAudiences(
      audiences,
      safeAnswers
    );


    safeResults.forEach(
      result =>
        addCropResultContext(
          result,
          crops,
          tags,
          signals
        )
    );


    addIdentifiers(
      planners,
      options.planners
    );

    addIdentifiers(
      calculators,
      options.calculators
    );

    addIdentifiers(
      pageTypes,
      options.pageTypes
    );

    addIdentifiers(
      tags,
      options.tags
    );

    addIdentifiers(
      audiences,
      options.audiences
    );


    return {
      crops:
        Array.from(crops),

      planners:
        Array.from(planners),

      calculators:
        Array.from(calculators),

      pageTypes:
        Array.from(pageTypes),

      tags:
        Array.from(tags),

      audiences:
        Array.from(audiences),

      signals:
        Array.from(signals) 
    };
  }

  function addSignal(
  signals,
  type,
  value,
  weight,
  source
) {
  if (
    !Array.isArray(signals)
  ) {
    return;
  }

  const normalizedType =
    normalizeValue(type);

  const normalizedValue =
    normalizeValue(value);

  const normalizedSource =
    normalizeValue(source);

  const numericWeight =
    Number(weight);

  if (
    !normalizedType ||
    !normalizedValue ||
    !normalizedSource ||
    !Number.isFinite(
      numericWeight
    )
  ) {
    return;
  }

  const boundedWeight =
    Math.max(
      0,
      Math.min(
        100,
        numericWeight
      )
    );

  const duplicateExists =
    signals.some(
      function hasMatchingSignal(
        signal
      ) {
        return (
          signal.type ===
            normalizedType &&
          signal.value ===
            normalizedValue &&
          signal.source ===
            normalizedSource
        );
      }
    );

  if (
    duplicateExists
  ) {
    return;
  }

  signals.push({
    type:
      normalizedType,

    value:
      normalizedValue,

    weight:
      boundedWeight,

    source:
      normalizedSource
  });
}


  /*
    ==================================================
    Debugging helper
    ==================================================
  */


  function inspectContext(
    answers,
    displayedRecommendations,
    options = {}
  ) {
    const context =
      buildContext(
        answers,
        displayedRecommendations,
        options
      );

    console.group(
      "Feed Crop Recommendation Context"
    );

    console.log(
      "Answers:",
      answers
    );

    console.log(
      "Displayed crop results:",
      displayedRecommendations
    );

    console.log(
      "Recommendation context:",
      context
    );

    console.groupEnd();

    return context;
  }


  /*
    ==================================================
    Public API
    ==================================================
  */


  namespace.recommendationContext =
    Object.freeze({
      version:
        CONTEXT_BUILDER_VERSION,

      buildContext,

      inspectContext
    });


  global
    .buildFeedCropRecommendationContext =
      buildContext;

})(
  window
);