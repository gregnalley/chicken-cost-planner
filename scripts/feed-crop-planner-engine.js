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

  namespace.engine = Object.freeze({
    getConfig,
    isConfigLoaded,
    isValidFivePointScore,
    isPlainObject,
    getRecommendationTier,
    getConfidenceLabel,
    weightedAverageKnown,
    getFoundationStatus
  });

})(window);